import { getDictionary } from "@/app/dictionaries";
import JwtDecoderClient from "@/app/components/JwtDecoderClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال | أدوات الحساب الذكية" : "Secure Offline JWT Decoder | SmartCalcTools",
    description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser."
  };
}

export default async function JwtDecoderPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <JwtDecoderClient lang={lang} dict={dict} />;
}
