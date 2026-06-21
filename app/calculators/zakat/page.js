'use client';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

export default function ZakatCalculator() {
  const [cash, setCash] = useState(5000);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [debts, setDebts] = useState(0);
  const [nisab, setNisab] = useState(0);
  
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [isManualNisab, setIsManualNisab] = useState(false);

  useEffect(() => {
    // Attempt to fetch live gold/silver prices (85g Gold or 595g Silver)
    // Using a common public metals API or fallback to manual if it fails/CORS issues
    const fetchNisab = async () => {
      try {
        const res = await fetch('/api/gold', {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(4000) // 4 second timeout
        });
        if (!res.ok) throw new Error('API Response not OK');
        const data = await res.json();
        
        if (!data.pricePerOunce) {
           throw new Error('Missing pricePerOunce in response');
        }

        const goldPricePerOz = data.pricePerOunce;
        const goldPricePerGram = goldPricePerOz / 31.1035;
        const nisabGold = goldPricePerGram * 85; // 85 grams threshold
        setNisab(Math.round(nisabGold));
        setApiStatus('success');
      } catch (err) {
        console.warn('Failed to fetch live Nisab:', err);
        setApiStatus('error');
        setIsManualNisab(true);
      }
    };
    fetchNisab();
  }, []);

  const totalWealth = cash + gold + silver + business;
  const eligibleWealth = totalWealth - debts;
  const isEligible = eligibleWealth >= nisab;
  const zakatDue = isEligible ? eligibleWealth * 0.025 : 0;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🤲 Comprehensive Zakat Calculator</h1>
        <p>Calculate your annual Zakat (2.5%) easily and accurately according to Islamic guidelines. No data is saved.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Assets (What you own)</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Cash & Savings ($)</label>
            <NumericFormat className="input" value={cash} onValueChange={v => setCash(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Gold Value ($)</label>
            <NumericFormat className="input" value={gold} onValueChange={v => setGold(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Silver Value ($)</label>
            <NumericFormat className="input" value={silver} onValueChange={v => setSilver(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Business Inventory & Shares ($)</label>
            <NumericFormat className="input" value={business} onValueChange={v => setBusiness(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: '16px' }}>Liabilities (What you owe)</h3>
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Immediate Debts & Bills ($)</label>
            <NumericFormat className="input" value={debts} onValueChange={v => setDebts(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: '16px' }}>Threshold (Nisab)</h3>
          <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            {apiStatus === 'loading' && <p style={{ color: 'var(--text-muted)' }}>🔄 Fetching live gold prices...</p>}
            
            {apiStatus === 'success' && !isManualNisab && (
              <div>
                <p style={{ color: 'var(--success)', marginBottom: '8px', fontWeight: 600 }}>✅ Live Nisab Value Loaded: {fmt(nisab)}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Based on current global market prices for 85 grams of Gold.</p>
                <button onClick={() => setIsManualNisab(true)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>Enter Manually Instead</button>
              </div>
            )}

            {(apiStatus === 'error' || isManualNisab) && (
              <div>
                {apiStatus === 'error' && (
                  <p style={{ color: 'var(--danger)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    ⚠️ We couldn't connect to the live market API at this moment. Please enter the current Nisab value in your local currency manually below.
                  </p>
                )}
                <label className="label">Manual Nisab Value ($)</label>
                <NumericFormat className="input" value={nisab} onValueChange={v => setNisab(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Typically the value of 595g of silver or 85g of gold.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: '16px' }}>
            <div className="result-label">Total Zakat Due (2.5%)</div>
            <div className="result-value" style={{ color: isEligible ? 'var(--success)' : 'var(--text-muted)' }}>
              {isEligible ? fmt(zakatDue) : '$0.00'}
            </div>
            {!isEligible && nisab > 0 && <p style={{ color: 'var(--danger)', marginTop: '8px', fontSize: '0.9rem' }}>Your net wealth is below the Nisab threshold. No Zakat is due.</p>}
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

      {/* SEO Content Expansion (800+ words) */}
      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Complete Guide to Calculating Zakat Online</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          Zakat is one of the Five Pillars of Islam, representing a mandatory charitable contribution that purifies a Muslim's wealth. Unlike a conventional tax, Zakat is deeply spiritual and ensures the equitable distribution of wealth within society. This free online Zakat calculator is designed to help you determine your exact obligation accurately and privately.
        </p>

        <h3 style={{ marginTop: '24px' }}>1. Understanding the Nisab Threshold</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Before calculating how much you owe, you must determine if you meet the minimum threshold of wealth known as <strong>Nisab</strong>. The Nisab was established by the Prophet Muhammad (PBUH) as the equivalent of 85 grams of pure gold or 595 grams of pure silver.
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Because the value of fiat currencies fluctuates constantly, our calculator attempts to fetch live global market prices for gold to establish an accurate Nisab. If the live feed is unavailable, you can manually input the value of 85 grams of gold in your local currency. You only owe Zakat if your total net wealth has equaled or exceeded this Nisab amount for one full lunar year (Hawl).
        </p>

        <h3 style={{ marginTop: '24px' }}>2. What Assets are Zakatable?</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Not everything you own is subject to Zakat. For instance, the house you live in, the car you drive, and your personal furniture are exempt. The assets that are subject to Zakat include:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <li><strong>Cash & Savings:</strong> Money in your bank accounts, physical cash at home, or digital wallets.</li>
          <li><strong>Gold & Silver:</strong> Jewelry, coins, or bullion. (Note: The ruling on jewelry worn daily varies by madhab).</li>
          <li><strong>Business Inventory:</strong> Goods purchased with the express intention of reselling them for profit.</li>
          <li><strong>Stocks & Shares:</strong> If held for trading, the full market value is Zakatable. If held for long-term dividends, Zakat is paid on the company's Zakatable assets.</li>
          <li><strong>Cryptocurrency:</strong> Most modern scholars consider cryptocurrencies to be Zakatable wealth.</li>
        </ul>

        <h3 style={{ marginTop: '24px' }}>3. Deducting Liabilities</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Islam aims for fairness. You are allowed to deduct immediate, pressing debts before calculating your Zakat. This includes utility bills due immediately, the upcoming month's rent, or a short-term personal loan that is currently due. However, long-term debts that are not due immediately (like the future installments of a 20-year Murabaha home financing) should not be deducted in full, as doing so would unjustly exempt wealthy individuals from giving Zakat.
        </p>

        <h3 style={{ marginTop: '24px' }}>4. The 2.5% Rate</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Once you have summed up your Zakatable assets and subtracted your immediate liabilities, you arrive at your Net Zakatable Wealth. If this number is greater than the Nisab, you multiply it by 2.5% (or 0.025). This is the standard rate for cash, business inventory, and precious metals. Interestingly, 2.5% is equivalent to 1/40th of your wealth.
        </p>

        <h3 style={{ marginTop: '24px' }}>Why Use Our Client-Side Calculator?</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Financial privacy is critical. Many online calculators send your inputted numbers to a remote server for processing. Our SmartCalcTools Zakat Calculator is 100% client-side. The mathematical operations happen entirely within your web browser. We do not store, track, or intercept your personal financial data, making this the most secure way to calculate your religious obligations.
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>Do I pay Zakat on my 401(k) or Retirement Funds?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>If you have full access and control over the funds (meaning you could withdraw them today, even with a penalty), most scholars state you must pay Zakat on the net withdrawable amount. If you have no access until a certain age, Zakat is only due once you receive the funds.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Should I use the Gold or Silver Nisab?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Historically, the value of 85g of gold and 595g of silver were relatively equal. Today, silver is much cheaper. Many scholars recommend using the silver Nisab because it is lower, which means more people will pay Zakat, resulting in more money distributed to the poor. However, the gold Nisab is also entirely valid and preferred by many contemporary fiqh councils.</p>

          <h4 style={{ fontSize: '1.1rem' }}>When is Zakat due?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Zakat is due immediately upon the completion of a Hawl (one lunar year, roughly 354 days) from the date your wealth first reached the Nisab threshold. Many Muslims choose to pay during Ramadan due to the multiplied spiritual rewards.</p>
        </div>
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I pay Zakat on my 401(k) or Retirement Funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you have full access and control over the funds, you must pay Zakat on the net withdrawable amount. If you have no access, Zakat is only due once you receive the funds."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use the Gold or Silver Nisab?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many scholars recommend using the silver Nisab because it is lower, meaning more money goes to the poor. However, the gold Nisab is also entirely valid."
            }
          },
          {
            "@type": "Question",
            "name": "When is Zakat due?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zakat is due immediately upon the completion of a Hawl (one lunar year) from the date your wealth first reached the Nisab threshold."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
