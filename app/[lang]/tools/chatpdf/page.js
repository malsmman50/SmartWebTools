import { getDictionary } from "@/app/dictionaries";
import ChatPdfClient from "@/app/components/ChatPdfClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "البحث الذكي والمحادثة الآمنة مع الـ PDF محلياً | أدوات الحساب الذكية" : "Secure Local Semantic PDF Chat & Search | SmartCalcTools",
    description: isAr 
      ? "تفاعل وابحث في مستندات الـ PDF الخاصة بك بشكل آمن وسري تماماً 100% داخل متصفحك باستخدام الذكاء الاصطناعي المحلي."
      : "Chat directly with your PDF documents securely in your browser using secure on-device AI embeddings."
  };
}

export default async function ChatPdfPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ChatPdfClient lang={lang} dict={dict} />;
}
