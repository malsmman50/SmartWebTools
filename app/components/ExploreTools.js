"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ExploreTools({ lang, dict }) {
  const currentPath = usePathname();
  const localizePath = (path) => `/${lang}${path}`;
  const [selectedTools, setSelectedTools] = useState([]);

  // Core tools only. Developer utilities, shopping and general health
  // calculators left the site under the scope rule (.claude/RULES.md, Bab 1).
  const ALL_TOOLS = [
    { title: dict.calculators.zakat_title, href: "/calculators/zakat" },
    { title: dict.calculators.inheritance_title, href: "/calculators/inheritance" },
    { title: dict.calculators.murabaha_title, href: "/calculators/murabaha" },
    { title: dict.calculators.mudarabah_title, href: "/calculators/mudarabah" },
    { title: dict.calculators.sukuk_title, href: "/calculators/sukuk" },
    { title: dict.utilities.hijri_title, href: "/tools/hijri-converter" },
    { title: dict.utilities.qibla_title, href: "/tools/qibla-compass" },
    { title: dict.utilities.currency_title, href: "/calculators/currency" },
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
          {dict.home.discover_more}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          {lang === "ar"
            ? "حاسبات أخرى تعمل داخل متصفحك، ولا ترسل بياناتك إلى أي خادم."
            : "More calculators that run inside your browser and never send your data to a server."}
        </p>
      </div>
      
      <div className="grid-3">
        {selectedTools.map(t => (
          <Link key={t.href} href={localizePath(t.href)} className="card card-link" style={{ padding: "20px", textAlign: "center" }}>
            <h4 style={{ fontSize: "1.05rem", color: "var(--text)" }}>{t.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
