"use client";
import { useState, useEffect } from "react";

export default function ShoeSizeConverter({ isAr, prefill }) {
  const [gender, setGender] = useState(prefill?.gender || "men");
  const [fromSystem, setFromSystem] = useState(prefill?.from || "EU");
  const [toSystem, setToSystem] = useState(prefill?.to || "US");
  const [inputValue, setInputValue] = useState(prefill?.fromSize?.toString() || "40");
  const [result, setResult] = useState("");

  const sizes = {
    men: {
      US: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
      UK: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14],
      EU: [39, 39, 40, 40.5, 41, 42, 43, 43.5, 44, 44.5, 45, 46, 46.5, 47.5, 48.5, 49.5],
      CM: [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 31, 32, 33]
    },
    women: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      EU: [35, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 43.5, 44],
      CM: [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29]
    }
  };

  const calculate = () => {
    if (!inputValue || isNaN(inputValue)) {
      setResult("");
      return;
    }
    
    const val = parseFloat(inputValue);
    const systemArray = sizes[gender][fromSystem];
    
    // Find closest match index
    let closestIndex = 0;
    let minDiff = Infinity;
    
    for (let i = 0; i < systemArray.length; i++) {
      const diff = Math.abs(systemArray[i] - val);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    
    const toResult = sizes[gender][toSystem][closestIndex];
    setResult(toResult.toString());
  };

  useEffect(() => {
    calculate();
  }, [gender, fromSystem, toSystem, inputValue]);

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "0 auto", padding: "32px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", justifyContent: "center" }}>
        <button 
          onClick={() => setGender("men")}
          className={`btn ${gender === "men" ? "btn-primary" : "btn-secondary"}`}
        >
          {isAr ? "رجال" : "Men"}
        </button>
        <button 
          onClick={() => setGender("women")}
          className={`btn ${gender === "women" ? "btn-primary" : "btn-secondary"}`}
        >
          {isAr ? "نساء" : "Women"}
        </button>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">{isAr ? "من نظام" : "From System"}</label>
          <select className="form-input" value={fromSystem} onChange={(e) => setFromSystem(e.target.value)}>
            <option value="EU">EU (Europe)</option>
            <option value="US">US (United States)</option>
            <option value="UK">UK (United Kingdom)</option>
            <option value="CM">CM (Centimeters)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">{isAr ? "إلى نظام" : "To System"}</label>
          <select className="form-input" value={toSystem} onChange={(e) => setToSystem(e.target.value)}>
            <option value="US">US (United States)</option>
            <option value="EU">EU (Europe)</option>
            <option value="UK">UK (United Kingdom)</option>
            <option value="CM">CM (Centimeters)</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: "16px" }}>
        <label className="form-label">{isAr ? `المقاس (${fromSystem})` : `Size (${fromSystem})`}</label>
        <input 
          type="number" 
          className="form-input" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          step="0.5"
        />
      </div>

      <div style={{ marginTop: "32px", padding: "24px", background: "var(--bg)", borderRadius: "8px", textAlign: "center", border: "1px solid var(--border)" }}>
        <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "8px" }}>
          {isAr ? `النتيجة بنظام ${toSystem}` : `Result in ${toSystem}`}
        </div>
        <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--primary)" }}>
          {result || "-"}
        </div>
      </div>
    </div>
  );
}
