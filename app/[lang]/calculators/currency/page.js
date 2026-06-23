import { getDictionary } from "@/app/dictionaries";
import CurrencyConverterClient from "@/app/components/CurrencyConverterClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "محول أسعار العملات المباشر | أدوات الحساب الذكية" : "Live Currency Converter | SmartCalcTools",
    description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies."
  };
}

export default async function CurrencyConverterPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <CurrencyConverterClient lang={lang} dict={dict} />;
}
