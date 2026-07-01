'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) {
  const pathname = usePathname();
  const containerRef = useRef(null); // Ref on the wrapper, not the ins
  const [isUnfilled, setIsUnfilled] = useState(false);
  // Use a key derived from pathname to force full unmount/remount of <ins> on navigation
  const [adKey, setAdKey] = useState(pathname);

  const isDev = process.env.NODE_ENV === 'development';

  // On route change: reset state and force a new ad slot to mount
  useEffect(() => {
    setIsUnfilled(false);
    setAdKey(pathname); // triggers remount of <ins> via key prop below
  }, [pathname]);

  // Push ad and observe for unfilled after the <ins> mounts (adKey changes)
  useEffect(() => {
    const insEl = containerRef.current?.querySelector('.adsbygoogle');
    if (!insEl) return;

    let observer;
    let timer;

    try {
      // Push ad to Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      // Watch for Google setting data-ad-status="unfilled"
      observer = new MutationObserver(() => {
        const status = insEl.getAttribute('data-ad-status');
        if (status === 'unfilled') {
          setIsUnfilled(true);
          observer.disconnect();
        }
      });
      observer.observe(insEl, { attributes: true, attributeFilter: ['data-ad-status'] });

      // Robust fallback: if after 1.5 seconds the ad hasn't successfully loaded ('filled'),
      // we assume it is blocked by an AdBlocker, unfilled, or failing, and we show the fallback.
      timer = setTimeout(() => {
        const status = insEl.getAttribute('data-ad-status');
        if (status !== 'filled') {
          setIsUnfilled(true);
        }
      }, 1500);

    } catch (e) {
      if (isDev) console.error('AdSense error:', e);
      setIsUnfilled(true);
    }

    return () => {
      if (observer) observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [adKey]); // depends on adKey — runs each time ins remounts

  // Do not render ads on legal / contact pages (AdSense policy)
  const noAdsPages = ['/privacy-policy', '/terms-of-service', '/contact'];
  if (noAdsPages.some((p) => pathname.includes(p))) return null;

  // Exclude marketing/landing pages from the top ad slot to keep a premium, uncluttered layout
  const isLandingPage = 
    pathname === '/' || 
    pathname === '/ar' || 
    pathname === '/en' || 
    pathname === '/ar/' || 
    pathname === '/en/' ||
    pathname.includes('/about') ||
    pathname.includes('/methodology') ||
    pathname.includes('/developers') ||
    pathname.includes('/compare');

  if (isLandingPage && dataAdSlot === '3706969387') {
    return null;
  }

  const isAr = pathname?.startsWith('/ar');

  return (
    <div ref={containerRef} className="ad-banner-container" aria-label={isAr ? 'إعلان' : 'Advertisement'}>
      {isUnfilled ? (
        /* ---- House Ad: shown when Google has no fill ---- */
        <div className="house-ad">
          <p>{isAr ? 'اكتشف أحدث المقالات في التمويل الإسلامي' : 'Discover the latest in Islamic Finance'}</p>
          <Link
            href={isAr ? '/ar/blog' : '/en/blog'}
            className="btn btn-primary"
            style={{ marginTop: '8px', padding: '6px 16px', fontSize: '0.85rem' }}
          >
            {isAr ? 'تصفح المدونة' : 'Read our Blog'}
          </Link>
        </div>
      ) : (
        /* ---- Real AdSense slot ---- */
        <ins
          key={adKey}           // ✅ Forces DOM unmount/remount on navigation
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minWidth: '250px',
            maxWidth: '1000px',
            minHeight: '90px',
            background: isDev ? 'rgba(99,102,241,0.05)' : 'transparent',
            border: isDev ? '1px dashed rgba(99,102,241,0.3)' : 'none',
            borderRadius: '8px',
          }}
          data-ad-client="ca-pub-2077857887750518"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive}
        >
          {isDev && (
            <div style={{ padding: '32px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
              [AdSense Slot — {dataAdSlot}]
            </div>
          )}
        </ins>
      )}
    </div>
  );
}
