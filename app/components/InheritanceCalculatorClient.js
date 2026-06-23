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
    <div className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "40px auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{t.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>
          {t.subtitle}
        </p>

        <div style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--primary)", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.9rem", lineHeight: "1.5" }}>
          {lang === "ar" ? (
            <><strong>تحديث جديد:</strong> تم ترقية الحاسبة لتشمل أحكام الجدود والجدات والإخوة الأشقاء ولأب ولأم، مع تطبيق قواعد العول والحجب (بناءً على المذهب الحنفي).</>
          ) : (
            <><strong>Major Update:</strong> The calculator now includes extended heirs (Grandparents, Full/Paternal/Maternal Siblings) and applies Awl and Hajb rules (based on Hanafi fiqh).</>
          )}
        </div>

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

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>حاسبة المواريث الشرعية (النسخة الشاملة)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تم تطوير حاسبة المواريث لتشمل الأصول (الأب، الجد، الأم، الجدات)، والفروع (الأبناء والبنات)، والحواشي (الإخوة الأشقاء، الإخوة لأب، والإخوة لأم). تطبق الحاسبة قواعد الحجب المعتمدة (Hajb) ومبدأ العول ('Awl) بدقة وفقاً للراجح من المذهب الحنفي.
            </p>
            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>تنبيه فقهي وقانوني</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              على الرغم من دقة هذه الخوارزميات، علم المواريث معقد جداً ويحتوي على اختلافات فقهية في مسائل محددة (مثل مسألة الجد مع الإخوة، والمناسخات). هذه الحاسبة للاستخدام التعليمي والتقريبي فقط. <strong>لا تعتمد عليها في التقاضي أو تقسيم تركة حقيقية</strong>، ويجب الرجوع للمحاكم الشرعية الرسمية.
            </p>
          </>
        ) : (
          <>
            <h2>Comprehensive Islamic Inheritance (Mawarith) Calculator</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              This calculator has been upgraded to handle extended heirs including Ascendants (Grandparents) and Collaterals (Full, Paternal, and Maternal Siblings). It automatically applies the complex rules of exclusion (Hajb) and proportional reduction (Awl) based on the Hanafi school of thought.
            </p>
            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>Legal & Fiqh Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Despite the accuracy of these algorithms, Islamic inheritance contains fiqhi differences of opinion in rare edge cases. This calculator is for educational and approximation purposes only. <strong>Never use it as a final legal arbiter for an actual estate.</strong> Always consult official Sharia courts.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
