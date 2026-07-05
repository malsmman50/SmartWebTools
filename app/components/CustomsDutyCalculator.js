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

    // CIF Value (Cost, Insurance, Freight)
    const cifValue = value + shipping;
    
    // Duty is calculated on CIF
    const dutyAmount = cifValue * (dutyP / 100);
    
    // VAT is calculated on (CIF + Duty)
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
    <div className="calc-card glass-effect">
      <div className="input-group">
        <label className="input-label">
          {dict.customs.item_value}
        </label>
        <div className="input-wrapper">
          <DollarSign className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            placeholder="1000"
            min="0"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.customs.shipping_cost}
        </label>
        <div className="input-wrapper">
          <Truck className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="50"
            min="0"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.customs.duty_rate}
        </label>
        <div className="input-wrapper">
          <Percent className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={dutyRate}
            onChange={(e) => setDutyRate(e.target.value)}
            placeholder="5"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.customs.vat_rate}
        </label>
        <div className="input-wrapper">
          <Percent className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            placeholder="15"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <button className="calc-btn primary" onClick={calculateCustoms}>
        <Calculator size={18} />
        {dict.customs.calculate}
      </button>

      {result && (
        <div className="result-card glass-effect result-enter">
          <h3 className="result-title" style={{ textAlign: "center", marginBottom: "1rem" }}>{dict.customs.result_title}</h3>
          
          <div className="result-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="result-box">
              <span className="result-label">{dict.customs.duty_amount}</span>
              <span className="result-value secondary-text">{result.dutyAmount}</span>
            </div>
            <div className="result-box">
              <span className="result-label">{dict.customs.vat_amount}</span>
              <span className="result-value secondary-text">{result.vatAmount}</span>
            </div>
          </div>

          <div className="result-box premium-box" style={{ marginTop: "1rem" }}>
            <span className="result-label">{dict.customs.total_taxes}</span>
            <span className="result-value warning-text">{result.totalTaxes}</span>
          </div>

          <div className="result-box premium-box highlight-box" style={{ marginTop: "1rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <span className="result-label" style={{ color: "var(--text-color)" }}>{dict.customs.result_title}</span>
            <span className="result-value" style={{ color: "#10b981", fontSize: "2rem" }}>{result.totalLandedCost}</span>
          </div>
        </div>
      )}
    </div>
  );
}
