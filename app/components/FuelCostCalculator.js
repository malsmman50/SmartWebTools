"use client";
import React, { useState, useEffect } from "react";

export default function FuelCostCalculator({ dict }) {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("8"); // L/100km
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const d = parseFloat(distance) || 0;
    const e = parseFloat(efficiency) || 0;
    const p = parseFloat(price) || 0;

    if (d <= 0 || e <= 0 || p <= 0) {
      setResult(null);
      return;
    }

    const fuelNeeded = (d / 100) * e;
    const totalCost = fuelNeeded * p;

    setResult({
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2)
    });
  }, [distance, efficiency, price]);

  return (
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">🗺️ {dict.fuel.distance}</label>
          <input
            type="number"
            className="input"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="500"
            min="1"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">⛽ {dict.fuel.efficiency}</label>
          <input
            type="number"
            className="input"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="8"
            min="1"
            step="0.1"
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label className="label">💵 {dict.fuel.price}</label>
          <input
            type="number"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2.5"
            min="0.1"
            step="0.01"
          />
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }} aria-live="polite">
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>🚗 {dict.fuel.result_title}</h3>
        
        <div className="result-box" style={{ background: "rgba(var(--text-rgb), 0.03)", border: "1px dashed rgba(var(--text-rgb), 0.1)" }}>
          <div className="result-label">{dict.fuel.fuel_needed}</div>
          <div className="result-value" style={{ color: "var(--text)", fontSize: "2rem" }}>{result ? result.fuelNeeded : "-"} <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>{dict.fuel.liters}</span></div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--primary-rgb), 0.05)", border: "2px solid rgba(var(--primary-rgb), 0.2)", marginTop: "auto" }}>
          <div className="result-label" style={{ color: "var(--text)", fontWeight: "600" }}>{dict.fuel.title.split(" ")[0]} Cost</div>
          <div className="result-value" style={{ color: "var(--primary)" }}>{result ? result.totalCost : "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
