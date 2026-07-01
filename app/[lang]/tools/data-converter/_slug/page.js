import { getDictionary } from "@/app/dictionaries";
import DataConverterClient from "@/app/components/DataConverterClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-data-converter.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `convert-${c.from}-to-${c.to}`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^convert-([a-z]+)-to-([a-z]+)$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/data-converter/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/data-converter/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/data-converter/_slug`,
      },
    }, title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `محول من صيغة ${p1.toUpperCase()} إلى ${p2.toUpperCase()}` : `Convert ${p1.toUpperCase()} to ${p2.toUpperCase()} Online`;
  const description = isAr ? `أداة مجانية وسريعة لتحويل البيانات من صيغة ${p1.toUpperCase()} إلى ${p2.toUpperCase()} بأمان تام داخل المتصفح.` : `Free online tool to instantly convert ${p1.toUpperCase()} format to ${p2.toUpperCase()} securely in your browser.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/data-converter/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/data-converter/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/data-converter/_slug`,
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

  const match = slug.match(/^convert-([a-z]+)-to-([a-z]+)$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { fromFormat: p1, toFormat: p2 };
  }

  return (
    <>
      <DataConverterClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
