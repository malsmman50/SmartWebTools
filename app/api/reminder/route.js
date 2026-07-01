import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { email, month } = await request.json();

    if (!email || !month) {
      return new Response(JSON.stringify({ error: 'Email and month are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use the Resend API Key provided by user
    const resend = new Resend(process.env.RESEND_API_KEY || 're_Scy4mLRJ_KGgB6kGn3ELr2C82jdn1kb6B');

    // 1. Send dynamic confirmation email immediately to verify subscription
    const subject = 'Zakat Reminder Activated / تم تفعيل تذكير الزكاة';
    
    const html = `
      <div style="font-family: sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #10b981; margin: 0;">SmartCalcTools</h2>
          <p style="font-size: 0.9rem; color: #666; margin: 5px 0 0 0;">حسابات ذكية.. قيم إسلامية</p>
        </div>
        <p>مرحباً،</p>
        <p>تم تفعيل تذكير الزكاة السنوي بنجاح لبريدك الإلكتروني: <strong>${email}</strong>.</p>
        <p>سنقوم بإرسال رسالة تذكيرية لك <strong>قبل موعد زكاتك السنوي (${month === 'ramadan' ? 'رمضان' : 'الموعد المحدد'}) بـ 30 يوماً</strong> لتقوم بحساب وإخراج فريضتك بسهولة ودقة.</p>
        
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <h4 style="color: #15803d; margin: 0 0 8px 0;">🕊️ دفع الزكاة مباشرة</h4>
          <p style="margin: 0; font-size: 0.9rem; color: #166534;">
            تذكر أنه يمكنك دائماً دفع زكاتك مباشرة وبشكل آمن 100% ودون أي عمولات عبر القنوات الرسمية والحكومية المعتمدة مثل <strong>منصة إحسان الخيرية</strong>.
          </p>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
          هذه رسالة تأكيدية تلقائية، يرجى عدم الرد عليها.<br>
          SmartCalcTools.xyz - أدوات مجانية وآمنة 100% تعمل بالكامل داخل متصفحك.
        </p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'SmartCalcTools <onboarding@resend.dev>',
        to: email,
        subject: subject,
        html: html,
      });
    } catch (emailErr) {
      console.warn('[!] Failed to send confirmation email:', emailErr.message);
    }

    // 2. Try to save to Vercel Postgres if env variable exists
    if (process.env.POSTGRES_URL) {
      const { sql } = await import('@vercel/postgres');
      
      // Auto-create table if not exists
      await sql`
        CREATE TABLE IF NOT EXISTS zakat_reminders (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          month VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      // Insert or Update reminder
      await sql`
        INSERT INTO zakat_reminders (email, month)
        VALUES (${email}, ${month})
        ON CONFLICT (email) 
        DO UPDATE SET month = ${month};
      `;
      console.log(`[+] Saved reminder for ${email} to Postgres.`);
    } else {
      console.warn('[!] POSTGRES_URL not configured. Running in standalone email mode.');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Reminder API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
