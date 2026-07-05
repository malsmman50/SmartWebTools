"use client";
import React, { useState } from "react";
import { Route, Droplet, DollarSign, Calculator } from "lucide-react";

export default function FuelCostCalculator({ dict }) {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("8"); // L/100km
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculateFuel = () => {
    const d = parseFloat(distance) || 0;
    const e = parseFloat(efficiency) || 0;
    const p = parseFloat(price) || 0;

    if (d <= 0 || e <= 0 || p <= 0) return;

    const fuelNeeded = (d / 100) * e;
    const totalCost = fuelNeeded * p;

    setResult({
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2)
    });
  };

  return (
    <div className="calc-card glass-effect">
      <div className="input-group">
        <label className="input-label">
          {dict.fuel.distance}
        </label>
        <div className="input-wrapper">
          <Route className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="500"
            min="1"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.fuel.efficiency}
        </label>
        <div className="input-wrapper">
          <Droplet className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            placeholder="8"
            min="1"
            step="0.1"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          {dict.fuel.price}
        </label>
        <div className="input-wrapper">
          <DollarSign className="input-icon" size={18} />
          <input
            type="number"
            className="calc-input with-icon"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2.5"
            min="0.1"
            step="0.01"
          />
        </div>
      </div>

      <button className="calc-btn primary" onClick={calculateFuel}>
        <Calculator size={18} />
        {dict.fuel.calculate}
      </button>

      {result && (
        <div className="result-card glass-effect result-enter">
          <h3 className="result-title" style={{ textAlign: "center", marginBottom: "1rem" }}>{dict.fuel.result_title}</h3>
          
          <div className="result-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="result-box">
              <span className="result-label">{dict.fuel.fuel_needed}</span>
              <span className="result-value secondary-text">{result.fuelNeeded} {dict.fuel.liters}</span>
            </div>
            <div className="result-box premium-box highlight-box" style={{ background: "rgba(14, 165, 233, 0.1)", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
              <span className="result-label" style={{ color: "var(--text-color)" }}>{dict.fuel.title.split(" ")[0]} Cost</span>
              <span className="result-value" style={{ color: "var(--primary)", fontSize: "2rem" }}>{result.totalCost}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
