import { Resend } from 'resend';

export async function GET(request) {
  // Protect route with a cron token or authorization header
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (!process.env.POSTGRES_URL) {
      return new Response(JSON.stringify({ error: 'Postgres not configured' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get current Hijri Month name (e.g. "Ramadan" or "Sha'ban" in English)
    const formatEn = new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'long' });
    const currentHijriMonthEn = formatEn.format(new Date()).toLowerCase();

    // Map month options to Hijri months
    // Database 'month' values: 'ramadan', 'muharram', 'shawwal', 'dhul-hijjah'
    // 'ramadan' -> we remind them 30 days before, which is in Sha'ban
    // 'muharram' -> Muharram
    // 'shawwal' -> Shawwal
    // 'dhul-hijjah' -> Dhu al-Hijjah
    
    let targetMonthOption = '';
    if (currentHijriMonthEn.includes('sha')) {
      // Sha'ban is right before Ramadan
      targetMonthOption = 'ramadan';
    } else if (currentHijriMonthEn.includes('muharram')) {
      targetMonthOption = 'muharram';
    } else if (currentHijriMonthEn.includes('shawwal')) {
      targetMonthOption = 'shawwal';
    } else if (currentHijriMonthEn.includes('hijjah') || currentHijriMonthEn.includes('dhu al-hijjah')) {
      targetMonthOption = 'dhul-hijjah';
    }

    if (!targetMonthOption) {
      return new Response(JSON.stringify({ message: `No reminders scheduled for current Hijri month: ${currentHijriMonthEn}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { sql } = await import('@vercel/postgres');
    
    // Query subscribers due for this target month
    const { rows } = await sql`
      SELECT email FROM zakat_reminders 
      WHERE month = ${targetMonthOption};
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: `No subscribers due for target option: ${targetMonthOption}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use user Resend API Key
    const resend = new Resend(process.env.RESEND_API_KEY || 're_Scy4mLRJ_KGgB6kGn3ELr2C82jdn1kb6B');
    let successCount = 0;

    for (const subscriber of rows) {
      const email = subscriber.email;
      
      const subject = targetMonthOption === 'ramadan' 
        ? '🌙 تذكير: اقتراب شهر رمضان المبارك وموعد زكاتك السنوية'
        : '🔔 تذكير: حلول موعد زكاتك السنوية';

      const html = `
        <div style="font-family: sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #10b981; margin: 0;">SmartCalcTools</h2>
          </div>
          <p>السلام عليكم ورحمة الله وبركاته،</p>
          <p>نود تذكيرك بحلول الموعد السنوي المحدد لاحتساب وإخراج زكاة مالك <strong>(${targetMonthOption === 'ramadan' ? 'يقترب شهر رمضان المبارك' : 'بداية شهر ' + targetMonthOption})</strong>.</p>
          <p>تسهيلاً عليك، يمكنك حساب قيمة زكاتك بدقة وسرية تامة 100% عبر حاسبتنا المجانية المحدثة:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://smartcalctools.xyz/ar/calculators/zakat" style="background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">احسب زكاتك الآن 🧮</a>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h4 style="color: #15803d; margin: 0 0 8px 0;">🕊️ قنوات دفع الزكاة الرسمية وبدون عمولات:</h4>
            <p style="margin: 0 0 10px 0; font-size: 0.9rem; color: #166534;">
              يمكنك دفع زكاتك مباشرة لصالح مستحقيها عبر المنصات الرسمية والمعتمدة في المملكة العربية السعودية:
            </p>
            <ul style="margin: 0; padding-right: 20px; font-size: 0.9rem; color: #166534;">
              <li><a href="https://ehsan.sa/zakat" style="color: #15803d; font-weight: bold; text-decoration: underline;">منصة إحسان الخيرية (اضغط هنا لدفع زكاتك)</a></li>
              <li><a href="https://zakaty.gov.sa" style="color: #15803d; font-weight: bold; text-decoration: underline;">بوابة زكاتي الحكومية للزكاة والدخل</a></li>
            </ul>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
            لقد تلقيت هذا البريد لأنك اشتركت في خدمة تذكير الزكاة من موقع SmartCalcTools.<br>
            لإلغاء الاشتراك، يرجى تجاهل هذا الإيميل أو التواصل معنا.
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
        successCount++;
      } catch (err) {
        console.error(`[!] Failed to send reminder to ${email}:`, err.message);
      }
    }

    return new Response(JSON.stringify({ success: true, sent: successCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Cron Reminders Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
