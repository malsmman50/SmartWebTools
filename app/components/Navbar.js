"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  
  const { lang, dict, localizePath, switchLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    setIsOpen(false);
    
    const bar = document.getElementById("top-progress-bar");
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      bar.style.opacity = "1";
      setTimeout(() => {
        bar.style.transition = "width 0.4s ease";
        bar.style.width = "70%";
        setTimeout(() => {
          bar.style.width = "100%";
          setTimeout(() => {
            bar.style.opacity = "0";
          }, 300);
        }, 200);
      }, 10);
    }
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
    { name: dict.calculators.roi_title, path: "/calculators/roi" },
    { name: dict.calculators.fire_title, path: "/calculators/islamic-fire" }
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
    { name: dict.dev_tools.prompt_title, path: "/tools/prompt-generator" }
  ];

  return (
    <>
      <header className="navbar">
        <div id="top-progress-bar" style={{ position: "fixed", top: 0, left: 0, height: "3px", background: "var(--primary)", width: "0%", zIndex: 9999, pointerEvents: "none" }}></div>

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

            <Link href={localizePath("/about")} className="nav-link">
              {dict.common.nav_about}
            </Link>

            {/* Desktop Language Switcher */}
            <button
              className="lang-toggle"
              onClick={() => switchLanguage(lang === "en" ? "ar" : "en")}
              aria-label="Switch Language"
              title={lang === "en" ? "تحويل للعربية" : "Switch to English"}
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
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
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)";
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

          {/* Mobile Hamburger Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="mobile-only-controls">
            {/* Mobile Language Switcher */}
            <button
              className="lang-toggle"
              onClick={() => switchLanguage(lang === "en" ? "ar" : "en")}
              aria-label="Toggle language"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
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
              🌐 {lang === "en" ? "عربي" : "En"}
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
            <Link href={localizePath("/about")} onClick={toggleMenu}>{dict.common.nav_about_us}</Link>
            <Link href={localizePath("/privacy-policy")} onClick={toggleMenu}>{dict.common.nav_privacy}</Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
