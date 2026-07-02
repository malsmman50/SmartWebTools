import { getDictionary } from "@/app/dictionaries";
import ShoeSizeConverter from "@/app/components/ShoeSizeConverter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static routes at build time!
export async function generateStaticParams() {
  const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
  let pseoLinks = [];
  try {
    const fileContent = fs.readFileSync(pseoPath, "utf-8");
    pseoLinks = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading PSEO shoe sizes:", error);
  }

  const params = [];
  pseoLinks.forEach((link) => {
    params.push({ lang: "en", slug: link.slug });
    params.push({ lang: "ar", slug: link.slug });
  });

  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";
  
  const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
  const fileContent = fs.readFileSync(pseoPath, "utf-8");
  const pseoLinks = JSON.parse(fileContent);
  
  const pageData = pseoLinks.find(p => p.slug === slug);
  if (!pageData) return {};

  const genderStr = pageData.gender === "men" ? (isAr ? "للرجال" : "Men's") : (isAr ? "للنساء" : "Women's");

  return {
    title: isAr 
      ? `تحويل مقاس ${pageData.fromSize} ${pageData.from} إلى ${pageData.to} ${genderStr} | حاسبة الأحذية` 
      : `Convert Size ${pageData.fromSize} ${pageData.from} to ${pageData.to} ${genderStr} | Shoe Size`,
    description: isAr 
      ? `تعرف على ما يعادله مقاس ${pageData.fromSize} بنظام ${pageData.from} في نظام ${pageData.to} ${genderStr}. تحويل فوري ودقيق لمقاسات الأحذية.`
      : `Find out what size ${pageData.fromSize} in ${pageData.from} equals in ${pageData.to} ${genderStr}. Instant and accurate shoe size conversion.`,
  };
}

export default async function PseoShoeSizePage({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  
  const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
  const fileContent = fs.readFileSync(pseoPath, "utf-8");
  const pseoLinks = JSON.parse(fileContent);
  
  const pageData = pseoLinks.find(p => p.slug === slug);
  if (!pageData) {
    notFound();
  }

  const genderStr = pageData.gender === "men" ? (isAr ? "للرجال" : "Men's") : (isAr ? "للنساء" : "Women's");
  const title = isAr 
    ? `تحويل مقاس ${pageData.fromSize} ${pageData.from} إلى ${pageData.to} (${genderStr})`
    : `Convert Size ${pageData.fromSize} ${pageData.from} to ${pageData.to} (${genderStr})`;

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <Link href={`/${lang}/calculators/everyday/shoe-size`} style={{ display: "inline-block", marginBottom: "20px", color: "var(--primary)", textDecoration: "none" }}>
        {isAr ? "← العودة لجميع المقاسات" : "← Back to all sizes"}
      </Link>

      <h1 style={{ textAlign: "center", marginBottom: "16px", color: "var(--primary)", fontSize: "2rem" }}>
        {title}
      </h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto", fontSize: "1.1rem", lineHeight: "1.6" }}>
        {isAr 
          ? `استخدم الحاسبة أدناه للتحويل المباشر من ${pageData.from} إلى ${pageData.to} ${genderStr}. تم تعيين القيم تلقائياً لك بناءً على بحثك.`
          : `Use the calculator below to instantly convert from ${pageData.from} to ${pageData.to} ${genderStr}. We've pre-filled the values based on your search.`}
      </p>

      {/* Pre-filled Component! */}
      <ShoeSizeConverter 
        isAr={isAr} 
        prefill={{
          gender: pageData.gender,
          from: pageData.from,
          to: pageData.to,
          fromSize: pageData.fromSize
        }}
      />

      <div className="card" style={{ marginTop: "40px", padding: "32px", lineHeight: "1.8" }}>
        <h2>{isAr ? "جدول تحويل المقاسات المقارب" : "Approximate Conversion Table"}</h2>
        <p>
          {isAr 
            ? "النتيجة الظاهرة في الأعلى هي التحويل الأكثر دقة استناداً إلى المعايير العالمية لصناعة الأحذية. ومع ذلك، قد تختلف المقاسات قليلاً بين العلامات التجارية المختلفة (مثل نايكي مقابل أديداس). ننصح دائماً بقياس طول قدمك بالسنتيمتر (CM) للحصول على القياس المثالي."
            : "The result shown above is the most accurate conversion based on international footwear standards. However, sizing can vary slightly between different brands (e.g., Nike vs. Adidas). We always recommend measuring your foot length in Centimeters (CM) for the perfect fit."}
        </p>
      </div>
    </div>
  );
}
