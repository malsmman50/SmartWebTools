import { getDictionary } from "@/app/dictionaries";
import PasswordGeneratorClient from "@/app/components/PasswordGeneratorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
    description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
    openGraph: {
      title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
      description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
      description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function PasswordGeneratorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <PasswordGeneratorClient lang={lang} dict={dict} />;
}
