"use client";
import React, { useState } from "react";
import { DollarSign, Truck, Percent, Calculator } from "lucide-react";

export default function CustomsDutyCalculator({ dict }) {
  const [itemValue, setItemValue] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [dutyRate, setDutyRate] = useState("5");
  const [vatRate, setVatRate] = useState("15");
  const [result, setResult] = useState(null);

  const calculateCustoms = () => {
    const value = parseFloat(itemValue) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const dutyP = parseFloat(dutyRate) || 0;
    const vatP = parseFloat(vatRate) || 0;

    if (value <= 0) return;

    // CIF Value
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
  };

  return (
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.customs.item_value}</label>
          <div style={{ position: "relative" }}>
            <DollarSign size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
              placeholder="1000"
              min="0"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.customs.shipping_cost}</label>
          <div style={{ position: "relative" }}>
            <Truck size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              placeholder="50"
              min="0"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.customs.duty_rate}</label>
          <div style={{ position: "relative" }}>
            <Percent size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={dutyRate}
              onChange={(e) => setDutyRate(e.target.value)}
              placeholder="5"
              min="0"
              step="0.1"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="label">{dict.customs.vat_rate}</label>
          <div style={{ position: "relative" }}>
            <Percent size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="15"
              min="0"
              step="0.1"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={calculateCustoms}>
          <Calculator size={18} />
          {dict.customs.calculate}
        </button>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>{dict.customs.result_title}</h3>
        
        <div className="result-box">
          <div className="result-label">{dict.customs.duty_amount}</div>
          <div className="result-value" style={{ color: "var(--text)", fontSize: "1.8rem" }}>{result ? result.dutyAmount : "0.00"}</div>
        </div>

        <div className="result-box">
          <div className="result-label">{dict.customs.vat_amount}</div>
          <div className="result-value" style={{ color: "var(--text)", fontSize: "1.8rem" }}>{result ? result.vatAmount : "0.00"}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)" }}>
          <div className="result-label" style={{ color: "var(--text)" }}>{dict.customs.result_title}</div>
          <div className="result-value" style={{ color: "var(--success)" }}>{result ? result.totalLandedCost : "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
