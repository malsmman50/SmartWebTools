import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "سياسة الخصوصية | أدوات الحساب الذكية" : "Privacy Policy | SmartCalcTools",
    description: isAr 
      ? "سياسة الخصوصية الخاصة بموقع أدوات الحساب الذكية. نحن نضمن عدم جمع أو حفظ أي بيانات خاصة بك بفضل معالجتنا المحلية بالكامل."
      : "Our privacy policy detailing how SmartCalcTools protects your data using 100% client-side Zero Trust architecture."
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.privacy;

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", lineHeight: "1.8" }}>
      <h1>{t.title}</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{t.updated}</p>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section1_title}</h2>
        <p>{t.section1_desc1}</p>
        <p style={{ marginTop: "12px" }}>{t.section1_desc2}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section2_title}</h2>
        <p>{t.section2_desc1}</p>
        <p style={{ marginTop: "12px" }}>{t.section2_desc2}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section3_title}</h2>
        <p>{t.section3_desc}</p>
      </section>
    </div>
  );
}
