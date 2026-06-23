import { getDictionary } from "@/app/dictionaries";
import SukukCalculatorClient from "@/app/components/SukukCalculatorClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.sukuk.title} | SmartCalcTools`,
    description: dict.sukuk.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/sukuk`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/sukuk",
        "ar": "https://smartcalctools.xyz/ar/calculators/sukuk",
      },
    },
  };
}

export default async function SukukPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return <SukukCalculatorClient dict={dict} lang={lang} />;
}
