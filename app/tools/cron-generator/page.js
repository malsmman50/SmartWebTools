'use client';
import { useState } from 'react';

export default function CronGenerator() {
  const [min, setMin] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [mon, setMon] = useState('*');
  const [dow, setDow] = useState('*');
  const [copied, setCopied] = useState(false);

  const cron = `${min} ${hour} ${dom} ${mon} ${dow}`;
  const copy = () => { navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const explain = () => {
    const parts = [];
    if (min === '*') parts.push('every minute');
    else if (min.includes('/')) parts.push(`every ${min.split('/')[1]} minutes`);
    else if (min.includes('-')) parts.push(`minutes ${min}`);
    else parts.push(`at minute ${min}`);
    if (hour === '*') parts.push('of every hour');
    else if (hour.includes('/')) parts.push(`every ${hour.split('/')[1]} hours`);
    else parts.push(`at hour ${hour}`);
    if (dom !== '*') parts.push(`on day ${dom} of the month`);
    if (mon !== '*') parts.push(`in month ${mon}`);
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (dow !== '*') { const d = parseInt(dow); parts.push(`on ${days[d] || `day ${dow}`}`); }
    return 'Runs ' + parts.join(', ') + '.';
  };

  const presets = [
    { label: 'Every minute', v: ['*','*','*','*','*'] },
    { label: 'Every hour', v: ['0','*','*','*','*'] },
    { label: 'Daily at midnight', v: ['0','0','*','*','*'] },
    { label: 'Every Monday 9 AM', v: ['0','9','*','*','1'] },
    { label: 'Every 5 minutes', v: ['*/5','*','*','*','*'] },
    { label: '1st of month', v: ['0','0','1','*','*'] },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>⏰ Cron Expression Generator</h1>
        <p>Build and understand cron schedules visually. Supports ranges, steps, and lists.</p>
      </div>

      <div className="card">
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '24px' }}>
          {[['Minute','0-59',min,setMin],['Hour','0-23',hour,setHour],['Day','1-31',dom,setDom],['Month','1-12',mon,setMon],['Weekday','0-6',dow,setDow]].map(([l,p,v,s]) => (
            <div key={l}>
              <label className="label">{l} ({p})</label>
              <input className="input" value={v} onChange={e => s(e.target.value)} style={{ textAlign: 'center', fontFamily: 'monospace' }} />
            </div>
          ))}
        </div>

        <div className="result-box" style={{ position: 'relative', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '4px' }}>{cron}</div>
          <p style={{ color: 'var(--success)', marginTop: '8px', fontSize: '1rem' }}>{explain()}</p>
          <button className="copy-btn" onClick={copy} style={{ position: 'absolute', top: '12px', right: '12px' }}>{copied ? '✅' : '📋'}</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map(p => (
            <button key={p.label} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '6px 14px' }}
              onClick={() => { setMin(p.v[0]); setHour(p.v[1]); setDom(p.v[2]); setMon(p.v[3]); setDow(p.v[4]); }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>How to Write Cron Jobs</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          A cron expression consists of 5 fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Use * for "every", */N for "every N intervals", ranges like 1-5, and lists like 1,3,5. Cron jobs are essential for automating tasks on Linux servers, such as backups, log rotation, and scheduled emails.
        </p>
      </article>
    </div>
  );
}
