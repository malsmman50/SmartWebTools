import React, { useState } from 'react';
import { Code2, Key, Check, Copy } from 'lucide-react';

export default function DeveloperTools() {
  const [activeTab, setActiveTab] = useState('json');
  
  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Password Generator State
  const [pwdLength, setPwdLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPwd, setGeneratedPwd] = useState('');

  const formatJson = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (e) {
      setJsonError('Invalid JSON Format');
      setJsonOutput('');
    }
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let validChars = chars;
    if (useNumbers) validChars += numbers;
    if (useSymbols) validChars += symbols;

    let password = '';
    for (let i = 0; i < pwdLength; i++) {
      password += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    setGeneratedPwd(password);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="glass-panel" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Code2 size={36} color="var(--primary)" />
        <h2>Developer Tools</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('json')}
          className="btn-primary" 
          style={{ background: activeTab === 'json' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--panel-bg)', border: '1px solid var(--border-color)', color: activeTab === 'json' ? '#fff' : 'var(--text-main)' }}>
          <Code2 size={18} /> JSON Formatter
        </button>
        <button 
          onClick={() => setActiveTab('pwd')}
          className="btn-primary" 
          style={{ background: activeTab === 'pwd' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--panel-bg)', border: '1px solid var(--border-color)', color: activeTab === 'pwd' ? '#fff' : 'var(--text-main)' }}>
          <Key size={18} /> Password Generator
        </button>
      </div>

      {activeTab === 'json' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <h3>JSON Formatter & Validator</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Paste your minified or ugly JSON below to format it perfectly.</p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <textarea 
                className="input-field" 
                rows="15" 
                placeholder="Paste JSON here..." 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                style={{ resize: 'vertical', fontFamily: 'monospace' }}
              ></textarea>
              <button onClick={formatJson} className="btn-primary" style={{ marginTop: '15px' }}>Format JSON</button>
              {jsonError && <p style={{ color: 'var(--danger)', marginTop: '10px' }}>{jsonError}</p>}
            </div>
            
            <div style={{ flex: '1 1 400px', position: 'relative' }}>
              <textarea 
                className="input-field" 
                rows="15" 
                readOnly
                value={jsonOutput}
                placeholder="Formatted JSON will appear here..."
                style={{ resize: 'vertical', fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.3)' }}
              ></textarea>
              {jsonOutput && (
                <button 
                  onClick={() => copyToClipboard(jsonOutput)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '5px', color: 'var(--primary)', cursor: 'pointer' }}>
                  <Copy size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pwd' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '500px' }}>
          <h3>Secure Password Generator</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Generate strong, random passwords for your accounts.</p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', wordBreak: 'break-all' }}>{generatedPwd || 'Click generate...'}</span>
            {generatedPwd && (
               <button onClick={() => copyToClipboard(generatedPwd)} className="btn-primary" style={{ padding: '8px 12px' }}>
                 <Copy size={16} />
               </button>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Length: {pwdLength}</label>
            <input 
              type="range" 
              min="8" max="64" 
              value={pwdLength} 
              onChange={(e) => setPwdLength(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
              Include Numbers
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
              Include Symbols
            </label>
          </div>

          <button onClick={generatePassword} className="btn-primary">Generate Password</button>
        </div>
      )}
    </div>
  );
}
