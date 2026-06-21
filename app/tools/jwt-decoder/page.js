'use client';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
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
            This tool performs a Base64Url decode only. It <strong>does NOT verify the cryptographic signature</strong> of the token. A decoded payload does not guarantee the token is authentic or untampered. Always perform signature verification on your backend server.
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
              HEADER: ALGORITHM & TOKEN TYPE
            </div>
            <Editor
              height="150px"
              defaultLanguage="json"
              theme="vs-dark"
              value={header}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
            />
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#1e1e1e', border: '1px solid #333', flexGrow: 1 }}>
            <div style={{ padding: '8px 16px', background: '#252526', color: '#858585', fontSize: '0.8rem', borderBottom: '1px solid #333' }}>
              PAYLOAD: DATA
            </div>
            <Editor
              height="350px"
              defaultLanguage="json"
              theme="vs-dark"
              value={payload}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
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
          <strong>SmartCalcTools</strong> eliminates this risk completely. We use the modern Web Crypto API to decode your JWT entirely within your local browser. Your token is never transmitted over the internet, guaranteeing zero data leakage.
        </p>

        <h3 style={{ marginTop: '24px' }}>Structure of a JWT</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          A standard JWT consists of three parts separated by dots (`.`):
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Header:</strong> Typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.</li>
          <li><strong>Payload:</strong> Contains the claims. Claims are statements about an entity (typically, the user) and additional data.</li>
          <li><strong>Signature:</strong> Used to verify the message wasn't changed along the way. In the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>Are JWTs encrypted?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>No, standard JWTs (JWS) are only Base64 encoded and digitally signed, not encrypted. Anyone who intercepts the token can read the header and payload. This is why you should never put passwords or highly sensitive secrets inside a JWT payload.</p>

          <h4 style={{ fontSize: '1.1rem' }}>How do I know if a JWT is expired?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Look at the `exp` (Expiration Time) claim in the decoded payload. It is represented as a NumericDate (Unix epoch time). If the current time is greater than the `exp` value, the token is rejected by the server.</p>

          <h4 style={{ fontSize: '1.1rem' }}>What does "Invalid Signature" mean?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>It means someone tampered with the header or payload, or it was signed with a different secret key than the one the server is using to verify it. The server will reject the token, protecting your application from unauthorized access.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are JWTs encrypted?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, standard JWTs (JWS) are only Base64 encoded and digitally signed, not encrypted. Anyone who intercepts the token can read the header and payload."
            }
          },
          {
            "@type": "Question",
            "name": "How do I know if a JWT is expired?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Look at the `exp` (Expiration Time) claim in the decoded payload. It is represented as a Unix epoch time. If the current time is greater than the `exp` value, the token is expired."
            }
          },
          {
            "@type": "Question",
            "name": "What does 'Invalid Signature' mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It means the payload or header was tampered with, or it was signed with a different secret key. The server will reject it to protect the application."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
