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

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{lang === "ar" ? "الإعلانات وملفات تعريف الارتباط (Cookies)" : "Advertising and Cookies"}</h2>
        <p>
          {lang === "ar" 
            ? "العمليات الحسابية ومعالجة الملفات تتم 100% داخل جهازك بخصوصية تامة ولا نرى أي بيانات مدخلة. ومع ذلك، لكي نتمكن من إبقاء الموقع مجانياً، نحن نستخدم خدمة Google AdSense لعرض الإعلانات. قد تستخدم شبكة Google ملفات تعريف الارتباط (Cookies) لتقديم إعلانات مخصصة بناءً على زياراتك السابقة لهذا الموقع أو مواقع أخرى على الإنترنت."
            : "Your calculations and file processing occur 100% locally on your device with complete privacy; we do not see any of your input data. However, to keep this site free, we use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on your prior visits to our site or other websites."}
        </p>
      </section>
    </div>
  );
}
