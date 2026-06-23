import { getDictionary } from "@/app/dictionaries";
import JsonFormatterClient from "@/app/components/JsonFormatterClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
    description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
    openGraph: {
      title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
      description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
      description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function JsonFormatterPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <JsonFormatterClient lang={lang} dict={dict} />;
}
