import { getDictionary } from "@/app/dictionaries";
import ShoeSizeConverter from "@/app/components/ShoeSizeConverter";
import fs from "fs";
import path from "path";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  
  return {
    title: isAr ? "محول مقاسات الأحذية العالمي | SmartCalcTools" : "Global Shoe Size Converter | SmartCalcTools",
    description: isAr ? "حول مقاسات الأحذية بين الأوروبي والأمريكي والبريطاني." : "Convert shoe sizes instantly between US, UK, EU, and CM.",
  };
}

export default async function ShoeSizePage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  
  // Read PSEO links
  const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
  let pseoLinks = [];
  try {
    const fileContent = fs.readFileSync(pseoPath, "utf-8");
    pseoLinks = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading PSEO shoe sizes:", error);
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "16px", color: "var(--primary)" }}>
        {dict.everyday?.shoe_size_title || "Global Shoe Size Converter"}
      </h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto" }}>
        {dict.everyday?.shoe_size_desc || "Convert shoe sizes instantly between US, UK, EU, and CM."}
      </p>

      <ShoeSizeConverter isAr={isAr} />

      {/* SEO Content */}
      <div className="card" style={{ marginTop: "40px", padding: "32px", lineHeight: "1.8" }}>
        <h2>{isAr ? "كيفية التحويل الصحيح لمقاس الحذاء" : "How to Convert Shoe Sizes Accurately"}</h2>
        <p>
          {isAr 
            ? "مقاسات الأحذية تختلف بشكل كبير حول العالم. النظام الأوروبي (EU) هو الأكثر شيوعاً في العالم العربي، بينما تعتمد الماركات العالمية على النظام الأمريكي (US) أو البريطاني (UK). يمكنك استخدام حاسبتنا للتحويل الفوري، ولكن تذكر دائماً أن القياس بالسنتيمتر (CM) هو أدق طريقة لمعرفة مقاسك الحقيقي مهما اختلفت العلامة التجارية."
            : "Shoe sizes vary significantly around the world. The EU system is widely used globally, while many top brands rely on US or UK sizing. Use our calculator for instant conversions, but always remember that measuring in Centimeters (CM) is the most accurate way to find your true fit across any brand."}
        </p>
      </div>

      {/* PSEO Internal Links */}
      {pseoLinks.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "1.4rem" }}>
            {isAr ? "تحويلات شائعة (الأكثر بحثاً)" : "Popular Conversions"}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {pseoLinks.map((link) => (
              <Link 
                key={link.slug} 
                href={`/${lang}/calculators/everyday/shoe-size/${link.slug}`}
                className="btn btn-secondary"
                style={{ fontSize: "0.9rem" }}
              >
                {isAr 
                  ? `تحويل مقاس ${link.fromSize} ${link.from} إلى ${link.to} (${link.gender === "men" ? "رجال" : "نساء"})`
                  : `Convert Size ${link.fromSize} ${link.from} to ${link.to} (${link.gender === "men" ? "Men" : "Women"})`}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
