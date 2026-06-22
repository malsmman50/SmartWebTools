'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeDropdown, setActiveDropdown] = useState(null); // 'calculators' or 'tools'
  const pathname = usePathname();
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    // Close mobile menu and dropdowns on route change
    setIsOpen(false);
    setActiveDropdown(null);
    
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

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculators = [
    { name: 'Zakat', path: '/calculators/zakat' },
    { name: 'Inheritance', path: '/calculators/inheritance' },
    { name: 'Murabaha', path: '/calculators/murabaha' },
    { name: 'Mudarabah', path: '/calculators/mudarabah' },
    { name: 'Halal ROI', path: '/calculators/roi' },
    { name: 'Islamic FIRE', path: '/calculators/islamic-fire' },
    { name: 'Currency', path: '/calculators/currency' },
  ];

  const tools = [
    { name: 'Hijri Converter', path: '/tools/hijri-converter' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'JSON Formatter', path: '/tools/json-formatter' },
    { name: 'JWT Decoder', path: '/tools/jwt-decoder' },
    { name: 'PDF Search', path: '/tools/chatpdf' },
    { name: 'Password Gen', path: '/tools/password-generator' },
    { name: 'Cron Gen', path: '/tools/cron-generator' },
    { name: 'Prompt Builder', path: '/tools/prompt-generator' },
  ];

  return (
    <header className="navbar" ref={navRef}>
      <div id="top-progress-bar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--primary)', width: '0%', zIndex: 9999, pointerEvents: 'none' }}></div>

      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          📐 Smart<span>CalcTools</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-menu" aria-label="Main navigation">
          <Link href="/" className="nav-link">Home</Link>
          
          <div className="dropdown" style={{ position: 'relative' }}>
            <button 
              className="nav-link dropdown-toggle" 
              onClick={() => setActiveDropdown(activeDropdown === 'calculators' ? null : 'calculators')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Calculators {activeDropdown === 'calculators' ? '▲' : '▼'}
            </button>
            {activeDropdown === 'calculators' && (
              <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 0', minWidth: '200px', boxShadow: 'var(--shadow-lg)', zIndex: 1000, marginTop: '8px' }}>
                {calculators.map((item) => (
                  <Link key={item.path} href={item.path} className="dropdown-item" style={{ display: 'block', padding: '10px 20px', color: 'var(--text)', textDecoration: 'none', fontSize: '0.95rem' }} onClick={() => setActiveDropdown(null)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown" style={{ position: 'relative' }}>
            <button 
              className="nav-link dropdown-toggle" 
              onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Tools {activeDropdown === 'tools' ? '▲' : '▼'}
            </button>
            {activeDropdown === 'tools' && (
              <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 0', minWidth: '200px', boxShadow: 'var(--shadow-lg)', zIndex: 1000, marginTop: '8px' }}>
                {tools.map((item) => (
                  <Link key={item.path} href={item.path} className="dropdown-item" style={{ display: 'block', padding: '10px 20px', color: 'var(--text)', textDecoration: 'none', fontSize: '0.95rem' }} onClick={() => setActiveDropdown(null)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
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
            style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: '4px' }}
          >
            <span style={{ fontWeight: 600, marginRight: '8px', fontSize: '1rem' }}>Menu</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '24px' }}>
              <span style={{ display: 'block', height: '2px', background: 'currentColor', transition: 'all 0.3s', transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}></span>
              <span style={{ display: 'block', height: '2px', background: 'currentColor', transition: 'all 0.3s', opacity: isOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', height: '2px', background: 'currentColor', transition: 'all 0.3s', transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel - Using strict inline styles for absolute visibility */}
      <div 
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--bg-card)',
          padding: '24px',
          overflowY: 'auto',
          zIndex: 9999,
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: 'inset 0 4px 6px -4px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>🕌 Calculators</h4>
          {calculators.map(c => (
            <Link key={c.path} href={c.path} onClick={toggleMenu} style={{ fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none', padding: '8px 0' }}>
              {c.name}
            </Link>
          ))}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>🛠️ Developer Tools</h4>
          {tools.map(t => (
            <Link key={t.path} href={t.path} onClick={toggleMenu} style={{ fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none', padding: '8px 0' }}>
              {t.name}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>🏢 Company</h4>
          <Link href="/about" onClick={toggleMenu} style={{ fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none', padding: '8px 0' }}>About Us</Link>
          <Link href="/privacy-policy" onClick={toggleMenu} style={{ fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none', padding: '8px 0' }}>Privacy Policy</Link>
        </div>
      </div>
    </header>
  );
}
