"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";

export default function MurabahaVsLoanClient({ lang, dict }) {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const numAmount = Number(amount) || 0;
  const numRate = Number(rate) || 0;
  const numYears = Number(years) || 0;

  // Calculations
  // Conventional: standard amortized loan calculation
  // Monthly rate
  const monthlyInterestRate = (numRate / 100) / 12;
  const totalMonths = numYears * 12;
  let conventionalMonthly = 0;
  if (monthlyInterestRate > 0 && totalMonths > 0) {
    conventionalMonthly = (numAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  } else if (totalMonths > 0) {
    conventionalMonthly = numAmount / totalMonths;
  }
  const conventionalTotal = conventionalMonthly * totalMonths;
  const conventionalInterest = Math.max(0, conventionalTotal - numAmount);

  // Murabaha: flat rate / profit markup calculated upfront
  // Murabaha Total cost = Principal + (Principal * Flat Rate * Years)
  const murabahaProfit = numAmount * (numRate / 100) * numYears;
  const murabahaTotal = numAmount + murabahaProfit;
  const murabahaMonthly = totalMonths > 0 ? murabahaTotal / totalMonths : 0;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US", { maximumFractionDigits: 0 })} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>
          {lang === "ar" 
            ? "المرابحة الإسلامية ضد القروض التقليدية: مقارنة تفاعلية" 
            : "Murabaha Financing vs Conventional Loans: Interactive Comparison"}
        </h1>
        <p style={{ maxWidth: "800px", margin: "12px auto 0 auto", color: "var(--text-muted)", fontSize: "1rem" }}>
          {lang === "ar"
            ? "اكتشف الفروق الجوهرية والهيكلية والشرعية بين عقود البيع بالمرابحة والقروض الربوية القائمة على الفائدة مع محاكاة مالية تفاعلية بالأرقام."
            : "Explore the fundamental, structural, and Sharia differences between Murabaha sale contracts and interest-based loans with an interactive financial simulator."}
        </p>
      </div>

      {/* Interactive Simulator Card */}
      <div className="card" style={{ marginBottom: "32px", padding: "24px" }}>
        <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>📊</span>
          {lang === "ar" ? "المحاكاة المالية التفاعلية" : "Interactive Financial Simulator"}
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "24px" }}>
          <div>
            <label htmlFor="comp-amount" className="label">{lang === "ar" ? "مبلغ التمويل / الشراء" : "Financing Amount"}</label>
            <NumericFormat id="comp-amount" className="input" value={amount} onValueChange={v => setAmount(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
          </div>
          <div>
            <label htmlFor="comp-rate" className="label">{lang === "ar" ? "نسبة الربح / الفائدة السنوية (%)" : "Annual Profit / Interest Rate (%)"}</label>
            <NumericFormat id="comp-rate" className="input" value={rate} onValueChange={v => setRate(v.floatValue === undefined ? '' : v.floatValue)} suffix="%" />
          </div>
          <div>
            <label htmlFor="comp-years" className="label">{lang === "ar" ? "فترة السداد (سنوات)" : "Tenure (Years)"}</label>
            <NumericFormat id="comp-years" className="input" value={years} onValueChange={v => setYears(v.floatValue === undefined ? '' : v.floatValue)} />
          </div>
        </div>

        {/* Results Overview Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "12px" }}>
          {/* Murabaha Results */}
          <div style={{ border: "1px solid rgba(16, 185, 129, 0.2)", background: "rgba(16, 185, 129, 0.03)", padding: "16px", borderRadius: "8px" }}>
            <h4 style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 12px 0", fontSize: "1.05rem" }}>
              <span>🟢</span> {lang === "ar" ? "المرابحة الإسلامية" : "Islamic Murabaha"}
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "القسط الشهري" : "Monthly Installment"}</span>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text)" }}>{fmt(murabahaMonthly)}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "إجمالي الأرباح" : "Total Profit Margin"}</span>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--success)" }}>{fmt(murabahaProfit)}</div>
              </div>
            </div>
            <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {lang === "ar" ? "إجمالي السداد: " : "Total Repayment: "}<strong>{fmt(murabahaTotal)}</strong>
            </div>
          </div>

          {/* Conventional Results */}
          <div style={{ border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.03)", padding: "16px", borderRadius: "8px" }}>
            <h4 style={{ color: "var(--danger)", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 12px 0", fontSize: "1.05rem" }}>
              <span>🔴</span> {lang === "ar" ? "القرض التقليدي" : "Conventional Loan"}
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "القسط الشهري" : "Monthly Installment"}</span>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text)" }}>{fmt(conventionalMonthly)}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "إجمالي الفوائد" : "Total Interest Paid"}</span>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--danger)" }}>{fmt(conventionalInterest)}</div>
              </div>
            </div>
            <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {lang === "ar" ? "إجمالي السداد: " : "Total Repayment: "}<strong>{fmt(conventionalTotal)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Comparison Table */}
      <h3 style={{ marginBottom: "16px", fontSize: "1.2rem" }}>
        {lang === "ar" ? "🔍 جدول المقارنة الشرعية والهيكلية" : "🔍 Sharia & Structural Comparison Table"}
      </h3>
      <div style={{ overflowX: "auto", marginBottom: "40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "var(--surface-sunken)", borderBottom: "2px solid var(--border)", textAlign: lang === "ar" ? "right" : "left" }}>
              <th style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "وجه المقارنة" : "Feature"}</th>
              <th style={{ padding: "16px", color: "var(--success)", fontWeight: "bold" }}>{lang === "ar" ? "المرابحة الإسلامية" : "Islamic Murabaha"}</th>
              <th style={{ padding: "16px", color: "var(--danger)", fontWeight: "bold" }}>{lang === "ar" ? "القرض التقليدي" : "Conventional Loan"}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "طبيعة العقد" : "Contract Nature"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "عقد شراء وبيع سلعة (أصل حقيقي) بهامش ربح متفق عليه صراحة. البنك يشتري الأصل ثم يبيعه لك بالتقسيط."
                  : "A trade/sale contract of a physical asset with an agreed-upon profit markup. The bank buys the asset and sells it to you."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "عقد قرض مالي بفائدة. البنك يقرضك نقوداً ويطالبك بردها بنقود أكثر (فائدة ربوية)."
                  : "A loan of money with interest. The bank lends you cash and demands it back with a surplus (interest/Riba)."}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "تحمل المخاطر" : "Risk Sharing"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "البنك يتحمل مخاطر هلاك أو تلف السلعة أثناء تملكها وقبل بيعها للعميل."
                  : "The bank assumes ownership risk of the asset between purchasing it and selling it to the client."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "البنك لا يتحمل أي مخاطر تتعلق بالسلعة أو الأصل، بل يطالب بالمال بفائدته في جميع الأحوال."
                  : "The bank assumes zero risk regarding the asset. It only demands the money back with interest under all conditions."}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "غرامات التأخير" : "Late Payment Penalties"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "لا يسمح بفرض غرامة تأخير تذهب لأرباح البنك (فائدة مركبة). قد تفرض غرامة تذهب بالكامل لأعمال الخير والفقراء كعقوبة للمماطل."
                  : "No compounding interest on late payments for bank profit. A fixed penalty may be charged but must go entirely to charity."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "تفرض غرامات تأخير تراكمية كفائدة مركبة تضاف لأرباح البنك، وهو ربا صريح."
                  : "Compounding interest and financial penalties are charged on late payments and added directly to the bank's profits (Riba)."}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "الحكم الشرعي" : "Sharia Compliance"}</td>
              <td style={{ padding: "16px", color: "var(--success)", fontWeight: "bold" }}>
                {lang === "ar"
                  ? "حلال وجائز بإجماع المجامع الفقهية وهيئة AAOIFI عند الالتزام بضوابطها الشرعية."
                  : "Halal and permissible by consensus of Islamic Fiqh Academies and AAOIFI standards."}
              </td>
              <td style={{ padding: "16px", color: "var(--danger)", fontWeight: "bold" }}>
                {lang === "ar"
                  ? "حرام شرعاً بإجماع الأمة الإسلامية لكونه ربا صريحاً (ربا الديون)."
                  : "Haram (prohibited) by consensus of all Islamic scholars as it represents usury/Riba."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dynamic Fiqh Analysis */}
      <div className="card" style={{ padding: "24px", lineHeight: "1.7" }}>
        <h3 style={{ marginBottom: "16px" }}>
          {lang === "ar" ? "⚖️ التحليل الفقهي: لماذا هامش ربح المرابحة ليس ربا؟" : "⚖️ Fiqh Analysis: Why profit is not Riba"}
        </h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "12px" }}>
          {lang === "ar"
            ? "يشتبه على الكثيرين القول بأن المرابحة تساوي القرض التقليدي لأن الناتج المالي قد يكون متقارباً. لكن القاعدة الشرعية الذهبية تقول: (أحل الله البيع وحرم الربا). الفارق الجوهري يكمن في وجود السلعة كوعاء للتعاقد:"
            : "Many confuse Murabaha with conventional loans because the net cash output might seem similar. However, the golden Quranic rule states: (Allah has permitted trade and forbidden interest). The core difference lies in the presence of the physical asset:"}
        </p>
        <ol style={{ paddingRight: lang === "ar" ? "20px" : "0", paddingLeft: lang === "ar" ? "0" : "20px", color: "var(--text-muted)", marginBottom: "20px" }}>
          <li style={{ marginBottom: "8px" }}>
            <strong>{lang === "ar" ? "المرابحة بيع أصل:" : "Murabaha is an asset sale:"}</strong>
            {lang === "ar"
              ? " البنك يشتري السيارة أو العقار تملكاً حقيقياً ويدخل في ضمانه (المسؤولية القانونية عن التلف) ثم يبيعها لك بربح معلوم. زيادة السعر مقابل الأجل في البيع حلال بالإجماع."
              : " The bank buys the car or real estate, assumes possession, and bears the liability of ownership before selling it to you at a profit markup. Charging a higher price for deferred payment in sales is unanimously allowed."}
          </li>
          <li style={{ marginBottom: "8px" }}>
            <strong>{lang === "ar" ? "القرض التقليدي تأجير نقود:" : "Conventional loan is money renting:"}</strong>
            {lang === "ar"
              ? " البنك لا يشتري شيئاً ولا يتحمل أي مسؤولية، بل يعطيك نقداً ويأخذ نقداً أكثر. هذا مبدأ تأجير النقود بالنقود وهو الربا المحرم قطيعةً."
              : " The bank buys nothing and assumes no liability. It simply gives you cash and demands back more cash. This is renting money for money, which is usury."}
          </li>
        </ol>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", textAlign: "center" }}>
          <Link href={`/${lang}/calculators/murabaha`} className="btn btn-primary" style={{ padding: "10px 20px" }}>
            {lang === "ar" ? "احسب تمويل المرابحة الخاص بك بالتفصيل 🧮" : "Calculate Murabaha Financing in Detail 🧮"}
          </Link>
        </div>
      </div>
    </div>
  );
}
