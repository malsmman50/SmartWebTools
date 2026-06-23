import { getDictionary } from "@/app/dictionaries";
import MudarabahCalculatorClient from "@/app/components/MudarabahCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
    description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
    openGraph: {
      title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
      description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
      description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function MudarabahCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <MudarabahCalculatorClient lang={lang} dict={dict} />;
}
