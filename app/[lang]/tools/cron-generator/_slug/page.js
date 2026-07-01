import { getDictionary } from "@/app/dictionaries";
import CronGeneratorClient from "@/app/components/CronGeneratorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-cron.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `${c.slug}`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^([a-z0-9-]+)$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/cron-generator/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/cron-generator/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/cron-generator/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `توليد كود Cron لـ ${p1.replace(/-/g, " ")}` : `Cron Expression Generator for ${p1.replace(/-/g, " ")}`;
  const description = isAr ? `احصل على تعبير Cron الدقيق لجدولة المهام: ${p1.replace(/-/g, " ")}.` : `Generate the exact Cron expression to schedule tasks for: ${p1.replace(/-/g, " ")}.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/cron-generator/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/cron-generator/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/cron-generator/_slug`,
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

  const match = slug.match(/^([a-z0-9-]+)$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { preset: p1 };
  }

  return (
    <>
      <CronGeneratorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
