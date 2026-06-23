'use client';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function ROICalculator() {
  const [invested, setInvested] = useState(5000);
  const [returned, setReturned] = useState(7500);

  const roi = invested > 0 ? ((returned - invested) / invested) * 100 : 0;
  const profit = returned - invested;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>💰 ROI Calculator</h1>
        <p>Calculate the Return on Investment for any project, stock, or business decision.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Amount Invested ($)</label>
            <NumericFormat className="input" value={invested} onValueChange={v => setInvested(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div>
            <label className="label">Amount Returned ($)</label>
            <NumericFormat className="input" value={returned} onValueChange={v => setReturned(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Return on Investment</div>
            <div className="result-value" style={{ color: roi >= 0 ? 'var(--success)' : 'var(--danger)' }}>{roi.toFixed(2)}%</div>
          </div>
          <div className="result-box">
            <div className="result-label">{profit >= 0 ? 'Net Profit' : 'Net Loss'}</div>
            <div className="result-value" style={{ fontSize: '1.8rem', color: profit >= 0 ? 'var(--success)' : 'var(--danger)' }}>${profit.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>How to Calculate ROI</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Return on Investment (ROI) is one of the most widely used financial metrics. The formula is simple: ROI = ((Net Profit) / Cost of Investment) × 100. A positive ROI means you made money; a negative ROI means you lost money. While ROI is useful for quick comparisons, remember that it doesn't account for the time period of the investment. An ROI of 50% over 10 years is very different from 50% over 1 year. For time-adjusted returns, consider using annualized ROI or IRR (Internal Rate of Return).
        </p>
      </article>
    </div>
  );
}
