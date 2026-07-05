"use client";

import { useState } from "react";

// Curated data to ensure high-quality content for SEO and retention
const getWeeklyData = (week, isAr) => {
  if (week < 4) return { size: isAr ? "بحجم بذرة الخشخاش" : "Poppy seed", tip: isAr ? "ابدئي بتناول حمض الفوليك وتجنبي الكافيين المفرط." : "Start taking folic acid and avoid excessive caffeine." };
  if (week < 8) return { size: isAr ? "بحجم حبة التوت" : "Blueberry", tip: isAr ? "قد يبدأ غثيان الصباح، تناولي وجبات صغيرة متكررة." : "Morning sickness may start; eat small, frequent meals." };
  if (week < 13) return { size: isAr ? "بحجم حبة البرقوق" : "Plum", tip: isAr ? "نهاية الثلث الأول تقترب! استريحي قدر الإمكان." : "End of 1st trimester is near! Rest as much as possible." };
  if (week < 18) return { size: isAr ? "بحجم حبة الأفوكادو" : "Avocado", tip: isAr ? "قد تشعرين بحركات الجنين الأولى قريباً!" : "You might feel the first baby movements soon!" };
  if (week < 23) return { size: isAr ? "بحجم حبة البابايا" : "Papaya", tip: isAr ? "تذكري شرب كميات كبيرة من الماء يومياً." : "Remember to drink plenty of water daily." };
  if (week < 28) return { size: isAr ? "بحجم حبة الباذنجان" : "Eggplant", tip: isAr ? "حافظي على نشاطك البدني بتمارين خفيفة مثل المشي." : "Stay active with light exercises like walking." };
  if (week < 33) return { size: isAr ? "بحجم ثمرة جوز الهند" : "Coconut", tip: isAr ? "الوقت مناسب للبدء في تجهيز حقيبة المستشفى." : "Good time to start packing your hospital bag." };
  if (week < 38) return { size: isAr ? "بحجم البطيخة الصغيرة" : "Small Watermelon", tip: isAr ? "راقبي انقباضات براكستون هيكس (الطلق الكاذب)." : "Watch out for Braxton Hicks contractions." };
  return { size: isAr ? "بحجم اليقطين الصغير" : "Small Pumpkin", tip: isAr ? "استرخي تماماً، طفلك مستعد للقدوم في أي لحظة!" : "Relax completely, your baby is ready to arrive anytime!" };
};

