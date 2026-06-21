'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Simulate top progress bar on route change
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
      {/* Top Loading Progress Bar Simulator */}
      <div id="top-progress-bar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--primary)', width: '0%', zIndex: 9999, pointerEvents: 'none' }}></div>

      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          📐 Smart<span>CalcTools</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-menu" aria-label="Main navigation">
          <Link href="/calculators/zakat" className="nav-link">Zakat</Link>
          <Link href="/calculators/murabaha" className="nav-link">Murabaha</Link>
          <Link href="/calculators/mudarabah" className="nav-link">Mudarabah</Link>
          <Link href="/calculators/roi" className="nav-link">Halal ROI</Link>
          <Link href="/tools/json-formatter" className="nav-link">JSON</Link>
          <Link href="/tools/chatpdf" className="nav-link">ChatPDF</Link>
        </nav>

        {/* Mobile Hamburger Icon */}
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

      {/* Mobile Menu Panel */}
      <div id="mobile-menu-panel" className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="mobile-menu-section">
          <h4>🕌 Islamic Tools</h4>
          <Link href="/calculators/zakat" onClick={toggleMenu}>Zakat Calculator</Link>
          <Link href="/calculators/murabaha" onClick={toggleMenu}>Murabaha Financing</Link>
          <Link href="/calculators/mudarabah" onClick={toggleMenu}>Mudarabah Profit</Link>
          <Link href="/calculators/roi" onClick={toggleMenu}>Halal ROI</Link>
        </div>
        <div className="mobile-menu-section">
          <h4>🛠️ Dev Tools</h4>
          <Link href="/tools/json-formatter" onClick={toggleMenu}>JSON Formatter</Link>
          <Link href="/tools/chatpdf" onClick={toggleMenu}>Private ChatPDF</Link>
          <Link href="/tools/password-generator" onClick={toggleMenu}>Password Generator</Link>
          <Link href="/tools/cron-generator" onClick={toggleMenu}>Cron Generator</Link>
        </div>
      </div>
    </header>
  );
}
