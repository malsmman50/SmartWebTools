"use client";
import React, { useState, useEffect } from "react";

export default function RamadanHydration({ dict, lang }) {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [fastingHours, setFastingHours] = useState("14");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      setResult(null);
      return;
    }

    let totalMl = w * 35;
    if (activity === "light") totalMl += 350;
    else if (activity === "moderate") totalMl += 700;
    else if (activity === "active") totalMl += 1050;

    const liters = (totalMl / 1000).toFixed(1);
    const cups = Math.ceil(totalMl / 250);
    
    const fh = parseFloat(fastingHours) || 14;
    const nonFastingWindow = Math.max(24 - fh, 1);
    const cupsPerHour = (cups / nonFastingWindow).toFixed(1);

    setResult({ liters, cups, cupsPerHour });
  }, [weight, activity, fastingHours]);

  return (
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">⚖️ {dict.ramadan.weight}</label>
          <input
            type="number"
            className="input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            min="1"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">🏃 {dict.ramadan.activity}</label>
          <div className="tabs" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { id: "sedentary", label: dict.ramadan.sedentary.split("(")[0].trim() },
              { id: "light", label: dict.ramadan.light.split("(")[0].trim() },
              { id: "moderate", label: dict.ramadan.moderate.split("(")[0].trim() },
              { id: "active", label: dict.ramadan.active.split("(")[0].trim() }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivity(tab.id)}
                className={`btn ${activity === tab.id ? "btn-primary" : "btn-outline"}`}
                style={{ flex: "1 1 calc(50% - 8px)", fontSize: "0.85rem", padding: "8px" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label className="label">⏱️ {dict.ramadan.fasting_hours}</label>
          <input
            type="number"
            className="input"
            value={fastingHours}
            onChange={(e) => setFastingHours(e.target.value)}
            placeholder="14"
            min="10"
            max="22"
          />
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }} aria-live="polite">
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>💧 {dict.ramadan.result_title}</h3>
        
        <div className="grid-2" style={{ gap: "16px" }}>
          <div className="result-box" style={{ background: "rgba(var(--primary-rgb), 0.05)", border: "1px dashed rgba(var(--primary-rgb), 0.2)" }}>
            <div className="result-label">{dict.ramadan.result_liters}</div>
            <div className="result-value" style={{ color: "var(--primary)", fontSize: "2rem" }}>{result ? `${result.liters} L` : "-"}</div>
          </div>
          <div className="result-box" style={{ background: "rgba(var(--accent-rgb), 0.05)", border: "1px dashed rgba(var(--accent-rgb), 0.2)" }}>
            <div className="result-label">{dict.ramadan.result_cups}</div>
            <div className="result-value" style={{ color: "var(--accent)", fontSize: "2rem" }}>{result ? result.cups : "-"} 🥤</div>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: "auto", background: "rgba(var(--success-rgb), 0.1)", padding: "16px", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--success)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.2rem" }}>💡</span>
              <strong style={{ fontSize: "0.95rem", color: "var(--success)" }}>{dict.ramadan.tip_title}</strong>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text)", margin: 0, lineHeight: 1.6 }}>
              {dict.ramadan.tip_desc}
              <br /><br />
              <strong>
                {lang === "ar" 
                  ? `ننصح بشرب حوالي ${result.cupsPerHour} كوب كل ساعة خلال فترة الإفطار.` 
                  : `We recommend drinking about ${result.cupsPerHour} cups every hour during the non-fasting window.`}
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
