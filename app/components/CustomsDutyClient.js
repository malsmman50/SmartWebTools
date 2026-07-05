"use client";

import { useState } from "react";

export default function CustomsDutyClient({ lang, dict }) {
  const t = dict.customs;
  const isAr = lang === "ar";

  const [itemValue, setItemValue] = useState("1000");
  const [shippingCost, setShippingCost] = useState("100");
  const [dutyRate, setDutyRate] = useState("5");
  const [vatRate, setVatRate] = useState("15");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const v = parseFloat(itemValue);
    const s = parseFloat(shippingCost);
    const d = parseFloat(dutyRate);
    const vat = parseFloat(vatRate);

    if (isNaN(v) || isNaN(s) || isNaN(d) || isNaN(vat)) {
      setResult(null);
      return;
    }

    const cif = v + s; // Cost, Insurance, Freight (assuming Insurance is 0 or included in shipping)
    const dutyAmount = cif * (d / 100);
    const vatAmount = (cif + dutyAmount) * (vat / 100);
    const totalTaxes = dutyAmount + vatAmount;
    const totalLandedCost = cif + totalTaxes;

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
        <h3 style={{ marginBottom: "16px" }}>{isAr ? "أدخل قيم الشحنة" : "Enter Shipment Values"}</h3>
        
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="customs-item" className="label">{t.item_value}</label>
          <input 
            id="customs-item"
            type="number" 
            className="input" 
            value={itemValue} 
            onChange={(e) => setItemValue(e.target.value)} 
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="customs-shipping" className="label">{t.shipping_cost}</label>
          <input 
            id="customs-shipping"
            type="number" 
            className="input" 
            value={shippingCost} 
            onChange={(e) => setShippingCost(e.target.value)} 
          />
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="customs-duty" className="label">{t.duty_rate}</label>
            <input 
              id="customs-duty"
              type="number" 
              className="input" 
              value={dutyRate} 
              onChange={(e) => setDutyRate(e.target.value)} 
              step="0.5"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="customs-vat" className="label">{t.vat_rate}</label>
            <input 
              id="customs-vat"
              type="number" 
              className="input" 
              value={vatRate} 
              onChange={(e) => setVatRate(e.target.value)} 
              step="0.5"
            />
          </div>
        </div>

        <button onClick={calculate} className="btn btn-primary" style={{ width: "100%" }}>
          {t.calculate}
        </button>
      </div>

      <div>
        <div className="result-box" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="result-label">{t.result_title}</div>
          <div className="result-value" style={{ fontSize: "3.5rem", color: "var(--primary)", marginBottom: "16px" }}>
            {result ? result.totalLandedCost : "-"}
          </div>
          
          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", padding: "16px", background: "var(--bg-card)", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t.duty_amount}</span>
                <span style={{ fontWeight: 600 }}>{result.dutyAmount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>{t.vat_amount}</span>
                <span style={{ fontWeight: 600 }}>{result.vatAmount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--danger)" }}>
                <span style={{ fontWeight: 600 }}>{t.total_taxes}</span>
                <span style={{ fontWeight: 700 }}>{result.totalTaxes}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
