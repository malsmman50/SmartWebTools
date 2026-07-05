"use client";

import { useState } from "react";

export default function RamadanHydrationClient({ lang, dict }) {
  const t = dict.ramadan;
  const isAr = lang === "ar";

  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.2");
  const [fastingHours, setFastingHours] = useState("14");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const a = parseFloat(activity);
    const f = parseFloat(fastingHours);

    if (!w || !a || !f) {
      setResult(null);
      return;
    }

    // Base hydration: 30ml per kg of body weight
    let baseWaterMl = w * 30;

    // Activity multiplier
    baseWaterMl *= a;

    // Fasting duration adjustment (roughly 50ml extra per hour over 12 hours)
    if (f > 12) {
      baseWaterMl += (f - 12) * 50;
    }

    const liters = (baseWaterMl / 1000).toFixed(2);
    const cups = Math.ceil(baseWaterMl / 250);

    setResult({ liters, cups });
  };

  return (
    <div className="grid-2">
      <div className="card">
        <h3 style={{ marginBottom: "16px" }}>{isAr ? "أدخل بياناتك" : "Enter Your Details"}</h3>
        
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="ramadan-weight" className="label">{t.weight}</label>
          <input 
            id="ramadan-weight"
            type="number" 
            className="input" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="ramadan-fasting" className="label">{t.fasting_hours}</label>
          <input 
            id="ramadan-fasting"
            type="number" 
            className="input" 
            value={fastingHours} 
            onChange={(e) => setFastingHours(e.target.value)} 
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label htmlFor="ramadan-activity" className="label">{t.activity}</label>
          <select 
            id="ramadan-activity"
            className="input" 
            value={activity} 
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="1.0">{t.sedentary}</option>
            <option value="1.2">{t.light}</option>
            <option value="1.4">{t.moderate}</option>
            <option value="1.6">{t.active}</option>
          </select>
        </div>

        <button onClick={calculate} className="btn btn-primary" style={{ width: "100%" }}>
          {t.calculate}
        </button>
      </div>

      <div>
        <div className="result-box" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="result-label">{t.result_title}</div>
          <div className="result-value" style={{ fontSize: "3.5rem", color: "var(--primary)", marginBottom: "16px" }}>
            {result ? result.liters : "-"} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>{t.result_liters}</span>
          </div>
          <div style={{ fontSize: "1.2rem", color: "var(--text)", fontWeight: 600, marginBottom: "24px" }}>
            {isAr ? "أو" : "OR"} <span style={{ color: "var(--accent)" }}>{result ? result.cups : "-"}</span> {t.result_cups}
          </div>

          <div style={{ padding: "16px", background: "var(--bg-card)", borderRadius: "8px", borderLeft: "4px solid var(--accent)", textAlign: isAr ? "right" : "left" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "var(--accent)" }}>💡 {t.tip_title}</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>{t.tip_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
