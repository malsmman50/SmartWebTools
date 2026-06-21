import './globals.css';

export const metadata = {
  metadataBase: new URL('https://smartcalctools.xyz'),
  title: {
    default: 'SmartCalcTools — Free Financial Calculators & Developer Tools',
    template: '%s | SmartCalcTools',
  },
  description: 'Free online mortgage calculator, compound interest calculator, ROI calculator, JSON formatter, password generator, and more. Fast, private, no signup required.',
  keywords: ['mortgage calculator', 'compound interest calculator', 'ROI calculator', 'JSON formatter', 'password generator', 'cron generator', 'free online tools'],
  openGraph: {
    title: 'SmartCalcTools — Free Financial Calculators & Developer Tools',
    description: 'Free online mortgage calculator, compound interest calculator, ROI calculator, JSON formatter, password generator, and more.',
    url: 'https://smartcalctools.xyz',
    siteName: 'SmartCalcTools',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCalcTools — Free Financial Calculators & Developer Tools',
    description: 'Free online mortgage calculator, compound interest calculator, ROI calculator, JSON formatter, and more.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://smartcalctools.xyz' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <p>© 2026 SmartCalcTools. Free tools built for speed and privacy.</p>
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
          <a href="/tools/json-formatter">JSON</a>
          <a href="/tools/password-generator">Password</a>
        </nav>
      </div>
    </header>
  );
}
