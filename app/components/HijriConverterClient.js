"use client";

import { useState, useEffect, useMemo } from "react";

const hijriMonthNamesEn = [
  "Muharram", "Safar", "Rabi' I", "Rabi' II", 
  "Jumada I", "Jumada II", "Rajab", "Sha'ban", 
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const hijriMonthNamesAr = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", 
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", 
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

const gregorianMonthNamesEn = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const gregorianMonthNamesAr = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", 
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// --- Hybrid Umm al-Qura Algorithm ---
const getExactHijriDate = (dateObj) => {
  const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura-nu-latn", {
    day: "numeric", month: "numeric", year: "numeric"
  });
  const parts = formatter.formatToParts(dateObj);
  const hd = parseInt(parts.find(p => p.type === "day").value, 10);
  const hm = parseInt(parts.find(p => p.type === "month").value, 10);
  const hy = parseInt(parts.find(p => p.type === "year").value.split(" ")[0], 10);
  return { year: hy, month: hm, day: hd };
};

const exactHijriToGregorian = (targetY, targetM, targetD) => {
  const anchorHijriY = 1446;
  const anchorGregorian = new Date(2024, 6, 7, 12, 0, 0); 
  
  const yearDiff = targetY - anchorHijriY;
  const monthDiff = targetM - 1;
  const dayDiff = targetD - 1;
  
  const totalDaysOffset = (yearDiff * 354.36) + (monthDiff * 29.53) + dayDiff;
  const estimatedDate = new Date(anchorGregorian.getTime() + (totalDaysOffset * 86400000));

  for (let i = -20; i <= 20; i++) {
    const testDate = new Date(estimatedDate.getTime() + (i * 86400000));
    const testHijri = getExactHijriDate(testDate);

    if (testHijri.year === targetY && testHijri.month === targetM && testHijri.day === targetD) {
      return testDate;
    }
  }

  // The requested Hijri date does not exist in the Umm al-Qura calendar
  // (e.g. day 30 of a 29-day month). Never silently return a nearby date.
  return null;
};

// Actual length (29 or 30) of a Hijri month: convert day 1 of the next month
// and step one day back — that day's Hijri day number is the month length.
const getHijriMonthLength = (y, m) => {
  const nextM = m === 12 ? 1 : m + 1;
  const nextY = m === 12 ? y + 1 : y;
  const firstOfNext = exactHijriToGregorian(nextY, nextM, 1);
  if (!firstOfNext) return 30;
  return getExactHijriDate(new Date(firstOfNext.getTime() - 86400000)).day;
};

