import { getDictionary } from "@/app/dictionaries";
import ZakatCalculatorClient from "@/app/components/ZakatCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة الزكاة الدقيقة | أدوات الحساب الذكية" : "Comprehensive Zakat Calculator | SmartCalcTools",
    description: isAr 
      ? "احسب زكاتك السنوية (2.5%) بدقة تامة وبخصوصية كاملة 100% وفقاً للضوابط الفقهية الشرعية ونصاب الذهب المباشر."
      : "Calculate your annual Zakat (2.5%) easily and accurately according to Sharia guidelines using live gold market prices."
  };
}

export default async function ZakatCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ZakatCalculatorClient lang={lang} dict={dict} />;
}
