"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function IslamicDepositCalculatorClient({ dict, lang, initialValues }) {
  const t = dict.islamic_deposit;

  const [deposit, setDeposit] = useState(initialValues?.depositAmount ? parseFloat(initialValues.depositAmount) : 10000);
  const [expectedRate, setExpectedRate] = useState(initialValues?.depositAmount ? 5 : "");
  const [customerShare, setCustomerShare] = useState(initialValues?.depositAmount ? 80 : "");
  const [duration, setDuration] = useState(initialValues?.durationMonths ? parseFloat(initialValues.durationMonths) / 12 : 1);

  const numDeposit = Number(deposit) || 0;
  const numExpectedRate = Number(expectedRate) || 0;
  const numCustomerShare = Number(customerShare) || 0;
  const numDuration = Number(duration) || 0;

  // Math logic
  // Gross Profit = Deposit * Rate * Duration
  const grossProfit = numDeposit * (numExpectedRate / 100) * numDuration;
  
  // Customer Net Profit = Gross Profit * Customer Share Ratio
  const netProfit = grossProfit * (numCustomerShare / 100);
  
  // Bank's Share = Gross Profit - Customer Net Profit
  const bankProfit = grossProfit - netProfit;
  
  // Total Expected Balance for Customer
  const totalBalance = numDeposit + netProfit;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US", { maximumFractionDigits: 2 })} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-amount" className="label">{t.deposit}</label>
            <NumericFormat 
              id="dep-amount" 
              className="input" 
              value={deposit} 
              onValueChange={v => setDeposit(v.floatValue ?? '')} 
              thousandSeparator={true} 
              allowNegative={false} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-rate" className="label">{t.expected_rate}</label>
            <NumericFormat 
              id="dep-rate" 
              className="input" 
              value={expectedRate} 
              onValueChange={v => setExpectedRate(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={2} 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-share" className="label">{t.customer_share}</label>
            <NumericFormat 
              id="dep-share" 
              className="input" 
              value={customerShare} 
              onValueChange={v => setCustomerShare(v.floatValue ?? '')} 
              allowNegative={false} 
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue === undefined || floatValue <= 100;
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="dep-duration" className="label">{t.duration}</label>
            <NumericFormat 
              id="dep-duration" 
              className="input" 
              value={duration} 
              onValueChange={v => setDuration(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={1} 
            />
          </div>
        </div>

        <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="result-box">
            <div className="result-label">{t.deposit}</div>
            <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>
              {fmt(numDeposit)}
            </div>
          </div>

          <div className="grid-2">
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.net_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: "var(--success)" }}>
                + {fmt(netProfit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.bank_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: "var(--warning)" }}>
                {fmt(bankProfit)}
              </div>
            </div>
          </div>

          <div className="result-box" style={{ background: "var(--success)", color: "#fff", borderColor: "var(--success)" }}>
            <div className="result-label" style={{ color: "rgba(255,255,255,0.8)" }}>{t.total_balance}</div>
            <div className="result-value">
              {fmt(totalBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>حاسبة الودائع الإسلامية (المضاربة)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              حاسبة الودائع الإسلامية مصممة لمساعدتك على توقع العوائد والأرباح من حسابات التوفير والودائع الاستثمارية المتوافقة مع الشريعة الإسلامية والتي تعتمد على مبدأ "المضاربة". في عقد المضاربة، تقوم أنت (رب المال) بتوفير رأس المال، بينما يقوم البنك (المضارب) باستثماره في مشاريع مباحة، ثم يتم تقاسم الأرباح بناءً على نسبة متفق عليها مسبقاً.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>حساب وديعة استثمارية سنوية:</strong> أودعت مبلغ 50,000$ في بنك إسلامي، وأعلن البنك أن معدل الربح المتوقع للاستثمار هو 8% سنوياً، ونسبة العميل (حصتك من الربح) هي 60%. بإدخال هذه الأرقام، سيكون إجمالي الربح 4,000$، حصتك منها (الربح الصافي) 2,400$، وحصة البنك 1,600$. إجمالي الرصيد المتوقع نهاية العام: 52,400$.</li>
              <li style={{ marginBottom: "8px" }}><strong>وديعة قصيرة الأجل (6 أشهر):</strong> استثمرت 100,000$ بمعدل ربح متوقع 6%، مع حصة عميل 50%. ولكن مدة الاستثمار 0.5 سنة (6 أشهر). سيكون صافي ربحك 1,500$ فقط.</li>
              <li style={{ marginBottom: "8px" }}><strong>المقارنة بين البنوك الإسلامية:</strong> بعض البنوك تقدم معدل ربح أعلى (مثلاً 10%) ولكن حصة عميل أقل (40%). بنوك أخرى تقدم معدل ربح 7% ولكن حصة العميل 80%. يمكنك استخدام الأداة لمعرفة أي العرضين سيوفر لك ربحاً صافياً أعلى في النهاية.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>تنبيه شرعي ومالي</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              معدل الربح في البنوك الإسلامية هو معدل <strong>"متوقع" (Expected Rate)</strong> وليس معدلاً مضموناً وثابتاً كما في البنوك الربوية. الأرباح الفعلية قد تزيد أو تنقص بناءً على أداء المحفظة الاستثمارية للبنك. هذه الحاسبة تقدم أرقاماً تقديرية بناءً على توقعات البنك لتسهيل اتخاذ قرارك المالي.
            </p>
          </>
        ) : (
          <>
            <h2>Islamic Deposit & Savings Calculator (Mudarabah)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The Islamic Deposit Calculator is designed to help you forecast returns and profits from Sharia-compliant savings accounts and investment deposits that operate on the "Mudarabah" principle. In a Mudarabah contract, you (the capital provider or Rab al-Maal) supply the funds, while the bank (the manager or Mudarib) invests it in Halal projects. The resulting profits are then shared based on a pre-agreed ratio.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Annual Investment Deposit:</strong> You deposit $50,000 in an Islamic bank. The bank announces an expected investment return rate of 8% annually, with a customer profit-sharing ratio of 60%. Entering these numbers, the gross profit is $4,000. Your net profit is $2,400, and the bank takes $1,600. Total expected balance at year-end: $52,400.</li>
              <li style={{ marginBottom: "8px" }}><strong>Short-term Deposit (6 Months):</strong> You invest $100,000 with a 6% expected rate and a 50% customer share, but the duration is 0.5 years (6 months). Your expected net profit will be $1,500.</li>
              <li style={{ marginBottom: "8px" }}><strong>Comparing Islamic Banks:</strong> Bank A offers a high expected rate (10%) but a low customer share (40%). Bank B offers a lower rate (7%) but a higher customer share (80%). Use this tool to calculate exactly which offer yields a higher net profit for your deposit.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Sharia & Financial Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              In Islamic banking, the profit rate is an <strong>"Expected Rate"</strong> and is never guaranteed or fixed as it is in conventional interest-based (Riba) banking. Actual profits may fluctuate based on the performance of the bank's investment portfolio. This calculator provides estimations based on the bank's projected figures to assist your financial planning.
            </p>
          </>
        )}
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": lang === "ar" ? [
          {
            "@type": "Question",
            "name": "ما الفرق بين معدل الربح وحصة العميل؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "معدل الربح هو العائد الإجمالي الذي حققه استثمار أموالك في السوق. أما حصة العميل فهي النسبة المتفق عليها التي ستحصل أنت عليها من ذلك الربح الإجمالي، والباقي يأخذه البنك كأجر على إدارته للاستثمار."
            }
          },
          {
            "@type": "Question",
            "name": "هل الأرباح المحسوبة مضمونة 100%؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا، في التمويل الإسلامي الأرباح متوقعة وليست مضمونة. إذا ضمن البنك رأس المال والربح الثابت، أصبح ذلك رباً محضاً."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "What is the difference between Expected Rate and Customer Share?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Expected Rate is the total ROI generated by the investment in the market. The Customer Share is the pre-agreed percentage of that total profit that you will receive, while the bank takes the rest as a management fee."
            }
          },
          {
            "@type": "Question",
            "name": "Are these calculated profits 100% guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, in Islamic finance, returns are expected, not guaranteed. If a bank guarantees both the principal and a fixed return, the contract becomes a conventional interest-based loan (Riba)."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
