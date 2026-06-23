import { getDictionary } from "@/app/dictionaries";
import HijriConverterClient from "@/app/components/HijriConverterClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "محول التاريخ الهجري والميلادي الدقيق | أدوات الحساب الذكية" : "Hijri Date Converter (Umm al-Qura) | SmartCalcTools",
    description: isAr 
      ? "حول التواريخ فورياً وبدقة بالغة بين التقويم الهجري (أم القرى) والتقويم الميلادي CE دون اتصال بالإنترنت."
      : "Convert dates instantly and accurately between Gregorian and Hijri (Umm al-Qura) calendars entirely offline."
  };
}

export default async function HijriConverterPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <HijriConverterClient lang={lang} dict={dict} />;
}
