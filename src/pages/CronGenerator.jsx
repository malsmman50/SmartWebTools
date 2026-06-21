import React, { useState } from 'react';
import { Clock, Copy, CheckCircle } from 'lucide-react';

export default function CronGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const explainCron = () => {
    let explanation = "Runs ";
    if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') return "Runs every minute of every day.";
    
    explanation += `at minute ${minute === '*' ? 'every minute' : minute}, `;
    explanation += `hour ${hour === '*' ? 'every hour' : hour}, `;
    explanation += `on day of month ${dayOfMonth === '*' ? 'every day' : dayOfMonth}, `;
    explanation += `in month ${month === '*' ? 'every month' : month}, `;
    explanation += `on day of week ${dayOfWeek === '*' ? 'every day' : dayOfWeek}.`;
    return explanation;
  };

  return (
    <div className="glass-panel" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Clock size={36} color="var(--accent)" />
        <h2>Cron Job Generator</h2>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Easily generate and understand complex cron expressions without memorizing syntax.</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Minute (0-59)</label>
          <input type="text" className="input-field" value={minute} onChange={(e) => setMinute(e.target.value)} />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Hour (0-23)</label>
          <input type="text" className="input-field" value={hour} onChange={(e) => setHour(e.target.value)} />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Day of Month (1-31)</label>
          <input type="text" className="input-field" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Month (1-12)</label>
          <input type="text" className="input-field" value={month} onChange={(e) => setMonth(e.target.value)} />
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Day of Week (0-6)</label>
          <input type="text" className="input-field" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />
        </div>
      </div>

      <div style={{ background: 'var(--panel-bg)', padding: '30px', borderRadius: '8px', border: '2px dashed var(--accent)', textAlign: 'center', position: 'relative', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: 'var(--text-main)', letterSpacing: '5px', wordBreak: 'break-all' }}>{cronString}</h3>
        <p style={{ color: 'var(--success)', fontSize: '1.2rem' }}>{explainCron()}</p>
        <button 
          onClick={copyToClipboard}
          className="btn-primary" 
          style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 16px' }}>
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn-primary" style={{ background: 'var(--bg-color)', color: 'var(--text-main)' }} onClick={() => {setMinute('0'); setHour('0'); setDayOfMonth('*'); setMonth('*'); setDayOfWeek('*')}}>Midnight Daily (0 0 * * *)</button>
        <button className="btn-primary" style={{ background: 'var(--bg-color)', color: 'var(--text-main)' }} onClick={() => {setMinute('0'); setHour('12'); setDayOfMonth('*'); setMonth('*'); setDayOfWeek('1')}}>Noon on Mon (0 12 * * 1)</button>
        <button className="btn-primary" style={{ background: 'var(--bg-color)', color: 'var(--text-main)' }} onClick={() => {setMinute('0'); setHour('0'); setDayOfMonth('1'); setMonth('*'); setDayOfWeek('*')}}>1st of Month (0 0 1 * *)</button>
      </div>
    </div>
  );
}
