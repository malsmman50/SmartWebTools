import Link from "next/link";
import fs from "fs";
import path from "path";
import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const isAr = lang === "ar";
  
  return {
    title: isAr ? "المدونة | SmartCalcTools" : "Blog | SmartCalcTools",
    description: isAr ? "أحدث المقالات والشروحات حول أدوات المطورين والتمويل الإسلامي." : "Latest articles and tutorials on developer tools and Islamic finance.",
  };
}

export default async function BlogIndexPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const lang = resolvedParams.lang;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  // Read blog data from JSON
  const dataPath = path.join(process.cwd(), "lib", "blog-data.json");
  let posts = [];
  try {
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    posts = JSON.parse(fileContent);
    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error loading blog data:", error);
  }

  // Pagination Logic
  const ITEMS_PER_PAGE = 20;
  const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.5rem", color: "var(--primary)" }}>
        {isAr ? "مدونة الموقع" : "Our Blog"}
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {paginatedPosts.length === 0 ? (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--text-muted)" }}>
            {isAr ? "لا توجد مقالات في هذه الصفحة." : "No articles found on this page."}
          </p>
        ) : (
          paginatedPosts.map((post) => {
            const title = isAr ? post.titleAr : post.titleEn;
            const desc = isAr ? post.descAr : post.descEn;
            const dateStr = new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
              year: "numeric", month: "long", day: "numeric"
            });

            return (
              <Link 
                href={`/${lang}/blog/${post.slug}`} 
                key={post.slug}
                className="card"
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", color: "inherit", padding: "24px", transition: "transform 0.2s", borderRadius: "12px" }}
              >
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                  {dateStr}
                </div>
                <h2 style={{ fontSize: "1.4rem", margin: "0 0 12px 0", color: "var(--primary)" }}>
                  {title}
                </h2>
                <p style={{ margin: "0", color: "var(--text)", lineHeight: "1.6", flexGrow: 1 }}>
                  {desc}
                </p>
                <div style={{ marginTop: "20px", fontWeight: "bold", color: "var(--primary)" }}>
                  {isAr ? "اقرأ المزيد ←" : "Read more →"}
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          {currentPage > 1 ? (
            <Link href={`/${lang}/blog?page=${currentPage - 1}`} className="btn btn-secondary">
              {isAr ? "← الصفحة السابقة" : "← Previous"}
            </Link>
          ) : (
            <span className="btn btn-secondary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              {isAr ? "← الصفحة السابقة" : "← Previous"}
            </span>
          )}

          <div style={{ fontWeight: "bold", color: "var(--text-muted)", fontSize: "1.1rem" }}>
            {isAr ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </div>

          {currentPage < totalPages ? (
            <Link href={`/${lang}/blog?page=${currentPage + 1}`} className="btn btn-secondary">
              {isAr ? "الصفحة التالية →" : "Next →"}
            </Link>
          ) : (
            <span className="btn btn-secondary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              {isAr ? "الصفحة التالية →" : "Next →"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
