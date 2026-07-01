"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";

export default function SukukCalculatorClient({ dict, lang, initialValues }) {
  const t = dict.sukuk;

  const [faceValue, setFaceValue] = useState(initialValues?.sukukAmount ? parseFloat(initialValues.sukukAmount) : 10000);
  const [profitRate, setProfitRate] = useState(initialValues?.expectedYield ? parseFloat(initialValues.expectedYield) : 5);
  const [frequency, setFrequency] = useState("2");
  const [duration, setDuration] = useState(initialValues?.maturityYears ? parseInt(initialValues.maturityYears) : 5);

  const numFaceValue = Number(faceValue) || 0;
  const numProfitRate = Number(profitRate) || 0;
  const numFrequency = Number(frequency) || 1;
  const numDuration = Number(duration) || 0;

  // Periodic Profit = Face Value * (Profit Rate / 100) / Frequency
  const periodicProfit = numFaceValue * (numProfitRate / 100) / numFrequency;
  
  // Total Profit Earned over the tenor
  const totalProfit = periodicProfit * numFrequency * numDuration;
  
  // Total Maturity Value
  const totalReturn = numFaceValue + totalProfit;

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
        <div style={{ marginTop: "12px" }}>
          <Link href={`/${lang}/methodology#sukuk`} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600", fontSize: "0.9rem" }}>
            {lang === "ar" ? "📖 اقرأ المنهجية الشرعية ومصادر الحساب لهذه الحاسبة" : "📖 Read Shariah methodology & sources for this calculator"}
          </Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-face" className="label">{t.face_value}</label>
            <NumericFormat 
              id="sukuk-face" 
              className="input" 
              value={faceValue} 
              onValueChange={v => setFaceValue(v.floatValue ?? '')} 
              thousandSeparator={true} 
              allowNegative={false} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-rate" className="label">{t.profit_rate}</label>
            <NumericFormat 
              id="sukuk-rate" 
              className="input" 
              value={profitRate} 
              onValueChange={v => setProfitRate(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={2} 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-freq" className="label">{t.frequency}</label>
            <select 
              id="sukuk-freq" 
              className="input" 
              value={frequency} 
              onChange={e => setFrequency(e.target.value)}
            >
              <option value="1">{lang === "ar" ? "سنوياً (1 مرة)" : "Annually (1 time)"}</option>
              <option value="2">{lang === "ar" ? "نصف سنوي (مرتين)" : "Semi-Annually (2 times)"}</option>
              <option value="4">{lang === "ar" ? "ربع سنوي (4 مرات)" : "Quarterly (4 times)"}</option>
              <option value="12">{lang === "ar" ? "شهرياً (12 مرة)" : "Monthly (12 times)"}</option>
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="sukuk-dur" className="label">{t.duration}</label>
            <NumericFormat 
              id="sukuk-dur" 
              className="input" 
              value={duration} 
              onValueChange={v => setDuration(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={1} 
            />
          </div>
        </div>

        <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="grid-2">
            <div className="result-box" style={{ padding: "20px" }}>
              <div className="result-label">{t.periodic_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>
                {fmt(periodicProfit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "20px" }}>
              <div className="result-label">{t.total_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--success)" }}>
                + {fmt(totalProfit)}
              </div>
            </div>
          </div>

          <div className="result-box" style={{ background: "var(--primary)", color: "#fff", borderColor: "var(--primary)", marginTop: "auto" }}>
            <div className="result-label" style={{ color: "rgba(255,255,255,0.8)" }}>{t.total_return}</div>
            <div className="result-value">
              {fmt(totalReturn)}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>ما هي الصكوك الإسلامية (Sukuk) وكيف تعمل؟</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              الصكوك هي النسخة الإسلامية الموافقة للشريعة من "السندات" التقليدية (Bonds). بينما تمثل السندات قرضاً بفائدة ربوية يقدمه المستثمر للجهة المصدرة، تمثل الصكوك <strong>حصة ملكية شائعة</strong> في أصول ملموسة، أو منافع، أو خدمات، أو مشروع استثماري محدد. العوائد التي يوزعها الصك ليست "فائدة على قرض"، بل هي حصة المستثمر من الأرباح أو الإيجارات التي يولدها الأصل الممول بالصك.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>حساب صكوك الإجارة:</strong> أطلقت الحكومة صكوكاً بقيمة اسمية 10,000$ لتمويل بناء مستشفى، بمعدل ربح متوقع 5% سنوياً يُصرف كل 6 أشهر، لمدة 5 سنوات. بإدخال هذه البيانات: ستحصل على دفعة دورية (كل نصف سنة) بقيمة 250$. إجمالي الأرباح بعد 5 سنوات هو 2,500$. وعند الاستحقاق، يُرد لك رأس المال لتصبح القيمة الإجمالية 12,500$.</li>
              <li style={{ marginBottom: "8px" }}><strong>صكوك الشركات:</strong> شركة طيران تصدر صكوكاً بـ 50,000$ بمعدل ربح 7% يُصرف ربع سنوياً. باستخدام الحاسبة، تكتشف أن التوزيع الربع سنوي هو 875$.</li>
              <li style={{ marginBottom: "8px" }}><strong>تخطيط التدفقات النقدية:</strong> يستخدم المستثمرون هذه الحاسبة لمعرفة متى وكم سيحصلون من سيولة نقدية (Cash flow) لتغطية نفقاتهم الدورية من خلال تنويع الصكوك وتوزيعات أرباحها.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>الفرق بين الصكوك والأسهم</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              الأسهم تمثل ملكية في <strong>الشركة بأكملها</strong> وتتذبذب قيمتها بشدة وعوائدها غير محددة سلفاً. أما الصكوك فتمثل ملكية في <strong>مشروع أو أصل محدد</strong> تابع للشركة (مثلاً طائرة أو مبنى معين يتم تأجيره)، وعوائدها تكون متوقعة وشبه مستقرة (مثل إيجار المبنى)، ولها تاريخ انتهاء (Maturity Date) يتم فيه تصفية الأصل ورد رأس المال للمستثمر.
            </p>
          </>
        ) : (
          <>
            <h2>What are Islamic Sukuk and How Do They Work?</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Sukuk is the Sharia-compliant alternative to conventional bonds. While a conventional bond is a debt obligation that pays interest (Riba), a Sukuk represents <strong>undivided ownership</strong> in a tangible asset, usufruct, service, or specific investment project. The returns generated by Sukuk are not "interest on a loan" but rather the investor's rightful share of the profit or rental income generated by the underlying asset.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Ijara (Lease) Sukuk:</strong> A government issues Sukuk with a face value of $10,000 to fund a hospital, offering an expected profit rate of 5% paid semi-annually over 5 years. Using the calculator: Your periodic semi-annual payout is $250. Total profit over 5 years is $2,500. At maturity, your principal is returned for a total of $12,500.</li>
              <li style={{ marginBottom: "8px" }}><strong>Corporate Sukuk:</strong> An airline issues a $50,000 Sukuk offering 7% profit paid quarterly. The calculator shows your quarterly cash flow will be exactly $875.</li>
              <li style={{ marginBottom: "8px" }}><strong>Cash Flow Planning:</strong> Passive investors use this tool to accurately project their periodic income streams to ensure their living expenses are met through Halal fixed-income equivalents.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Sukuk vs. Stocks (Equities)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Stocks represent ownership in the <strong>entire company</strong>, meaning high volatility and unpredictable dividends. Sukuk represents ownership in a <strong>specific asset</strong> of the company (e.g., a specific airplane being leased out). Thus, Sukuk returns are highly predictable (derived from fixed lease contracts), less volatile, and have a defined maturity date when the capital is returned.
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
            "name": "هل عوائد الصكوك مضمونة بنسبة 100%؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "حسب الشريعة الإسلامية، العوائد ليست مضمونة ضماناً مطلقاً لأنها مرتبطة بأداء الأصل. ومع ذلك، تُهندس الصكوك (خاصة صكوك الإجارة) لتكون عقود التأجير فيها ملزمة، مما يجعل العوائد شبه مؤكدة ومنخفضة المخاطر جداً مقارنة بالأسهم."
            }
          },
          {
            "@type": "Question",
            "name": "هل يجوز تداول الصكوك في السوق الثانوية (بيعها قبل تاريخ استحقاقها)؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، معظم أنواع الصكوك (مثل صكوك الإجارة والمشاركة) تمثل أصولاً ملموسة، وبالتالي يجوز بيعها وشرائها في السوق الثانوية بسعر السوق الذي يخضع للعرض والطلب."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Are Sukuk returns 100% guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In strict Sharia terms, returns cannot be absolutely guaranteed as they are tied to asset performance. However, Sukuk are structured (especially Ijara Sukuk) with binding lease agreements, making the cash flows highly predictable and low-risk compared to equities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I trade Sukuk in the secondary market before maturity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Because most Sukuk (like Ijara and Musharaka) represent ownership in tangible physical assets, they can be freely bought and sold in the secondary market at prevailing market prices."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
