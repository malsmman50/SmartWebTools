import { getDictionary } from "@/app/dictionaries";
import MurabahaVsLoanClient from "@/app/components/MurabahaVsLoanClient";

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ar" }
  ];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/compare/murabaha-vs-conventional-loan`,
      languages: {
        "en": `https://smartcalctools.xyz/en/compare/murabaha-vs-conventional-loan`,
        "ar": `https://smartcalctools.xyz/ar/compare/murabaha-vs-conventional-loan`,
      },
    },
    title: isAr 
      ? "مقارنة المرابحة الإسلامية بالقروض التقليدية | حاسبة تفاعلية" 
      : "Islamic Murabaha vs Conventional Loans | Interactive Comparison",
    description: isAr 
      ? "قارن التكلفة والأقسام والفرق الشرعي والهيكلي بين تمويل المرابحة الإسلامية والقروض البنكية التقليدية القائمة على الفائدة."
      : "Compare the costs, installments, and structural Sharia differences between Islamic Murabaha financing and interest-based conventional bank loans.",
    openGraph: {
      title: isAr 
        ? "مقارنة المرابحة الإسلامية بالقروض التقليدية | حاسبة تفاعلية" 
        : "Islamic Murabaha vs Conventional Loans | Interactive Comparison",
      description: isAr 
        ? "قارن التكلفة والأقسام والفرق الشرعي والهيكلي بين تمويل المرابحة الإسلامية والقروض البنكية التقليدية القائمة على الفائدة."
        : "Compare the costs, installments, and structural Sharia differences between Islamic Murabaha financing and interest-based conventional bank loans.",
      images: ["/opengraph-image.png"]
    }
  };
}

export default async function MurabahaVsLoanPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <MurabahaVsLoanClient lang={lang} dict={dict} />;
}
