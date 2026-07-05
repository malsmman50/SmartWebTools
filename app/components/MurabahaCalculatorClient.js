"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function MurabahaCalculatorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.murabaha;

  const [cost, setCost] = useState(initialValues?.principal ? parseFloat(initialValues.principal) : 100000);
  const [markupPercent, setMarkupPercent] = useState(15);
  const [months, setMonths] = useState(initialValues?.years ? parseInt(initialValues.years) * 12 : 60);
  const [downPayment, setDownPayment] = useState(0);

  const numCost = Number(cost) || 0;
  const numDownPayment = Number(downPayment) || 0;
  const numMarkup = Number(markupPercent) || 0;
  const numMonths = Number(months) || 0;

  const financedAmount = Math.max(0, numCost - numDownPayment);
  const profitAmount = financedAmount > 0 ? financedAmount * (Math.max(0, numMarkup) / 100) : 0;
  const totalDeferredBalance = financedAmount + profitAmount;
  const trueSellingPrice = numCost + profitAmount;
  const monthlyInstallment = numMonths > 0 && totalDeferredBalance > 0 ? totalDeferredBalance / numMonths : 0;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="grid-2">
      <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.asset_cost}</label>
            <NumericFormat className="input" value={cost} onValueChange={v => setCost(v.floatValue === undefined ? '' : v.floatValue)} allowNegative={false} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.down_payment}</label>
            <NumericFormat className="input" value={downPayment} onValueChange={v => setDownPayment(v.floatValue === undefined ? '' : v.floatValue)} allowNegative={false} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.profit_margin}</label>
            <input type="number" min="0" step="0.1" className="input" value={markupPercent} onChange={e => setMarkupPercent(e.target.value)} />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>{t.markup_note}</p>
          </div>
          <div>
            <label className="label">{t.term}</label>
            <input type="number" min="1" step="1" className="input" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.installment}</div>
            <div className="result-value" style={{ color: "var(--primary)" }}>{fmt(monthlyInstallment)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">{t.selling_price}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(trueSellingPrice)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">{t.deferred_balance}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(totalDeferredBalance)}</div>
            </div>
          </div>
          <div className="result-box" style={{ marginTop: "16px" }}>
            <div className="result-label">{t.fixed_profit}</div>
            <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--success)" }}>{fmt(profitAmount)}</div>
          </div>
      </div>
    </div>
  );
}
