import Link from 'next/link';
import { getDictionary } from "@/app/dictionaries";

export default async function NotFound() {
  // Since we can't easily access the locale in the global not-found without complex middleware logic
  // we'll display a bilingual 404 page that serves both Arabic and English users perfectly.
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '6rem', fontWeight: '900', color: 'var(--primary)', lineHeight: '1', marginBottom: '16px' }}>404</div>
      
      <div className="grid-2" style={{ maxWidth: '800px', width: '100%', gap: '40px' }}>
        <div style={{ textAlign: 'right', direction: 'rtl' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>الصفحة غير موجودة</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.1rem' }}>
            عذراً، يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو أنها لم تعد موجودة.
          </p>
          <Link href="/ar" className="btn btn-primary">
            العودة للرئيسية
          </Link>
        </div>

        <div style={{ textAlign: 'left', direction: 'ltr', borderLeft: '1px solid var(--border)', paddingLeft: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Page Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.1rem' }}>
            Sorry, it seems the page you're looking for has been moved or no longer exists.
          </p>
          <Link href="/en" className="btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
