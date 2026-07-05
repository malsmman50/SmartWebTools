import { getDictionary } from "@/app/dictionaries";
import FuelCostCalculator from "@/app/components/FuelCostCalculator";

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  
  return {
    title: `${dict.fuel.title} | SmartCalcTools`,
    description: dict.fuel.desc,
    openGraph: {
      title: `${dict.fuel.title} | SmartCalcTools`,
      description: dict.fuel.desc,
      url: `https://smartcalctools.xyz/${params.lang}/calculators/lifestyle/fuel-cost`,
      type: "website",
    },
    alternates: {
      canonical: `https://smartcalctools.xyz/${params.lang}/calculators/lifestyle/fuel-cost`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/lifestyle/fuel-cost",
        "ar": "https://smartcalctools.xyz/ar/calculators/lifestyle/fuel-cost",
      },
    },
  };
}

export default async function FuelCostPage({ params }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="title">⛽ {dict.fuel.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.fuel.desc}
        </p>
      </div>
      
      <div className="calc-container" style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <FuelCostCalculator dict={dict} />
      </div>
    </div>
  );
}
