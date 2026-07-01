import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";

import { cache } from "react";

// Read the blog data
const getBlogData = cache(() => {
  try {
    const dataPath = path.join(process.cwd(), "lib", "blog-data.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blog data:", error);
    return [];
  }
});

export async function generateStaticParams() {
  const posts = getBlogData();
  const params = [];
  
  for (const post of posts) {
    params.push({ lang: "en", slug: post.slug });
    params.push({ lang: "ar", slug: post.slug });
  }
  
  return params;
}

// dynamicParams = true is default, meaning paths not generated at build time will be generated on demand.
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug;
  const isAr = lang === "ar";
  
  const posts = getBlogData();
  const post = posts.find(p => p.slug === slug);
  if (!post) return { title: "Not Found" };

  const title = isAr ? post.titleAr : post.titleEn;
  const description = isAr ? post.descAr : post.descEn;

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/blog/${slug}`,
      languages: {
        "en": `https://smartcalctools.xyz/en/blog/${slug}`,
        "ar": `https://smartcalctools.xyz/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title,
      description,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug;
  const isAr = lang === "ar";

  const posts = getBlogData();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = isAr ? post.titleAr : post.titleEn;
  const content = isAr ? post.contentAr : post.contentEn;
  const dateStr = new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <article className="card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 30px" }}>
        
        <Link 
          href={`/${lang}/blog`}
          style={{ display: "inline-block", marginBottom: "20px", color: "var(--text-muted)", textDecoration: "none" }}
        >
          {isAr ? "← العودة للمدونة" : "← Back to Blog"}
        </Link>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "var(--primary)", lineHeight: "1.4" }}>
          {title}
        </h1>
        
        <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "40px", borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
          {dateStr}
        </div>

        <div 
          className="blog-content"
          style={{ lineHeight: "1.9", fontSize: "1.15rem", color: "var(--text)" }}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
      </article>
      
      {/* JSON-LD Schema for Blog Post */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://smartcalctools.xyz/${lang}/blog/${slug}`
        },
        "headline": title,
        "image": [
          "https://smartcalctools.xyz/opengraph-image.png"
        ],
        "datePublished": `${post.date}T08:00:00+03:00`,
        "dateModified": `${post.date}T08:00:00+03:00`,
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
