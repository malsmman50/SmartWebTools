import { getDictionary } from "@/app/dictionaries";
import SplitBillCalculator from "@/app/components/SplitBillCalculator";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const title = isAr ? "حاسبة تقسيم الفاتورة والإكرامية | Split the Bill Calculator" : "Split the Bill Calculator | Fairly divide restaurant bills and tips";
  const description = isAr 
    ? "قسم فواتير المطاعم والمقاهي بسرعة وعدل مع أصدقائك. احسب الإكرامية (Tip) والمبلغ المطلوب من كل شخص بدقة عالية وبدون إنترنت." 
    : "Quickly and fairly split restaurant bills among friends. Calculate tips, service charges, and exactly how much each person owes offline.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/everyday/split-bill`,
      languages: {
        'en': 'https://smartcalctools.xyz/en/calculators/everyday/split-bill',
        'ar': 'https://smartcalctools.xyz/ar/calculators/everyday/split-bill',
      },
    },
    openGraph: { title, description, url: `https://smartcalctools.xyz/${lang}/calculators/everyday/split-bill` }
  };
}

export default async function SplitBillPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{dict.split_bill.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.split_bill.subtitle}
        </p>
      </div>

      <SplitBillCalculator lang={lang} dict={dict} />
    </div>
  );
}
