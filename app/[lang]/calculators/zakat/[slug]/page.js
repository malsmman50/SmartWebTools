import { getDictionary } from "@/app/dictionaries";
import ZakatCalculatorClient from "@/app/components/ZakatCalculatorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams: Pre-builds the pages at build time
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-zakat.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);

    // This returns an array of objects: { slug: "zakat-on-100-grams-of-21k-gold" }
    return combinations.map((c) => ({
      slug: `zakat-on-${c.grams}-grams-of-${c.karat}-gold`,
    }));
  } catch (err) {
    console.error("Error reading pseo-zakat.json", err);
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  // Parse the slug: e.g. "zakat-on-100-grams-of-21k-gold"
  const match = slug.match(/^zakat-on-(\d+)-grams-of-(24k|22k|21k|18k)-gold$/);
  if (!match) {
    return { title: "Zakat Calculator" };
  }

  const [_, grams, karat] = match;

  const title = isAr 
    ? `حساب زكاة ${grams} جرام من الذهب عيار ${karat} | حاسبة دقيقة`
    : `Calculate Zakat on ${grams} Grams of ${karat} Gold | SmartCalcTools`;

  const description = isAr
    ? `تعرف على مقدار الزكاة الواجبة في ${grams} جرام من ذهب عيار ${karat} بناءً على أسعار الذهب الحقيقية المحدثة اليوم.`
    : `Find out exactly how much Zakat you owe on ${grams} grams of ${karat} gold using today's live market prices.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function ZakatPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(/^zakat-on-(\d+)-grams-of-(24k|22k|21k|18k)-gold$/);
  let initialValues = null;

  if (match) {
    const [_, grams, karat] = match;
    initialValues = { gold: grams, karat };
  }

  return (
    <>
      <ZakatCalculatorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
