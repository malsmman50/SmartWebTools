"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ lang, dict }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const router = useRouter();
  
  const localizePath = (path) => {
    if (!path) return "/";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (cleanPath.startsWith("/en") || cleanPath.startsWith("/ar")) return cleanPath;
    return `/${lang}${cleanPath}`;
  };

  const switchLanguage = (newLang) => {
    if (newLang === lang) return;
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Theme hydration
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const calculators = [
    { name: dict.calculators.zakat_title, path: "/calculators/zakat" },
    { name: dict.calculators.inheritance_title, path: "/calculators/inheritance" },
    { name: dict.calculators.murabaha_title, path: "/calculators/murabaha" },
    { name: dict.calculators.mudarabah_title, path: "/calculators/mudarabah" },
    { name: dict.calculators.islamic_deposit_title, path: "/calculators/islamic-deposit" },
    { name: dict.calculators.sukuk_title, path: "/calculators/sukuk" },
    { name: dict.calculators.roi_title, path: "/calculators/roi" },
    { name: dict.calculators.fire_title, path: "/calculators/islamic-fire" }
  ];

  const everydayTools = [
    { name: dict.everyday?.shoe_size_title || "Shoe Size Converter", path: "/calculators/everyday/shoe-size" },
    { name: dict.everyday?.discount_title || "Discount & VAT", path: "/calculators/everyday/discount" },
    { name: dict.everyday?.split_bill_title || "Split the Bill", path: "/calculators/everyday/split-bill" },
    { name: dict.health?.body_calc_title || "Body Calculator", path: "/calculators/health/body-calculator" }
  ];

  const utilities = [
    { name: dict.utilities.qibla_title, path: "/tools/qibla-compass" },
    { name: dict.utilities.hijri_title, path: "/tools/hijri-converter" },
    { name: dict.utilities.currency_title, path: "/calculators/currency" },
    { name: dict.utilities.compressor_title, path: "/tools/image-compressor" },
    { name: dict.utilities.chatpdf_title, path: "/tools/chatpdf" },
    { name: dict.utilities.password_title, path: "/tools/password-generator" }
  ];

  const tools = [
    { name: dict.dev_tools.json_title, path: "/tools/json-formatter" },
    { name: dict.dev_tools.jwt_title, path: "/tools/jwt-decoder" },
    { name: dict.dev_tools.cron_title, path: "/tools/cron-generator" },
    { name: dict.dev_tools.prompt_title, path: "/tools/prompt-generator" },
    { name: dict.dev_tools.data_converter_title, path: "/tools/data-converter" },
    { name: dict.dev_tools.regex_title, path: "/tools/regex-tester" }
  ];

  return (
    <>
      <header className="navbar">

        <div className="container navbar-inner">
          <Link href={localizePath("/")} className="navbar-logo">
            📐 {lang === "ar" ? <span>أدوات الحساب</span> : <>Smart<span>CalcTools</span></>}
          </Link>

          {/* Desktop Menu - Premium Hover Dropdowns */}
          <nav className="desktop-menu" aria-label="Main navigation">
            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                {dict.common.nav_islamic_finance}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {calculators.map((item) => (
                  <Link key={item.path} href={localizePath(item.path)} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                {lang === "ar" ? "يوميات وصحة" : "Life & Health"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {everydayTools.map((item) => (
                  <Link key={item.path} href={localizePath(item.path)} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                {dict.common.nav_smart_utilities}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {utilities.map((item) => (
                  <Link key={item.path} href={localizePath(item.path)} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                {dict.common.nav_dev_tools}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {tools.map((item) => (
                  <Link key={item.path} href={localizePath(item.path)} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href={localizePath("/blog")} className="nav-link">
              {lang === "ar" ? "المدونة" : "Blog"}
            </Link>

            <Link href={localizePath("/developers")} className="nav-link" style={{ fontWeight: 600, color: "var(--primary)" }}>
              {lang === "ar" ? "المطورين (API)" : "Developers (API)"}
            </Link>

            <Link href={localizePath("/about")} className="nav-link">
              {dict.common.nav_about}
            </Link>

            {/* Desktop Language Switcher */}
            <button
              className="lang-toggle"
              onClick={() => switchLanguage(lang === "en" ? "ar" : "en")}
              aria-label={lang === "en" ? "Switch to العربية" : "Switch to English"}
              title={lang === "en" ? "تحويل للعربية" : "Switch to English"}
              style={{
                background: "rgba(var(--primary-rgb), 0.08)",
                border: "1px solid rgba(var(--primary-rgb), 0.2)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(var(--primary-rgb), 0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(var(--primary-rgb), 0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(var(--primary-rgb), 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🌐 {lang === "en" ? "العربية" : "English"}
            </button>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="mobile-only-controls">
            {/* Mobile Language Switcher */}
            <button
              className="lang-toggle"
              onClick={() => switchLanguage(lang === "en" ? "ar" : "en")}
              aria-label={lang === "en" ? "Switch to العربية" : "Switch to English"}
              style={{
                background: "rgba(var(--primary-rgb), 0.08)",
                border: "1px solid rgba(var(--primary-rgb), 0.2)",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              🌐 {lang === "en" ? "العربية" : "English"}
            </button>
            
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="mobile-theme-btn"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button 
              className={`hamburger ${isOpen ? "active" : ""}`} 
              onClick={toggleMenu} 
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span style={{ fontWeight: 600, marginRight: "8px", fontSize: "1rem" }}>{lang === "ar" ? "القائمة" : "Menu"}</span>
              <div className="hamburger-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Side Drawer Overlay */}
      <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          
          <div className="mobile-drawer-header">
            <div className="navbar-logo" style={{ fontSize: "1.2rem" }}>
              📐 {lang === "ar" ? "أدوات الحساب" : "SmartCalc"}
            </div>
            <button className="close-drawer-btn" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="mobile-menu-section">
            <h4>🕌 {dict.common.nav_islamic_finance}</h4>
            {calculators.map(c => (
              <Link key={c.path} href={localizePath(c.path)} onClick={toggleMenu}>{c.name}</Link>
            ))}
          </div>
          
          <div className="mobile-menu-section">
            <h4>❤️ {lang === "ar" ? "يوميات وصحة" : "Life & Health"}</h4>
            {everydayTools.map(u => (
              <Link key={u.path} href={localizePath(u.path)} onClick={toggleMenu}>{u.name}</Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <h4>✨ {dict.common.nav_smart_utilities}</h4>
            {utilities.map(u => (
              <Link key={u.path} href={localizePath(u.path)} onClick={toggleMenu}>{u.name}</Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <h4>👨‍💻 {dict.common.nav_dev_tools}</h4>
            {tools.map(t => (
              <Link key={t.path} href={localizePath(t.path)} onClick={toggleMenu}>{t.name}</Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <h4>🏢 {dict.common.nav_company}</h4>
            <Link href={localizePath("/developers")} onClick={toggleMenu}>{lang === "ar" ? "المطورين (API)" : "Developers (API)"}</Link>
            <Link href={localizePath("/blog")} onClick={toggleMenu}>{lang === "ar" ? "المدونة" : "Blog"}</Link>
            <Link href={localizePath("/about")} onClick={toggleMenu}>{dict.common.nav_about_us}</Link>
            <Link href={localizePath("/privacy-policy")} onClick={toggleMenu}>{dict.common.nav_privacy}</Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
