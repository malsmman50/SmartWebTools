import { getDictionary } from "@/app/dictionaries";
import ImageCompressorClient from "@/app/components/ImageCompressorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "أداة ضغط الصور المحلية الآمنة | أدوات الحساب الذكية" : "Secure Local Image Compressor | SmartCalcTools",
    description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads."
  };
}

export default async function ImageCompressorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ImageCompressorClient lang={lang} dict={dict} />;
}
