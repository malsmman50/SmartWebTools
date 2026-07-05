"use client";

import { useState } from "react";
import { calculateFaraid } from "@/lib/faraid";
export default function InheritanceCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.inheritance;

  const [estateValue, setEstateValue] = useState("");
  
  // Primary
  const [spouseType, setSpouseType] = useState("none");
  const [wivesCount, setWivesCount] = useState(1);
  const [sonsCount, setSonsCount] = useState(0);
  const [daughtersCount, setDaughtersCount] = useState(0);
  const [fatherAlive, setFatherAlive] = useState(false);
  const [motherAlive, setMotherAlive] = useState(false);

  // Extended (Grandparents)
  const [paternalGrandfather, setPaternalGrandfather] = useState(false);
  const [paternalGrandmother, setPaternalGrandmother] = useState(false);
  const [maternalGrandmother, setMaternalGrandmother] = useState(false);

  // Extended (Siblings)
  const [fullBrothers, setFullBrothers] = useState(0);
  const [fullSisters, setFullSisters] = useState(0);
  const [paternalBrothers, setPaternalBrothers] = useState(0);
  const [paternalSisters, setPaternalSisters] = useState(0);
  const [maternalSiblings, setMaternalSiblings] = useState(0);

  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const value = parseFloat(estateValue);
    if (isNaN(value) || value <= 0) {
      alert(lang === "ar" ? "يرجى إدخال قيمة صحيحة للتركة." : "Please enter a valid estate value.");
      return;
    }

    const input = {
      estateValue: value,
      spouseType,
      wivesCount,
      sons: sonsCount,
      daughters: daughtersCount,
      father: fatherAlive,
      mother: motherAlive,
      paternalGrandfather,
      paternalGrandmother,
      maternalGrandmother,
      fullBrothers,
      fullSisters,
      paternalBrothers,
      paternalSisters,
      maternalSiblings
    };

    const res = calculateFaraid(input);
    setResults(res);
  };

  const fmt = (n) => {
    return new Intl.NumberFormat("en-US").format(Math.floor(n)) + " $";
  };

  const renderInput = (id, label, val, setter, max = 100) => (
    <div>
      <label htmlFor={id} style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{label}</label>
      <input 
        id={id}
        type="number" 
        value={val}
        onChange={(e) => setter(Math.max(0, Math.min(max, parseInt(e.target.value) || 0)))}
        min="0"
        max={max}
        style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
      />
    </div>
  );

  const renderCheckbox = (id, label, val, setter) => (
    <div>
      <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "16px", background: "var(--surface-sunken)", border: "1px solid var(--border)", borderRadius: "8px" }}>
        <input 
          id={id}
          type="checkbox" 
          checked={val}
          onChange={(e) => setter(e.target.checked)}
          style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{label}</span>
      </label>
    </div>
  );

  return (
    <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="grid-2" style={{ gap: "24px", marginBottom: "32px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="estateValue" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{t.estate}</label>
            <input 
              id="estateValue"
              type="number" 
              value={estateValue}
              onChange={(e) => setEstateValue(e.target.value)}
              min="0"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.2rem" }}
              placeholder={lang === "ar" ? "مثال: 100000" : "e.g. 100000"}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>
              {lang === "ar" ? "الزوج/الزوجة والأبناء" : "Spouses & Children"}
            </h3>
          </div>

          <div>
            <label htmlFor="spouseType" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{lang === "ar" ? "الزوج/الزوجة (للمتوفى):" : "Spouse Status:"}</label>
            <select 
              id="spouseType"
              value={spouseType}
              onChange={(e) => setSpouseType(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
            >
              <option value="none">{lang === "ar" ? "لا يوجد (أو متوفى قبله)" : "None"}</option>
              <option value="wife">{lang === "ar" ? "ترك زوجة (أو زوجات)" : "Leaves Wife(s)"}</option>
              <option value="husband">{lang === "ar" ? "تركت زوجاً" : "Leaves Husband"}</option>
            </select>
          </div>

          {spouseType === "wife" && renderInput("wivesCount", lang === "ar" ? "عدد الزوجات" : "Number of Wives", wivesCount, setWivesCount, 4)}
          
          {renderInput("sonsCount", t.sons, sonsCount, setSonsCount)}
          {renderInput("daughtersCount", t.daughters, daughtersCount, setDaughtersCount)}

          <div style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
            <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>
              {lang === "ar" ? "الأصول (الآباء والأجداد)" : "Ascendants (Parents & Grandparents)"}
            </h3>
          </div>

          {renderCheckbox("fatherAlive", lang === "ar" ? "الأب" : "Father", fatherAlive, setFatherAlive)}
          {renderCheckbox("motherAlive", lang === "ar" ? "الأم" : "Mother", motherAlive, setMotherAlive)}
          {renderCheckbox("paternalGrandfather", lang === "ar" ? "الجد (أبو الأب)" : "Paternal Grandfather", paternalGrandfather, setPaternalGrandfather)}
          {renderCheckbox("paternalGrandmother", lang === "ar" ? "الجدة (أم الأب)" : "Paternal Grandmother", paternalGrandmother, setPaternalGrandmother)}
          {renderCheckbox("maternalGrandmother", lang === "ar" ? "الجدة (أم الأم)" : "Maternal Grandmother", maternalGrandmother, setMaternalGrandmother)}

          <div style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
            <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>
              {lang === "ar" ? "الحواشي (الإخوة والأخوات)" : "Collaterals (Siblings)"}
            </h3>
          </div>

          {renderInput("fullBrothers", lang === "ar" ? "إخوة أشقاء (ذكور)" : "Full Brothers", fullBrothers, setFullBrothers)}
          {renderInput("fullSisters", lang === "ar" ? "أخوات شقيقات" : "Full Sisters", fullSisters, setFullSisters)}
          {renderInput("paternalBrothers", lang === "ar" ? "إخوة لأب (ذكور)" : "Paternal Brothers", paternalBrothers, setPaternalBrothers)}
          {renderInput("paternalSisters", lang === "ar" ? "أخوات لأب" : "Paternal Sisters", paternalSisters, setPaternalSisters)}
          {renderInput("maternalSiblings", lang === "ar" ? "إخوة لأم (ذكور وإناث)" : "Maternal Siblings (Both)", maternalSiblings, setMaternalSiblings)}
        </div>

        <button 
          onClick={handleCalculate}
          style={{ width: "100%", padding: "16px", borderRadius: "8px", background: "var(--primary)", color: "white", border: "none", fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer" }}
        >
          {t.btn}
        </button>

        {results && (
          <div style={{ marginTop: "32px" }} aria-live="polite">
            <h3 style={{ marginBottom: "16px", fontSize: "1.3rem", borderBottom: "2px solid var(--border)", paddingBottom: "8px" }}>
              {t.summary}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {results.shares.length === 0 ? (
                <div style={{ padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", textAlign: "center" }}>
                  {lang === "ar" ? "لا يوجد ورثة مستحقين." : "No eligible heirs."}
                </div>
              ) : (
                results.shares.map((share, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--primary)" }}>{lang === "ar" ? share.nameAr : share.nameEn}</div>
                      {share.fraction > 0 && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{lang === "ar" ? "النسبة: " : "Share: "}{Math.round(share.fraction * 1000) / 10}%</div>}
                    </div>
                    <div style={{ textAlign: lang === "ar" ? "left" : "right" }}>
                      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{fmt(share.amount)}</div>
                      {share.perPerson > 0 && Math.abs(share.amount - share.perPerson) > 0.01 && (
                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{lang === "ar" ? "نصيب الفرد: " : "Per Person: "}{fmt(share.perPerson)}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {results.unallocated > 0 && (
                <div style={{ padding: "16px", background: "rgba(234, 179, 8, 0.1)", color: "#ca8a04", borderRadius: "8px", border: "1px dashed #ca8a04", marginTop: "8px" }}>
                  <strong>{lang === "ar" ? "متبقي من التركة:" : "Remaining Estate:"}</strong> {fmt(results.unallocated)} {lang === "ar" ? "(يرد على أصحاب الفروض أو ذوي الأرحام أو لبيت المال)." : "(Subject to Radd or goes to Bayt al-Mal)."}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  );
}
