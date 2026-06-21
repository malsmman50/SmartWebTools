'use client';
import { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const payment = monthlyRate > 0 ? (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1) : amount / n;
  const totalPaid = payment * n;
  const totalInterest = totalPaid - amount;

  const fmt = (v) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🏦 Loan Calculator</h1>
        <p>Calculate monthly payments and total cost for personal loans, auto loans, or any fixed-rate loan.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Loan Amount ($)</label>
            <input type="number" className="input" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Annual Interest Rate (%)</label>
            <input type="number" className="input" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Loan Term (Years): {years}</label>
            <input type="range" min="1" max="30" value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Monthly Payment</div>
            <div className="result-value" style={{ color: 'var(--primary)' }}>{fmt(payment)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">Total Interest</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--danger)' }}>{fmt(totalInterest)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Total Repayment</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{fmt(totalPaid)}</div>
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>Understanding Personal Loans</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Personal loans are unsecured loans that can be used for almost any purpose — debt consolidation, home improvement, medical bills, or major purchases. Unlike mortgages, they typically have shorter terms (1-7 years) and higher interest rates. When comparing loan offers, focus on the APR (Annual Percentage Rate) rather than just the interest rate, as the APR includes fees and gives you the true cost of borrowing.
        </p>
      </article>
    </div>
  );
}
