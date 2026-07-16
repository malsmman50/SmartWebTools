import { Resend } from 'resend';
import { signToken } from '@/lib/token';

const BASE_URL = 'https://smartcalctools.xyz';

export async function POST(request) {
  try {
    const { email, month, lang } = await request.json();

    if (!email || !month) {
      return new Response(JSON.stringify({ error: 'Email and month are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Strict validation: real email format + month must be from the known whitelist
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const VALID_MONTHS = ['ramadan', 'muharram', 'shawwal', 'dhul-hijjah'];
    if (!EMAIL_RE.test(String(email)) || String(email).length > 254 || !VALID_MONTHS.includes(String(month))) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userLang = lang === 'en' ? 'en' : 'ar';

    // Fail-closed: never operate without a configured API key (no hardcoded fallback)
    if (!process.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Persist as UNCONFIRMED (double opt-in) if Postgres is available.
    if (process.env.POSTGRES_URL) {
      const { sql } = await import('@vercel/postgres');
      await sql`
        CREATE TABLE IF NOT EXISTS zakat_reminders (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          month VARCHAR(50) NOT NULL,
          lang VARCHAR(10) DEFAULT 'ar',
          confirmed BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      try {
        await sql`ALTER TABLE zakat_reminders ADD COLUMN IF NOT EXISTS lang VARCHAR(10) DEFAULT 'ar';`;
        await sql`ALTER TABLE zakat_reminders ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT false;`;
      } catch (err) {
        console.warn('[!] Table upgrade note:', err.message);
      }
      // Re-subscribing resets confirmation (must re-verify).
      await sql`
        INSERT INTO zakat_reminders (email, month, lang, confirmed)
        VALUES (${email}, ${month}, ${userLang}, false)
        ON CONFLICT (email)
        DO UPDATE SET month = ${month}, lang = ${userLang}, confirmed = false;
      `;
    }

    // 2. Build a signed confirmation link (double opt-in).
    let confirmUrl;
    try {
      const token = await signToken({ email, month, lang: userLang, act: 'confirm' }, '7d');
      confirmUrl = `${BASE_URL}/api/reminder/confirm?token=${encodeURIComponent(token)}`;
    } catch (e) {
      // No signing secret configured — cannot run double opt-in safely.
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subject = userLang === 'ar'
      ? 'أكّد اشتراكك في تذكير الزكاة - SmartCalcTools'
      : 'Confirm your Zakat reminder subscription - SmartCalcTools';

    const html = userLang === 'ar' ? `
      <div style="font-family: sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #10b981; margin: 0;">SmartCalcTools</h2>
          <p style="font-size: 0.9rem; color: #666; margin: 5px 0 0 0;">حسابات ذكية.. قيم إسلامية</p>
        </div>
        <p>مرحباً،</p>
        <p>لقد طلب أحدهم تفعيل تذكير الزكاة السنوي لهذا البريد. لتأكيد اشتراكك، يرجى الضغط على الزر أدناه:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${confirmUrl}" style="background: #10b981; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">تأكيد الاشتراك ✅</a>
        </div>
        <p style="font-size: 0.85rem; color: #666;">إذا لم تطلب هذا الاشتراك، فتجاهل هذه الرسالة ولن يصلك أي تذكير.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
          هذه رسالة تلقائية، يرجى عدم الرد عليها.<br>
          SmartCalcTools.xyz - أدوات مجانية وآمنة 100%.
        </p>
      </div>
    ` : `
      <div style="font-family: sans-serif; direction: ltr; text-align: left; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #10b981; margin: 0;">SmartCalcTools</h2>
          <p style="font-size: 0.9rem; color: #666; margin: 5px 0 0 0;">Smart Calculations, Islamic Values</p>
        </div>
        <p>Hello,</p>
        <p>Someone requested an annual Zakat reminder for this email address. To confirm your subscription, please click the button below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${confirmUrl}" style="background: #10b981; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Confirm Subscription ✅</a>
        </div>
        <p style="font-size: 0.85rem; color: #666;">If you did not request this, simply ignore this email and you will not receive any reminders.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
          This is an automated email, please do not reply.<br>
          SmartCalcTools.xyz - 100% free and secure tools.
        </p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'SmartCalcTools <no-reply@smartcalctools.xyz>',
        to: email,
        subject,
        html,
      });
    } catch (emailErr) {
      console.warn('[!] Failed to send confirmation email:', emailErr.message);
    }

    return new Response(JSON.stringify({ success: true, pending: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Reminder API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
