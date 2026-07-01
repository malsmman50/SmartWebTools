import { getDictionary } from "@/app/dictionaries";
import ZakatEmbedClient from "@/app/components/ZakatEmbedClient";

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
    title: isAr ? "تضمين حاسبة الزكاة" : "Embed Zakat Calculator",
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function ZakatEmbedPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ZakatEmbedClient lang={lang} dict={dict} />;
}
