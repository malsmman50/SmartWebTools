import Link from 'next/link';

export const metadata = { robots: { index: false, follow: false } };

export default async function ReminderConfirmedPage({ params, searchParams }) {
  const { lang } = await params;
  const sp = await searchParams;
  const status = sp?.status || 'ok';
  const isAr = lang === 'ar';

  const messages = {
    ok: isAr
      ? { title: '✅ تم تأكيد اشتراكك', body: 'سيصلك تذكير الزكاة قبل موعدها بإذن الله. جزاك الله خيراً.' }
      : { title: '✅ Subscription confirmed', body: 'You will receive your Zakat reminder before its due date. Thank you.' },
    invalid: isAr
      ? { title: '⚠️ رابط غير صالح', body: 'رابط التأكيد غير صحيح أو انتهت صلاحيته. يرجى إعادة الاشتراك من صفحة حاسبة الزكاة.' }
      : { title: '⚠️ Invalid link', body: 'This confirmation link is invalid or has expired. Please subscribe again from the Zakat calculator page.' },
    error: isAr
      ? { title: '⚠️ حدث خطأ', body: 'تعذّر تأكيد اشتراكك حالياً. يرجى المحاولة لاحقاً.' }
      : { title: '⚠️ Something went wrong', body: 'We could not confirm your subscription right now. Please try again later.' },
  };

  const m = messages[status] || messages.ok;

  return (
    <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px 30px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--primary)' }}>{m.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '28px' }}>{m.body}</p>
        <Link href={`/${isAr ? 'ar' : 'en'}/calculators/zakat`} style={{ background: 'var(--success, #10b981)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          {isAr ? 'العودة لحاسبة الزكاة' : 'Back to Zakat Calculator'}
        </Link>
      </div>
    </div>
  );
}
