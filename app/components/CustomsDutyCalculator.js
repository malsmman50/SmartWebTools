"use client";
import React, { useState, useEffect } from "react";

export default function CustomsDutyCalculator({ dict }) {
  const [itemValue, setItemValue] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [dutyRate, setDutyRate] = useState("5");
  const [vatRate, setVatRate] = useState("15");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const value = parseFloat(itemValue) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const dutyP = parseFloat(dutyRate) || 0;
    const vatP = parseFloat(vatRate) || 0;

    if (value <= 0) {
      setResult(null);
      return;
    }

    const cifValue = value + shipping;
    const dutyAmount = cifValue * (dutyP / 100);
    const vatAmount = (cifValue + dutyAmount) * (vatP / 100);
    const totalTaxes = dutyAmount + vatAmount;
    const totalLandedCost = cifValue + totalTaxes;

    setResult({
      dutyAmount: dutyAmount.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      totalTaxes: totalTaxes.toFixed(2),
      totalLandedCost: totalLandedCost.toFixed(2)
    });
  }, [itemValue, shippingCost, dutyRate, vatRate]);

  return (
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">📦 {dict.customs.item_value}</label>
          <input
            type="number"
            className="input"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            placeholder="1000"
            min="0"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">🚢 {dict.customs.shipping_cost}</label>
          <input
            type="number"
            className="input"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="50"
            min="0"
          />
        </div>

        <div className="grid-2" style={{ gap: "16px", marginBottom: "8px" }}>
          <div>
            <label className="label">🛡️ {dict.customs.duty_rate}</label>
            <input
              type="number"
              className="input"
              value={dutyRate}
              onChange={(e) => setDutyRate(e.target.value)}
              placeholder="5"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="label">🧾 {dict.customs.vat_rate}</label>
            <input
              type="number"
              className="input"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="15"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }} aria-live="polite">
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>📊 {dict.customs.result_title}</h3>
        
        <div className="grid-2" style={{ gap: "16px" }}>
          <div className="result-box" style={{ background: "rgba(var(--warning-rgb), 0.05)", border: "1px dashed rgba(var(--warning-rgb), 0.2)", padding: "16px" }}>
            <div className="result-label">{dict.customs.duty_amount}</div>
            <div className="result-value" style={{ color: "var(--warning)", fontSize: "1.5rem" }}>{result ? result.dutyAmount : "0.00"}</div>
          </div>
          <div className="result-box" style={{ background: "rgba(var(--warning-rgb), 0.05)", border: "1px dashed rgba(var(--warning-rgb), 0.2)", padding: "16px" }}>
            <div className="result-label">{dict.customs.vat_amount}</div>
            <div className="result-value" style={{ color: "var(--warning)", fontSize: "1.5rem" }}>{result ? result.vatAmount : "0.00"}</div>
          </div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--success-rgb), 0.1)", border: "2px solid rgba(var(--success-rgb), 0.2)", marginTop: "auto" }}>
          <div className="result-label" style={{ color: "var(--text)", fontWeight: "600" }}>{dict.customs.result_title}</div>
          <div className="result-value" style={{ color: "var(--success)" }}>{result ? result.totalLandedCost : "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
