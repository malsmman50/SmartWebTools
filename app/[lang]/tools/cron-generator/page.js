import { getDictionary } from "@/app/dictionaries";
import CronGeneratorClient from "@/app/components/CronGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/cron-generator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/cron-generator`,
        "ar": `https://smartcalctools.xyz/ar/tools/cron-generator`,
      },
    },
    title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
    description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
    openGraph: {
      title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
      description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
      description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function CronGeneratorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <CronGeneratorClient lang={lang} dict={dict} />;
}
