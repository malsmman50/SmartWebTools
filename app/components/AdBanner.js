'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ dataAdSlot, dataAdFormat = "auto", dataFullWidthResponsive = "true" }) {
  const pathname = usePathname();

  // Show a subtle placeholder during development or before approval so you can see where ads will be
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    try {
      // Initialize the ad if the Google AdSense script is loaded
      // The pathname key forces this component to unmount and remount on route changes,
      // ensuring ads are refreshed properly during client-side navigation.
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }, [pathname]); // Re-run when pathname changes

  return (
    <div key={pathname} style={{ width: '100%', margin: '24px 0', textAlign: 'center', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          width: '100%',
          minWidth: '250px',
          maxWidth: '1000px', // Prevent ad from stretching too wide on 4K screens
          minHeight: '90px', 
          background: isDev ? 'rgba(99,102,241,0.05)' : 'transparent', 
          border: isDev ? '1px dashed rgba(99,102,241,0.3)' : 'none', 
          borderRadius: '8px' 
        }}
        data-ad-client="ca-pub-2077857887750518" 
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
