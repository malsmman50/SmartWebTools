import { notFound } from "next/navigation";
import { getAllSeoArticles, getSeoArticle } from "@/lib/seo-generator";
import Link from "next/link";
import { getDictionary } from "@/app/dictionaries";

// Generate static params for SSG
export async function generateStaticParams() {
  const articles = getAllSeoArticles();
  const params = [];
  
  for (const article of articles) {
    params.push({ lang: "en", slug: article.slug });
    params.push({ lang: "ar", slug: article.slug });
  }
  
  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug;
  const isAr = lang === "ar";
  
  const article = getSeoArticle(slug);
  if (!article) return { title: "Not Found" };

  const title = isAr ? article.titleAr : article.titleEn;
  const description = isAr ? article.descAr : article.descEn;

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/articles/${slug}`,
      languages: {
        "en": `https://smartcalctools.xyz/en/articles/${slug}`,
        "ar": `https://smartcalctools.xyz/ar/articles/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title,
      description,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function SeoArticlePage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  const article = getSeoArticle(slug);

  if (!article) {
    notFound();
  }

  const title = isAr ? article.titleAr : article.titleEn;
  const content = isAr ? article.contentAr : article.contentEn;
  const toolName = isAr ? article.toolNameAr : article.toolNameEn;
  const toolLink = `/${lang}${article.toolLink}`;

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <article className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "16px", color: "var(--primary)", lineHeight: "1.4" }}>
          {title}
        </h1>
        
        <div style={{ padding: "20px", background: "var(--surface-sunken)", borderRadius: "8px", marginBottom: "32px", borderLeft: isAr ? "none" : "4px solid var(--primary)", borderRight: isAr ? "4px solid var(--primary)" : "none" }}>
          <p style={{ margin: "0 0 16px 0", fontSize: "1.1rem" }}>
            {isAr ? "هل تبحث عن الأداة مباشرة؟" : "Looking for the tool directly?"}
          </p>
          <Link href={toolLink} style={{ display: "inline-block", background: "var(--primary)", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
            {isAr ? "انتقل إلى " : "Go to "} {toolName}
          </Link>
        </div>

        <div 
          style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "var(--text)" }}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
        <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <Link href={toolLink} style={{ color: "var(--primary)", fontWeight: "bold", textDecoration: "underline", fontSize: "1.2rem" }}>
            {isAr ? `استخدم ${toolName} الآن مجاناً` : `Use ${toolName} now for free`}
          </Link>
        </div>
      </article>
      
      {/* JSON-LD Schema for Article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://smartcalctools.xyz/${lang}/articles/${slug}`
        },
        "headline": title,
        "image": [
          "https://smartcalctools.xyz/opengraph-image.png"
        ],
        "datePublished": article.date ? `${article.date}T08:00:00+03:00` : "2026-06-01T08:00:00+03:00",
        "dateModified": article.date ? `${article.date}T08:00:00+03:00` : "2026-06-01T08:00:00+03:00",
        "author": {
          "@type": "Organization",
          "name": "SmartCalcTools",
          "url": "https://smartcalctools.xyz"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SmartCalcTools",
          "logo": {
            "@type": "ImageObject",
            "url": "https://smartcalctools.xyz/icon.png"
          }
        },
        "inLanguage": lang === "ar" ? "ar" : "en"
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
