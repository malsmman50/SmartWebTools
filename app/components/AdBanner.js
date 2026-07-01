'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ dataAdSlot, dataAdFormat = "horizontal", dataFullWidthResponsive = "false" }) {
  const pathname = usePathname();
  const adRef = useRef(null);

  // Show a subtle placeholder during development or before approval so you can see where ads will be
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    try {
      // Initialize the ad if the Google AdSense script is loaded
      if (typeof window !== 'undefined' && adRef.current) {
        // Prevent pushing multiple times to the same element in SPA navigation
        if (!adRef.current.hasAttribute('data-pushed')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.setAttribute('data-pushed', 'true');
        }
      }
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }, [pathname]); // Re-run when pathname changes

  // Do not render ads on legal and contact pages (AdSense best practices)
  const noAdsPages = ['/privacy-policy', '/terms-of-service', '/contact'];
  const shouldHideAds = noAdsPages.some(page => pathname.includes(page));
  
  if (shouldHideAds) {
    return null;
  }

  return (
    <div style={{ width: '100%', margin: '24px 0', minHeight: '90px', textAlign: 'center', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <ins
        key={pathname}
        ref={adRef}
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
