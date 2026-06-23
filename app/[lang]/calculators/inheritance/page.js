import { getDictionary } from "@/app/dictionaries";
import InheritanceCalculatorClient from "@/app/components/InheritanceCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
    description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
    openGraph: {
      title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
      description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
      description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function InheritanceCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <InheritanceCalculatorClient lang={lang} dict={dict} />;
}
