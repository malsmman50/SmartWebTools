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
    let charSets = [];
    if (useUpper) charSets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (useNumbers) charSets.push('0123456789');
    if (useSymbols) charSets.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
    if (charSets.length === 0) charSets.push('abcdefghijklmnopqrstuvwxyz'); // fallback
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    charSets.push(lowerChars);

    let pwdChars = [];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    // Guarantee one character from each selected set
    for (let i = 0; i < charSets.length && pwdChars.length < length; i++) {
      const set = charSets[i];
      pwdChars.push(set[array[i] % set.length]);
    }

    // Fill the rest randomly from all combined allowed characters
    const allChars = charSets.join('');
    const maxValid = Math.floor(4294967296 / allChars.length) * allChars.length;
    let index = pwdChars.length;
    
    while (pwdChars.length < length) {
      crypto.getRandomValues(array);
      for (let i = 0; i < array.length && pwdChars.length < length; i++) {
        if (array[i] < maxValid) {
          pwdChars.push(allChars[array[i] % allChars.length]);
        }
      }
    }

    // Shuffle the characters array using Fisher-Yates
    const shuffleArray = new Uint32Array(pwdChars.length);
    crypto.getRandomValues(shuffleArray);
    for (let i = pwdChars.length - 1; i > 0; i--) {
      const j = shuffleArray[i] % (i + 1);
      [pwdChars[i], pwdChars[j]] = [pwdChars[j], pwdChars[i]];
    }

    setPassword(pwdChars.join(''));
  };

  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const strength = () => {
    let charsetSize = 26; // lower case
    if (useUpper) charsetSize += 26;
    if (useNumbers) charsetSize += 10;
    if (useSymbols) charsetSize += 26; // approx 26 symbols

    const entropy = length * Math.log2(charsetSize);
    
    if (entropy < 50) return { text: 'Weak', color: 'var(--danger)' };
    if (entropy < 75) return { text: 'Good', color: '#f59e0b' };
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
      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Ultimate Guide to Secure Passwords</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          In today's digital landscape, a strong password is your first line of defense against cyber threats. 
          Our Secure Password Generator uses advanced cryptographic algorithms (`window.crypto.getRandomValues`) 
          to generate random, unpredictable passwords locally in your browser. We never store or transmit your passwords.
        </p>

        <h3 style={{ marginTop: '24px' }}>Why You Need a Random Password Generator</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Humans are notoriously bad at creating random passwords. We tend to use predictable patterns, 
          such as keyboard walks (qwerty), dictionary words, or personal information like birthdates. 
          Hackers use automated tools to exploit these predictable patterns in "dictionary attacks" and "brute-force attacks." 
          A cryptographically secure random password generator eliminates these patterns entirely.
        </p>

        <h3 style={{ marginTop: '24px' }}>Best Practices for Password Security</h3>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Length Over Complexity:</strong> A 16-character password with just letters is often harder to crack than an 8-character password with symbols. Aim for at least 16 characters.</li>
          <li><strong>Never Reuse Passwords:</strong> If one website is breached, hackers will try your password on every other major site (Credential Stuffing). Use a unique password for every account.</li>
          <li><strong>Use a Password Manager:</strong> You shouldn't try to memorize 50 unique, random passwords. Use a reputable password manager like Bitwarden or 1Password to store them.</li>
          <li><strong>Enable 2FA:</strong> Always enable Two-Factor Authentication (2FA) via an authenticator app (like Authy or Google Authenticator) for your important accounts.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>How long does it take to crack a 16-character password?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>With a mix of uppercase, lowercase, numbers, and symbols, a purely random 16-character password would take modern supercomputers billions of years to crack using brute-force.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Is this generator safe to use?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Yes. This tool is 100% client-side. The passwords are generated using your device's operating system entropy pool and are never sent over the internet.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Should I change my passwords regularly?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Modern cybersecurity guidelines (like NIST) now recommend against forced regular password changes, unless you have reason to believe your password was compromised in a data breach.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does it take to crack a 16-character password?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With a mix of uppercase, lowercase, numbers, and symbols, a purely random 16-character password would take modern supercomputers billions of years to crack using brute-force."
            }
          },
          {
            "@type": "Question",
            "name": "Is this generator safe to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This tool is 100% client-side. The passwords are generated using your device's operating system entropy pool and are never sent over the internet."
            }
          },
          {
            "@type": "Question",
            "name": "Should I change my passwords regularly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Modern cybersecurity guidelines now recommend against forced regular password changes, unless you have reason to believe your password was compromised."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
