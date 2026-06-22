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
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Oops! Something went wrong.</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
        A local error occurred while processing your request. 
        Because of our strict Zero-Trust Privacy policy, this error was <strong>not</strong> reported to any server. 
        Your data remains secure on your device.
      </p>
      
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'left', maxWidth: '600px', margin: '0 auto 32px', overflowX: 'auto' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--danger)' }}>Error Details (Local Only):</p>
        <code style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>
          {error.message || 'Unknown runtime error'}
        </code>
      </div>

      <button 
        onClick={() => reset()} 
        style={{ padding: '14px 32px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Try Again
      </button>
    </div>
  );
}
