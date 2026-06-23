import { getDictionary } from "@/app/dictionaries";
import JsonFormatterClient from "@/app/components/JsonFormatterClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال | أدوات الحساب الذكية" : "Secure Offline JSON Formatter & Validator | SmartCalcTools",
    description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely."
  };
}

export default async function JsonFormatterPage({ params }) {
  return <JsonFormatterClient  lang={lang} dict={dict} />;
}
