import { getDictionary } from "@/app/dictionaries";
import RamadanHydration from "@/app/components/RamadanHydration";

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  
  return {
    title: `${dict.ramadan.title} | SmartCalcTools`,
    description: dict.ramadan.desc,
    openGraph: {
      title: `${dict.ramadan.title} | SmartCalcTools`,
      description: dict.ramadan.desc,
      url: `https://smartcalctools.xyz/${params.lang}/calculators/health/ramadan-hydration`,
      type: "website",
    },
    alternates: {
      canonical: `https://smartcalctools.xyz/${params.lang}/calculators/health/ramadan-hydration`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/health/ramadan-hydration",
        "ar": "https://smartcalctools.xyz/ar/calculators/health/ramadan-hydration",
      },
    },
  };
}

export default async function RamadanHydrationPage({ params }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="title">🌙 {dict.ramadan.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.ramadan.desc}
        </p>
      </div>
      
      <div className="calc-container" style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <RamadanHydration dict={dict} lang={params.lang} />
      </div>
    </div>
  );
}
