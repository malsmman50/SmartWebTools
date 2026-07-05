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
    <div className="grid-2">
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.fuel.distance}</label>
          <div style={{ position: "relative" }}>
            <Route size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="500"
              min="1"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.fuel.efficiency}</label>
          <div style={{ position: "relative" }}>
            <Droplet size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder="8"
              min="1"
              step="0.1"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="label">{dict.fuel.price}</label>
          <div style={{ position: "relative" }}>
            <DollarSign size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="number"
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2.5"
              min="0.1"
              step="0.01"
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={calculateFuel}>
          <Calculator size={18} />
          {dict.fuel.calculate}
        </button>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "8px" }}>{dict.fuel.result_title}</h3>
        
        <div className="result-box">
          <div className="result-label">{dict.fuel.fuel_needed}</div>
          <div className="result-value" style={{ color: "var(--text)", fontSize: "1.8rem" }}>{result ? result.fuelNeeded : "0.00"} {dict.fuel.liters}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(14, 165, 233, 0.1)", borderColor: "rgba(14, 165, 233, 0.2)" }}>
          <div className="result-label" style={{ color: "var(--text)" }}>{dict.fuel.title.split(" ")[0]} Cost</div>
          <div className="result-value" style={{ color: "#0ea5e9" }}>{result ? result.totalCost : "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
