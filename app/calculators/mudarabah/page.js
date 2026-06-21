'use client';
import { useState } from 'react';

export default function MudarabahCalculator() {
  const [capital, setCapital] = useState(50000);
  const [revenue, setRevenue] = useState(80000);
  const [expenses, setExpenses] = useState(20000);
  const [investorShare, setInvestorShare] = useState(60); // 60% for investor

  const netProfit = revenue - expenses;
  const isLoss = netProfit < 0;
  
  const investorProfit = !isLoss ? netProfit * (investorShare / 100) : 0;
  const managerProfit = !isLoss ? netProfit * ((100 - investorShare) / 100) : 0;

  const investorFinal = !isLoss ? capital + investorProfit : capital + netProfit; // netProfit is negative in loss
  
  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>⚖️ Mudarabah Calculator (Profit Sharing)</h1>
        <p>Calculate profit distribution or loss allocation between an Investor (Rabb-ul-Mal) and an Entrepreneur (Mudarib) in Islamic finance.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Project Details</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Capital Invested ($)</label>
            <input type="number" className="input" value={capital} onChange={e => setCapital(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Total Project Revenue ($)</label>
            <input type="number" className="input" value={revenue} onChange={e => setRevenue(Number(e.target.value))} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Total Project Expenses ($)</label>
            <input type="number" className="input" value={expenses} onChange={e => setExpenses(Number(e.target.value))} />
          </div>

          <h3 style={{ marginBottom: '16px' }}>Agreed Profit Sharing Ratio</h3>
          <div>
            <label className="label">Investor (Rabb-ul-Mal) Share: {investorShare}%</label>
            <input type="range" min="1" max="99" value={investorShare} onChange={e => setInvestorShare(Number(e.target.value))} style={{ width: '100%' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Manager (Mudarib) Share: {100 - investorShare}%
            </p>
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Net Project Result</div>
            <div className="result-value" style={{ color: isLoss ? 'var(--danger)' : 'var(--success)' }}>
              {isLoss ? '-' : '+'}{fmt(Math.abs(netProfit))}
            </div>
          </div>
          
          <div className="grid-2" style={{ marginBottom: '16px' }}>
            <div className="result-box" style={{ padding: '16px' }}>
              <div className="result-label">Investor's Profit</div>
              <div className="result-value" style={{ fontSize: '1.2rem', color: isLoss ? 'var(--text-muted)' : 'var(--primary)' }}>{fmt(investorProfit)}</div>
              {isLoss && <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>Bears all financial loss</p>}
            </div>
            <div className="result-box" style={{ padding: '16px' }}>
              <div className="result-label">Manager's Profit</div>
              <div className="result-value" style={{ fontSize: '1.2rem', color: isLoss ? 'var(--text-muted)' : 'var(--accent)' }}>{fmt(managerProfit)}</div>
              {isLoss && <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>Loses their time and effort</p>}
            </div>
          </div>

          <div className="card" style={{ padding: '16px', textAlign: 'center', background: 'var(--bg)' }}>
            <div className="result-label">Investor's Final Capital Returned</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)' }}>{fmt(investorFinal)}</div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px' }}>
        <h2>What is Mudarabah?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '12px' }}>
          Mudarabah is an Islamic contract in which one party provides capital (Rabb-ul-Mal) and the other party provides labor and expertise (Mudarib). Profits are shared between them according to a mutually agreed ratio at the start of the contract. However, in the event of a financial loss, the investor bears the entire monetary loss (unless the manager was negligent), while the manager loses the time and effort they invested. This ensures a fair distribution of risk.
        </p>
      </article>
    </div>
  );
}
