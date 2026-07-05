"use client";

import { useState } from "react";

export default function SplitBillCalculator({ lang, dict }) {
  const isAr = lang === "ar";
  const [subtotal, setSubtotal] = useState("");
  const [excludedItems, setExcludedItems] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("2");
  const [tipPercent, setTipPercent] = useState("");

  const calculateResults = () => {
    let sub = parseFloat(subtotal) || 0;
    let exc = parseFloat(excludedItems) || 0;
    let people = parseInt(numberOfPeople) || 1;
    if (people < 1) people = 1;
    let tip = parseFloat(tipPercent) || 0;

    // Prevent negative halal subtotal if user enters wrong values
    if (exc > sub) exc = sub;

    let halalSubtotal = sub - exc;
    let halalTaxTip = halalSubtotal * (tip / 100);
    let halalTotal = halalSubtotal + halalTaxTip;
    let amountPerPerson = halalTotal / people;

    let excludedTaxTip = exc * (tip / 100);
    let excludedTotal = exc + excludedTaxTip;

    return {
      tipAmount: halalTaxTip.toFixed(2),
      totalWithTip: halalTotal.toFixed(2),
      amountPerPerson: amountPerPerson.toFixed(2),
      excludedTotal: excludedTotal.toFixed(2),
    };
  };

  const res = calculateResults();

  return (
    <div className="grid-2">
      {/* Input Section */}
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.split_bill.total_bill}</label>
          <input
            type="number"
            className="input"
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
            placeholder="e.g., 250"
            min="0"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.split_bill.excluded_items}</label>
          <input
            type="number"
            className="input"
            value={excludedItems}
            onChange={(e) => setExcludedItems(e.target.value)}
            placeholder="e.g., 50"
            min="0"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.split_bill.number_of_people}</label>
          <input
            type="number"
            className="input"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="e.g., 2"
            min="1"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.split_bill.tip_percent}</label>
          <input
            type="number"
            className="input"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="e.g., 15"
            min="0"
            max="100"
          />
        </div>
        
        {/* Quick Tip Buttons */}
        <div className="tabs" style={{ marginTop: "8px", marginBottom: "0", flexWrap: "wrap" }}>
          {[0, 10, 15, 20].map(tip => (
            <button
              key={tip}
              onClick={() => setTipPercent(tip.toString())}
              className={`tab ${parseFloat(tipPercent) === tip ? "active" : ""}`}
              style={{ flex: 1, textAlign: "center", padding: "8px" }}
            >
              {tip}%
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="card" style={{ background: "var(--bg-secondary)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        <div className="result-box" style={{ marginBottom: "16px" }}>
          <div className="result-label" style={{ color: "var(--text-muted)" }}>{dict.split_bill.tip_amount}</div>
          <div className="result-value">{res.tipAmount}</div>
        </div>

        <div className="result-box" style={{ marginBottom: "16px" }}>
          <div className="result-label" style={{ color: "var(--text-muted)" }}>{dict.split_bill.total_with_tip}</div>
          <div className="result-value">{res.totalWithTip}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--primary-rgb), 0.1)", border: "1px solid rgba(var(--primary-rgb), 0.3)", marginBottom: "16px" }}>
          <div className="result-label" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>{dict.split_bill.amount_per_person}</div>
          <div className="result-value" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>{res.amountPerPerson}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--danger-rgb), 0.05)", border: "1px dashed rgba(var(--danger-rgb), 0.2)" }}>
          <div className="result-label" style={{ color: "var(--danger)", fontSize: "0.9rem" }}>{dict.split_bill.excluded_total}</div>
          <div className="result-value" style={{ color: "var(--danger)", fontSize: "1.5rem" }}>{res.excludedTotal}</div>
        </div>

      </div>
    </div>
  );
}
