import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://smartcalctools.xyz'),
  title: {
    default: 'SmartCalcTools — Halal Financial Calculators & Secure Developer Tools',
    template: '%s | SmartCalcTools',
  },
  description: '100% free, private, and client-side tools. Explore our Zakat Calculator, Murabaha Financing Calculator, Islamic FIRE tool, JSON Formatter, and secure WebGPU ChatPDF.',
  keywords: ['Islamic finance calculators', 'Zakat calculator', 'Murabaha calculator', 'Mudarabah profit calculator', 'Halal investment tools', 'JSON formatter', 'JWT decoder offline', 'client-side ChatPDF', 'free developer tools'],
  openGraph: {
    title: 'SmartCalcTools — Halal Financial Calculators & Secure Developer Tools',
    description: 'Free, offline-first developer tools and Sharia-compliant financial calculators. Private and secure.',
    url: 'https://smartcalctools.xyz',
    siteName: 'SmartCalcTools',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCalcTools — Halal Finance & Pro Dev Tools',
    description: 'Explore our Zakat Calculator, Islamic FIRE tool, and ultra-secure offline developer utilities.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://smartcalctools.xyz' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <a href="/about" style={{ color: 'var(--text-muted)' }}>About Us</a>
              <a href="/privacy-policy" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
              <a href="/terms-of-service" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
              <a href="/contact" style={{ color: 'var(--text-muted)' }}>Contact</a>
            </div>
            <p>© 2026 SmartCalcTools. Free tools built for speed, privacy, and ethics.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="/" className="navbar-logo">
          📐 Smart<span>CalcTools</span>
        </a>
        <nav className="navbar-links">
          <a href="/calculators/zakat">Zakat</a>
          <a href="/calculators/murabaha">Murabaha</a>
          <a href="/calculators/mudarabah">Mudarabah</a>
          <a href="/calculators/roi">ROI</a>
          <a href="/tools/chatpdf" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>🔒 ChatPDF</a>
          <a href="/tools/json-formatter">JSON</a>
          <a href="/tools/jwt-decoder">JWT</a>
          <a href="/tools/password-generator">Password</a>
        </nav>
      </div>
    </header>
  );
}
