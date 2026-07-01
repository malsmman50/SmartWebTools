import { getDictionary } from "@/app/dictionaries";
import JwtDecoderClient from "@/app/components/JwtDecoderClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/jwt-decoder`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/jwt-decoder`,
        "ar": `https://smartcalctools.xyz/ar/tools/jwt-decoder`,
      },
    },
    title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
    description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
    openGraph: {
      title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
      description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
      description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function JwtDecoderPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <JwtDecoderClient lang={lang} dict={dict} />;
}
