"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function RoiCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.roi;
  const isAr = lang === "ar";

  const [invested, setInvested] = useState(5000);
  const [returned, setReturned] = useState(7500);
  const [duration, setDuration] = useState(2); // default 2 years

  const profit = returned - invested;
  const isLoss = profit < 0;
  
  // Standard ROI
  const roi = invested > 0 ? (profit / invested) * 100 : 0;

  // Annualized ROI = ((Returned / Invested) ** (1 / duration) - 1) * 100
  let annualizedRoi = 0;
  if (invested > 0 && returned > 0 && duration > 0) {
    annualizedRoi = (Math.pow((returned / invested), (1 / duration)) - 1) * 100;
  }

  const fmt = (n) => {
    if (isAr) {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>
            {isAr ? "بيانات الاستثمار" : "Investment Data"}
          </h3>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-invested">{t.investment}</label>
            <NumericFormat 
              id="roi-invested"
              className="input" 
              value={invested} 
              onValueChange={v => setInvested(v.floatValue || 0)} 
              thousandSeparator={true} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-returned">{t.final_value}</label>
            <NumericFormat 
              id="roi-returned"
              className="input" 
              value={returned} 
              onValueChange={v => setReturned(v.floatValue || 0)} 
              thousandSeparator={true} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="roi-duration">{t.duration}</label>
            <input 
              id="roi-duration"
              type="number" 
              className="input" 
              value={duration} 
              min="0.1" 
              step="0.1" 
              onChange={e => setDuration(Math.max(0.1, Number(e.target.value)))} 
            />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.roi}</div>
            <div className="result-value" style={{ color: roi >= 0 ? "var(--success)" : "var(--danger)" }}>
              {roi.toFixed(2)}%
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: "16px" }}>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.net_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: profit >= 0 ? "var(--success)" : "var(--danger)" }}>
                {profit >= 0 ? "+" : ""}{fmt(profit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.annualized}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: annualizedRoi >= 0 ? "var(--success)" : "var(--danger)" }}>
                {annualizedRoi.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
