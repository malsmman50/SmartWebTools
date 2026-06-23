'use client';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function MurabahaCalculator() {
  const [cost, setCost] = useState(100000);
  const [markupPercent, setMarkupPercent] = useState(15);
  const [months, setMonths] = useState(60);
  const [downPayment, setDownPayment] = useState(20000);

  const financedAmount = cost - downPayment;
  const profitAmount = financedAmount > 0 ? financedAmount * (markupPercent / 100) : 0;
  const totalDeferredBalance = financedAmount + profitAmount;
  const trueSellingPrice = cost + profitAmount;
  const monthlyInstallment = months > 0 && totalDeferredBalance > 0 ? totalDeferredBalance / months : 0;

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
            <NumericFormat className="input" value={cost} onValueChange={v => setCost(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Down Payment ($)</label>
            <NumericFormat className="input" value={downPayment} onValueChange={v => setDownPayment(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
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
              <div className="result-label">Total Contractual Selling Price</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{fmt(trueSellingPrice)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">Total Deferred Balance</div>
              <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{fmt(totalDeferredBalance)}</div>
            </div>
          </div>
          <div className="result-box" style={{ marginTop: '16px' }}>
            <div className="result-label">Financier's Fixed Profit</div>
            <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--success)' }}>{fmt(profitAmount)}</div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Complete Guide to Murabaha (Islamic Financing)</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          Murabaha is one of the most common modes of Islamic financing used globally to purchase homes, vehicles, and business equipment without resorting to interest-based (Riba) loans. In a conventional loan, a bank lends you money and charges compounding interest over time. In a Murabaha transaction, the financier purchases the actual asset and sells it to you at a pre-agreed profit margin. You then pay for the asset in fixed monthly installments.
        </p>

        <h3 style={{ marginTop: '24px' }}>How Murabaha Works</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          The process of Murabaha is entirely transparent and based on a tangible asset. Here are the typical steps:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Asset Identification:</strong> You identify the property or vehicle you wish to buy.</li>
          <li><strong>Purchase by Bank:</strong> The Islamic bank purchases the asset directly from the seller and takes ownership.</li>
          <li><strong>Sale to Customer:</strong> The bank sells the asset to you at the original cost plus a transparent, mutually agreed profit margin.</li>
          <li><strong>Fixed Installments:</strong> You pay the total price (Cost + Profit) over a set period (e.g., 5 years) in equal monthly installments.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>Murabaha vs. Conventional Mortgage</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          The key difference lies in the nature of the contract. A conventional mortgage is a money-lending contract where the asset is just collateral. If you default or miss payments, the bank charges penalty interest, compounding your debt. A Murabaha is a trading contract. The profit is fixed on day one. If you delay a payment, the bank cannot charge you additional profit or interest (though some may charge a charitable penalty to deter deliberate delays, which the bank cannot keep as profit).
        </p>

        <h3 style={{ marginTop: '24px' }}>Calculating the Profit Margin</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Unlike a conventional APR that compounds over the remaining balance, the profit margin in a Murabaha contract is often calculated upfront as a flat rate against the financed amount. Our Murabaha calculator allows you to input the cost of the asset, your down payment, and the agreed profit margin to instantly see your fixed monthly installment and the exact profit the financier will earn.
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>Is the Murabaha profit margin the same as interest?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>No. While Islamic banks often benchmark their profit rates against market interest rates (like LIBOR or SOFR) to remain competitive, the underlying mechanism is a sale, not a loan. Profit from trade is Halal, whereas profit from lending money (Riba) is Haram.</p>

          <h4 style={{ fontSize: '1.1rem' }}>What happens if I want to pay off a Murabaha early?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Since the profit was fixed and added to the total debt upfront, early settlement relies on a concept called <i>Ibra'</i> (rebate). Most Islamic banks will voluntarily grant a rebate on the unearned profit for the remaining years, though they are not contractually obligated to do so upfront.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Can Murabaha be used for personal cash loans?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>No. Murabaha requires a tangible asset (like a house, car, or commodities). It cannot be used to simply generate cash liquidity, as that would replicate a conventional interest-bearing personal loan. For cash needs, banks use a different structure called Tawarruq.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is the Murabaha profit margin the same as interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. While banks benchmark rates to remain competitive, the underlying mechanism is a sale, not a loan. Profit from trade is Halal, whereas profit from lending money is Haram."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I want to pay off a Murabaha early?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early settlement relies on a concept called Ibra' (rebate). Most Islamic banks will voluntarily grant a rebate on the unearned profit for the remaining years."
            }
          },
          {
            "@type": "Question",
            "name": "Can Murabaha be used for personal cash loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Murabaha requires a tangible asset (like a house, car, or commodities). It cannot be used to simply generate cash liquidity."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
