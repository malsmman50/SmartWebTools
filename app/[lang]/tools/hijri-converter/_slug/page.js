import { getDictionary } from "@/app/dictionaries";
import HijriConverterClient from "@/app/components/HijriConverterClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams: Pre-builds the top 100 pages at build time
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-hijri.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);

    // This returns an array of objects: { slug: "convert-1-ramadan-1445" }
    return combinations.map((c) => ({
      slug: `convert-${c.day}-${c.month}-${c.year}`,
    }));
  } catch (err) {
    console.error("Error reading pseo-hijri.json", err);
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  // Parse the slug: e.g. "convert-1-ramadan-1445"
  const match = slug.match(/^convert-(\d+)-([a-z-]+)-(\d+)$/);
  if (!match) {
    return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/hijri-converter/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/hijri-converter/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/hijri-converter/_slug`,
      },
    }, title: "Hijri Date Converter" };
  }

  const [_, day, month, year] = match;

  const monthArMap = {
    "muharram": "محرم", "safar": "صفر", "rabi-al-awwal": "ربيع الأول", "rabi-al-thani": "ربيع الآخر",
    "jumada-al-awwal": "جمادى الأولى", "jumada-al-thani": "جمادى الآخرة", "rajab": "رجب", "shaban": "شعبان",
    "ramadan": "رمضان", "shawwal": "شوال", "dhul-qadah": "ذو القعدة", "dhul-hijjah": "ذو الحجة"
  };

  const monthEnMap = {
    "muharram": "Muharram", "safar": "Safar", "rabi-al-awwal": "Rabi' I", "rabi-al-thani": "Rabi' II",
    "jumada-al-awwal": "Jumada I", "jumada-al-thani": "Jumada II", "rajab": "Rajab", "shaban": "Sha'ban",
    "ramadan": "Ramadan", "shawwal": "Shawwal", "dhul-qadah": "Dhu al-Qi'dah", "dhul-hijjah": "Dhu al-Hijjah"
  };

  const mName = isAr ? monthArMap[month] : monthEnMap[month];
  
  const title = isAr 
    ? `تحويل تاريخ ${day} ${mName} ${year} هجري إلى ميلادي | SmartCalcTools`
    : `Convert ${day} ${mName} ${year} Hijri to Gregorian Date | SmartCalcTools`;

  const description = isAr
    ? `اكتشف متى يوافق تاريخ ${day} ${mName} ${year} هجري بالتقويم الميلادي بدقة حسب تقويم أم القرى.`
    : `Find out the exact Gregorian equivalent for ${day} ${mName} ${year} AH. Offline and highly accurate conversion.`;

  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/hijri-converter/_slug`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/hijri-converter/_slug`,
        "ar": `https://smartcalctools.xyz/ar/tools/hijri-converter/_slug`,
      },
    },
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function HijriPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(/^convert-(\d+)-([a-z-]+)-(\d+)$/);
  let initialValues = null;

  if (match) {
    const [_, day, month, year] = match;
    const monthNames = [
      "muharram", "safar", "rabi-al-awwal", "rabi-al-thani",
      "jumada-al-awwal", "jumada-al-thani", "rajab", "shaban",
      "ramadan", "shawwal", "dhul-qadah", "dhul-hijjah"
    ];
    const monthIndex = monthNames.indexOf(month) + 1;
    
    if (monthIndex > 0) {
      initialValues = { day, month: monthIndex.toString(), year };
    }
  }

  return (
    <>
      <HijriConverterClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
