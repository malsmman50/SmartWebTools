"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function IslamicFireCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.fire;
  const isAr = lang === "ar";

  const [annualExpenses, setAnnualExpenses] = useState(60000);
  const [expectedReturn, setExpectedReturn] = useState(8.0);
  const [inflationRate, setInflationRate] = useState(3.0);
  const [zakatType, setZakatType] = useState("long-term");

  // Math
  const realReturn = (expectedReturn - inflationRate) / 100;
  
  // Conventional: SWR = Real Return
  const conventionalSWR = realReturn;
  const conventionalFireNumber = conventionalSWR > 0 ? annualExpenses / conventionalSWR : 0;

  // Islamic: Subtract Zakat from real return
  const zakatRate = zakatType === "long-term" ? 0.008 : zakatType === "active" ? 0.025 : 0;
  const islamicSWR = realReturn - zakatRate;
  const islamicFireNumber = islamicSWR > 0 ? annualExpenses / islamicSWR : 0;

  const zakatGap = islamicFireNumber - conventionalFireNumber;

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
            {isAr ? "الأهداف وافتراضات السوق" : "Your Goals & Market Assumptions"}
          </h3>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="annual-expenses">
              {isAr ? "المصروفات السنوية المطلوبة ($)" : "Desired Annual Living Expenses ($)"}
            </label>
            <NumericFormat 
              id="annual-expenses"
              className="input" 
              value={annualExpenses} 
              onValueChange={(values) => setAnnualExpenses(values.floatValue || 0)}
              thousandSeparator={true}
              prefix="$"
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "ما هو المبلغ السنوي الذي تحتاجه للعيش براحة؟" : "How much money do you need per year to live comfortably?"}
            </p>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="expected-return">
              {isAr ? "العائد الاستثماري الحلال المتوقع (%)" : "Expected Halal Investment Return (%)"}
            </label>
            <input 
              id="expected-return"
              type="number" 
              className="input" 
              value={expectedReturn} 
              step="0.1" 
              onChange={e => setExpectedReturn(Number(e.target.value))} 
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "المعدل التاريخي لصناديق المؤشرات الإسلامية (مثل SPUS, HLAL) هو حوالي 8-10%." : "Historical average of Halal Index Funds (e.g., SPUS, HLAL) is around 8-10%."}
            </p>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="inflation-rate">
              {isAr ? "معدل التضخم السنوي المتوقع (%)" : "Expected Inflation Rate (%)"}
            </label>
            <input 
              id="inflation-rate"
              type="number" 
              className="input" 
              value={inflationRate} 
              step="0.1" 
              onChange={e => setInflationRate(Number(e.target.value))} 
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "المعدل التاريخي للتضخم هو حوالي 3%." : "Historical average is around 3%."}
            </p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="zakat-strategy">
              {isAr ? "استراتيجية زكاة المحفظة الاستثمارية (معيار أيوفي)" : "Portfolio Zakat Strategy (AAOIFI Standard)"}
            </label>
            <select 
              id="zakat-strategy"
              className="input" 
              value={zakatType} 
              onChange={e => setZakatType(e.target.value)}
            >
              <option value="long-term">
                {isAr ? "صناديق المؤشرات والأسهم طويلة الأجل (الزكاة الفعلية ~0.8%)" : "Long-Term Index Funds/ETFs (Effective Zakat ~0.8%)"}
              </option>
              <option value="active">
                {isAr ? "التداول النشط / المحفظة النقدية (الزكاة الكاملة 2.5%)" : "Active Trading/Cash Portfolio (Zakat 2.5%)"}
              </option>
              <option value="none">
                {isAr ? "العقارات المؤجرة (الزكاة على الدخل فقط، 0% على أصل العقار)" : "Real Estate Rentals (Zakat on income only, 0% on property value)"}
              </option>
            </select>
          </div>
        </div>

        <div>
          {islamicSWR <= 0 ? (
             <div className="card" style={{ border: "1px solid var(--danger)" }}>
                <h3 style={{ color: "var(--danger)" }}>
                  {isAr ? "⚠️ افتراضات غير مستدامة" : "⚠️ Unsustainable Assumptions"}
                </h3>
                <p style={{ marginTop: "12px" }}>
                  {isAr 
                    ? `العائد المتوقع الخاص بك (${expectedReturn}%) بعد طرح التضخم (${inflationRate}%) والزكاة (${(zakatRate*100)}%) يؤدي إلى نمو سلبي أو معدوم.`
                    : `Your expected return (${expectedReturn}%) minus inflation (${inflationRate}%) and Zakat (${(zakatRate*100)}%) results in a negative or zero growth rate.`}
                </p>
                <p style={{ marginTop: "8px" }}>
                  {isAr
                    ? "ستنفد محفظتك الحالية بمرور الوقت. يجب أن تبحث عن استثمارات ذات عوائد أعلى أو تقلل من توقعات التضخم للاستمرار بأمان."
                    : "Your portfolio will inevitably deplete over time. You must find investments with higher returns or lower your inflation expectations to sustain a permanent retirement."}
                </p>
             </div>
          ) : (
            <>
              <div className="result-box" style={{ marginBottom: "16px", background: "var(--success)", color: "white" }} aria-live="polite">
                <div className="result-label" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {isAr ? "رقم الاستقلال المالي الإسلامي (صافي الأصول المستهدف)" : "Islamic FIRE Number (Target Net Worth)"}
                </div>
                <div className="result-value" style={{ fontSize: "2.5rem", color: "white" }}>{fmt(islamicFireNumber)}</div>
                <p style={{ fontSize: "0.9rem", marginTop: "12px" }}>
                  {isAr 
                    ? `هذا هو إجمالي المبلغ المستثمر المطلوب لتأمين نمط حياتك البالغ ${fmt(annualExpenses)} سنوياً للأبد، مع إخراج ${fmt(islamicFireNumber * zakatRate)} للزكاة السنوية.`
                    : `This is the total invested amount needed to sustain your ${fmt(annualExpenses)} lifestyle forever, while paying ${fmt(islamicFireNumber * zakatRate)} in Zakat every year.`}
                </p>
              </div>

              <div className="grid-2">
                <div className="result-box" aria-live="polite">
                  <div className="result-label">{isAr ? "رقم التقاعد التقليدي" : "Conventional FIRE Number"}</div>
                  <div className="result-value" style={{ fontSize: "1.4rem" }}>{fmt(conventionalFireNumber)}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    {isAr ? "بدون احتساب الزكاة" : "Ignoring Zakat"}
                  </p>
                </div>
                <div className="result-box" aria-live="polite">
                  <div className="result-label">{isAr ? "فجوة الزكاة الإضافية" : 'The "Zakat Gap"'}</div>
                  <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--warning)" }}>+{fmt(zakatGap)}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    {isAr ? "رأس مال إضافي مطلوب لاستدامة الزكاة" : "Extra capital needed to sustain charity."}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
