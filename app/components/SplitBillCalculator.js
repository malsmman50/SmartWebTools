"use client";

import { useState } from "react";

export default function SplitBillCalculator({ lang, dict }) {
  const isAr = lang === "ar";
  const [totalBill, setTotalBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("2");
  const [tipPercent, setTipPercent] = useState("");

  const calculateResults = () => {
    let bill = parseFloat(totalBill) || 0;
    let people = parseInt(numberOfPeople) || 1;
    if (people < 1) people = 1;
    let tip = parseFloat(tipPercent) || 0;

    let tipAmount = bill * (tip / 100);
    let totalWithTip = bill + tipAmount;
    let amountPerPerson = totalWithTip / people;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalWithTip: totalWithTip.toFixed(2),
      amountPerPerson: amountPerPerson.toFixed(2),
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
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            placeholder="e.g., 250"
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
            placeholder="e.g., 10"
            min="0"
            max="100"
          />
        </div>
        
        {/* Quick Tip Buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {[0, 10, 15, 20].map(tip => (
            <button
              key={tip}
              onClick={() => setTipPercent(tip.toString())}
              style={{
                flex: 1,
                padding: "8px",
                background: parseFloat(tipPercent) === tip ? "var(--primary)" : "var(--bg-secondary)",
                color: parseFloat(tipPercent) === tip ? "#fff" : "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {tip}%
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="card" style={{ background: "var(--bg-secondary)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        <div className="result-box" style={{ marginBottom: "20px" }}>
          <div className="result-label" style={{ color: "var(--text-muted)" }}>{dict.split_bill.tip_amount}</div>
          <div className="result-value">{res.tipAmount}</div>
        </div>

        <div className="result-box" style={{ marginBottom: "20px" }}>
          <div className="result-label" style={{ color: "var(--text-muted)" }}>{dict.split_bill.total_with_tip}</div>
          <div className="result-value">{res.totalWithTip}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--primary-rgb), 0.1)", border: "1px solid rgba(var(--primary-rgb), 0.3)" }}>
          <div className="result-label" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>{dict.split_bill.amount_per_person}</div>
          <div className="result-value" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>{res.amountPerPerson}</div>
        </div>

      </div>
    </div>
  );
}
