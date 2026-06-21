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

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Complete Guide to Mudarabah (Profit Sharing)</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          Mudarabah is a specialized partnership in Islamic finance where one party provides the capital (the Rab-ul-Mal or Investor) and the other party provides the expertise and labor (the Mudarib or Working Partner). It is one of the purest forms of Islamic equity financing, fundamentally shifting the dynamic from a lender-borrower relationship to a genuine partnership based on shared risk and reward.
        </p>

        <h3 style={{ marginTop: '24px' }}>How Mudarabah Works</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Unlike a conventional interest-bearing savings account or loan where the return is guaranteed regardless of the business's performance, Mudarabah is entirely dependent on the actual profit generated by the enterprise. 
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>The Capital:</strong> The investor provides 100% of the financial capital. The working partner contributes zero financial capital, only their time, effort, and business acumen.</li>
          <li><strong>Profit Sharing Ratio (PSR):</strong> Before the business begins, both parties must agree on a Profit Sharing Ratio (e.g., 60% to the Investor, 40% to the Working Partner). This ratio applies strictly to the net profit, not the revenue or capital.</li>
          <li><strong>Loss Distribution:</strong> In the event of a financial loss (not caused by the negligence of the Mudarib), the Investor bears 100% of the financial loss, losing a portion or all of their capital. The Working Partner loses the value of their time and effort (sweat equity) but is not liable to repay the lost capital to the Investor.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Mudarabah in Modern Islamic Banking</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Today, Mudarabah is most commonly used in Islamic savings and investment accounts. When you open a Mudarabah deposit account at an Islamic bank, you are the Investor (Rab-ul-Mal), and the bank is the Working Partner (Mudarib). The bank pools your money with other depositors and invests it in Halal projects (like Murabaha financing or Sukuk). At the end of the month or quarter, the bank calculates the profit generated from these investments and distributes it according to the pre-agreed PSR.
        </p>

        <h3 style={{ marginTop: '24px' }}>Weightages Explained</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          When banks manage massive pools of depositors, they use a system of "Weightages" to distribute the Investor's share of the profit fairly. A depositor who locks their money for 5 years takes on more risk and provides more stability to the bank than a depositor who can withdraw anytime. Therefore, the 5-year depositor is assigned a higher "Weightage" (e.g., 1.5) compared to the standard depositor (1.0), meaning they receive a proportionately larger slice of the profit pie.
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>Is the principal amount guaranteed in Mudarabah?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>No. Guaranteeing the principal amount would turn the contract into a conventional loan (Riba). In a true Mudarabah, your capital is at risk. However, Islamic banks utilize strict risk management and reserve funds (Profit Equalization Reserves) to minimize this risk practically.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Can the Profit Sharing Ratio be changed later?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>The PSR must be agreed upon before the venture begins. However, both parties can mutually agree to change the ratio for future business cycles. The bank announces deposit weightages periodically.</p>

          <h4 style={{ fontSize: '1.1rem' }}>What if the Mudarib (Working Partner) is negligent?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>The rule that the investor bears all financial loss only applies to normal business risks. If it is proven that the Mudarib committed fraud, negligence, or breached the contract terms, the Mudarib becomes liable to refund the capital to the investor.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the principal amount guaranteed in Mudarabah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Guaranteeing the principal amount would turn the contract into a conventional loan. In a true Mudarabah, your capital is at risk."
            }
          },
          {
            "@type": "Question",
            "name": "Can the Profit Sharing Ratio be changed later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The PSR must be agreed upon before the venture begins. However, both parties can mutually agree to change the ratio for future business cycles."
            }
          },
          {
            "@type": "Question",
            "name": "What if the Mudarib (Working Partner) is negligent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If it is proven that the Mudarib committed fraud, negligence, or breached the contract terms, they become liable to refund the capital to the investor."
            }
          }
        ]
      })}} />
    </div>
  );
}
