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

    // Base water: 35ml per kg
    let totalMl = w * 35;

    // Add for activity
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
    <div className="calc-card glass-effect">
      <div className="input-group">
        <label className="input-label">
          {dict.ramadan.weight}
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            className="calc-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            min="1"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.ramadan.activity}
        </label>
        <div className="input-wrapper select-wrapper">
          <Activity className="input-icon" size={18} />
          <select
            className="calc-input with-icon"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={{ paddingInlineStart: "2.5rem" }}
          >
            <option value="sedentary">{dict.ramadan.sedentary}</option>
            <option value="light">{dict.ramadan.light}</option>
            <option value="moderate">{dict.ramadan.moderate}</option>
            <option value="active">{dict.ramadan.active}</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.ramadan.fasting_hours}
        </label>
        <div className="input-wrapper">
          <Clock className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={fastingHours}
            onChange={(e) => setFastingHours(e.target.value)}
            placeholder="14"
            min="10"
            max="22"
          />
        </div>
      </div>

      <button className="calc-btn primary" onClick={calculateHydration}>
        <Droplet size={18} />
        {dict.ramadan.calculate}
      </button>

      {result && (
        <div className="result-card glass-effect result-enter">
          <h3 className="result-title" style={{ textAlign: "center" }}>{dict.ramadan.result_title}</h3>
          
          <div className="result-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="result-box premium-box">
              <span className="result-label">{dict.ramadan.result_liters}</span>
              <span className="result-value primary-text">{result.liters} L</span>
            </div>
            <div className="result-box premium-box">
              <span className="result-label">{dict.ramadan.result_cups}</span>
              <span className="result-value secondary-text">{result.cups} 🥤</span>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: "1.5rem" }}>
            <Info size={20} className="info-icon" />
            <div className="info-content">
              <strong>{dict.ramadan.tip_title}</strong>
              <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", lineHeight: "1.5" }}>
                {dict.ramadan.tip_desc}
                <br />
                <span style={{ display: "inline-block", marginTop: "0.5rem", fontWeight: "600", color: "var(--primary)" }}>
                  {lang === "ar" 
                    ? `💡 ننصح بشرب حوالي ${result.cupsPerHour} كوب كل ساعة خلال فترة الإفطار.` 
                    : `💡 We recommend drinking about ${result.cupsPerHour} cups every hour during the non-fasting window.`}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
