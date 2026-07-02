"use client";
import { useState, useEffect } from "react";

export default function HealthCalculator({ dict, isAr }) {
  const [gender, setGender] = useState("men");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.2");
  
  const [results, setResults] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) {
      setResults(null);
      return;
    }

    // BMI
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    let bmiCategory = "";
    if (bmi < 18.5) bmiCategory = dict.health.bmi_underweight;
    else if (bmi < 25) bmiCategory = dict.health.bmi_normal;
    else if (bmi < 30) bmiCategory = dict.health.bmi_overweight;
    else bmiCategory = dict.health.bmi_obese;

    // BMR (Mifflin-St Jeor)
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (gender === "men") bmr += 5;
    else bmr -= 161;

    // TDEE
    const tdee = bmr * act;

    // Ideal Weight Range
    const idealMin = 18.5 * (heightInMeters * heightInMeters);
    const idealMax = 24.9 * (heightInMeters * heightInMeters);

    setResults({
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      idealMin: idealMin.toFixed(1),
      idealMax: idealMax.toFixed(1)
    });
  };

  useEffect(() => {
    calculate();
  }, [gender, age, height, weight, activity]);

  return (
    <div className="grid-2">
      {/* Input Section */}
      <div className="card">
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <button 
            onClick={() => setGender("men")}
            className={`btn ${gender === "men" ? "btn-primary" : "btn-outline"}`}
            style={{ flex: 1 }}
          >
            {isAr ? "رجل 👨" : "Man 👨"}
          </button>
          <button 
            onClick={() => setGender("women")}
            className={`btn ${gender === "women" ? "btn-primary" : "btn-outline"}`}
            style={{ flex: 1 }}
          >
            {isAr ? "امرأة 👩" : "Woman 👩"}
          </button>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.health.age}</label>
          <input type="number" className="input" value={age} onChange={e => setAge(e.target.value)} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.health.height}</label>
          <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label className="label">{dict.health.weight}</label>
          <input type="number" className="input" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label className="label">{dict.health.activity_level}</label>
          <select className="input" value={activity} onChange={e => setActivity(e.target.value)}>
            <option value="1.2">{dict.health.activity_sedentary}</option>
            <option value="1.375">{dict.health.activity_light}</option>
            <option value="1.55">{dict.health.activity_moderate}</option>
            <option value="1.725">{dict.health.activity_active}</option>
            <option value="1.9">{dict.health.activity_extra}</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div aria-live="polite">
        {results ? (
          <>
            <div className="result-box" style={{ marginBottom: "16px" }}>
              <div className="result-label">{dict.health.bmi_title}</div>
              <div className="result-value" style={{ 
                color: results.bmi >= 18.5 && results.bmi < 25 ? "var(--success)" : "var(--danger)"
              }}>
                {results.bmi}
              </div>
              <p style={{ 
                color: results.bmi >= 18.5 && results.bmi < 25 ? "var(--success)" : "var(--danger)", 
                marginTop: "8px", 
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                {results.bmiCategory}
              </p>
            </div>

            <div className="result-box" style={{ marginBottom: "16px" }}>
              <div className="result-label">{dict.health.bmr_title}</div>
              <div className="result-value" style={{ color: "var(--text)" }}>
                {results.bmr} <span style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--text-muted)" }}>{dict.health.calories_per_day}</span>
              </div>
            </div>

            <div className="result-box" style={{ marginBottom: "16px" }}>
              <div className="result-label">{dict.health.tdee_title}</div>
              <div className="result-value" style={{ color: "#f59e0b" }}>
                {results.tdee} <span style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--text-muted)" }}>{dict.health.calories_per_day}</span>
              </div>
            </div>

            <div className="result-box" style={{ border: "1px solid var(--primary)", background: "rgba(37, 99, 235, 0.05)" }}>
              <div className="result-label" style={{ color: "var(--primary)" }}>{dict.health.ideal_weight_title}</div>
              <div className="result-value" style={{ color: "var(--primary)" }}>
                {results.idealMin} - {results.idealMax} <span style={{ fontSize: "1rem", fontWeight: "normal" }}>kg</span>
              </div>
            </div>
          </>
        ) : (
          <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", minHeight: "300px" }}>
            {isAr ? "أدخل بياناتك لرؤية النتائج..." : "Enter your data to see results..."}
          </div>
        )}
      </div>
    </div>
  );
}
