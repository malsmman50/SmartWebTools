import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const fetchWithTimeout = async (url, options, timeout = 2500) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(id);
    }
  };

  const apis = [
    {
      name: 'gold-api.com',
      fetch: async () => {
        const res = await fetchWithTimeout('https://api.gold-api.com/price/XAU', { headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error('API 1 Failed');
        const data = await res.json();
        if (data.price) return data.price;
        throw new Error('Invalid format');
      }
    },
    {
      name: 'goldprice.org',
      fetch: async () => {
        const res = await fetchWithTimeout('https://data-asg.goldprice.org/dbXRates/USD', { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
        if (!res.ok) throw new Error('API 2 Failed');
        const data = await res.json();
        if (data.items && data.items[0] && data.items[0].xauPrice) return data.items[0].xauPrice;
        throw new Error('Invalid format');
      }
    },
    {
      name: 'currency-api',
      fetch: async () => {
        // xau is priced in gold ounces per 1 USD. So 1 / xau = USD per 1 Ounce.
        const res = await fetchWithTimeout('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', { headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error('API 3 Failed');
        const data = await res.json();
        if (data.usd && data.usd.xau) return (1 / data.usd.xau);
        throw new Error('Invalid format');
      }
    }
  ];

  try {
    // 🔥 Promise.any executes ALL 3 requests simultaneously!
    // The very first one to successfully return a price "wins" instantly.
    // This reduces the wait time to just the speed of the fastest API (usually < 300ms)
    const result = await Promise.any(
      apis.map(async (api) => {
        const price = await api.fetch();
        if (price > 0) return { pricePerOunce: price, source: api.name };
        throw new Error('Invalid price');
      })
    );
    
    return NextResponse.json(result);
  } catch (aggregateError) {
    // If we reach here, it means ALL 3 APIs failed simultaneously
    console.error('All Gold APIs failed:', aggregateError.errors);
    return NextResponse.json({ error: 'All APIs failed' }, { status: 500 });
  }
}
