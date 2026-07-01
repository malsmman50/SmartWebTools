"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";

export default function SukukVsBondsClient({ lang, dict }) {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  const numAmount = Number(amount) || 0;
  const numRate = Number(rate) || 0;
  const numYears = Number(years) || 0;

  // Calculations
  const expectedProfit = numAmount * (numRate / 100) * numYears;
  const totalPayout = numAmount + expectedProfit;

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
            ? "الصكوك الإسلامية ضد السندات التقليدية: مقارنة تفاعلية" 
            : "Islamic Sukuk vs Conventional Bonds: Interactive Comparison"}
        </h1>
        <p style={{ maxWidth: "800px", margin: "12px auto 0 auto", color: "var(--text-muted)", fontSize: "1rem" }}>
          {lang === "ar"
            ? "اكتشف لماذا تُعد الصكوك شهادات استثمارية قائمة على الأصول والمشاركة في الأرباح، بينما السندات ديون ربوية بفائدة ثابتة."
            : "Learn why Sukuk are asset-based investment certificates representing profit sharing, while bonds are debt-based usurious contracts with fixed interest."}
        </p>
      </div>

      {/* Simulator Card */}
      <div className="card" style={{ marginBottom: "32px", padding: "24px" }}>
        <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>📊</span>
          {lang === "ar" ? "محاكاة العوائد الاستثمارية المقارنة" : "Comparative Investment Yield Simulator"}
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "24px" }}>
          <div>
            <label htmlFor="comp-amount" className="label">{lang === "ar" ? "مبلغ الاستثمار" : "Investment Amount"}</label>
            <NumericFormat id="comp-amount" className="input" value={amount} onValueChange={v => setAmount(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
          </div>
          <div>
            <label htmlFor="comp-rate" className="label">{lang === "ar" ? "معدل العائد / الربح السنوي (%)" : "Annual Yield / Return Rate (%)"}</label>
            <NumericFormat id="comp-rate" className="input" value={rate} onValueChange={v => setRate(v.floatValue === undefined ? '' : v.floatValue)} suffix="%" />
          </div>
          <div>
            <label htmlFor="comp-years" className="label">{lang === "ar" ? "فترة الاستثمار (سنوات)" : "Investment Period (Years)"}</label>
            <NumericFormat id="comp-years" className="input" value={years} onValueChange={v => setYears(v.floatValue === undefined ? '' : v.floatValue)} />
          </div>
        </div>

        {/* Results Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "12px" }}>
          {/* Sukuk */}
          <div style={{ border: "1px solid var(--primary-light, rgba(16, 185, 129, 0.2))", background: "rgba(16, 185, 129, 0.03)", padding: "16px", borderRadius: "8px" }}>
            <h4 style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 12px 0", fontSize: "1.05rem" }}>
              <span>🟢</span> {lang === "ar" ? "الصكوك الإسلامية" : "Islamic Sukuk"}
            </h4>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "العائد المتوقع الإجمالي" : "Total Expected Profit"}</span>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "var(--success)" }}>{fmt(expectedProfit)}</div>
            </div>
            <div style={{ marginTop: "8px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {lang === "ar" ? "طبيعة العائد: ربح حقيقي ناتج عن أصول مستأجرة أو مشاريع استثمارية." : "Income nature: Real profit sharing generated from leased assets or enterprise operations."}
            </div>
          </div>

          {/* Bonds */}
          <div style={{ border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.03)", padding: "16px", borderRadius: "8px" }}>
            <h4 style={{ color: "var(--danger)", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 12px 0", fontSize: "1.05rem" }}>
              <span>🔴</span> {lang === "ar" ? "السندات التقليدية" : "Conventional Bonds"}
            </h4>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{lang === "ar" ? "إجمالي الفوائد المتراكمة" : "Total Accumulated Interest"}</span>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "var(--danger)" }}>{fmt(expectedProfit)}</div>
            </div>
            <div style={{ marginTop: "8px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {lang === "ar" ? "طبيعة العائد: فائدة ربوية ثابتة ومضمونة كأجر على إقراض المال." : "Income nature: Fixed, guaranteed usurious interest paid as rent on borrowing cash."}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <h3 style={{ marginBottom: "16px", fontSize: "1.2rem" }}>
        {lang === "ar" ? "🔍 جدول مقارنة الفروق الهيكلية" : "🔍 Structural Comparison Table"}
      </h3>
      <div style={{ overflowX: "auto", marginBottom: "40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "var(--surface-sunken)", borderBottom: "2px solid var(--border)", textAlign: lang === "ar" ? "right" : "left" }}>
              <th style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "وجه المقارنة" : "Feature"}</th>
              <th style={{ padding: "16px", color: "var(--success)", fontWeight: "bold" }}>{lang === "ar" ? "الصكوك الإسلامية" : "Islamic Sukuk"}</th>
              <th style={{ padding: "16px", color: "var(--danger)", fontWeight: "bold" }}>{lang === "ar" ? "السندات التقليدية" : "Conventional Bonds"}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "ملكية الأصل" : "Asset Ownership"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "تمثل حصة مشاعة في ملكية أصول مادية أو مشاريع حقيقية (عقارات، بنية تحتية)."
                  : "Represents undivided co-ownership shares in a physical asset, project, or investment activity."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "لا تمثل أي حصة في أصول، بل هي مستند مديونية (قرض مالي) مستحق على الجهة المصدرة."
                  : "Represents zero ownership in assets. It is purely a debt obligation (certificate of loan)."}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "مصدر العائد" : "Source of Income"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "الأرباح الناتجة عن تشغيل الأصول (كإيجار العقارات أو عوائد المشاريع)."
                  : "Revenue generated from the profits or rentals of the underlying asset."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "فائدة مئوية ثابتة محددة مسبقاً وتدفع بغض النظر عن ربح أو خسارة مشروع الجهة المقترضة."
                  : "A fixed interest rate paid periodically, regardless of the borrower's project profitability."}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "ضمان رأس المال" : "Principal Guarantee"}</td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "القيمة خاضعة لأداء الأصول وسوق التداول؛ لا يجوز شرعاً للمصدر ضمان رأس المال بشكل مطلق."
                  : "Capital return value depends on asset performance; the issuer cannot unconditionally guarantee the principal."}
              </td>
              <td style={{ padding: "16px", color: "var(--text-muted)" }}>
                {lang === "ar"
                  ? "رأس المال مضمون بالكامل من قبل الجهة المصدرة كدين واجب السداد في تاريخ الاستحقاق."
                  : "The principal is 100% guaranteed by the issuer as a binding debt payable at maturity."}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "16px", fontWeight: "bold" }}>{lang === "ar" ? "الحكم الشرعي" : "Sharia Ruling"}</td>
              <td style={{ padding: "16px", color: "var(--success)", fontWeight: "bold" }}>
                {lang === "ar" ? "جائزة شرعاً بشرط توافق هيكلها مع عقود التمويل الإسلامي." : "Permissible/Halal, provided the contract structure is Sharia-compliant."}
              </td>
              <td style={{ padding: "16px", color: "var(--danger)", fontWeight: "bold" }}>
                {lang === "ar" ? "محرمة إجماعاً لأن الفائدة المدفوعة عليها ربا صريح." : "Haram (prohibited) unanimously, as the fixed interest is usurious Riba."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fiqh Analysis */}
      <div className="card" style={{ padding: "24px", lineHeight: "1.7" }}>
        <h3 style={{ marginBottom: "16px" }}>
          {lang === "ar" ? "⚖️ التحليل الشرعي: كيف نميز بين الصك والسند؟" : "⚖️ Sharia Analysis: How to distinguish between Sukuk and Bonds"}
        </h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "12px" }}>
          {lang === "ar"
            ? "الفارق الرئيسي يكمن في قاعدة الغُنْم بالغُرْم (العائد بمقابل المسؤولية):"
            : "The main difference lies in the Sharia legal maxim 'Al-Ghunm bil-Ghurm' (Gain accompanies Risk):"}
        </p>
        <ul style={{ paddingRight: lang === "ar" ? "20px" : "0", paddingLeft: lang === "ar" ? "0" : "20px", color: "var(--text-muted)", marginBottom: "20px" }}>
          <li style={{ marginBottom: "8px" }}>
            {lang === "ar"
              ? "في الصكوك، أنت تمتلك جزءاً من الأصل الفعلي وتستحق الربح كعائد على ملكيتك ومخاطرتك الاستثمارية. هذا استثمار حلال وقائم على أصول عينية."
              : "In Sukuk, you own a share of the actual asset. Your return is a share of real profit generated by this asset. This is a Halal asset-backed investment."}
          </li>
          <li style={{ marginBottom: "8px" }}>
            {lang === "ar"
              ? "في السندات، أنت مقرض للبنك أو الدولة، والمال الذي تأخذه هو زيادة مشروطة في القرض مقابل الأجل، وهي ربا محرم بإجماع الأمة."
              : "In bonds, you are a creditor. The return you receive is a surplus charged on a loan over time, which is usury."}
          </li>
        </ul>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", textAlign: "center" }}>
          <Link href={`/${lang}/calculators/sukuk`} className="btn btn-primary" style={{ padding: "10px 20px" }}>
            {lang === "ar" ? "احسب عوائد الصكوك الخاصة بك بالتفصيل 🧮" : "Calculate your Sukuk Yield in Detail 🧮"}
          </Link>
        </div>
      </div>
    </div>
  );
}
