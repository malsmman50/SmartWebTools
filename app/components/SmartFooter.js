"use client";

import { usePathname } from "next/navigation";

function getPageCategory(pathname) {
  if (
    pathname.includes("/calculators/") ||
    pathname.includes("/tools/qibla") ||
    pathname.includes("/tools/hijri")
  ) {
    return "finance";
  }

  if (pathname.includes("/tools/")) {
    return "devtools";
  }

  if (pathname.includes("/blog/") || pathname.includes("/articles/")) {
    return "content";
  }

  return "general";
}

export default function SmartFooter({ dict }) {
  const pathname = usePathname();
  const category = getPageCategory(pathname);

  if (category === "general") return null;

  const titleKey = `footer_disclaimer_${category}_title`;
  const textKey = `footer_disclaimer_${category}_text`;
  const title = dict.common[titleKey];
  const text = dict.common[textKey];

  if (!title || !text) return null;

  return (
    <div
      className="footer-disclaimer"
      style={{
        maxWidth: "800px",
        margin: "0 auto 20px",
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        lineHeight: "1.6",
        textAlign: "center",
      }}
    >
      <strong>{title}</strong> {text}
    </div>
  );
}
