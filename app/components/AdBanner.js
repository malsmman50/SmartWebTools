'use client';
import { useEffect } from 'react';

export default function AdBanner({ dataAdSlot = "1234567890", dataAdFormat = "auto", dataFullWidthResponsive = "true" }) {
  useEffect(() => {
    try {
      // Initialize the ad if the Google AdSense script is loaded
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }, []);

  // Show a subtle placeholder during development or before approval so you can see where ads will be
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div style={{ width: '100%', margin: '24px 0', textAlign: 'center', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          width: '100%',
          maxWidth: '1000px', // Prevent ad from stretching too wide on 4K screens
          minHeight: isDev ? '90px' : 'auto', 
          background: isDev ? 'rgba(99,102,241,0.05)' : 'transparent', 
          border: isDev ? '1px dashed rgba(99,102,241,0.3)' : 'none', 
          borderRadius: '8px' 
        }}
        // TODO: Replace with your actual AdSense Publisher ID (e.g., ca-pub-1234567890)
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      >
        {isDev && (
          <div style={{ padding: '32px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
            [AdSense Banner Placeholder - {dataAdSlot}]
          </div>
        )}
      </ins>
    </div>
  );
}
