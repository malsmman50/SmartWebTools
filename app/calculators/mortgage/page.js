'use client';
import { useState } from 'react';

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthly = monthlyRate > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : principal / numPayments;
  const totalPaid = monthly * numPayments;
  const totalInterest = totalPaid - principal;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🏠 Mortgage Calculator</h1>
        <p>Calculate your monthly mortgage payment and see how much you'll pay in total interest over the life of your loan.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Home Loan Amount ($)</label>
            <input type="number" className="input" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Annual Interest Rate (%)</label>
            <input type="number" className="input" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Loan Term (Years)</label>
            <input type="number" className="input" value={years} onChange={e => setYears(Number(e.target.value))} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Monthly Payment</div>
            <div className="result-value" style={{ color: 'var(--primary)' }}>{fmt(monthly)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">Total Interest</div>
              <div className="result-value" style={{ fontSize: '1.5rem', color: 'var(--danger)' }}>{fmt(totalInterest)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Total Paid</div>
              <div className="result-value" style={{ fontSize: '1.5rem', color: 'var(--text)' }}>{fmt(totalPaid)}</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
              <div>
                <div style={{ width: '16px', height: '16px', background: 'var(--primary)', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></div>
                <span style={{ fontSize: '0.9rem' }}>Principal: {((principal / totalPaid) * 100).toFixed(1)}%</span>
              </div>
              <div>
                <div style={{ width: '16px', height: '16px', background: 'var(--danger)', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></div>
                <span style={{ fontSize: '0.9rem' }}>Interest: {((totalInterest / totalPaid) * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div style={{ marginTop: '16px', height: '24px', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${(principal / totalPaid) * 100}%`, background: 'var(--primary)', transition: 'width 0.5s' }}></div>
              <div style={{ flex: 1, background: 'var(--danger)' }}></div>
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>How Does a Mortgage Work?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          A mortgage is a loan used to purchase a home. The borrower agrees to pay back the loan over a set period (typically 15 or 30 years) with interest. Each monthly payment is split between paying off the principal (the original loan amount) and interest charges. In the early years of a mortgage, a larger portion of each payment goes toward interest. Over time, more of the payment goes toward reducing the principal balance. This calculator helps you understand exactly how much your mortgage will cost over its full term.
        </p>
        <h3 style={{ marginTop: '20px' }}>The Mortgage Payment Formula</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '8px' }}>
          Monthly Payment = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal loan amount, r is the monthly interest rate (annual rate / 12), and n is the total number of payments (years × 12).
        </p>
      </article>
    </div>
  );
}
