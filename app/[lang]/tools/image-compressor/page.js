import { getDictionary } from "@/app/dictionaries";
import ImageCompressorClient from "@/app/components/ImageCompressorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/image-compressor`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/image-compressor`,
        "ar": `https://smartcalctools.xyz/ar/tools/image-compressor`,
      },
    },
    title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
    description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
    openGraph: {
      title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
      description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
      description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function ImageCompressorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ImageCompressorClient lang={lang} dict={dict} />;
}
