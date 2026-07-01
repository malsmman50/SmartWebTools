import { getDictionary } from "@/app/dictionaries";
import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/murabaha`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/murabaha`,
        "ar": `https://smartcalctools.xyz/ar/calculators/murabaha`,
      },
    },
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
