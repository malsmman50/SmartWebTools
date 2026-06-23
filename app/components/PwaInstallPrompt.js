'use client';
import { useState, useEffect } from 'react';

export default function PwaInstallPrompt({ lang }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('pwa_prompt_dismissed') === 'true' || localStorage.getItem('pwa_installed') === 'true') {
        return;
      }
    }

    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_installed', 'true');
    }
    
    // We no longer need the prompt. Clear it up.
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_prompt_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '500px',
      margin: '0 auto',
      animation: 'slideUp 0.4s ease-out forwards'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img src="/icon-192.png" alt="SmartCalcTools" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'ar' ? 'تثبيت التطبيق' : 'Install App'}</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {lang === 'ar' 
              ? 'قم بتثبيت تطبيق أدوات الحساب الذكية على جهازك للوصول السريع بدون إنترنت.' 
              : 'Install SmartCalcTools on your device for fast, offline access.'}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {lang === 'ar' ? 'ليس الآن' : 'Not now'}
        </button>
        <button 
          onClick={handleInstallClick}
          style={{
            background: 'var(--primary)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)'
          }}
        >
          {lang === 'ar' ? 'تثبيت' : 'Install'}
        </button>
      </div>
    </div>
  );
}
