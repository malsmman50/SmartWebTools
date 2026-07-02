import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use the Resend API Key provided by user (or fallback to the one we tested with)
    const resend = new Resend(process.env.RESEND_API_KEY || 're_Scy4mLRJ_KGgB6kGn3ELr2C82jdn1kb6B');

    // The email where you want to receive contact form submissions
    // If ADMIN_EMAIL is not set, it will send to support@smartcalctools.xyz
    // You should set ADMIN_EMAIL in Vercel to your personal Gmail if you want to receive them there.
    const toEmail = process.env.ADMIN_EMAIL || 'support@smartcalctools.xyz';

    const subject = `New Contact Form Message from ${name}`;
    
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; line-height: 1.6;">
        <h2 style="color: #10b981; margin-top: 0;">New Message via SmartCalcTools</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px;">${message}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #999;">
          This message was sent from the contact form on smartcalctools.xyz.
          You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'SmartCalc Contact <no-reply@smartcalctools.xyz>',
      to: toEmail,
      reply_to: email,
      subject: subject,
      html: html,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
