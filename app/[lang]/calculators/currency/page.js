import { getDictionary } from "@/app/dictionaries";
import CurrencyConverterClient from "@/app/components/CurrencyConverterClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/currency`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/currency`,
        "ar": `https://smartcalctools.xyz/ar/calculators/currency`,
      },
    },
    title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
    description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
    openGraph: {
      title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
      description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
      description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function CurrencyConverterPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <CurrencyConverterClient lang={lang} dict={dict} />;
}
