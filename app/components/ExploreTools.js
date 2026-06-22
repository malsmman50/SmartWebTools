'use client';

import Link from 'next/link';

// Array of all major tools for cross-linking
const ALL_TOOLS = [
  { title: 'Zakat Calculator', href: '/calculators/zakat', icon: '🤲', color: '#059669' },
  { title: 'Inheritance (Mawarith)', href: '/calculators/inheritance', icon: '⚖️', color: '#f59e0b' },
  { title: 'Murabaha Installments', href: '/calculators/murabaha', icon: '🤝', color: '#2563eb' },
  { title: 'Hijri Converter', href: '/tools/hijri-converter', icon: '📅', color: '#059669' },
  { title: 'Live Currency', href: '/calculators/currency', icon: '💱', color: '#10b981' },
  { title: 'Image Compressor', href: '/tools/image-compressor', icon: '🖼️', color: '#2563eb' },
  { title: 'JSON Formatter', href: '/tools/json-formatter', icon: '{ }', color: '#2563eb' },
  { title: 'Semantic PDF Search', href: '/tools/chatpdf', icon: '📄', color: '#f59e0b' },
];

export default function ExploreTools({ currentPath }) {
  // Filter out the current tool to prevent linking to itself
  const availableTools = ALL_TOOLS.filter(t => t.href !== currentPath);
  
  // Randomly select 3 tools
  const shuffled = [...availableTools].sort(() => 0.5 - Math.random());
  const selectedTools = shuffled.slice(0, 3);

  return (
    <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🔥 Discover More Free Tools</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Explore our other privacy-first calculators and developer utilities.</p>
      </div>
      
      <div className="grid-3">
        {selectedTools.map(t => (
          <Link key={t.href} href={t.href} className="card card-link" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{t.icon}</div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text)' }}>{t.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
