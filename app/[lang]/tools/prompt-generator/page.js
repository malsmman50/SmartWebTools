import { getDictionary } from "@/app/dictionaries";
import PromptGeneratorClient from "@/app/components/PromptGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي | أدوات الحساب الذكية" : "AI Prompt Builder & Generator | SmartCalcTools",
    description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs."
  };
}

export default async function PromptGeneratorPage({ params }) {
  return <PromptGeneratorClient  lang={lang} dict={dict} />;
}
