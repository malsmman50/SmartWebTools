import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    // Fetch the script from unpkg or jsdelivr server-side to avoid client-side Tracking Prevention blocks
    const res = await fetch('https://cdn.jsdelivr.net/npm/adhan@4.4.4/lib/adhan.umd.min.js');
    
    if (!res.ok) {
      // Fallback if jsdelivr fails
      const fallback = await fetch('https://unpkg.com/adhan');
      if (!fallback.ok) throw new Error('Both CDNs failed');
      const text = await fallback.text();
      return new NextResponse(text, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    }
    
    const text = await res.text();
    
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load script' }, { status: 500 });
  }
}
