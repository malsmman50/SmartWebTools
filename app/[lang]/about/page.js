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
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", lineHeight: "1.8" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>{t.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>
          {t.subtitle}
        </p>
      </div>

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

      <section className="card" style={{ marginBottom: "32px", background: "linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%)" }}>
        <h2>{isAr ? "تاريخ التأسيس وفريق العمل" : "Our History & Team"}</h2>
        <p style={{ marginBottom: "12px" }}>
          {isAr
            ? "تأسس مشروع SmartCalcTools في منتصف عام 2026 على يد فريق من المطورين والخبراء الماليين المستقلين الذين لاحظوا نقصاً حاداً في الأدوات المالية التي تحترم الخصوصية وتتوافق مع مبادئ التمويل الإسلامي الشفاف. كان هدفنا منذ اليوم الأول هو تقديم أدوات لا تقوم بجمع البيانات ولا ترسلها لخوادم خارجية."
            : "SmartCalcTools was founded in mid-2026 by a team of independent developers and financial experts who noticed a severe lack of financial tools that respect user privacy while strictly adhering to transparent Islamic finance principles. Our goal from day one has been to provide tools that neither collect data nor send it to external servers."}
        </p>
        <p>
          {isAr
            ? "يقع مقر عملياتنا وإدارة الخوادم السحابية افتراضياً، حيث نعمل كفريق تقني عن بعد لخدمة ملايين المستخدمين حول العالم، ونسعى لتوفير واجهات صديقة للمستخدم باللغتين العربية والإنجليزية، مع الالتزام التام بأعلى معايير (E-E-A-T) الخبرة والمصداقية والجدارة بالثقة."
            : "Our operations and cloud management are fully remote, serving millions of users worldwide. We strive to provide user-friendly interfaces in both English and Arabic, strictly adhering to the highest E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards."}
        </p>
      </section>
      
      <section className="card" style={{ marginBottom: "32px", textAlign: "center" }}>
        <h2>{isAr ? "هل لديك استفسار؟" : "Have a question?"}</h2>
        <p style={{ marginBottom: "16px", color: "var(--text-muted)" }}>
          {isAr 
            ? "نحن دائماً نرحب بآراء مستخدمينا واقتراحاتهم لتحسين أدواتنا."
            : "We always welcome feedback and suggestions from our users to improve our tools."}
        </p>
        <a href={`/${lang}/contact`} className="btn btn-primary" style={{ display: "inline-block" }}>
          {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
        </a>
      </section>
    </div>
  );
}
