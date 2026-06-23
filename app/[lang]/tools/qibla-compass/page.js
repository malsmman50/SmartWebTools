import { getDictionary } from "@/app/dictionaries";
import QiblaCompassClient from "@/app/components/QiblaCompassClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
    description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
    openGraph: {
      title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
      description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
      description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function QiblaCompassPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <QiblaCompassClient lang={lang} dict={dict} />;
}
