import { getDictionary } from "@/app/dictionaries";
import RoiCalculatorClient from "@/app/components/RoiCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-roi.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `roi-for-${c.amount}-usd-with-${c.returnAmt}-usd-profit`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^roi-for-(\d+)-usd-with-(\d+)-usd-profit$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/roi/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/roi/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/roi/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `حاسبة العائد على الاستثمار لمبلغ ${p1} دولار مع ربح ${p2} دولار` : `ROI Calculator for ${p1} USD investment with ${p2} USD profit`;
  const description = isAr ? `احسب النسبة المئوية للعائد على الاستثمار (ROI) لاستثمار ${p1} دولار بربح ${p2} دولار.` : `Calculate the Return on Investment (ROI) percentage for a ${p1} USD investment yielding ${p2} USD profit.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/roi/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/roi/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/roi/_slug`,
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

  const match = slug.match(/^roi-for-(\d+)-usd-with-(\d+)-usd-profit$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { investment: p1, returnAmt: p2 };
  }

  return (
    <>
      <RoiCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
