import { getDictionary } from "@/app/dictionaries";
import MudarabahCalculatorClient from "@/app/components/MudarabahCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-mudarabah.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `mudarabah-profit-for-${c.amount}-usd-at-${c.roi}-percent`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^mudarabah-profit-for-(\d+)-usd-at-(\d+)-percent$/);
  if (!match) {
    return { title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `حاسبة أرباح المضاربة لمبلغ ${p1} دولار بعائد ${p2}%` : `Mudarabah Profit Calculator for ${p1} USD at ${p2}% ROI`;
  const description = isAr ? `احسب توزيع أرباح المضاربة الإسلامية لمبلغ ${p1} دولار بعائد متوقع ${p2}%.` : `Calculate Mudarabah profit sharing for a ${p1} USD capital with ${p2}% expected ROI.`;

  return {
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

  const match = slug.match(/^mudarabah-profit-for-(\d+)-usd-at-(\d+)-percent$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { capital: p1, expectedRoi: p2 };
  }

  return (
    <>
      <MudarabahCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
