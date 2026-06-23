import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة المرابحة الإسلامية | أدوات الحساب الذكية" : "Murabaha Calculator (Islamic Financing) | SmartCalcTools",
    description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans."
  };
}

export default async function MurabahaCalculatorPage() {
  return <MurabahaCalculatorClient />;
}
