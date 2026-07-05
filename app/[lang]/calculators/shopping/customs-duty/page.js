import { getDictionary } from "@/app/dictionaries";
import CustomsDutyCalculator from "@/app/components/CustomsDutyCalculator";

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  
  return {
    title: `${dict.customs.title} | SmartCalcTools`,
    description: dict.customs.desc,
    openGraph: {
      title: `${dict.customs.title} | SmartCalcTools`,
      description: dict.customs.desc,
      url: `https://smartcalctools.xyz/${params.lang}/calculators/shopping/customs-duty`,
      type: "website",
    },
    alternates: {
      canonical: `https://smartcalctools.xyz/${params.lang}/calculators/shopping/customs-duty`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/shopping/customs-duty",
        "ar": "https://smartcalctools.xyz/ar/calculators/shopping/customs-duty",
      },
    },
  };
}

export default async function CustomsDutyPage({ params }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="title">{dict.customs.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.customs.desc}
        </p>
      </div>
      
      <div className="calc-container" style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <CustomsDutyCalculator dict={dict} />
      </div>
    </div>
  );
}
