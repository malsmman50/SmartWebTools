import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle } from 'lucide-react';

export default function PromptGenerator() {
  const [role, setRole] = useState('Senior Software Engineer');
  const [task, setTask] = useState('write a highly optimized React component');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional and concise');
  const [copied, setCopied] = useState(false);

  const roles = [
    'Senior Software Engineer',
    'Expert Copywriter',
    'Digital Marketing Specialist',
    'Product Manager',
    'Data Scientist'
  ];

  const tasks = [
    'write a highly optimized React component',
    'create a persuasive landing page copy',
    'develop a one-month content strategy',
    'write a comprehensive PRD (Product Requirements Document)',
    'write a Python script for data analysis'
  ];

  const generatedPrompt = `Act as a ${role}. Your task is to ${task} about the following topic: "${topic || '[Insert Topic Here]'}". Please ensure the tone is ${tone}. Format the output with clear headings and bullet points where applicable. Think step-by-step before providing the final answer.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Sparkles size={36} color="var(--success)" />
        <h2>AI Prompt Generator</h2>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Craft the perfect prompt for ChatGPT, Claude, or any LLM by filling out the fields below.</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Role / Persona</label>
          <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Task</label>
          <select className="input-field" value={task} onChange={(e) => setTask(e.target.value)}>
            {tasks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Topic / Specific Details</label>
        <textarea 
          className="input-field" 
          rows="3" 
          placeholder="e.g. A user authentication system using Firebase"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        ></textarea>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Tone of Voice</label>
        <input 
          type="text" 
          className="input-field" 
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="e.g. Professional, Funny, Academic"
        />
      </div>

      <div style={{ background: 'var(--panel-bg)', padding: '20px', borderRadius: '8px', border: '1px solid var(--success)', position: 'relative' }}>
        <h4 style={{ color: 'var(--success)', marginBottom: '10px' }}>Generated Prompt:</h4>
        <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', paddingRight: '100px' }}>
          {generatedPrompt}
        </p>
        <button 
          onClick={copyToClipboard}
          className="btn-primary" 
          style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 16px' }}>
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
