import { getDictionary } from "@/app/dictionaries";
import InheritanceCalculatorClient from "@/app/components/InheritanceCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة المواريث والتركات الشرعية | أدوات الحساب الذكية" : "Islamic Inheritance Calculator (Mawarith) | SmartCalcTools",
    description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines."
  };
}

export default async function InheritanceCalculatorPage({ params }) {
  return <InheritanceCalculatorClient  lang={lang} dict={dict} />;
}
