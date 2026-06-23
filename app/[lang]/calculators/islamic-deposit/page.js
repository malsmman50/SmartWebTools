import { getDictionary } from "@/app/dictionaries";
import IslamicDepositCalculatorClient from "@/app/components/IslamicDepositCalculatorClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.islamic_deposit.title} | SmartCalcTools`,
    description: dict.islamic_deposit.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/islamic-deposit`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/islamic-deposit",
        "ar": "https://smartcalctools.xyz/ar/calculators/islamic-deposit",
      },
    },
  };
}

export default async function IslamicDepositPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return <IslamicDepositCalculatorClient dict={dict} lang={lang} />;
}
