"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function MudarabahCalculatorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.mudarabah;

  const initCapital = initialValues?.capital ? parseFloat(initialValues.capital) : 50000;
  const initRoi = initialValues?.expectedRoi ? parseFloat(initialValues.expectedRoi) : null;
  const initRevenue = initRoi ? initCapital + (initCapital * (initRoi / 100)) : 80000;

  const [capital, setCapital] = useState(initCapital);
  const [revenue, setRevenue] = useState(initRevenue);
  const [expenses, setExpenses] = useState(initRoi ? 0 : 20000);
  const [investorShare, setInvestorShare] = useState(60); 

  const netProfit = revenue - expenses;
  const isLoss = netProfit < 0;
  
  const investorProfit = !isLoss ? netProfit * (investorShare / 100) : 0;
  const managerProfit = !isLoss ? netProfit * ((100 - investorShare) / 100) : 0;

  const investorFinal = !isLoss ? capital + investorProfit : Math.max(0, capital + netProfit);
  
  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>{lang === "ar" ? "تفاصيل المشروع" : "Project Details"}</h3>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="capital" className="label">{t.capital}</label>
            <NumericFormat id="capital" className="input" value={capital} onValueChange={v => setCapital(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="revenue" className="label">{lang === "ar" ? "إجمالي إيرادات المشروع ($)" : "Total Project Revenue ($)"}</label>
            <NumericFormat id="revenue" className="input" value={revenue} onValueChange={v => setRevenue(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="expenses" className="label">{lang === "ar" ? "إجمالي مصروفات المشروع ($)" : "Total Project Expenses ($)"}</label>
            <NumericFormat id="expenses" className="input" value={expenses} onValueChange={v => setExpenses(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{lang === "ar" ? "نسبة توزيع الأرباح المتفق عليها" : "Agreed Profit Sharing Ratio"}</h3>
          <div>
            <label htmlFor="investorShare" className="label">{lang === "ar" ? `نسبة المستثمر (رب المال): ${investorShare}%` : `Investor (Rabb-ul-Mal) Share: ${investorShare}%`}</label>
            <input id="investorShare" type="range" min="1" max="99" value={investorShare} onChange={e => setInvestorShare(Number(e.target.value))} style={{ width: "100%" }} aria-label={lang === "ar" ? "نسبة المستثمر" : "Investor Share"} />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {lang === "ar" ? `نسبة المضارب (مدير المشروع): ${100 - investorShare}%` : `Manager (Mudarib) Share: ${100 - investorShare}%`}
            </p>
          </div>
        </div>

        <div aria-live="polite">
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{lang === "ar" ? "النتيجة الصافية للمشروع" : "Net Project Result"}</div>
            <div className="result-value" style={{ color: isLoss ? "var(--danger)" : "var(--success)" }}>
              {isLoss ? "-" : "+"}{fmt(Math.abs(netProfit))}
            </div>
          </div>
          
          <div className="grid-2" style={{ marginBottom: "16px" }}>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.partner_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: isLoss ? "var(--text-muted)" : "var(--primary)" }}>{fmt(investorProfit)}</div>
              {isLoss && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "يتحمل كامل الخسارة المالية" : "Bears all financial loss"}</p>}
            </div>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.manager_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: isLoss ? "var(--text-muted)" : "var(--accent)" }}>{fmt(managerProfit)}</div>
              {isLoss && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "يخسر وقته وجهده فقط" : "Loses their time and effort"}</p>}
            </div>
          </div>

          <div className="card" style={{ padding: "16px", textAlign: "center", background: "var(--bg)" }}>
            <div className="result-label">{lang === "ar" ? "رأس المال المعاد للمستثمر" : "Investor's Final Capital Returned"}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>{fmt(investorFinal)}</div>
            {isLoss && investorFinal === 0 && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "مسؤولية المستثمر محدودة بحدود رأس المال" : "Investor liability is strictly capped at capital"}</p>}
          </div>

          <div className="card" style={{ marginTop: "16px", padding: "16px", border: "1px solid rgba(245, 158, 11, 0.3)", background: "rgba(245, 158, 11, 0.05)" }}>
            <h4 style={{ color: "var(--warning)", marginBottom: "4px" }}>{t.loss_warning_title}</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5" }}>{t.loss_warning_desc}</p>
          </div>
        </div>
      </div>

  );
}
