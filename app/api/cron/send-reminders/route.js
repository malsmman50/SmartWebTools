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
    
    // Query subscribers due for this target month, including language preference
    const { rows } = await sql`
      SELECT email, lang FROM zakat_reminders 
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
      const userLang = subscriber.lang === 'en' ? 'en' : 'ar';
      
      const subject = userLang === 'ar'
        ? (targetMonthOption === 'ramadan' 
            ? '🌙 تذكير: اقتراب شهر رمضان المبارك وموعد زكاتك السنوية'
            : '🔔 تذكير: حلول موعد زكاتك السنوية')
        : (targetMonthOption === 'ramadan'
            ? '🌙 Reminder: Ramadan is approaching & your Zakat is due'
            : '🔔 Reminder: Your annual Zakat is due');

      const html = userLang === 'ar' ? `
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
              <li><a href="https://zakaty.gov.sa/" style="color: #15803d; font-weight: bold; text-decoration: underline;">بوابة زكاتي الحكومية للزكاة والدخل</a></li>
            </ul>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
            لقد تلقيت هذا البريد لأنك اشتركت في خدمة تذكير الزكاة من موقع SmartCalcTools.<br>
            لإلغاء الاشتراك، يرجى تجاهل هذا الإيميل أو التواصل معنا.
          </p>
        </div>
      ` : `
        <div style="font-family: sans-serif; direction: ltr; text-align: left; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #10b981; margin: 0;">SmartCalcTools</h2>
          </div>
          <p>Assalamu Alaikum,</p>
          <p>We would like to remind you that your annual Zakat due date is approaching/due <strong>(${targetMonthOption === 'ramadan' ? 'Ramadan is approaching' : 'beginning of ' + targetMonthOption})</strong>.</p>
          <p>For your convenience, you can calculate your exact Zakat obligation with 100% security & privacy using our free updated calculator:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://smartcalctools.xyz/en/calculators/zakat" style="background: #10b981; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Calculate Zakat Now 🧮</a>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h4 style="color: #15803d; margin: 0 0 8px 0;">🕊️ Pay Zakat Directly (No Commissions):</h4>
            <p style="margin: 0 0 10px 0; font-size: 0.9rem; color: #166534;">
              You can pay your Zakat directly and securely to eligible beneficiaries via globally trusted official charity channels:
            </p>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: #166534;">
              <li><a href="https://www.islamic-relief.org/zakat/" style="color: #15803d; font-weight: bold; text-decoration: underline;">Islamic Relief Worldwide (Zakat Portal)</a></li>
              <li><a href="https://www.zakat.org/" style="color: #15803d; font-weight: bold; text-decoration: underline;">Zakat Foundation of America</a></li>
            </ul>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8rem; color: #999; text-align: center; margin: 0;">
            You received this email because you subscribed to the Zakat reminder service on SmartCalcTools.<br>
            To unsubscribe, please contact us or disregard this message.
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'SmartCalcTools <no-reply@smartcalctools.xyz>',
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
