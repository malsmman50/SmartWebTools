'use client';
import { useState } from 'react';

export default function IslamicFireCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(60000);
  const [expectedReturn, setExpectedReturn] = useState(8.0);
  const [inflationRate, setInflationRate] = useState(3.0);
  const [isZakatable, setIsZakatable] = useState(true);

  // Math
  const realReturn = (expectedReturn - inflationRate) / 100;
  
  // Conventional: SWR = Real Return (e.g., 8% - 3% = 5%)
  const conventionalSWR = realReturn;
  const conventionalFireNumber = conventionalSWR > 0 ? annualExpenses / conventionalSWR : 0;

  // Islamic: We must subtract 2.5% from the real return to account for annual Zakat on the principal
  const zakatRate = isZakatable ? 0.025 : 0;
  const islamicSWR = realReturn - zakatRate;
  const islamicFireNumber = islamicSWR > 0 ? annualExpenses / islamicSWR : 0;

  const zakatGap = islamicFireNumber - conventionalFireNumber;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>🔥 Islamic FIRE Calculator</h1>
        <p>Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the 2.5% annual Zakat obligation.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Your Goals & Market Assumptions</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Desired Annual Living Expenses ($)</label>
            <input type="number" className="input" value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>How much money do you need per year to live comfortably?</p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Expected Halal Investment Return (%)</label>
            <input type="number" className="input" value={expectedReturn} step="0.1" onChange={e => setExpectedReturn(Number(e.target.value))} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Historical average of Halal Index Funds (e.g., SPUS, HLAL) is around 8-10%.</p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Expected Inflation Rate (%)</label>
            <input type="number" className="input" value={inflationRate} step="0.1" onChange={e => setInflationRate(Number(e.target.value))} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Historical average is around 3%.</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label">Is the Retirement Portfolio Fully Zakatable?</label>
            <select className="input" value={isZakatable.toString()} onChange={e => setIsZakatable(e.target.value === 'true')}>
              <option value="true">Yes (Liquid Stocks, Cash, Crypto)</option>
              <option value="false">No (Real Estate Rentals - Zakat is on income, not property value)</option>
            </select>
          </div>
        </div>

        <div>
          {islamicSWR <= 0 ? (
             <div className="card" style={{ border: '1px solid var(--danger)' }}>
                <h3 style={{ color: 'var(--danger)' }}>⚠️ Unsustainable Assumptions</h3>
                <p style={{ marginTop: '12px' }}>Your expected return ({expectedReturn}%) minus inflation ({inflationRate}%) and Zakat ({(zakatRate*100)}%) results in a negative or zero growth rate.</p>
                <p style={{ marginTop: '8px' }}>Your portfolio will inevitably deplete over time. You must find investments with higher returns or lower your inflation expectations to sustain a permanent retirement.</p>
             </div>
          ) : (
            <>
              <div className="result-box" style={{ marginBottom: '16px', background: 'var(--primary)', color: 'white' }}>
                <div className="result-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Islamic FIRE Number (Target Net Worth)</div>
                <div className="result-value" style={{ fontSize: '2.5rem', color: 'white' }}>{fmt(islamicFireNumber)}</div>
                <p style={{ fontSize: '0.9rem', marginTop: '12px' }}>This is the total invested amount needed to sustain your {fmt(annualExpenses)} lifestyle forever, while paying {fmt(islamicFireNumber * 0.025)} in Zakat every year.</p>
              </div>

              <div className="grid-2">
                <div className="result-box">
                  <div className="result-label">Conventional FIRE Number</div>
                  <div className="result-value" style={{ fontSize: '1.4rem' }}>{fmt(conventionalFireNumber)}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Ignoring Zakat</p>
                </div>
                <div className="result-box">
                  <div className="result-label">The "Zakat Gap"</div>
                  <div className="result-value" style={{ fontSize: '1.4rem', color: 'var(--warning)' }}>+{fmt(zakatGap)}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Extra capital needed to sustain charity.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>The Ultimate Guide to Islamic FIRE (Financial Independence, Retire Early)</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          The FIRE movement is built on a simple premise: save aggressively, invest in index funds, and live off the passive income so you can retire decades earlier than the traditional age of 65. The backbone of FIRE is the <strong>"4% Rule"</strong> (Safe Withdrawal Rate), which states you can safely withdraw 4% of your portfolio every year without running out of money. 
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          However, conventional FIRE calculators fail Muslims because they ignore two critical Islamic financial realities: <strong>Riba (Interest) is forbidden</strong>, and <strong>Zakat (2.5% wealth tax) is mandatory</strong>.
        </p>

        <h3 style={{ marginTop: '24px' }}>The "Double Burden" of Islamic FIRE</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          In a conventional FIRE plan, if the stock market grows by 7% and inflation is 3%, you have a 4% "real return" to live on. But for a Muslim, wealth that sits in liquid, Zakatable assets (like Shariah-compliant stock portfolios, cash, or gold) is subject to a 2.5% annual Zakat.
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          If your real return is 4%, and you pay 2.5% in Zakat, you only have <strong>1.5% left to live on!</strong> If you withdraw 4% for your living expenses anyway, your total outflow becomes 6.5% (4% living + 2.5% Zakat), which means your portfolio is shrinking every year and will eventually run out.
        </p>

        <h3 style={{ marginTop: '24px' }}>The Solution: The Zakat Gap</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          To retire safely while fulfilling your religious obligations, your target "FIRE Number" must be significantly higher than a non-Muslim's FIRE number. We call this difference the <strong>Zakat Gap</strong>. By building a larger capital base, you generate enough returns to comfortably pay for your life AND give massive amounts of charity to the poor every single year, indefinitely.
        </p>

        <h3 style={{ marginTop: '24px' }}>Frequently Asked Questions (FAQ)</h3>
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '1.1rem' }}>How can I reduce the Zakat Gap?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>You can invest in non-Zakatable assets. For example, if you buy a rental property, Zakat is generally not paid on the value of the property itself, but only on the rental income (after expenses and if it reaches Nisab). This drastically lowers the total Zakat burden compared to holding a massive liquid stock portfolio.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Can I use a regular 401(k) for Halal FIRE?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Yes, if you self-direct your 401(k) or use a brokerage link to buy Shariah-compliant mutual funds or ETFs (like SPUS, HLAL, AMJA). You must ensure your money is not sitting in default target-date funds, which heavily rely on interest-bearing conventional bonds.</p>

          <h4 style={{ fontSize: '1.1rem' }}>Are Islamic investments less profitable?</h4>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', marginBottom: '16px' }}>Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the S&P 500. By excluding highly leveraged companies and conventional banks (which often crash during financial crises), Halal funds sometimes even outperform the broader market during downturns.</p>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I reduce the Zakat Gap?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can invest in non-Zakatable assets like rental properties. Zakat is generally paid on the rental income, not the property value itself, drastically lowering the burden."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use a regular 401(k) for Halal FIRE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if you use a brokerage link to buy Shariah-compliant mutual funds or ETFs. You must avoid default target-date funds which rely on interest-bearing bonds."
            }
          },
          {
            "@type": "Question",
            "name": "Are Islamic investments less profitable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the broader market, and sometimes outperform during financial crises by excluding highly leveraged companies."
            }
          }
        ]
      })}} />
    </div>
  );
}
