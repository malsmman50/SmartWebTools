'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    // Simulate top progress bar on route change
    setIsOpen(false);
    const bar = document.getElementById('top-progress-bar');
    if (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      bar.style.opacity = '1';
      setTimeout(() => {
        bar.style.transition = 'width 0.4s ease';
        bar.style.width = '70%';
        setTimeout(() => {
          bar.style.width = '100%';
          setTimeout(() => {
            bar.style.opacity = '0';
          }, 300);
        }, 200);
      }, 10);
    }
  }, [pathname]);

  return (
    <header className="navbar">
      {/* Top Loading Progress Bar */}
      <div id="top-progress-bar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--primary)', width: '0%', zIndex: 9999, pointerEvents: 'none' }}></div>

      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          📐 Smart<span>CalcTools</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-menu" aria-label="Main navigation">
          <Link href="/calculators/zakat" className="nav-link">Zakat</Link>
          <Link href="/calculators/inheritance" className="nav-link">Inherit</Link>
          <Link href="/calculators/murabaha" className="nav-link">Murabaha</Link>
          <Link href="/calculators/currency" className="nav-link">Currency</Link>
          <Link href="/tools/hijri-converter" className="nav-link">Hijri</Link>
          <Link href="/tools/image-compressor" className="nav-link">Image</Link>
          <Link href="/tools/json-formatter" className="nav-link">JSON</Link>
          <Link href="/tools/chatpdf" className="nav-link">PDF Search</Link>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ display: 'none' }}
            id="mobile-theme-btn"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`} 
            onClick={toggleMenu} 
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
            aria-label="Toggle navigation menu"
            aria-haspopup="menu"
          >
            <span style={{ fontWeight: 600, marginRight: '10px', fontSize: '0.95rem' }}>Menu</span>
            <div className="hamburger-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div id="mobile-menu-panel" className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-menu-section">
          <h4>🕌 Islamic Finance</h4>
          <Link href="/calculators/zakat" onClick={toggleMenu}>Zakat Calculator</Link>
          <Link href="/calculators/inheritance" onClick={toggleMenu}>Inheritance (Mawarith)</Link>
          <Link href="/calculators/murabaha" onClick={toggleMenu}>Murabaha Financing</Link>
          <Link href="/calculators/mudarabah" onClick={toggleMenu}>Mudarabah Profit</Link>
          <Link href="/calculators/roi" onClick={toggleMenu}>Halal ROI Calculator</Link>
          <Link href="/calculators/islamic-fire" onClick={toggleMenu}>Islamic FIRE Calculator</Link>
          <Link href="/calculators/currency" onClick={toggleMenu}>Live Currency Converter</Link>
        </div>
        <div className="mobile-menu-section">
          <h4>🛠️ Developer Tools</h4>
          <Link href="/tools/hijri-converter" onClick={toggleMenu}>Hijri Date Converter</Link>
          <Link href="/tools/image-compressor" onClick={toggleMenu}>Image Compressor</Link>
          <Link href="/tools/json-formatter" onClick={toggleMenu}>JSON Formatter</Link>
          <Link href="/tools/jwt-decoder" onClick={toggleMenu}>JWT Decoder</Link>
          <Link href="/tools/chatpdf" onClick={toggleMenu}>Semantic PDF Search</Link>
          <Link href="/tools/password-generator" onClick={toggleMenu}>Password Generator</Link>
          <Link href="/tools/cron-generator" onClick={toggleMenu}>Cron Generator</Link>
          <Link href="/tools/prompt-generator" onClick={toggleMenu}>AI Prompt Builder</Link>
        </div>
        <div className="mobile-menu-section">
          <h4>🏢 Company</h4>
          <Link href="/about" onClick={toggleMenu}>About Us</Link>
          <Link href="/contact" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>
    </header>
  );
}
