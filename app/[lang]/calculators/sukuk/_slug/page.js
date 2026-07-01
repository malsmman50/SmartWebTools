import { getDictionary } from "@/app/dictionaries";
import SukukCalculatorClient from "@/app/components/SukukCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-sukuk.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `sukuk-yield-for-${c.amount}-usd-at-${c.rate}-percent-over-${c.years}-years`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^sukuk-yield-for-(\d+)-usd-at-(\d+)-percent-over-(\d+)-years$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/sukuk/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/sukuk/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/sukuk/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `حاسبة عوائد الصكوك لمبلغ ${p1} دولار بعائد ${p2}% لمدة ${p3} سنوات` : `Sukuk Yield Calculator for ${p1} USD at ${p2}% over ${p3} years`;
  const description = isAr ? `احسب العوائد الدورية للصكوك الإسلامية لاستثمار ${p1} دولار بعائد ${p2}% لمدة ${p3} سنوات.` : `Calculate periodic returns on Islamic Sukuk for an investment of ${p1} USD at ${p2}% over ${p3} years.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/sukuk/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/sukuk/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/sukuk/_slug`,
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

  const match = slug.match(/^sukuk-yield-for-(\d+)-usd-at-(\d+)-percent-over-(\d+)-years$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { sukukAmount: p1, expectedYield: p2, maturityYears: p3 };
  }

  return (
    <>
      <SukukCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
