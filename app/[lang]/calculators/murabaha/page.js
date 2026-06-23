import { getDictionary } from "@/app/dictionaries";
import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
    description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
    openGraph: {
      title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
      description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
      description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function MurabahaCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <MurabahaCalculatorClient lang={lang} dict={dict} />;
}
