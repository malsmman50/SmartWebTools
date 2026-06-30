import { getDictionary } from "@/app/dictionaries";
import IslamicDepositCalculatorClient from "@/app/components/IslamicDepositCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-islamic-deposit.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `islamic-deposit-for-${c.amount}-usd-over-${c.months}-months`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^islamic-deposit-for-(\d+)-usd-over-(\d+)-months$/);
  if (!match) {
    return { title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `حاسبة الوديعة الإسلامية لمبلغ ${p1} دولار لمدة ${p2} شهراً` : `Islamic Deposit Calculator for ${p1} USD over ${p2} months`;
  const description = isAr ? `احسب أرباح الوديعة الاستثمارية الإسلامية لمبلغ ${p1} دولار على فترة ${p2} شهراً.` : `Calculate returns on an Islamic Bank Deposit of ${p1} USD over a period of ${p2} months.`;

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

  const match = slug.match(/^islamic-deposit-for-(\d+)-usd-over-(\d+)-months$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { depositAmount: p1, durationMonths: p2 };
  }

  return (
    <>
      <IslamicDepositCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
