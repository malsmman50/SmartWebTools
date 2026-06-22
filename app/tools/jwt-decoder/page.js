'use client';
import { useState, useEffect } from 'react';
import { decodeJwt, decodeProtectedHeader } from 'jose';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      setError('');
      return;
    }

    try {
      const decodedHeader = decodeProtectedHeader(token);
      const decodedPayload = decodeJwt(token);
      
      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JWT Format');
      setHeader('');
      setPayload('');
    }
  }, [token]);

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1400px' }}>
      <div className="page-header">
        <h1>🔐 JWT Decoder (Pro Edition)</h1>
        <p>Decode JSON Web Tokens instantly. Runs 100% offline in your browser — your tokens never leave your device.</p>
        
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '8px', color: '#b45309', textAlign: 'left', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Security Warning</strong>
            This tool performs Base64Url decode only. It <strong>does NOT verify the cryptographic signature</strong> of the token. A decoded payload does not guarantee the token is authentic or untampered. Always perform signature verification on your backend server.
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="label">Encoded Token (Paste Here)</label>
          <textarea 
            className="input" 
            style={{ flexGrow: 1, minHeight: '400px', fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.9rem', lineHeight: '1.5' }} 
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {error && <p style={{ color: 'var(--danger)', marginTop: '12px', fontWeight: 'bold' }}>❌ {error}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#1e1e1e', border: '1px solid #333' }}>
            <div style={{ padding: '8px 16px', background: '#252526', color: '#858585', fontSize: '0.8rem', borderBottom: '1px solid #333' }}>
              HEADER: ALGORITHM &amp; TOKEN TYPE
            </div>
            <textarea
              readOnly
              style={{
                display: 'block', width: '100%', height: '150px',
                background: '#1e1e1e', color: '#d4d4d4', border: 'none',
                padding: '16px', fontFamily: 'monospace', fontSize: '14px',
                resize: 'none', outline: 'none', lineHeight: '1.6',
              }}
              value={header}
            />
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#1e1e1e', border: '1px solid #333', flexGrow: 1 }}>
            <div style={{ padding: '8px 16px', background: '#252526', color: '#858585', fontSize: '0.8rem', borderBottom: '1px solid #333' }}>
              PAYLOAD: DATA
            </div>
            <textarea
              readOnly
              style={{
                display: 'block', width: '100%', height: '350px',
                background: '#1e1e1e', color: '#d4d4d4', border: 'none',
                padding: '16px', fontFamily: 'monospace', fontSize: '14px',
                resize: 'none', outline: 'none', lineHeight: '1.6',
              }}
              value={payload}
            />
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Complete Guide to JSON Web Tokens (JWT)</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
        </p>

        <h3 style={{ marginTop: '24px' }}>Does this tool verify the signature?</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          No. This tool is designed purely for <strong>decoding and inspecting</strong> the payload and headers of a token during development. It does not perform cryptographic signature validation. To ensure a JWT is authentic and hasn't been tampered with, you must verify the signature on your backend server using the appropriate secret key or public key.
        </p>

        <h3 style={{ marginTop: '24px' }}>Why You Need a Client-Side JWT Decoder</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          JWTs often contain sensitive User Identifiers (PII), Roles, and Authorization claims. Pasting your production JWT into a random online tool that sends it to a backend server is a massive security risk. If that server logs your token, a malicious actor could intercept it and impersonate your users.
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          <strong>SmartCalcTools</strong> eliminates this risk completely. All decoding happens in your local browser using the <code>jose</code> library. Your token is never transmitted over the internet.
        </p>

        <h3 style={{ marginTop: '24px' }}>Structure of a JWT</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          A JWT consists of three Base64Url-encoded parts separated by dots: <code>header.payload.signature</code>. The header specifies the algorithm. The payload contains the claims (data). The signature verifies the token was not tampered with — and this part requires a secret key to validate, which is why signature verification must happen server-side.
        </p>

        <h3 style={{ marginTop: '24px' }}>Common JWT Claims</h3>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>iss</strong> — Issuer: who created the token</li>
          <li><strong>sub</strong> — Subject: who the token is about (usually user ID)</li>
          <li><strong>aud</strong> — Audience: the intended recipient</li>
          <li><strong>exp</strong> — Expiry: Unix timestamp after which the token is invalid</li>
          <li><strong>iat</strong> — Issued At: when the token was created</li>
          <li><strong>jti</strong> — JWT ID: unique identifier to prevent replay attacks</li>
        </ul>
      </article>
    </div>
  );
}
