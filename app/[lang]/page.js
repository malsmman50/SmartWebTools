import Link from "next/link";
import { getDictionary } from "@/app/dictionaries";

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

  return (
    <div className="container">
      <section className="hero">
        <h1>
          {lang === "ar" ? (
            <>أدوات مالية إسلامية <span className="hero-gradient">مجانية</span> وأدوات للمطورين</>
          ) : (
            <>Free <span className="hero-gradient">Islamic Finance</span> & Pro Dev Tools</>
          )}
        </h1>
        <p>{dict.home.hero_subtitle}</p>
        
        <div className="trust-badges">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <strong>{dict.home.badge_sharia_title}</strong>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{dict.home.badge_sharia_desc}</div>
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

      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{dict.home.section_islamic}</h2>
        <div className="grid-4">
          {calculators.map(c => (
            <Link key={c.href} href={c.href} className="card card-link">
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{c.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{c.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{dict.home.section_utilities}</h2>
        <div className="grid-4">
          {utilities.map(u => (
            <Link key={u.href} href={u.href} className="card card-link">
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{u.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{u.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{u.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{dict.home.section_dev}</h2>
        <div className="grid-4">
          {tools.map(t => (
            <Link key={t.href} href={t.href} className="card card-link">
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{t.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{t.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

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
