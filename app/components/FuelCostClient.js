"use client";

import { useState } from "react";

export default function FuelCostClient({ lang, dict }) {
  const t = dict.fuel;
  const isAr = lang === "ar";

  const [distance, setDistance] = useState("100");
  const [efficiency, setEfficiency] = useState("8.5");
  const [price, setPrice] = useState("1.50");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(price);

    if (!d || !e || !p) {
      setResult(null);
      return;
    }

    const litersNeeded = (d / 100) * e;
    const totalCost = litersNeeded * p;

    setResult({
      cost: totalCost.toFixed(2),
      liters: litersNeeded.toFixed(1)
    });
  };

  return (
    <div className="grid-2">
      <div className="card">
        <h3 style={{ marginBottom: "16px" }}>{isAr ? "أدخل تفاصيل الرحلة" : "Enter Trip Details"}</h3>
        
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="fuel-distance" className="label">{t.distance}</label>
          <input 
            id="fuel-distance"
            type="number" 
            className="input" 
            value={distance} 
            onChange={(e) => setDistance(e.target.value)} 
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="fuel-efficiency" className="label">{t.efficiency}</label>
          <input 
            id="fuel-efficiency"
            type="number" 
            className="input" 
            value={efficiency} 
            onChange={(e) => setEfficiency(e.target.value)} 
            step="0.1"
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label htmlFor="fuel-price" className="label">{t.price}</label>
          <input 
            id="fuel-price"
            type="number" 
            className="input" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            step="0.01"
          />
        </div>

        <button onClick={calculate} className="btn btn-primary" style={{ width: "100%" }}>
          {t.calculate}
        </button>
      </div>

      <div>
        <div className="result-box" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="result-label">{t.result_title}</div>
          <div className="result-value" style={{ fontSize: "3.5rem", color: "var(--success)", marginBottom: "16px" }}>
            {result ? result.cost : "-"} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>{t.result_currency}</span>
          </div>
          <div style={{ fontSize: "1.2rem", color: "var(--text)", fontWeight: 600, marginBottom: "24px" }}>
            {t.fuel_needed}: <span style={{ color: "var(--accent)" }}>{result ? result.liters : "-"}</span> {t.liters}
          </div>

          <div style={{ padding: "16px", background: "var(--bg-card)", borderRadius: "8px", borderLeft: "4px solid var(--success)", textAlign: isAr ? "right" : "left" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "var(--success)" }}>💡 {isAr ? "نصيحة توفير الوقود:" : "Fuel Saving Tip:"}</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
              {isAr 
                ? "القيادة بسرعة ثابتة (باستخدام مثبت السرعة) والتأكد من ضغط الإطارات المناسب يمكن أن يحسن كفاءة استهلاك الوقود بنسبة تصل إلى 10٪."
                : "Driving at a steady speed (using cruise control) and ensuring proper tire pressure can improve fuel efficiency by up to 10%."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
