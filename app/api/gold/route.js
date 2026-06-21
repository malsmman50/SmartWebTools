import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const fetchWithTimeout = async (url, options, timeout = 4000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
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

  let errors = [];

  for (const api of apis) {
    try {
      const pricePerOunce = await api.fetch();
      if (pricePerOunce > 0) {
        console.log(`Successfully fetched gold price from ${api.name}: ${pricePerOunce}`);
        return NextResponse.json({ pricePerOunce, source: api.name });
      }
    } catch (e) {
      console.warn(`Failed fetching from ${api.name}:`, e.message);
      errors.push(`${api.name}: ${e.message}`);
    }
  }

  // If all APIs fail
  console.error('All Gold APIs failed:', errors);
  return NextResponse.json({ error: 'All APIs failed', details: errors }, { status: 500 });
}