export default function PregnancyCalculator({ lang, dict }) {
  const isAr = lang === "ar";
  const [method, setMethod] = useState("lmp");
  const [inputDate, setInputDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculatePregnancy = () => {
    if (!inputDate) return;

    const date = new Date(inputDate);
    let dueDate = new Date(date);
    let currentWeek = 0;
    
    const today = new Date();

    if (method === "lmp") {
      dueDate.setDate(date.getDate() + 280);
      const diffTime = Math.abs(today - date);
      currentWeek = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    } else {
      dueDate.setDate(date.getDate() + 266);
      const estimatedLmp = new Date(date);
      estimatedLmp.setDate(estimatedLmp.getDate() - 14);
      const diffTime = Math.abs(today - estimatedLmp);
      currentWeek = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    }

    if (currentWeek < 0) currentWeek = 0;
    if (currentWeek > 42) currentWeek = 42;

    let trimester = dict.pregnancy.trimester_1;
    if (currentWeek >= 13 && currentWeek <= 26) trimester = dict.pregnancy.trimester_2;
    if (currentWeek >= 27) trimester = dict.pregnancy.trimester_3;

    const weeklyData = getWeeklyData(currentWeek, isAr);

    // Weight Tracker Logic (ACOG Guidelines)
    let bmiCategory = "";
    let weightGainRange = "";
    
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const bmi = w / (h * h);

      let rateMin = 0.35, rateMax = 0.5; // Normal
      if (bmi < 18.5) {
        bmiCategory = isAr ? "نقص الوزن" : "Underweight";
        rateMin = 0.44; rateMax = 0.58;
      } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = isAr ? "وزن طبيعي" : "Normal Weight";
      } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = isAr ? "زيادة في الوزن" : "Overweight";
        rateMin = 0.23; rateMax = 0.33;
      } else {
        bmiCategory = isAr ? "سمنة" : "Obese";
        rateMin = 0.17; rateMax = 0.27;
      }

      let minGain = 0;
      let maxGain = 0;

      if (currentWeek > 0 && currentWeek <= 13) {
        minGain = (currentWeek / 13) * 0.5;
        maxGain = (currentWeek / 13) * 2.0;
      } else if (currentWeek > 13) {
        const addedWeeks = currentWeek - 13;
        minGain = 0.5 + (addedWeeks * rateMin);
        maxGain = 2.0 + (addedWeeks * rateMax);
      }

      weightGainRange = currentWeek === 0 ? "0 kg" : `+${minGain.toFixed(1)} kg ${isAr ? "إلى" : "to"} +${maxGain.toFixed(1)} kg`;
    }

    setResult({
      dueDate: dueDate.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      currentWeek,
      trimester,
      bmiCategory,
      weightGainRange,
      ...weeklyData
    });
  };

  return (
    <div className="grid-2">
      {/* Input Section */}
      <div className="card">
        {/* YMYL Medical Disclaimer */}
        <div style={{ background: "rgba(var(--danger-rgb), 0.1)", borderLeft: "4px solid var(--danger)", padding: "16px", marginBottom: "24px", borderRadius: "0 var(--radius) var(--radius) 0" }}>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--danger)", lineHeight: "1.5" }}>
            <strong>⚠️ {dict.pregnancy.disclaimer}</strong>
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.pregnancy.select_method}</label>
          <select className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="lmp">{dict.pregnancy.method_lmp}</option>
            <option value="conception">{dict.pregnancy.method_conception}</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="label">{dict.pregnancy.date_label}</label>
          <input
            type="date"
            lang={isAr ? "ar-EG" : "en-US"}
            className="input"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label className="label">{dict.pregnancy.height_label}</label>
            <input
              type="number"
              className="input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 165"
              min="100"
            />
          </div>
          <div>
            <label className="label">{dict.pregnancy.weight_label}</label>
            <input
              type="number"
              className="input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 65"
              min="30"
            />
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={calculatePregnancy} disabled={!inputDate}>
          {dict.pregnancy.calculate}
        </button>
      </div>

      {/* Results Section */}
      <div className="card" style={{ background: "var(--bg-secondary)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        {result ? (
          <>
            <div className="result-box" style={{ marginBottom: "20px", background: "rgba(var(--primary-rgb), 0.1)", border: "1px solid rgba(var(--primary-rgb), 0.3)" }}>
              <div className="result-label" style={{ color: "var(--primary)" }}>{dict.pregnancy.due_date}</div>
              <div className="result-value" style={{ color: "var(--primary)", fontSize: "1.8rem" }}>{result.dueDate}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div className="result-box">
                <div className="result-label">{dict.pregnancy.current_week}</div>
                <div className="result-value">{result.currentWeek}</div>
              </div>
              <div className="result-box">
                <div className="result-label">{dict.pregnancy.trimester}</div>
                <div className="result-value" style={{ fontSize: "1.1rem" }}>{result.trimester}</div>
              </div>
            </div>

            <div className="result-box" style={{ marginBottom: "20px" }}>
              <div className="result-label" style={{ color: "var(--success)" }}>{dict.pregnancy.baby_size}</div>
              <div className="result-value" style={{ color: "var(--success)", fontSize: "1.2rem" }}>{result.size}</div>
            </div>

            {result.weightGainRange && (
              <div className="result-box" style={{ marginBottom: "20px", border: "1px dashed var(--accent)" }}>
                <div className="result-label" style={{ color: "var(--accent)" }}>{dict.pregnancy.target_weight_gain}</div>
                <div className="result-value" style={{ color: "var(--accent)", fontSize: "1.2rem" }}>{result.weightGainRange}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>{dict.pregnancy.bmi_category}: {result.bmiCategory}</div>
              </div>
            )}

            <div className="result-box" style={{ background: "rgba(var(--warning-rgb), 0.1)" }}>
              <div className="result-label" style={{ color: "var(--warning)" }}>💡 {dict.pregnancy.weekly_tip}</div>
              <div style={{ color: "var(--text)", marginTop: "8px", lineHeight: "1.5", fontSize: "0.95rem" }}>{result.tip}</div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px", opacity: 0.5 }}>🤰</span>
            <p>{isAr ? "الرجاء إدخال التاريخ لحساب موعد الولادة." : "Please enter a date to calculate your due date."}</p>
          </div>
        )}

      </div>
    </div>
  );
}
