"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function SukukCalculatorClient({ dict, lang }) {
  const t = dict.sukuk;

  const [faceValue, setFaceValue] = useState("");
  const [profitRate, setProfitRate] = useState("");
  const [frequency, setFrequency] = useState("2");
  const [duration, setDuration] = useState("");

  const numFaceValue = Number(faceValue) || 0;
  const numProfitRate = Number(profitRate) || 0;
  const numFrequency = Number(frequency) || 1;
  const numDuration = Number(duration) || 0;

  // Periodic Profit = Face Value * (Profit Rate / 100) / Frequency
  const periodicProfit = numFaceValue * (numProfitRate / 100) / numFrequency;
  
  // Total Profit Earned over the tenor
  const totalProfit = periodicProfit * numFrequency * numDuration;
  
  // Total Maturity Value
  const totalReturn = numFaceValue + totalProfit;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US", { maximumFractionDigits: 2 })} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-face" className="label">{t.face_value}</label>
            <NumericFormat 
              id="sukuk-face" 
              className="input" 
              value={faceValue} 
              onValueChange={v => setFaceValue(v.floatValue ?? '')} 
              thousandSeparator={true} 
              allowNegative={false} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-rate" className="label">{t.profit_rate}</label>
            <NumericFormat 
              id="sukuk-rate" 
              className="input" 
              value={profitRate} 
              onValueChange={v => setProfitRate(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={2} 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="sukuk-freq" className="label">{t.frequency}</label>
            <select 
              id="sukuk-freq" 
              className="input" 
              value={frequency} 
              onChange={e => setFrequency(e.target.value)}
            >
              <option value="1">{lang === "ar" ? "سنوياً (1 مرة)" : "Annually (1 time)"}</option>
              <option value="2">{lang === "ar" ? "نصف سنوي (مرتين)" : "Semi-Annually (2 times)"}</option>
              <option value="4">{lang === "ar" ? "ربع سنوي (4 مرات)" : "Quarterly (4 times)"}</option>
              <option value="12">{lang === "ar" ? "شهرياً (12 مرة)" : "Monthly (12 times)"}</option>
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="sukuk-dur" className="label">{t.duration}</label>
            <NumericFormat 
              id="sukuk-dur" 
              className="input" 
              value={duration} 
              onValueChange={v => setDuration(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={1} 
            />
          </div>
        </div>

        <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="grid-2">
            <div className="result-box" style={{ padding: "20px" }}>
              <div className="result-label">{t.periodic_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>
                {fmt(periodicProfit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "20px" }}>
              <div className="result-label">{t.total_profit}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--success)" }}>
                + {fmt(totalProfit)}
              </div>
            </div>
          </div>

          <div className="result-box" style={{ background: "var(--primary)", color: "#fff", borderColor: "var(--primary)", marginTop: "auto" }}>
            <div className="result-label" style={{ color: "rgba(255,255,255,0.8)" }}>{t.total_return}</div>
            <div className="result-value">
              {fmt(totalReturn)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
