import { getDictionary } from "@/app/dictionaries";
import QiblaCompassClient from "@/app/components/QiblaCompassClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-qibla.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `qibla-direction-from-${c.city}`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^qibla-direction-from-([a-z-]+)$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/qibla-compass/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/qibla-compass/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/qibla-compass/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `اتجاه القبلة الدقيق من مدينة ${p1.replace(/-/g, " ")}` : `Accurate Qibla Direction from ${p1.replace(/-/g, " ")}`;
  const description = isAr ? `حدد اتجاه القبلة للصلاة بدقة عالية من مدينة ${p1.replace(/-/g, " ")} باستخدام البوصلة الذكية.` : `Find the exact Qibla direction for prayer from ${p1.replace(/-/g, " ")} using our smart compass.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/qibla-compass/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/qibla-compass/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/qibla-compass/_slug`,
      },
    },
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function DynamicPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(/^qibla-direction-from-([a-z-]+)$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { city: p1 };
  }

  return (
    <>
      <QiblaCompassClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
