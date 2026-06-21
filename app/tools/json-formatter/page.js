'use client';
import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try { 
      setOutput(JSON.stringify(JSON.parse(input), null, 2)); 
      setError(''); 
    } catch (e) { 
      setError('❌ Invalid JSON: ' + e.message); 
    }
  };
  
  const minify = () => {
    try { 
      setOutput(JSON.stringify(JSON.parse(input))); 
      setError(''); 
    } catch (e) { 
      setError('❌ Invalid JSON: ' + e.message); 
    }
  };
  
  const copy = () => { 
    navigator.clipboard.writeText(output); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1400px' }}>
      <div className="page-header">
        <h1>{'{ }'} JSON Formatter (Pro Edition)</h1>
        <p>Powered by the VS Code engine (Monaco). Paste your JSON to format, validate, and minify it instantly in your browser.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#1e1e1e', border: '1px solid #333' }}>
        <div style={{ display: 'flex', padding: '12px 20px', background: '#252526', borderBottom: '1px solid #333', gap: '12px', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={format} style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Format</button>
          <button className="btn btn-outline" onClick={minify} style={{ padding: '6px 16px', fontSize: '0.9rem', borderColor: '#444', color: '#ccc' }}>Minify</button>
          {error && <span style={{ color: '#f48771', fontSize: '0.9rem', marginLeft: 'auto' }}>{error}</span>}
          {output && !error && <button className="copy-btn" onClick={copy} style={{ marginLeft: 'auto', background: '#0e639c', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' }}>{copied ? '✅ Copied' : '📋 Copy Output'}</button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#333' }}>
          <div style={{ background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 16px', color: '#858585', fontSize: '0.8rem', borderBottom: '1px solid #333' }}>INPUT.json</div>
            <textarea
              style={{
                flexGrow: 1,
                width: '100%',
                background: '#1e1e1e',
                color: '#d4d4d4',
                border: 'none',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5'
              }}
              placeholder='{"key": "value"}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div style={{ background: '#1e1e1e' }}>
            <div style={{ padding: '8px 16px', color: '#858585', fontSize: '0.8rem', borderBottom: '1px solid #333' }}>OUTPUT.json</div>
            <Editor
              height="60vh"
              defaultLanguage="json"
              theme="vs-dark"
              value={output}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
            />
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Complete Guide to JSON Formatting and Validation</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          JSON (JavaScript Object Notation) is the standard data interchange format of the modern web. It is lightweight, easy for humans to read and write, and easy for machines to parse and generate. Whether you are a backend engineer designing a REST API, a frontend developer debugging a React state, or a data analyst exporting records, JSON is the universal language connecting systems together.
        </p>

        <h3 style={{ marginTop: '24px' }}>Why Format Your JSON?</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Raw JSON data often comes minified (compressed into a single line) to save bandwidth during network transmission. While this is great for performance, it is terrible for debugging. A JSON Formatter (also known as a JSON Beautifier) takes minified code and adds proper indentation, line breaks, and spacing. This instantly highlights the hierarchy of objects and arrays, allowing you to easily spot missing commas, unmatched brackets, or incorrect data types.
        </p>

        <h3 style={{ marginTop: '24px' }}>How JSON Validation Works</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Unlike JavaScript objects, JSON has very strict syntax rules. A single trailing comma or an unquoted key will break the parser. Our tool validates your payload against the official JSON specification (RFC 8259). Common errors include:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Unquoted Keys:</strong> Keys must be wrapped in double quotes (e.g., `"name": "John"`). Single quotes are not allowed.</li>
          <li><strong>Trailing Commas:</strong> Placing a comma after the last item in an array or object is illegal in JSON.</li>
          <li><strong>Comments:</strong> Standard JSON does not support `//` or `/* */` comments.</li>
          <li><strong>NaN / Infinity:</strong> Mathematical constants like NaN or Infinity cannot be used. Use `null` instead.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Why Use a Client-Side Formatter?</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Many free online formatting tools send your pasted JSON to a backend server. If you are formatting API payloads containing sensitive user data, auth tokens, or proprietary business logic, you are risking a massive data leak. SmartCalcTools processes your JSON 100% locally in your browser. Your data never touches a server, ensuring enterprise-grade security and zero-latency formatting.
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>What is the difference between JSON and JavaScript objects?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>JSON is a text-based data format derived from JavaScript syntax, but it is much stricter. In JSON, all property names must be double-quoted strings, and functions or undefined values are not allowed.</p>

          <h4 style={{ fontSize: '1.1rem' }}>How do I fix "Unexpected token {'}'} in JSON at position X"?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>This error usually means you have a trailing comma right before a closing brace `{'}'}`, or you forgot a closing brace entirely. Check the end of your arrays and objects.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Is this JSON formatter safe for production API keys?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Yes. Since our tool runs entirely offline in your browser, it is perfectly safe to paste API keys, JWTs, or confidential database dumps. No network requests are made during formatting.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between JSON and JavaScript objects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JSON is a text-based data format derived from JavaScript syntax, but it is much stricter. All property names must be double-quoted strings, and functions are not allowed."
            }
          },
          {
            "@type": "Question",
            "name": "How do I fix 'Unexpected token } in JSON'?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This error usually means you have a trailing comma right before a closing brace, or you forgot a closing brace entirely."
            }
          },
          {
            "@type": "Question",
            "name": "Is this JSON formatter safe for production API keys?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Since our tool runs entirely offline in your browser, it is perfectly safe to paste API keys or confidential data. No network requests are made during formatting."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
