"use client";

import { useState, useEffect, useMemo } from "react";

const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "EGP", "JOD"];

export default function CurrencyConverterClient({ lang, dict, ...props }) {
  
  const t = dict.currency;
  const isAr = lang === "ar";

  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("SAR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setRates(data.usd);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching currencies", err);
        setError(isAr ? "فشل جلب أسعار الصرف الحية. يرجى التحقق من اتصالك بالإنترنت." : "Failed to fetch live exchange rates. Please check your internet connection.");
        setLoading(false);
      }
    };
    fetchRates();
  }, [isAr]);

  const currencies = useMemo(() => {
    if (!rates) return [];
    const all = Object.keys(rates).map(c => c.toUpperCase());
    const top = COMMON_CURRENCIES.filter(c => all.includes(c));
    const rest = all.filter(c => !COMMON_CURRENCIES.includes(c)).sort();
    return [...top, "---", ...rest];
  }, [rates]);

  const calculateResult = () => {
    if (!rates || isNaN(parseFloat(amount))) return "0.00";
    const fromRate = rates[fromCurrency.toLowerCase()];
    const toRate = rates[toCurrency.toLowerCase()];
    if (!fromRate || !toRate) return "0.00";
    const amountInUsd = parseFloat(amount) / fromRate;
    const result = amountInUsd * toRate;
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(result);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{t.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>{t.subtitle}</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>{t.fetching}</div>
        ) : error ? (
          <div style={{ padding: "20px", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", textAlign: "center" }}>{error}</div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label className="label" htmlFor="currency-amount" style={{ fontWeight: "bold" }}>{t.amount}:</label>
              <input 
                id="currency-amount"
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="input"
                style={{ fontSize: "1.2rem", fontFamily: "monospace" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ flex: 1 }}>
                <label className="label" htmlFor="from-currency" style={{ fontWeight: "bold" }}>{t.from}:</label>
                <select 
                  id="from-currency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input"
                  style={{ fontSize: "1.1rem" }}
                >
                  {currencies.map(c => (
                    <option key={`from-${c}`} value={c} disabled={c === "---"}>{c}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleSwap}
                className="btn-outline"
                style={{ marginTop: "28px", width: "48px", height: "48px", borderRadius: "50%", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "var(--surface-sunken)" }}
                title={isAr ? "تبديل العملات" : "Swap Currencies"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
              </button>

              <div style={{ flex: 1 }}>
                <label className="label" htmlFor="to-currency" style={{ fontWeight: "bold" }}>{t.to}:</label>
                <select 
                  id="to-currency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input"
                  style={{ fontSize: "1.1rem" }}
                >
                  {currencies.map(c => (
                    <option key={`to-${c}`} value={c} disabled={c === "---"}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ padding: "24px", borderRadius: "8px", background: "var(--surface-sunken)", border: "1px solid var(--border)", textAlign: "center", marginTop: "32px" }}>
              <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "8px" }}>{t.result}</div>
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--success)", fontFamily: "monospace" }} dir="ltr">
                {calculateResult()} <span style={{ fontSize: "1.2rem", color: "var(--text)" }}>{toCurrency}</span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "8px" }}>
                1 {fromCurrency} = {rates ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(rates[toCurrency.toLowerCase()] / rates[fromCurrency.toLowerCase()]) : "..."} {toCurrency}
              </div>
            </div>
            
            <div style={{ marginTop: "24px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
              {isAr 
                ? "يتم جلب أسعار الصرف يومياً عبر شبكة توزيع محتوى عالمية. المنصة غير مسؤولة عن أي قرارات تداول تتخذ بناءً على هذه الأسعار."
                : "Exchange rates are fetched daily via a global CDN. This platform is not responsible for any trading decisions made based on these rates."}
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>أداة تحويل العملات المجانية واللحظية</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              توفر أداة تحويل العملات هذه وسيلة سريعة وآمنة لتحويل أكثر من 150 عملة عالمية بما في ذلك الدولار، اليورو، الريال السعودي، والدرهم الإماراتي. يتم جلب أسعار الصرف بشكل مباشر وموثوق لتقديم دقة عالية في حساباتك المالية. الميزة الأساسية لهذه الأداة هي أنها تعمل محلياً بنسبة كبيرة، مما يضمن سرعة الاستجابة وخصوصية بياناتك أثناء إجراء التحويلات.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>التجارة الإلكترونية والتسوق:</strong> لنفترض أنك تتسوق من متجر أمريكي وسعر السلعة 49$. يمكنك استخدام محول العملات بضبط المبلغ إلى 49 وتحديد الدولار الأمريكي (USD) إلى عملتك المحلية (مثل الريال السعودي SAR) لمعرفة التكلفة الدقيقة.</li>
              <li style={{ marginBottom: "8px" }}><strong>السفر والسياحة:</strong> عند التخطيط لرحلة إلى أوروبا، يمكنك التحقق من كم يساوي 1000 يورو (EUR) بالدرهم الإماراتي (AED) لضبط ميزانية سفرك.</li>
              <li style={{ marginBottom: "8px" }}><strong>تحويلات المغتربين (Remittances):</strong> يمكن للمغتربين معرفة المبلغ الذي سيستلمه ذووهم. مثلاً، تحويل 500 دينار كويتي (KWD) إلى الجنيه المصري (EGP).</li>
              <li style={{ marginBottom: "8px" }}><strong>تداول العملات والأسواق المالية:</strong> متابعة الفروقات الطفيفة في أسعار الصرف اليومية للعملات العالمية الرائدة كاليورو والدولار والباوند.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>كيف تعمل الأداة؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تعتمد الأداة على واجهة برمجة تطبيقات (API) لتحديث أسعار الصرف بانتظام. بمجرد اختيار عملة الأساس وعملة التحويل، تُجري الأداة العمليات الحسابية داخل متصفحك (Client-Side) فوراً دون الحاجة لإعادة تحميل الصفحة.
            </p>
          </>
        ) : (
          <>
            <h2>Free Live Currency Converter</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              This live currency converter provides a fast and secure way to exchange over 150 global currencies, including USD, EUR, GBP, AED, and SAR. Exchange rates are fetched dynamically to ensure high accuracy for your financial calculations. The primary advantage of this tool is its local processing capability, ensuring lightning-fast conversions and strict privacy without sending your input amounts to any server.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>E-commerce & Online Shopping:</strong> Suppose you are shopping on an international website and an item costs $49. You can use the converter by entering 49 USD to your local currency (e.g., GBP) to know the exact cost before checkout.</li>
              <li style={{ marginBottom: "8px" }}><strong>Travel Budgeting:</strong> When planning a trip to Europe, you can check exactly how much 1,000 EUR equals in USD to accurately budget your travel expenses.</li>
              <li style={{ marginBottom: "8px" }}><strong>Expat Remittances:</strong> Expatriates can calculate exactly how much money their families will receive back home. For example, converting 500 AED to INR or PHP.</li>
              <li style={{ marginBottom: "8px" }}><strong>Financial Trading:</strong> Keeping track of the daily minor fluctuations in global exchange rates for leading pairs like EUR/USD or GBP/USD.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>How does it work?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The tool relies on a reputable exchange rate API updated regularly. Once you select your base currency and target currency, the mathematical conversion happens instantly within your web browser (Client-Side) without requiring a page reload.
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
            "name": "هل أسعار تحويل العملات دقيقة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، يتم جلب أسعار الصرف بشكل مباشر من مصادر موثوقة عالمياً ويتم تحديثها يومياً لضمان الدقة العالية."
            }
          },
          {
            "@type": "Question",
            "name": "كيف يمكنني استخدام هذه الأداة للتسوق الإلكتروني؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "كل ما عليك هو إدخال سعر السلعة بالعملة الأجنبية (مثلاً الدولار) واختيار عملتك المحلية (كالريال أو الدرهم) في الحقل المقابل ليظهر لك السعر الفعلي الذي ستدفعه."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Are the exchange rates accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, exchange rates are fetched dynamically from reputable global sources and updated daily to ensure high accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "How can I use this tool for online shopping?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply input the item's price in the foreign currency (e.g., USD) and select your local currency in the target field to see exactly how much it will cost you."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
