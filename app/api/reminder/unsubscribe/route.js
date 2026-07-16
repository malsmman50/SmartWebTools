import { verifyToken } from '@/lib/token';

// POST only: the actual delete happens here, triggered by a button on the
// unsubscribe page — never on a bare GET (protects against email link scanners
// that auto-visit URLs).
export async function POST(request) {
  try {
    const { token } = await request.json();
    const payload = await verifyToken(token);

    if (!payload || payload.act !== 'unsub' || !payload.email) {
      return new Response(JSON.stringify({ error: 'Invalid or expired link' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (process.env.POSTGRES_URL) {
      const { sql } = await import('@vercel/postgres');
      await sql`DELETE FROM zakat_reminders WHERE email = ${payload.email};`;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unsubscribe error:', error.message);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
