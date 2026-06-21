'use client';
import { useState } from 'react';

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(200);

  const r = rate / 100;
  const futureValue = principal * Math.pow(1 + r, years) + monthly * 12 * ((Math.pow(1 + r, years) - 1) / r);
  const totalContributions = principal + (monthly * 12 * years);
  const totalInterest = futureValue - totalContributions;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>📈 Compound Interest Calculator</h1>
        <p>Discover how your money grows over time with the power of compound interest and regular contributions.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Initial Investment ($)</label>
            <input type="number" className="input" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Annual Interest Rate (%)</label>
            <input type="number" className="input" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Monthly Contribution ($)</label>
            <input type="number" className="input" value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Investment Period (Years): {years}</label>
            <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Future Value</div>
            <div className="result-value" style={{ color: 'var(--success)' }}>{fmt(futureValue)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">Total Contributions</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>{fmt(totalContributions)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Interest Earned</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--success)' }}>{fmt(totalInterest)}</div>
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>The Power of Compound Interest</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Albert Einstein reportedly called compound interest "the eighth wonder of the world." Compound interest is the interest earned on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which is calculated only on the principal, compound interest allows your wealth to grow exponentially over time. The key to maximizing compound interest is starting early and contributing consistently. Even small monthly contributions can grow into substantial wealth over decades.
        </p>
      </article>
    </div>
  );
}
