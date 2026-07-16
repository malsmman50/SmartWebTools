import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/token';

const BASE_URL = 'https://smartcalctools.xyz';

export async function GET(request) {
  const token = request.nextUrl.searchParams.get('token');
  const payload = await verifyToken(token);

  if (!payload || payload.act !== 'confirm' || !payload.email) {
    return NextResponse.redirect(`${BASE_URL}/en/reminder/confirmed?status=invalid`);
  }

  const lang = payload.lang === 'en' ? 'en' : 'ar';

  try {
    if (process.env.POSTGRES_URL) {
      const { sql } = await import('@vercel/postgres');
      await sql`UPDATE zakat_reminders SET confirmed = true WHERE email = ${payload.email};`;
    }
    return NextResponse.redirect(`${BASE_URL}/${lang}/reminder/confirmed?status=ok`);
  } catch (e) {
    console.error('Confirm error:', e.message);
    return NextResponse.redirect(`${BASE_URL}/${lang}/reminder/confirmed?status=error`);
  }
}
