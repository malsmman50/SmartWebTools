import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/about`,
      languages: {
        "en": `https://smartcalctools.xyz/en/about`,
        "ar": `https://smartcalctools.xyz/ar/about`,
      },
    },
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
        {/* حلّ هذا القسم محلّ قسمٍ ادّعى «فريقاً من الخبراء الماليين» و«خدمة
            ملايين المستخدمين» و«الالتزام التام بمعايير E-E-A-T». الثانية دعوى
            غير صحيحة، والثالثة كتابةٌ للخوارزمية لا للقارئ. وصفحةٌ يُحكم بها
            على مصداقيتنا لا يجوز أن تُبنى على ما لا نستطيع إثباته — والثقة
            تُبنى بما يستطيع القارئ التحقّق منه بنفسه، لا بما نقوله عن أنفسنا. */}
        <h2>{isAr ? "كيف تتحقّق من هذا بنفسك" : "How to check this yourself"}</h2>
        <p style={{ marginBottom: "12px" }}>
          {isAr
            ? "لا نطلب منك تصديق ما نقوله عن أنفسنا. افتح أي حاسبة ثم اقطع الإنترنت — ستعمل كما هي، لأن الحساب يجري في متصفّحك. وافتح أدوات المطوّر في متصفّحك وراقب الشبكة أثناء إدخال أرقامك: لن تجد طلباً واحداً يحمل ما كتبت."
            : "We would rather you not take our word for any of this. Open any calculator and disconnect from the internet — it keeps working, because the calculation runs in your browser. Open your browser's developer tools and watch the network while you type: you will not find a single request carrying what you entered."}
        </p>
        <p>
          {isAr
            ? "وكل رقم في هذا الموقع يجاوره مستنده: المعيار، والمذهب حيث تختلف المذاهب، وما لم يُراجَع بعد. فإن وجدت خطأً — في حساب أو في نقل مذهب أو في رابط — فأخبرنا به، فتصحيحه أنفع لنا من إخفائه."
            : "Every figure here carries its basis alongside it: the standard, the school of law where schools differ, and what has not yet been reviewed. If you find an error — in a calculation, in how a position is reported, or in a link — tell us. Correcting it serves us better than leaving it."}
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
