"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ExploreTools({ lang, dict }) {
  const currentPath = usePathname();
  const localizePath = (path) => `/${lang}${path}`;
  const [selectedTools, setSelectedTools] = useState([]);

  // Array of all major tools for cross-linking (translated dynamically)
  const ALL_TOOLS = [
    { title: dict.calculators.zakat_title, href: "/calculators/zakat", icon: "🤲" },
    { title: dict.calculators.inheritance_title, href: "/calculators/inheritance", icon: "⚖️" },
    { title: dict.calculators.murabaha_title, href: "/calculators/murabaha", icon: "🤝" },
    { title: dict.utilities.hijri_title, href: "/tools/hijri-converter", icon: "📅" },
    { title: dict.utilities.currency_title, href: "/calculators/currency", icon: "💱" },
    { title: dict.utilities.compressor_title, href: "/tools/image-compressor", icon: "🖼️" },
    { title: dict.dev_tools.json_title, href: "/tools/json-formatter", icon: "{ }" },
    { title: dict.utilities.chatpdf_title, href: "/tools/chatpdf", icon: "📄" }
  ];

  useEffect(() => {
    // Filter out the current tool to prevent linking to itself
    const availableTools = ALL_TOOLS.filter(
      (t) => localizePath(t.href) !== currentPath && t.href !== currentPath
    );
    
    // Randomly select 3 tools
    const shuffled = [...availableTools].sort(() => 0.5 - Math.random());
    setSelectedTools(shuffled.slice(0, 3));
  }, [currentPath]);

  // Server renders null, client mounts and loads tools. This prevents any hydration mismatch.
  if (selectedTools.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
          {lang === "ar" ? "🔥 اكتشف المزيد من الأدوات المجانية" : "🔥 Discover More Free Tools"}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          {lang === "ar" 
            ? "استكشف حاسباتنا الأخرى المصممة للخصوصية التامة وأدوات المطورين المتنوعة." 
            : "Explore our other privacy-first calculators and developer utilities."}
        </p>
      </div>
      
      <div className="grid-3">
        {selectedTools.map(t => (
          <Link key={t.href} href={localizePath(t.href)} className="card card-link" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{t.icon}</div>
            <h4 style={{ fontSize: "1.05rem", color: "var(--text)" }}>{t.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
