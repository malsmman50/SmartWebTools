'use client';
import { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';

export default function CronGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  const [humanReadable, setHumanReadable] = useState('');
  const [isValid, setIsValid] = useState(true);

  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  useEffect(() => {
    try {
      setHumanReadable(cronstrue.toString(cronString));
      setIsValid(true);
    } catch (e) {
      setHumanReadable('Invalid cron expression');
      setIsValid(false);
    }
  }, [cronString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
    alert('Copied to clipboard!');
  };

  const templates = [
    { label: 'Every Minute', val: ['*', '*', '*', '*', '*'] },
    { label: 'Every 5 Minutes', val: ['*/5', '*', '*', '*', '*'] },
    { label: 'Every Hour', val: ['0', '*', '*', '*', '*'] },
    { label: 'Every Day at Midnight', val: ['0', '0', '*', '*', '*'] },
    { label: 'Every Sunday', val: ['0', '0', '*', '*', '0'] },
    { label: '1st of Every Month', val: ['0', '0', '1', '*', '*'] },
  ];

  const applyTemplate = (t) => {
    setMinute(t[0]); setHour(t[1]); setDayOfMonth(t[2]); setMonth(t[3]); setDayOfWeek(t[4]);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>⏰ Cron Job Generator</h1>
        <p>Easily build, validate, and understand complex cron expressions for your scheduled tasks.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Build Expression</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Minute (0-59)</label>
            <input type="text" className="input" value={minute} onChange={e => setMinute(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Hour (0-23)</label>
            <input type="text" className="input" value={hour} onChange={e => setHour(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Day of Month (1-31)</label>
            <input type="text" className="input" value={dayOfMonth} onChange={e => setDayOfMonth(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Month (1-12)</label>
            <input type="text" className="input" value={month} onChange={e => setMonth(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Day of Week (0-6, 0=Sun)</label>
            <input type="text" className="input" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Cron Expression</div>
            <div className="result-value" style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '2rem' }}>
              {cronString}
            </div>
            <div style={{ 
              marginTop: '12px', 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: isValid ? 'var(--success)' : 'var(--danger)',
              background: 'var(--bg-card)',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}>
              ✨ "{humanReadable}"
            </div>
            <button onClick={copyToClipboard} className="btn btn-outline" style={{ marginTop: '16px' }}>Copy to Clipboard</button>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>Quick Templates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {templates.map(t => (
                <button key={t.label} onClick={() => applyTemplate(t.val)} className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                  {t.label} <span style={{ color: 'var(--text-muted)', marginLeft: 'auto', fontFamily: 'monospace' }}>{t.val.join(' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Ultimate Guide to Cron Expressions</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          A <strong>cron expression</strong> is a string comprising five or six fields separated by white space that represents a set of times, normally as a schedule to execute a routine or script. Originally developed for the Unix operating system (the `cron` daemon), it has become the standard scheduling syntax used by modern CI/CD pipelines (like GitHub Actions, GitLab CI), cloud providers (AWS CloudWatch, Google Cloud Scheduler), and backend programming frameworks (Node.js, Python, PHP).
        </p>

        <h3 style={{ marginTop: '24px' }}>Anatomy of a Cron String</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          A standard cron string consists of 5 parts (some systems support a 6th for seconds, but 5 is the industry standard). Our free cron generator focuses on the standard 5 parts:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'monospace' }}>
          <li>* * * * *</li>
          <li>| | | | |</li>
          <li>| | | | +----- Day of week (0 - 6) (Sunday=0)</li>
          <li>| | | +------- Month (1 - 12)</li>
          <li>| | +--------- Day of month (1 - 31)</li>
          <li>| +----------- Hour (0 - 23)</li>
          <li>+------------- Minute (0 - 59)</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Special Characters in Cron</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Understanding special characters is the key to mastering cron:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Asterisk (*)</strong> - Matches all values. For example, an asterisk in the minute field means "every minute".</li>
          <li><strong>Hyphen (-)</strong> - Defines a range. `1-5` in the day of week field means "Monday through Friday".</li>
          <li><strong>Comma (,)</strong> - Separates discrete items in a list. `0,15,30,45` means "at the top of the hour, at quarter past, at half past, and at quarter to".</li>
          <li><strong>Slash (/)</strong> - Specifies increments. `*/5` in the minute field means "every 5 minutes".</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Human-Readable Cron Validation</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          One of the hardest parts of writing cron jobs is knowing whether your string actually does what you think it does. That's why our tool integrates a real-time natural language translator. As you type your cron schedule, the tool will instantly translate it into plain English (e.g., "At 12:00 PM, on day 15 of the month"). This guarantees you never accidentally schedule a script to run every minute instead of once a month!
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>Are cron jobs timezone dependent?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Yes. By default, a cron job executes based on the local timezone of the server it is running on. However, many cloud providers (like AWS or GitHub Actions) run their servers in UTC by default. Always verify your server's timezone.</p>

          <h4 style={{ fontSize: '1.1rem' }}>How do I schedule a job to run every 30 seconds?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Standard 5-part cron does not support seconds. To bypass this, developers often write a script that runs every minute (`* * * * *`), executes the task, pauses for 30 seconds (`sleep 30`), and then executes the task again.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Does 0 or 7 mean Sunday?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>In the vast majority of cron implementations, both 0 and 7 represent Sunday. Monday is 1, Tuesday is 2, etc.</p>
        </div>
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are cron jobs timezone dependent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. By default, a cron job executes based on the local timezone of the server it is running on. Many cloud providers run their servers in UTC by default."
            }
          },
          {
            "@type": "Question",
            "name": "How do I schedule a job to run every 30 seconds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard cron does not support seconds. To bypass this, write a script that runs every minute, executes the task, pauses for 30 seconds, and then executes the task again."
            }
          },
          {
            "@type": "Question",
            "name": "Does 0 or 7 mean Sunday?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In the vast majority of cron implementations, both 0 and 7 represent Sunday."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
