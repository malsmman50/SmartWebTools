'use client';
import { useState } from 'react';

export default function MurabahaCalculator() {
  const [cost, setCost] = useState(100000);
  const [markupPercent, setMarkupPercent] = useState(15);
  const [months, setMonths] = useState(60);
  const [downPayment, setDownPayment] = useState(20000);

  const financedAmount = cost - downPayment;
  const profitAmount = financedAmount > 0 ? financedAmount * (markupPercent / 100) : 0;
  const totalSellingPrice = financedAmount + profitAmount;
  const monthlyInstallment = months > 0 && totalSellingPrice > 0 ? totalSellingPrice / months : 0;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🤝 Murabaha Calculator (Islamic Financing)</h1>
        <p>Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Asset Cost / Purchase Price ($)</label>
            <input type="number" className="input" value={cost} onChange={e => setCost(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Down Payment ($)</label>
            <input type="number" className="input" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Agreed Profit Margin (%)</label>
            <input type="number" className="input" value={markupPercent} onChange={e => setMarkupPercent(Number(e.target.value))} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>This is a fixed markup added to the cost, not compounding interest.</p>
          </div>
          <div>
            <label className="label">Payment Term (Months)</label>
            <input type="number" className="input" value={months} onChange={e => setMonths(Number(e.target.value))} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Fixed Monthly Installment</div>
            <div className="result-value" style={{ color: 'var(--primary)' }}>{fmt(monthlyInstallment)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">Total Selling Price (Excl. Down Payment)</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{fmt(totalSellingPrice)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Financier's Fixed Profit</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--success)' }}>{fmt(profitAmount)}</div>
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>What is Murabaha?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Murabaha is an Islamic financing structure where the seller and buyer agree to the cost and markup of an asset. Unlike conventional interest-based (Riba) loans where money is lent to make money, Murabaha is an actual sale of goods. The financier buys the asset (like a house or car) and sells it to the customer at a higher, agreed-upon price, paid in fixed installments. There are no compounding interest rates, and the price cannot increase if a payment is delayed.
        </p>
      </article>
    </div>
  );
}
