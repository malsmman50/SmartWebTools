import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "من نحن | أدوات الحساب الذكية" : "About Us | SmartCalcTools",
    description: isAr 
      ? "تعرف على أدوات الحساب الذكية ورسالتنا لبناء أدوات مطورين وحاسبات مالية متوافقة مع الشريعة الإسلامية 100% وخاصة بالكامل."
      : "Learn about SmartCalcTools, our mission to build 100% private, client-side, and Sharia-compliant developer and financial tools."
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.about;

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", lineHeight: "1.8" }}>
      <h1>{t.title}</h1>
      <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "24px" }}>
        {t.subtitle}
      </p>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.mission_title}</h2>
        <p>{t.mission_desc1}</p>
        <p style={{ marginTop: "12px" }}>{t.mission_desc2}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.zero_trust_title}</h2>
        <p>{t.zero_trust_desc}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.islamic_finance_title}</h2>
        <p>{t.islamic_finance_desc}</p>
      </section>
    </div>
  );
}
