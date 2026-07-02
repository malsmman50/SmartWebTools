"use client";

import { useState } from "react";

export default function DiscountCalculator({ lang, dict }) {
  const isAr = lang === "ar";
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [additionalDiscount, setAdditionalDiscount] = useState("");
  const [vatPercent, setVatPercent] = useState("");

  const calculateResults = () => {
    let price = parseFloat(originalPrice) || 0;
    const d1 = parseFloat(discountPercent) || 0;
    const d2 = parseFloat(additionalDiscount) || 0;
    const v = parseFloat(vatPercent) || 0;

    let saved1 = price * (d1 / 100);
    let priceAfterD1 = price - saved1;
    let saved2 = priceAfterD1 * (d2 / 100);
    let priceAfterD2 = priceAfterD1 - saved2;
    let totalSaved = saved1 + saved2;

    let vatAmount = priceAfterD2 * (v / 100);
    let finalPrice = priceAfterD2 + vatAmount;

    return {
      totalSaved: totalSaved.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    };
  };

  const res = calculateResults();

  return (
    <div className="grid-2">
      {/* Input Section */}
      <div className="card">
        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.discount.original_price}</label>
          <input
            type="number"
            className="input"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="e.g., 100"
            min="0"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.discount.discount_percent}</label>
          <input
            type="number"
            className="input"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="e.g., 15"
            min="0"
            max="100"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.discount.additional_discount}</label>
          <input
            type="number"
            className="input"
            value={additionalDiscount}
            onChange={(e) => setAdditionalDiscount(e.target.value)}
            placeholder="e.g., 10"
            min="0"
            max="100"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.discount.vat_percent}</label>
          <input
            type="number"
            className="input"
            value={vatPercent}
            onChange={(e) => setVatPercent(e.target.value)}
            placeholder={isAr ? "مثال: 15" : "e.g., 15"}
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="card" style={{ background: "var(--bg-secondary)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        <div className="result-box" style={{ marginBottom: "20px" }}>
          <div className="result-label" style={{ color: "var(--success)" }}>{dict.discount.amount_saved}</div>
          <div className="result-value" style={{ color: "var(--success)" }}>{res.totalSaved}</div>
        </div>

        <div className="result-box" style={{ marginBottom: "20px" }}>
          <div className="result-label" style={{ color: "var(--danger)" }}>{dict.discount.vat_amount}</div>
          <div className="result-value" style={{ color: "var(--danger)" }}>{res.vatAmount}</div>
        </div>

        <div className="result-box" style={{ background: "rgba(var(--primary-rgb), 0.1)", border: "1px solid rgba(var(--primary-rgb), 0.3)" }}>
          <div className="result-label" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>{dict.discount.final_price}</div>
          <div className="result-value" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>{res.finalPrice}</div>
        </div>

      </div>
    </div>
  );
}
