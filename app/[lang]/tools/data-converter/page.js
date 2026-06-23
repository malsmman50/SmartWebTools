import { getDictionary } from "@/app/dictionaries";
import DataConverterClient from "@/app/components/DataConverterClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.data_converter.title} | SmartCalcTools`,
    description: dict.data_converter.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/data-converter`,
      languages: {
        "en": "https://smartcalctools.xyz/en/tools/data-converter",
        "ar": "https://smartcalctools.xyz/ar/tools/data-converter",
      },
    },
  };
}

export default async function DataConverterPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return <DataConverterClient dict={dict} lang={lang} />;
}
