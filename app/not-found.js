import Link from "next/link";
import "@/app/globals.css";

/**
 * صفحة 404 على الجذر.
 *
 * كانت الصفحة المخصّصة موجودة في app/[lang]/not-found.js وحدها، والموقع
 * الحيّ يعرض صفحة Next الافتراضية: «404: This page could not be found»،
 * إنجليزية بلا تنسيق ولا رابط عودة. والسبب أن حارس اللغة في تخطيط [lang]
 * يستدعي notFound()، وهي حين تُستدعى من تخطيطٍ تبحث عن أقرب حدٍّ فوقه لا
 * داخله — فتتخطّى الصفحة الموضوعة تحته إلى الجذر، ولم يكن على الجذر شيء.
 *
 * وهذا يقع على كل رابط قديم أو خاطئ، ومنها الروابط التي بقيت في الفهرس من
 * صفحات PSEO المحذوفة. فأوّل ما قد يراه زائرٌ قادم من نتيجة بحث قديمة —
 * أو مراجعٌ يتفقّد الموقع — صفحةٌ تبدو مكسورة.
 */
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="container" style={{ padding: "80px 20px", textAlign: "center", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "5rem", fontWeight: 700, color: "var(--brass, #8a5e18)", lineHeight: 1, marginBottom: "8px" }}>404</div>

          <div style={{ display: "grid", gap: "40px", maxWidth: "820px", width: "100%", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: "24px" }}>
            <section style={{ textAlign: "right", direction: "rtl" }}>
              <h1 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>الصفحة غير موجودة</h1>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                قد تكون الصفحة نُقلت أو حُذفت. وإن وصلتَ من نتيجة بحث قديمة، فكثير من صفحات الموقع أُعيد ترتيبها — والأدوات كلها ما زالت في مكانها.
              </p>
              <Link href="/ar" className="btn btn-primary">الصفحة الرئيسية</Link>
              <Link href="/ar/blog" style={{ marginInlineStart: "12px" }}>المدونة</Link>
            </section>

            <section style={{ textAlign: "left", direction: "ltr" }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>Page not found</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                This page may have moved or been removed. If you arrived from an older search result, much of the site was reorganised — every calculator is still here.
              </p>
              <Link href="/en" className="btn btn-primary">Homepage</Link>
              <Link href="/en/blog" style={{ marginInlineStart: "12px" }}>Blog</Link>
            </section>
          </div>
        </div>
      </body>
    </html>
  );
}
