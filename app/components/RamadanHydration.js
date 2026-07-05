"use client";
import React, { useState } from "react";
import { Droplet, Activity, Clock, Info } from "lucide-react";

export default function RamadanHydration({ dict, lang }) {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [fastingHours, setFastingHours] = useState("14");
  const [result, setResult] = useState(null);

  const calculateHydration = () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) return;

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
  };

  return (
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.ramadan.weight}</label>
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
          <label className="label">{dict.ramadan.activity}</label>
          <select
            className="input"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="sedentary">{dict.ramadan.sedentary}</option>
            <option value="light">{dict.ramadan.light}</option>
            <option value="moderate">{dict.ramadan.moderate}</option>
            <option value="active">{dict.ramadan.active}</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="label">{dict.ramadan.fasting_hours}</label>
          <div style={{ position: "relative" }}>
            <Clock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={fastingHours}
              onChange={(e) => setFastingHours(e.target.value)}
              placeholder="14"
              min="10"
              max="22"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={calculateHydration}>
          <Droplet size={18} />
          {dict.ramadan.calculate}
        </button>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>{dict.ramadan.result_title}</h3>
        
        <div className="grid-2" style={{ gap: "16px" }}>
          <div className="result-box">
            <div className="result-label">{dict.ramadan.result_liters}</div>
            <div className="result-value" style={{ color: "var(--primary)", fontSize: "1.8rem" }}>{result ? `${result.liters} L` : "-"}</div>
          </div>
          <div className="result-box">
            <div className="result-label">{dict.ramadan.result_cups}</div>
            <div className="result-value" style={{ color: "var(--accent)", fontSize: "1.8rem" }}>{result ? result.cups : "-"} 🥤</div>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: "auto", background: "rgba(37, 99, 235, 0.05)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid rgba(37, 99, 235, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Info size={18} style={{ color: "var(--primary)" }} />
              <strong style={{ fontSize: "0.95rem" }}>{dict.ramadan.tip_title}</strong>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
              {dict.ramadan.tip_desc}
              <br /><br />
              <strong style={{ color: "var(--primary)" }}>
                {lang === "ar" 
                  ? `💡 ننصح بشرب حوالي ${result.cupsPerHour} كوب كل ساعة خلال فترة الإفطار.` 
                  : `💡 We recommend drinking about ${result.cupsPerHour} cups every hour during the non-fasting window.`}
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
