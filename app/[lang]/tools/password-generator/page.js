import PasswordGeneratorClient from "@/app/components/PasswordGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً | أدوات الحساب الذكية" : "Secure Password Generator | SmartCalcTools",
    description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely."
  };
}

export default async function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
