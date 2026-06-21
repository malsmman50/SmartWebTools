import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/USD', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 } // Cache the gold price for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Gold API Route Error:', error);
    return NextResponse.json({ error: 'Failed to fetch gold price' }, { status: 500 });
  }
}