export default function HijriConverterClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.hijri;
  const isAr = lang === "ar";

  const hijriMonthNames = isAr ? hijriMonthNamesAr : hijriMonthNamesEn;
  const gregorianMonthNames = isAr ? gregorianMonthNamesAr : gregorianMonthNamesEn;

  const [gregorianDate, setGregorianDate] = useState("");
  const [hDay, setHDay] = useState(initialValues?.day || "1");
  const [hMonth, setHMonth] = useState(initialValues?.month || "1");
  const [hYear, setHYear] = useState(initialValues?.year || "1446");
  const [activeTab, setActiveTab] = useState(initialValues ? "h2g" : "g2h"); 
  
  const [result, setResult] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Length of the currently selected Hijri month (29 or 30) so the day
  // dropdown never offers a non-existent day 30.
  const hijriMonthLength = useMemo(() => {
    const y = parseInt(hYear, 10);
    const m = parseInt(hMonth, 10);
    if (isNaN(y) || isNaN(m) || y < 1300 || y > 1600) return 30;
    try {
      return getHijriMonthLength(y, m);
    } catch {
      return 30;
    }
  }, [hYear, hMonth]);

  // If the month/year change shrinks the month to 29 days while day 30 is
  // selected, clamp the selection.
  useEffect(() => {
    if (parseInt(hDay, 10) > hijriMonthLength) {
      setHDay(String(hijriMonthLength));
    }
  }, [hijriMonthLength, hDay]);

  useEffect(() => {
    setIsMounted(true);
    if (!initialValues) {
      const today = new Date();
      setGregorianDate(today.toISOString().split("T")[0]);
      
      const hToday = getExactHijriDate(today);
      setHYear(hToday.year.toString());
      setHMonth(hToday.month.toString());
      setHDay(hToday.day.toString());
    } else {
      // Trigger conversion automatically if initialValues are provided
      setTimeout(() => {
        const convertBtn = document.getElementById('auto-convert-btn');
        if (convertBtn) convertBtn.click();
      }, 100);
    }
  }, [initialValues]);

  const handleConvert = () => {
    try {
      setResult(null);
      
      if (activeTab === "g2h") {
        const date = new Date(gregorianDate + "T12:00:00");
        if (isNaN(date.getTime())) throw new Error(isAr ? "التاريخ المحدد غير صالح" : "Invalid date selected");
        
        const h = getExactHijriDate(date);
        
        setResult({
          primary: `${h.day} ${hijriMonthNames[h.month - 1]} ${h.year} ${isAr ? "هـ" : "AH"}`,
          secondary: `${isAr ? "رقمي" : "Numeric"}: ${h.year}-${String(h.month).padStart(2, "0")}-${String(h.day).padStart(2, "0")}`,
          type: "hijri"
        });
        
      } else {
        const y = parseInt(hYear, 10);
        const m = parseInt(hMonth, 10);
        const d = parseInt(hDay, 10);
        
        if (isNaN(y) || y < 1) throw new Error(isAr ? "السنة الهجرية غير صالحة" : "Invalid Hijri year");

        const gDate = exactHijriToGregorian(y, m, d);

        if (!gDate) {
          const monthName = hijriMonthNames[m - 1] || m;
          throw new Error(
            isAr
              ? `التاريخ ${d} ${monthName} ${y} غير موجود في تقويم أم القرى — هذا الشهر ${getHijriMonthLength(y, m)} يوماً في تلك السنة.`
              : `The date ${monthName} ${d}, ${y} does not exist in the Umm al-Qura calendar — that month has ${getHijriMonthLength(y, m)} days in that year.`
          );
        }

        setResult({
          primary: `${gDate.getDate()} ${gregorianMonthNames[gDate.getMonth()]} ${gDate.getFullYear()} ${isAr ? "م" : "CE"}`,
          secondary: `${isAr ? "صيغة ISO" : "ISO Format"}: ${gDate.getFullYear()}-${String(gDate.getMonth() + 1).padStart(2, "0")}-${String(gDate.getDate()).padStart(2, "0")}`,
          type: "gregorian"
        });
      }
    } catch (e) {
      setResult({ error: e.message || (isAr ? "حدث خطأ أثناء التحويل." : "An error occurred during conversion.") });
    }
  };

  if (!isMounted) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>
          {isAr ? "جاري تهيئة محرك التطبيق..." : "Initializing Application Engine..."}
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>

        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "24px" }}>
          <button 
            className={`tab-btn ${activeTab === "g2h" ? "active" : ""}`}
            onClick={() => { setActiveTab("g2h"); setResult(null); }}
            style={{ flex: 1, padding: "12px", background: "none", border: "none", borderBottom: activeTab === "g2h" ? "2px solid var(--success)" : "2px solid transparent", color: activeTab === "g2h" ? "var(--success)" : "var(--text-muted)", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            {t.gregorian_title}
          </button>
          <button 
            className={`tab-btn ${activeTab === "h2g" ? "active" : ""}`}
            onClick={() => { setActiveTab("h2g"); setResult(null); }}
            style={{ flex: 1, padding: "12px", background: "none", border: "none", borderBottom: activeTab === "h2g" ? "2px solid var(--success)" : "2px solid transparent", color: activeTab === "h2g" ? "var(--success)" : "var(--text-muted)", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            {t.hijri_title}
          </button>
        </div>

        <div style={{ marginBottom: "24px" }}>
          {activeTab === "g2h" ? (
            <div>
              <label className="label" htmlFor="gregorian-input" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                {isAr ? "اختر التاريخ الميلادي:" : "Select Gregorian Date:"}
              </label>
              <input 
                id="gregorian-input"
                type="date" 
                lang={isAr ? "ar-EG" : "en-US"}
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                className="input"
                style={{ fontSize: "1.1rem" }}
              />
            </div>
          ) : (
            <div>
              <label className="label" htmlFor="hijri-day" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                {isAr ? "اختر التاريخ الهجري:" : "Select Hijri Date:"}
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <select 
                  id="hijri-day"
                  value={hDay}
                  onChange={(e) => setHDay(e.target.value)}
                  className="input"
                  style={{ flex: 1, fontSize: "1.1rem" }}
                >
                  {Array.from({length: hijriMonthLength}, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{isAr ? `يوم ${d}` : `Day ${d}`}</option>
                  ))}
                </select>
                <select 
                  id="hijri-month"
                  value={hMonth}
                  onChange={(e) => setHMonth(e.target.value)}
                  className="input"
                  style={{ flex: 1, fontSize: "1.1rem" }}
                >
                  {hijriMonthNames.map((name, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} - {name}</option>
                  ))}
                </select>
                <input 
                  id="hijri-year"
                  type="number" 
                  value={hYear}
                  onChange={(e) => setHYear(e.target.value)}
                  placeholder={t.year}
                  min="1350"
                  max="1500"
                  className="input"
                  style={{ flex: 1, fontSize: "1.1rem" }}
                />
              </div>
            </div>
          )}
        </div>

        <button 
          id="auto-convert-btn"
          onClick={handleConvert}
          className="btn btn-primary"
          style={{ width: "100%", padding: "14px", borderRadius: "8px", background: "var(--success)", color: "white", border: "none", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", marginBottom: "24px", justifyContent: "center" }}
        >
          {t.convert_btn}
        </button>

        {result && (
          <div style={{ padding: "20px", borderRadius: "8px", background: "var(--surface-sunken)", border: "1px solid var(--border)", textAlign: "center" }}>
            {result.error ? (
              <div style={{ color: "var(--danger)", fontWeight: "bold" }}>{result.error}</div>
            ) : (
              <>
                <h2 style={{ fontSize: "1.5rem", color: "var(--success)", marginBottom: "8px" }}>{result.primary}</h2>
                <div style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>{result.secondary}</div>
              </>
            )}
          </div>
        )}
      </div>
    );
}
