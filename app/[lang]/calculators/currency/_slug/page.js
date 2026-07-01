import { getDictionary } from "@/app/dictionaries";
import CurrencyConverterClient from "@/app/components/CurrencyConverterClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams: Pre-builds the top 200 pages at build time
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-currency.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);

    // This returns an array of objects: { slug: "convert-100-usd-to-eur" }
    return combinations.map((c) => ({
      slug: `convert-${c.amount}-${c.from}-to-${c.to}`,
    }));
  } catch (err) {
    console.error("Error reading pseo-currency.json", err);
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  // Parse the slug: e.g. "convert-100-usd-to-eur"
  const match = slug.match(/^convert-(\d+)-([a-z]+)-to-([a-z]+)$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/currency/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/currency/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/currency/_slug`,
      },
    }, title: "Live Currency Converter" };
  }

  const [_, amount, from, to] = match;
  
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  const title = isAr 
    ? `تحويل ${amount} ${fromUpper} إلى ${toUpper} | أسعار الصرف المباشرة`
    : `Convert ${amount} ${fromUpper} to ${toUpper} | Live Exchange Rates`;

  const description = isAr
    ? `احسب بدقة كم يساوي ${amount} ${fromUpper} مقابل ${toUpper} بناءً على أسعار الصرف الحية اليوم.`
    : `Calculate exactly how much ${amount} ${fromUpper} is in ${toUpper} using today's live exchange rates.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/currency/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/currency/_slug`,
        "ar": `https://smartcalctools.xyz/ar/calculators/currency/_slug`,
      },
    },
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function CurrencyPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(/^convert-(\d+)-([a-z]+)-to-([a-z]+)$/);
  let initialValues = null;

  if (match) {
    const [_, amount, from, to] = match;
    initialValues = { amount, from, to };
  }

  return (
    <>
      <CurrencyConverterClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
