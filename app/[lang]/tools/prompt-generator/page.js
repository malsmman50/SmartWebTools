import { getDictionary } from "@/app/dictionaries";
import PromptGeneratorClient from "@/app/components/PromptGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/prompt-generator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/prompt-generator`,
        "ar": `https://smartcalctools.xyz/ar/tools/prompt-generator`,
      },
    },
    title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
    description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
    openGraph: {
      title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
      description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مهندس ومولد أوامر الذكاء الاصطناعي" : "AI Prompt Builder & Generator",
      description: isAr 
      ? "صمم وهندس الأوامر البرمجية المثالية بدقة لـ ChatGPT و Claude و Gemini للحصول على أفضل النتائج بأقل مجهود."
      : "Structure, optimize, and engineer rich prompts for ChatGPT, Claude, Gemini, and other LLMs.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function PromptGeneratorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <PromptGeneratorClient lang={lang} dict={dict} />;
}
