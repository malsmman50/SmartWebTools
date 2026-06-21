import Link from 'next/link';

const calculators = [
  { title: 'Mortgage Calculator', desc: 'Calculate monthly payments, total interest, and amortization schedules for home loans.', href: '/calculators/mortgage', icon: '🏠', color: '#2563eb' },
  { title: 'Compound Interest', desc: 'See how your investments grow over time with the power of compounding.', href: '/calculators/compound-interest', icon: '📈', color: '#059669' },
  { title: 'ROI Calculator', desc: 'Measure the profitability of your investments with clear percentage returns.', href: '/calculators/roi', icon: '💰', color: '#7c3aed' },
  { title: 'Loan Calculator', desc: 'Compare loan scenarios with fixed vs variable rates and find the best deal.', href: '/calculators/loan', icon: '🏦', color: '#dc2626' },
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
        <h1>Free <span className="hero-gradient">Financial Calculators</span> & Developer Tools</h1>
        <p>Professional-grade tools that run entirely in your browser. No signups, no tracking, no fees. Just results.</p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>💰 Financial Calculators</h2>
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
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🛠️ Developer Tools</h2>
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
            <h4 style={{ marginBottom: '8px' }}>🔒 100% Private</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All calculations run in your browser. Your data never leaves your device.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px' }}>⚡ Lightning Fast</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No server roundtrips. Instant results as you type.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px' }}>🆓 Forever Free</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No signup, no credit card, no premium tier. Every tool is completely free.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
