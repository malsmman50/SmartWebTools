import Link from 'next/link';

const calculators = [
  { title: 'Zakat Calculator', desc: 'Calculate your annual Zakat precisely according to Islamic guidelines based on Nisab.', href: '/calculators/zakat', icon: '🤲', color: '#059669' },
  { title: 'Murabaha Calculator', desc: 'Calculate cost-plus Halal financing installments. The interest-free alternative to loans.', href: '/calculators/murabaha', icon: '🤝', color: '#2563eb' },
  { title: 'Mudarabah Calculator', desc: 'Calculate profit sharing and loss allocation in Islamic investment partnerships.', href: '/calculators/mudarabah', icon: '⚖️', color: '#f59e0b' },
  { title: 'Halal ROI Calculator', desc: 'Measure the profitability of your Halal investments and business ventures.', href: '/calculators/roi', icon: '💰', color: '#7c3aed' },
];

const tools = [
  { title: 'JSON Formatter', desc: 'Format, validate, and minify JSON data instantly in your browser.', href: '/tools/json-formatter', icon: '{ }', color: '#2563eb' },
  { title: 'Password Generator', desc: 'Generate cryptographically secure passwords with customizable options.', href: '/tools/password-generator', icon: '🔐', color: '#7c3aed' },
  { title: 'Cron Generator', desc: 'Build and understand cron expressions with an intuitive visual editor.', href: '/tools/cron-generator', icon: '⏰', color: '#059669' },
  { title: 'AI Prompt Builder', desc: 'Craft optimized prompts for ChatGPT, Claude, and other AI models.', href: '/tools/prompt-generator', icon: '✨', color: '#f59e0b' },
];

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Free <span className="hero-gradient">Islamic Finance</span> & Pro Dev Tools</h1>
        <p>Professional-grade calculators built on Halal principles and offline-first developer utilities. Run entirely in your browser. No signups, no data tracking, 100% private.</p>
        
        <div className="trust-badges">
          <div className="trust-badge">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <strong>100% Private</strong>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Data never leaves your device</div>
            </div>
          </div>
          <div className="trust-badge">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <strong>Sharia Compliant</strong>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Based on standard Fiqh rules</div>
            </div>
          </div>
          <div className="trust-badge">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <strong>Lightning Fast</strong>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>No server roundtrips</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🕌 Islamic Financial Tools (100% Halal)</h2>
        <div className="grid-4">
          {calculators.map(c => (
            <Link key={c.href} href={c.href} className="card card-link">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{c.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🛠️ Developer Utilities</h2>
        <div className="grid-4">
          {tools.map(t => (
            <Link key={t.href} href={t.href} className="card card-link">
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{t.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{t.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card" style={{ textAlign: 'center', padding: '48px 32px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '12px' }}>Why SmartCalcTools?</h2>
        <div className="grid-3" style={{ marginTop: '24px', textAlign: 'left' }}>
          <div>
            <h4 style={{ marginBottom: '8px' }}>☪️ Halal First</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We refuse to build tools for Riba (Usury). All our financial calculators follow Islamic guidelines.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px' }}>🔒 100% Private</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All calculations run locally in your browser. Your financial data never leaves your device.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px' }}>⚡ Lightning Fast</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No server roundtrips. Get instant results as you type with modern web technologies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
