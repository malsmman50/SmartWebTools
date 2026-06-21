'use client';
import { useState } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    setPassword(Array.from(array, x => chars[x % chars.length]).join(''));
  };

  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const strength = () => {
    let s = 0;
    if (length >= 12) s++; if (length >= 16) s++; if (length >= 20) s++;
    if (useUpper) s++; if (useNumbers) s++; if (useSymbols) s++;
    if (s <= 2) return { text: 'Weak', color: 'var(--danger)' };
    if (s <= 4) return { text: 'Good', color: '#f59e0b' };
    return { text: 'Strong', color: 'var(--success)' };
  };

  const st = strength();

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🔐 Password Generator</h1>
        <p>Generate cryptographically secure passwords using your browser's built-in crypto API. Nothing is sent to any server.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="result-box" style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', wordBreak: 'break-all', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {password || 'Click Generate below'}
          </div>
          {password && <button className="copy-btn" onClick={copy} style={{ position: 'absolute', top: '12px', right: '12px' }}>{copied ? '✅' : '📋'}</button>}
        </div>

        {password && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <span style={{ fontWeight: 600, color: st.color }}>Strength: {st.text}</span>
            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border)', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: st.color, width: st.text === 'Weak' ? '33%' : st.text === 'Good' ? '66%' : '100%', transition: 'width 0.3s' }}></div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label className="label">Length: {length}</label>
          <input type="range" min="8" max="64" value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Uppercase
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> Numbers
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> Symbols
          </label>
        </div>

        <button className="btn btn-primary" onClick={generate} style={{ width: '100%', justifyContent: 'center' }}>Generate Secure Password</button>
      </div>

      <article className="card" style={{ marginTop: '40px', maxWidth: '600px' }}>
        <h2>Why Use a Password Generator?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Humans are terrible at creating random passwords. We tend to use dictionary words, personal information, and predictable patterns. A cryptographic password generator uses your browser's secure random number generator (crypto.getRandomValues) to produce truly unpredictable passwords. A 20-character password with mixed case, numbers, and symbols has over 10^38 possible combinations — making brute-force attacks virtually impossible.
        </p>
      </article>
    </div>
  );
}
