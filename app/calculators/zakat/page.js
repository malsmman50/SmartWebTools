'use client';
import { useState } from 'react';

export default function ZakatCalculator() {
  const [cash, setCash] = useState(5000);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [debts, setDebts] = useState(0);
  const [nisab, setNisab] = useState(500); // Approximate Nisab value for silver in USD

  const totalWealth = cash + gold + silver + business;
  const eligibleWealth = totalWealth - debts;
  const isEligible = eligibleWealth >= nisab;
  const zakatDue = isEligible ? eligibleWealth * 0.025 : 0;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🤲 Zakat Calculator</h1>
        <p>Calculate your annual Zakat (2.5%) easily and accurately according to Islamic guidelines. No data is saved.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Assets (What you own)</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Cash & Savings ($)</label>
            <input type="number" className="input" value={cash} onChange={e => setCash(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Gold Value ($)</label>
            <input type="number" className="input" value={gold} onChange={e => setGold(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Silver Value ($)</label>
            <input type="number" className="input" value={silver} onChange={e => setSilver(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Business Inventory & Shares ($)</label>
            <input type="number" className="input" value={business} onChange={e => setBusiness(Number(e.target.value))} />
          </div>

          <h3 style={{ marginBottom: '16px' }}>Liabilities (What you owe)</h3>
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Immediate Debts & Bills ($)</label>
            <input type="number" className="input" value={debts} onChange={e => setDebts(Number(e.target.value))} />
          </div>

          <h3 style={{ marginBottom: '16px' }}>Threshold (Nisab)</h3>
          <div>
            <label className="label">Current Nisab Value ($)</label>
            <input type="number" className="input" value={nisab} onChange={e => setNisab(Number(e.target.value))} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Typically the value of 595g of silver or 85g of gold.</p>
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Total Zakat Due (2.5%)</div>
            <div className="result-value" style={{ color: isEligible ? 'var(--success)' : 'var(--text-muted)' }}>
              {isEligible ? fmt(zakatDue) : '$0.00'}
            </div>
            {!isEligible && <p style={{ color: 'var(--danger)', marginTop: '8px', fontSize: '0.9rem' }}>Your net wealth is below the Nisab threshold. No Zakat is due.</p>}
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">Gross Wealth</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{fmt(totalWealth)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Net Zakat-Eligible Wealth</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>{fmt(eligibleWealth)}</div>
            </div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>What is Zakat?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Zakat is one of the Five Pillars of Islam. It is a religious obligation for all Muslims who meet the necessary criteria of wealth to donate a certain portion of wealth each year to charitable causes. The mandatory percentage is generally 2.5% of a Muslim's total savings and wealth that exceeds a minimum amount known as Nisab. Zakat is not a tax on income, but a purification of stored wealth.
        </p>
      </article>
    </div>
  );
}
