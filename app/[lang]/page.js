import Link from "next/link";
import { getDictionary } from "@/app/dictionaries";
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: isAr ? 'https://smartcalctools.xyz/ar' : 'https://smartcalctools.xyz/en',
      languages: {
        'en': 'https://smartcalctools.xyz/en',
        'ar': 'https://smartcalctools.xyz/ar',
        'x-default': 'https://smartcalctools.xyz/en',
      },
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const localize = (path) => `/${lang}${path}`;

  const calculators = [
    { title: dict.calculators.zakat_title, desc: dict.calculators.zakat_desc, href: localize("/calculators/zakat"), icon: "🤲", color: "#059669" },
    { title: dict.calculators.inheritance_title, desc: dict.calculators.inheritance_desc, href: localize("/calculators/inheritance"), icon: "⚖️", color: "#f59e0b" },
    { title: dict.calculators.murabaha_title, desc: dict.calculators.murabaha_desc, href: localize("/calculators/murabaha"), icon: "🤝", color: "#2563eb" },
    { title: dict.calculators.mudarabah_title, desc: dict.calculators.mudarabah_desc, href: localize("/calculators/mudarabah"), icon: "📈", color: "#f59e0b" },
    { title: dict.calculators.roi_title, desc: dict.calculators.roi_desc, href: localize("/calculators/roi"), icon: "💰", color: "#7c3aed" },
    { title: dict.calculators.fire_title, desc: dict.calculators.fire_desc, href: localize("/calculators/islamic-fire"), icon: "🔥", color: "#dc2626" }
  ];

  const everydayTools = [
    { title: dict.everyday?.shoe_size_title || "Shoe Size Converter", desc: dict.everyday?.shoe_size_desc || "Convert shoe sizes instantly.", href: localize("/calculators/everyday/shoe-size"), icon: "🌍", color: "#ec4899" },
    { title: dict.health?.body_calc_title || "Body Calculator", desc: dict.health?.body_calc_desc || "Calculate BMI, BMR, TDEE, and Ideal Weight.", href: localize("/calculators/health/body-calculator"), icon: "⚖️", color: "#ef4444" }
  ];

  const utilities = [
    { title: dict.utilities.qibla_title, desc: dict.utilities.qibla_desc, href: localize("/tools/qibla-compass"), icon: "🕋", color: "#10b981" },
    { title: dict.utilities.hijri_title, desc: dict.utilities.hijri_desc, href: localize("/tools/hijri-converter"), icon: "📅", color: "#059669" },
    { title: dict.utilities.currency_title, desc: dict.utilities.currency_desc, href: localize("/calculators/currency"), icon: "💱", color: "#10b981" },
    { title: dict.utilities.compressor_title, desc: dict.utilities.compressor_desc, href: localize("/tools/image-compressor"), icon: "🖼️", color: "#2563eb" },
    { title: dict.utilities.chatpdf_title, desc: dict.utilities.chatpdf_desc, href: localize("/tools/chatpdf"), icon: "📄", color: "#f59e0b" },
    { title: dict.utilities.password_title, desc: dict.utilities.password_desc, href: localize("/tools/password-generator"), icon: "🔐", color: "#7c3aed" }
  ];

  const tools = [
    { title: dict.dev_tools.json_title, desc: dict.dev_tools.json_desc, href: localize("/tools/json-formatter"), icon: "{ }", color: "#2563eb" },
    { title: dict.dev_tools.jwt_title, desc: dict.dev_tools.jwt_desc, href: localize("/tools/jwt-decoder"), icon: "🔑", color: "#f59e0b" },
    { title: dict.dev_tools.cron_title, desc: dict.dev_tools.cron_desc, href: localize("/tools/cron-generator"), icon: "⏰", color: "#059669" },
    { title: dict.dev_tools.prompt_title, desc: dict.dev_tools.prompt_desc, href: localize("/tools/prompt-generator"), icon: "✨", color: "#f59e0b" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": lang === "ar" ? "SmartCalcTools - أدوات الحساب الذكية" : "SmartCalcTools",
    "url": `https://smartcalctools.xyz/${lang}`,
    "description": lang === "ar" ? "مجموعة من الأدوات الخاصة بالتمويل الإسلامي والمطورين." : "A complete suite of Halal finance calculators and developer tools.",
    "publisher": {
      "@type": "Organization",
      "name": "SmartCalcTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smartcalctools.xyz/icon-512.png"
      }
    }
  };

  const popularTools = [
    { title: dict.everyday?.shoe_size_title || "Shoe Size Converter", desc: dict.everyday?.shoe_size_desc || "Convert shoe sizes instantly.", href: localize("/calculators/everyday/shoe-size"), icon: "🌍", color: "#ec4899" },
    { title: dict.calculators.zakat_title, desc: dict.calculators.zakat_desc, href: localize("/calculators/zakat"), icon: "🤲", color: "#059669" },
    { title: dict.utilities.currency_title, desc: dict.utilities.currency_desc, href: localize("/calculators/currency"), icon: "💱", color: "#10b981" },
    { title: dict.dev_tools.json_title, desc: dict.dev_tools.json_desc, href: localize("/tools/json-formatter"), icon: "{ }", color: "#2563eb" }
  ];

  const allToolsCount = calculators.length + utilities.length + tools.length;

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .side-ad { display: none !important; }
        .main-content { max-width: 1300px !important; margin: 0 auto; }
      ` }} />
      
      {/* Hero Section */}
      <section className="hero" style={{ paddingBottom: "30px" }}>
        <h1 style={{ fontSize: "3.5rem" }}>
          {dict.home.hero_title}
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "var(--text-muted)" }}>
          {dict.home.hero_subtitle}
        </p>
        
        <div className="trust-badges" style={{ marginTop: "40px" }}>
          <div className="trust-badge">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <strong>{dict.home.badge_private_title}</strong>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{dict.home.badge_private_desc}</div>
            </div>
          </div>
          <div className="trust-badge">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <strong>{dict.home.badge_speed_title}</strong>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{dict.home.badge_speed_desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "24px", textAlign: "center" }}>
          {lang === "ar" ? "🔥 الأكثر استخداماً اليوم" : "🔥 Most Popular Today"}
        </h2>
        <div className="grid-4">
          {popularTools.map(tool => (
            <Link key={tool.href} href={tool.href} className="card card-link">
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{tool.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categorized Tools directory */}
      
      {/* Islamic Finance */}
      <section id="islamic" style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.6rem", margin: 0, color: "var(--text)" }}>🕌 {dict.common.nav_islamic_finance}</h2>
          <div style={{ height: "1px", background: "var(--border)", flex: 1 }}></div>
        </div>
        <div className="grid-4" style={{ opacity: 0.9 }}>
          {calculators.map(tool => (
            <Link key={tool.href} href={tool.href} className="card card-link" style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>{tool.icon}</span>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{tool.title}</h3>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.4", margin: 0 }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Everyday Life & Health */}
      <section id="everyday" style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.6rem", margin: 0, color: "var(--text)" }}>❤️ {lang === "ar" ? "يوميات وصحة" : "Life & Health"}</h2>
          <div style={{ height: "1px", background: "var(--border)", flex: 1 }}></div>
        </div>
        <div className="grid-4" style={{ opacity: 0.9 }}>
          {everydayTools.map(tool => (
            <Link key={tool.href} href={tool.href} className="card card-link" style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>{tool.icon}</span>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{tool.title}</h3>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.4", margin: 0 }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Smart Utilities */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.6rem", margin: 0, color: "var(--text)" }}>✨ {dict.common.nav_smart_utilities}</h2>
          <div style={{ height: "1px", background: "var(--border)", flex: 1 }}></div>
        </div>
        <div className="grid-4" style={{ opacity: 0.9 }}>
          {utilities.map(tool => (
            <Link key={tool.href} href={tool.href} className="card card-link" style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>{tool.icon}</span>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{tool.title}</h3>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.4", margin: 0 }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Developer Tools */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.6rem", margin: 0, color: "var(--text)" }}>💻 {dict.common.nav_dev_tools}</h2>
          <div style={{ height: "1px", background: "var(--border)", flex: 1 }}></div>
        </div>
        <div className="grid-4" style={{ opacity: 0.9 }}>
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href} className="card card-link" style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>{tool.icon}</span>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{tool.title}</h3>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.4", margin: 0 }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="card" style={{ textAlign: "center", padding: "48px 32px", marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "12px" }}>{dict.home.why_title}</h2>
        <div className="grid-3" style={{ marginTop: "24px", textAlign: lang === "ar" ? "right" : "left" }}>
          <div>
            <h4 style={{ marginBottom: "8px" }}>{dict.home.why_halal_title}</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{dict.home.why_halal_desc}</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "8px" }}>{dict.home.why_private_title}</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{dict.home.why_private_desc}</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "8px" }}>{dict.home.why_speed_title}</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{dict.home.why_speed_desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
