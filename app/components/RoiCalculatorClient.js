"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function RoiCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.roi;
  const isAr = lang === "ar";

  const [invested, setInvested] = useState(5000);
  const [returned, setReturned] = useState(7500);
  const [duration, setDuration] = useState(2); // default 2 years

  const profit = returned - invested;
  const isLoss = profit < 0;
  
  // Standard ROI
  const roi = invested > 0 ? (profit / invested) * 100 : 0;

  // Annualized ROI = ((Returned / Invested) ** (1 / duration) - 1) * 100
  let annualizedRoi = 0;
  if (invested > 0 && returned > 0 && duration > 0) {
    annualizedRoi = (Math.pow((returned / invested), (1 / duration)) - 1) * 100;
  }

  const fmt = (n) => {
    if (isAr) {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>
            {isAr ? "بيانات الاستثمار" : "Investment Data"}
          </h3>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-invested">{t.investment}</label>
            <NumericFormat 
              id="roi-invested"
              className="input" 
              value={invested} 
              onValueChange={v => setInvested(v.floatValue || 0)} 
              thousandSeparator={true} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-returned">{t.final_value}</label>
            <NumericFormat 
              id="roi-returned"
              className="input" 
              value={returned} 
              onValueChange={v => setReturned(v.floatValue || 0)} 
              thousandSeparator={true} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-duration">{t.duration}</label>
            <input 
              id="roi-duration"
              type="number" 
              className="input" 
              value={duration} 
              min="0.1" 
              step="0.1" 
              onChange={e => setDuration(Math.max(0.1, Number(e.target.value)))} 
            />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.roi}</div>
            <div className="result-value" style={{ color: roi >= 0 ? "var(--success)" : "var(--danger)" }}>
              {roi.toFixed(2)}%
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: "16px" }}>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.net_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: profit >= 0 ? "var(--success)" : "var(--danger)" }}>
                {profit >= 0 ? "+" : ""}{fmt(profit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.annualized}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: annualizedRoi >= 0 ? "var(--success)" : "var(--danger)" }}>
                {annualizedRoi.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>العائد على الاستثمار (ROI): الدليل الشامل</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              العائد على الاستثمار (Return on Investment - ROI) هو مؤشر أداء مالي أساسي يُستخدم لتقييم كفاءة أو ربحية استثمار ما، أو لمقارنة كفاءة عدة استثمارات مختلفة. يقيس مؤشر ROI العائد المالي الناتج عن الاستثمار مقارنة بتكلفته. رغم بساطته، إلا أنه المقياس الذهبي للمستثمرين وأصحاب الأعمال لمعرفة ما إذا كانت أموالهم تعمل لصالحهم أم تضيع هباءً.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>الاستثمار في الأسهم:</strong> اشتريت أسهماً بقيمة 5,000$، وبعد سنتين ارتفعت قيمتها لتصل إلى 7,500$. العائد على الاستثمار الإجمالي هو 50%، بصافي ربح 2,500$. ولكن الأهم هو "العائد السنوي" والذي يعادل تقريباً 22.47% سنوياً.</li>
              <li style={{ marginBottom: "8px" }}><strong>الحملات الإعلانية (ROAS):</strong> صرفت 1,000$ على إعلانات جوجل، وحققت لك مبيعات بقيمة 3,000$. العائد على استثمارك هنا هو 200%. أي أن كل دولار دفعته أعاد لك رأس مالك بالإضافة إلى دولارين ربح.</li>
              <li style={{ marginBottom: "8px" }}><strong>العقارات:</strong> اشتريت عقاراً بـ 100,000$ وبعته بعد 5 سنوات بـ 150,000$. العائد الإجمالي 50%، والعائد السنوي المركب هو 8.44%. مقارنة العائد السنوي المركب بالاستثمارات الأخرى يساعدك في اتخاذ قرار أفضل.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>لماذا العائد السنوي (Annualized ROI) أهم من العائد الإجمالي؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              العائد الإجمالي (Standard ROI) قد يكون مضللاً. إذا حققت ربحاً بنسبة 100% في استثمار ما، قد يبدو ذلك رائعاً! ولكن ماذا لو استغرق هذا الربح 20 سنة ليتحقق؟ سيصبح العائد السنوي الفعلي ضئيلاً جداً (حوالي 3.5%). <strong>العائد السنوي</strong> يوحد الزمن، مما يسمح لك بمقارنة استثمار دام 6 أشهر باستثمار آخر دام 10 سنوات بشكل عادل ومنطقي.
            </p>
          </>
        ) : (
          <>
            <h2>Return on Investment (ROI): The Complete Guide</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Return on Investment (ROI) is a fundamental financial performance measure used to evaluate the efficiency and profitability of an investment, or to compare the efficiency of several different investments. It directly measures the amount of return relative to the investment's cost. Despite its mathematical simplicity, it remains the gold standard metric for investors and business owners alike.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Stock Market:</strong> You buy shares worth $5,000. After exactly 2 years, your portfolio grows to $7,500. Your total ROI is 50%, with a net profit of $2,500. More importantly, the Annualized ROI stands at a highly impressive 22.47% per year.</li>
              <li style={{ marginBottom: "8px" }}><strong>Marketing & Ads (ROAS):</strong> You spend $1,000 on Facebook ads, which directly generate $3,000 in sales. Your ROI is 200%. Every dollar spent returned the principal plus two additional dollars in profit.</li>
              <li style={{ marginBottom: "8px" }}><strong>Real Estate Flipping:</strong> You buy a house for $100,000 and sell it 5 years later for $150,000. Total ROI is 50%. However, your Annualized ROI is 8.44%. Comparing the annualized figure with index funds helps you judge opportunity costs.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Why Annualized ROI is Crucial</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Standard ROI can be incredibly misleading. An investment returning 100% sounds phenomenal, but if it takes 20 years to achieve that 100% gain, the Annualized ROI is only about 3.5%. The <strong>Annualized ROI</strong> standardizes the time factor, allowing you to accurately compare a 6-month crypto trade with a 10-year real estate holding.
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
            "name": "ما هي النسبة الجيدة للعائد على الاستثمار (ROI)؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا توجد نسبة واحدة تناسب الجميع، ولكن بشكل عام يُعتبر العائد السنوي البالغ 7% إلى 10% (بعد استقطاع التضخم) ممتازة في الاستثمارات التقليدية كصناديق المؤشرات."
            }
          },
          {
            "@type": "Question",
            "name": "كيف أحسب العائد على الاستثمار بشكل صحيح؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "الصيغة الأساسية هي: (صافي الربح / إجمالي الاستثمار) × 100. للحصول على العائد السنوي الدقيق، نستخدم حاسبتنا المتقدمة أعلاه لتجنب أخطاء الرياضيات المعقدة."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "What is considered a 'good' ROI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the risk. However, for passive stock market investments (like S&P 500 index funds), an annualized ROI of 7% to 10% (adjusted for inflation) is historically considered excellent."
            }
          },
          {
            "@type": "Question",
            "name": "How is ROI calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The basic formula is: (Net Profit / Total Investment) x 100. To factor in time, you must calculate the Annualized ROI, which our calculator handles automatically."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
