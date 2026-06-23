"use client";
import React from 'react';
export default function OfflinePage({ params }) {
  const { lang } = React.use(params);
  const isAr = lang === 'ar';
  
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📡</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
        {isAr ? 'لا يوجد اتصال بالإنترنت' : 'No Internet Connection'}
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '32px' }}>
        {isAr 
          ? 'يبدو أنك غير متصل بالإنترنت حالياً. يمكنك تصفح الصفحات والأدوات التي قمت بزيارتها مسبقاً، فهي محفوظة في جهازك.' 
          : 'You are currently offline. You can still access the tools and pages you have previously visited.'}
      </p>
      <button 
        onClick={() => typeof window !== 'undefined' && window.location.reload()} 
        className="btn btn-primary"
      >
        {isAr ? 'إعادة المحاولة' : 'Try Again'}
      </button>
    </div>
  );
}
