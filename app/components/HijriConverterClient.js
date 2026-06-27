"use client";

import { useState, useEffect } from "react";

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
  const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
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
  let estimatedDate = new Date(anchorGregorian.getTime() + (totalDaysOffset * 86400000));
  
  let closestMatch = estimatedDate;
  let minDiff = 999999;

  for (let i = -20; i <= 20; i++) {
    const testDate = new Date(estimatedDate.getTime() + (i * 86400000));
    const testHijri = getExactHijriDate(testDate);
    
    if (testHijri.year === targetY && testHijri.month === targetM && testHijri.day === targetD) {
      return testDate;
    }
    
    const diff = Math.abs(testHijri.year - targetY) * 354 + 
                 Math.abs(testHijri.month - targetM) * 30 + 
                 Math.abs(testHijri.day - targetD);
                 
    if (diff < minDiff) {
      minDiff = diff;
      closestMatch = testDate;
    }
  }
  
  return closestMatch;
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
      <div className="container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>
          {isAr ? "جاري تهيئة محرك التطبيق..." : "Initializing Application Engine..."}
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{t.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>{t.subtitle}</p>

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
                  {Array.from({length: 30}, (_, i) => i + 1).map(d => (
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

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>محول التاريخ الهجري والميلادي الدقيق (أم القرى)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              توفر هذه الأداة تحويلاً دقيقاً ولحظياً بين التقويمين الهجري (الإسلامي) والميلادي (الجريجوري) بالاعتماد على خوارزمية "تقويم أم القرى" المعتمدة رسمياً في المملكة العربية السعودية ومعظم العالم الإسلامي. تعمل الأداة بشكل كامل داخل متصفحك لضمان أقصى درجات السرعة والخصوصية.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>المناسبات الدينية:</strong> معرفة متى يوافق الأول من رمضان، أو يوم عرفة (9 ذو الحجة)، أو عيد الفطر بالتاريخ الميلادي لترتيب الإجازات المسبقة.</li>
              <li style={{ marginBottom: "8px" }}><strong>الوثائق الرسمية الحكومية:</strong> في العديد من الدول العربية كالسعودية، تُستخدم التواريخ الهجرية في العقود والوثائق. يمكنك استخدام المحول لمعرفة تاريخ ميلادك الهجري المطابق للميلادي لتعبئة النماذج الحكومية.</li>
              <li style={{ marginBottom: "8px" }}><strong>الحسابات الشرعية:</strong> حساب حول الزكاة (الذي يعتمد على السنة القمرية 354 يوماً) بدقة تامة دون الاعتماد على السنة الشمسية.</li>
              <li style={{ marginBottom: "8px" }}><strong>عقود الإيجار والموظفين:</strong> مطابقة تواريخ بدء وانتهاء العقود للمؤسسات التي تعتمد التقويمين معاً لتجنب أي إشكالات قانونية.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>لماذا "أم القرى"؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              التقويم الهجري يعتمد على دورة القمر، مما يجعل الأطوال الشهرية تتراوح بين 29 و 30 يوماً. خوارزمية "أم القرى" تقوم بحساب ولادة الهلال فلكياً فوق خط طول مكة المكرمة، مما يعطي دقة رياضية وموحدة تتفوق على التقويم الهجري الجدولي (الاصطلاحي) البسيط.
            </p>
          </>
        ) : (
          <>
            <h2>Accurate Hijri & Gregorian Date Converter (Umm al-Qura)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              This tool provides instantaneous, high-precision conversion between the Islamic (Hijri) and Gregorian calendars based on the globally recognized "Umm al-Qura" astronomical algorithm. The entire conversion engine runs securely in your web browser, ensuring zero delays and total offline compatibility.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Religious Observances:</strong> Calculate exactly when the 1st of Ramadan, the Day of Arafah (9 Dhu al-Hijjah), or Eid al-Fitr will occur in the Gregorian calendar to plan vacations.</li>
              <li style={{ marginBottom: "8px" }}><strong>Official Documentation:</strong> If you are working or living in the Middle East (like Saudi Arabia), you often need your exact Hijri birth date to fill out residency or visa applications.</li>
              <li style={{ marginBottom: "8px" }}><strong>Zakat Calculation:</strong> Zakat is paid annually based on the lunar Hijri year (roughly 354 days). This converter helps you accurately track your Zakat due date.</li>
              <li style={{ marginBottom: "8px" }}><strong>Contract Management:</strong> Easily align start and end dates for employment or rental contracts that legally require Hijri dates alongside Gregorian dates.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Why Umm al-Qura?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The Hijri calendar is lunar, meaning months are 29 or 30 days based on the moon's sighting. The Umm al-Qura algorithm uses complex astronomical calculations based on the coordinates of Mecca to predict the new moon, providing a standardized and mathematically precise calendar compared to simple tabular Hijri approximations.
            </p>
          </>
        )}
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": lang === "ar" ? [
          {
            "@type": "Question",
            "name": "هل هذا المحول دقيق ومطابق لتقويم السعودية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، نستخدم خوارزمية أم القرى الفلكية المعتمدة رسمياً في المملكة العربية السعودية للحصول على أدق نتيجة ممكنة."
            }
          },
          {
            "@type": "Question",
            "name": "هل تعمل الأداة بدون إنترنت؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، بمجرد تحميل الصفحة، تتم جميع العمليات الحسابية والمعادلات الفلكية داخل متصفحك مباشرة بدون الحاجة للاتصال بالإنترنت."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Is this converter accurate and aligned with the Saudi calendar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it uses the official Umm al-Qura astronomical algorithm which is the standard utilized by the government of Saudi Arabia."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool work offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, once the page loads, all astronomical math is executed directly inside your local web browser."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
