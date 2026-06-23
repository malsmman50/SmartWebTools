import CronGeneratorClient from "@/app/components/CronGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن | أدوات الحساب الذكية" : "Secure Cron Expression Generator & Explainer | SmartCalcTools",
    description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually."
  };
}

export default async function CronGeneratorPage() {
  return <CronGeneratorClient />;
}
