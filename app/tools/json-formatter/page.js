'use client';
import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(''); } 
    catch (e) { setError('❌ Invalid JSON: ' + e.message); setOutput(''); }
  };
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); }
    catch (e) { setError('❌ Invalid JSON: ' + e.message); setOutput(''); }
  };
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>{'{ }'} JSON Formatter & Validator</h1>
        <p>Paste your JSON to format, validate, and minify it instantly. Runs entirely in your browser — your data stays private.</p>
      </div>

      <div className="card">
        <div className="grid-2">
          <div>
            <label className="label">Input JSON</label>
            <textarea className="input" rows="16" placeholder='{"key": "value"}' value={input} onChange={e => setInput(e.target.value)} style={{ fontFamily: 'monospace', fontSize: '0.9rem' }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button className="btn btn-primary" onClick={format}>Format</button>
              <button className="btn btn-outline" onClick={minify}>Minify</button>
            </div>
            {error && <p style={{ color: 'var(--danger)', marginTop: '8px', fontSize: '0.9rem' }}>{error}</p>}
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="label" style={{ margin: 0 }}>Output</label>
              {output && <button className="copy-btn" onClick={copy}>{copied ? '✅ Copied' : '📋 Copy'}</button>}
            </div>
            <textarea className="input" rows="16" readOnly value={output} placeholder="Formatted output appears here..." style={{ fontFamily: 'monospace', fontSize: '0.9rem', background: 'var(--bg)' }} />
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>What is JSON?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is the most common format for APIs and web services. Formatting JSON makes it readable by adding proper indentation, while minifying removes whitespace to reduce file size for production use.
        </p>
      </article>
    </div>
  );
}
