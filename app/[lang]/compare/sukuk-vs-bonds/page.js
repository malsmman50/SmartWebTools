import { getDictionary } from "@/app/dictionaries";
import SukukVsBondsClient from "@/app/components/SukukVsBondsClient";

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
      canonical: `https://smartcalctools.xyz/${lang}/compare/sukuk-vs-bonds`,
      languages: {
        "en": `https://smartcalctools.xyz/en/compare/sukuk-vs-bonds`,
        "ar": `https://smartcalctools.xyz/ar/compare/sukuk-vs-bonds`,
      },
    },
    title: isAr 
      ? "مقارنة الصكوك الإسلامية بالسندات التقليدية | حاسبة تفاعلية" 
      : "Islamic Sukuk vs Conventional Bonds | Interactive Comparison",
    description: isAr 
      ? "قارن الفروق الهيكلية والشرعية والمالية بين الصكوك الاستثمارية الإسلامية والسندات الحكومية أو الشركات التقليدية بفائدة."
      : "Compare the structural, Sharia, and financial differences between Islamic investment Sukuk and conventional corporate or government bonds.",
    openGraph: {
      title: isAr 
        ? "مقارنة الصكوك الإسلامية بالسندات التقليدية | حاسبة تفاعلية" 
        : "Islamic Sukuk vs Conventional Bonds | Interactive Comparison",
      description: isAr 
        ? "قارن الفروق الهيكلية والشرعية والمالية بين الصكوك الاستثمارية الإسلامية والسندات الحكومية أو الشركات التقليدية بفائدة."
        : "Compare the structural, Sharia, and financial differences between Islamic investment Sukuk and conventional corporate or government bonds.",
      images: ["/opengraph-image.png"]
    }
  };
}

export default async function SukukVsBondsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <SukukVsBondsClient lang={lang} dict={dict} />;
}
