import { getDictionary } from "@/app/dictionaries";
import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-murabaha.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `murabaha-for-${c.amount}-usd-over-${c.years}-years`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^murabaha-for-(\d+)-usd-over-(\d+)-years$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/murabaha/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/murabaha/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/murabaha/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `حاسبة المرابحة لتمويل ${p1} دولار على ${p2} سنوات` : `Murabaha Calculator for ${p1} USD over ${p2} years`;
  const description = isAr ? `احسب أقساط وأرباح تمويل المرابحة الإسلامي لمبلغ ${p1} دولار على فترة ${p2} سنوات بدقة.` : `Calculate Islamic Murabaha financing for ${p1} USD over ${p2} years.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/murabaha/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/murabaha/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/murabaha/_slug`,
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

  const match = slug.match(/^murabaha-for-(\d+)-usd-over-(\d+)-years$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { principal: p1, years: p2 };
  }

  return (
    <>
      <MurabahaCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
