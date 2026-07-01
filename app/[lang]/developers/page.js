import { getDictionary } from "@/app/dictionaries";
import DeveloperDocsClient from "@/app/components/DeveloperDocsClient";

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
      canonical: `https://smartcalctools.xyz/${lang}/developers`,
      languages: {
        "en": `https://smartcalctools.xyz/en/developers`,
        "ar": `https://smartcalctools.xyz/ar/developers`,
      },
    },
    title: isAr 
      ? "بوابة المطورين والـ API | حاسبات إسلامية مجانية" 
      : "Developer API & Documentation | Free Islamic Calculators",
    description: isAr 
      ? "توثيق واجهة برمجة التطبيقات (API) لحسابات الزكاة والمرابحة والصكوك. أكواد جاهزة وتجربة مباشرة."
      : "API documentation for Zakat, Murabaha, and Sukuk calculations. Ready-to-use code snippets and live console testing.",
    openGraph: {
      title: isAr 
        ? "بوابة المطورين والـ API | حاسبات إسلامية مجانية" 
        : "Developer API & Documentation | Free Islamic Calculators",
      description: isAr 
        ? "توثيق واجهة برمجة التطبيقات (API) لحسابات الزكاة والمرابحة والصكوك. أكواد جاهزة وتجربة مباشرة."
        : "API documentation for Zakat, Murabaha, and Sukuk calculations. Ready-to-use code snippets and live console testing.",
      images: ["/opengraph-image.png"]
    }
  };
}

export default async function DeveloperDocsPage({ params }) {
  const { lang } = await params;
  return <DeveloperDocsClient lang={lang} />;
}
