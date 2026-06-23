'use client';
import { useState } from 'react';

export default function PromptGenerator() {
  const [role, setRole] = useState('Senior Software Engineer');
  const [task, setTask] = useState('write a React component');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [format, setFormat] = useState('Step-by-step with code examples');
  const [copied, setCopied] = useState(false);

  const prompt = `Act as a ${role}.\n\nYour task is to ${task}${context ? ` about: "${context}"` : ''}.\n\nRequirements:\n- Tone: ${tone}\n- Output format: ${format}\n- Think step-by-step before providing your answer\n- Be thorough and provide practical, actionable advice`;

  const copy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const roles = ['Senior Software Engineer','Marketing Strategist','Financial Advisor','Data Scientist','UX Designer','Technical Writer','Product Manager','DevOps Engineer'];
  const tones = ['Professional','Casual','Academic','Concise','Detailed','Creative'];
  const formats = ['Step-by-step with code examples','Bullet points','Numbered list','Paragraph format','Table format','Pros and cons'];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>✨ AI Prompt Builder</h1>
        <p>Craft optimized prompts for ChatGPT, Claude, Gemini, or any LLM. Get better AI responses every time.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Role / Persona</label>
            <select className="input" value={role} onChange={e => setRole(e.target.value)}>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Task</label>
            <input className="input" value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. create a REST API" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Context / Topic (optional)</label>
            <textarea className="input" rows="3" value={context} onChange={e => setContext(e.target.value)} placeholder="e.g. A user authentication system using Firebase" />
          </div>
          <div className="grid-2">
            <div>
              <label className="label">Tone</label>
              <select className="input" value={tone} onChange={e => setTone(e.target.value)}>
                {tones.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Output Format</label>
              <select className="input" value={format} onChange={e => setFormat(e.target.value)}>
                {formats.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ position: 'relative' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--success)' }}>Generated Prompt:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text)' }}>{prompt}</pre>
          <button className="btn btn-primary" onClick={copy} style={{ marginTop: '16px' }}>{copied ? '✅ Copied!' : '📋 Copy Prompt'}</button>
        </div>
      </div>
    </div>
  );
}
