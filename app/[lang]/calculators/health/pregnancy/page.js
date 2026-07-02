import { getDictionary } from "@/app/dictionaries";
import PregnancyCalculator from "@/app/components/PregnancyCalculator";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const title = isAr ? "حاسبة موعد الولادة وتتبع الحمل أسبوعياً | Pregnancy Due Date" : "Pregnancy Due Date & Weekly Tracker Calculator";
  const description = isAr 
    ? "احسبي موعد ولادتك بدقة، واعرفي في أي أسبوع أنتِ الآن مع تتبع حجم الجنين ونصائح أسبوعية طوال فترة الحمل." 
    : "Track your pregnancy journey: calculate your due date, current week, and your baby's weekly growth and size.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/health/pregnancy`,
      languages: {
        'en': 'https://smartcalctools.xyz/en/calculators/health/pregnancy',
        'ar': 'https://smartcalctools.xyz/ar/calculators/health/pregnancy',
      },
    },
    openGraph: { title, description, url: `https://smartcalctools.xyz/${lang}/calculators/health/pregnancy` }
  };
}

export default async function PregnancyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{dict.pregnancy.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.pregnancy.subtitle}
        </p>
      </div>

      <PregnancyCalculator lang={lang} dict={dict} />
    </div>
  );
}
