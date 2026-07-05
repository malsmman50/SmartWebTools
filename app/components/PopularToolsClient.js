"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PopularToolsClient({ allTools, langTitle }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    // Shuffle allTools and take 6 to create a dynamic 2-row grid
    const shuffled = [...allTools].sort(() => 0.5 - Math.random());
    setTools(shuffled.slice(0, 6));
  }, [allTools]);

  if (tools.length === 0) {
    return (
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", textAlign: "center" }}>
          {langTitle}
        </h2>
        <div className="grid-3">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="card" style={{ height: "160px", background: "var(--surface-sunken)", opacity: 0.5, animation: "pulse 1.5s infinite" }}></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginBottom: "60px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", textAlign: "center" }}>
        {langTitle}
      </h2>
      <div className="grid-3">
        {tools.map((tool, i) => (
          <Link key={i} href={tool.href} className="card card-link">
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{tool.icon}</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{tool.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
