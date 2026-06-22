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
    // Close mobile menu on route change
    setIsOpen(false);
    
    // Simulate top progress bar
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const calculators = [
    { name: 'Zakat', path: '/calculators/zakat' },
    { name: 'Inheritance', path: '/calculators/inheritance' },
    { name: 'Murabaha', path: '/calculators/murabaha' },
    { name: 'Mudarabah', path: '/calculators/mudarabah' },
    { name: 'Halal ROI', path: '/calculators/roi' },
    { name: 'Islamic FIRE', path: '/calculators/islamic-fire' },
  ];

  const utilities = [
    { name: 'Live Qibla Compass', path: '/tools/qibla-compass' },
    { name: 'Hijri Converter', path: '/tools/hijri-converter' },
    { name: 'Live Currency', path: '/calculators/currency' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'PDF Search', path: '/tools/chatpdf' },
    { name: 'Password Gen', path: '/tools/password-generator' },
  ];

  const tools = [
    { name: 'JSON Formatter', path: '/tools/json-formatter' },
    { name: 'JWT Decoder', path: '/tools/jwt-decoder' },
    { name: 'Cron Gen', path: '/tools/cron-generator' },
    { name: 'Prompt Builder', path: '/tools/prompt-generator' },
  ];

  return (
    <>
      <header className="navbar">
        <div id="top-progress-bar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--primary)', width: '0%', zIndex: 9999, pointerEvents: 'none' }}></div>

        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            📐 Smart<span>CalcTools</span>
          </Link>

          {/* Desktop Menu - Premium Hover Dropdowns */}
          <nav className="desktop-menu" aria-label="Main navigation">
            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                Islamic Finance
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {calculators.map((item) => (
                  <Link key={item.path} href={item.path} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                Smart Utilities
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {utilities.map((item) => (
                  <Link key={item.path} href={item.path} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="premium-dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                Dev Tools 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="dropdown-content">
                {tools.map((item) => (
                  <Link key={item.path} href={item.path} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="nav-link">About</Link>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="mobile-only-controls">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="mobile-theme-btn"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              className={`hamburger ${isOpen ? 'active' : ''}`} 
              onClick={toggleMenu} 
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span style={{ fontWeight: 600, marginRight: '8px', fontSize: '1rem' }}>Menu</span>
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
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          
          <div className="mobile-drawer-header">
            <div className="navbar-logo" style={{ fontSize: '1.2rem' }}>
              📐 Smart<span>Calc</span>
            </div>
            <button className="close-drawer-btn" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="mobile-menu-section">
            <h4>🕌 Islamic Finance</h4>
            {calculators.map(c => (
              <Link key={c.path} href={c.path} onClick={toggleMenu}>{c.name}</Link>
            ))}
          </div>
          
          <div className="mobile-menu-section">
            <h4>✨ Smart Utilities</h4>
            {utilities.map(u => (
              <Link key={u.path} href={u.path} onClick={toggleMenu}>{u.name}</Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <h4>👨‍💻 Developer Tools</h4>
            {tools.map(t => (
              <Link key={t.path} href={t.path} onClick={toggleMenu}>{t.name}</Link>
            ))}
          </div>

          <div className="mobile-menu-section">
            <h4>🏢 Company</h4>
            <Link href="/about" onClick={toggleMenu}>About Us</Link>
            <Link href="/privacy-policy" onClick={toggleMenu}>Privacy Policy</Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
