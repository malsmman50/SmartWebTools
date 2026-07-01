'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log the error to the local browser console only.
    // Zero-Trust Privacy: We do NOT send this to Sentry, LogRocket, or any external server.
    console.error('Local Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '24px' }}>⚠️</div>
      
      <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '40px' }}>
        <div style={{ textAlign: 'right', direction: 'rtl' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>عذراً! حدث خطأ غير متوقع</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.8' }}>
            حدث خطأ محلي أثناء معالجة طلبك. بسبب سياستنا الصارمة للخصوصية (Zero-Trust)، <strong>لم يتم</strong> إرسال هذا الخطأ لأي خادم. بياناتك لا تزال آمنة على جهازك.
          </p>
          <button 
            onClick={() => reset()} 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            المحاولة مرة أخرى
          </button>
        </div>

        <div style={{ textAlign: 'left', direction: 'ltr', borderLeft: '1px solid var(--border)', paddingLeft: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Oops! Something went wrong</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.8' }}>
            A local error occurred while processing your request. Because of our strict Zero-Trust Privacy policy, this error was <strong>not</strong> reported to any server. Your data remains secure on your device.
          </p>
          <button 
            onClick={() => reset()} 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Try Again
          </button>
        </div>
      </div>
      
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'left', maxWidth: '900px', margin: '32px auto 0', overflowX: 'auto', direction: 'ltr' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--danger)' }}>Error Details (Local Only):</p>
        <code style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>
          {error.message || 'Unknown runtime error'}
        </code>
      </div>
    </div>
  );
}
