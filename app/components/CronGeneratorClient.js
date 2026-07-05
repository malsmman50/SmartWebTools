"use client";

import { useState, useEffect } from "react";
import cronstrue from "cronstrue";
import "cronstrue/locales/ar"; // Import Arabic locale for cronstrue

export default function CronGeneratorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.cron;
  const isAr = lang === "ar";

  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  useEffect(() => {
    if (initialValues?.preset) {
      if (initialValues.preset === "every-5-minutes") { setMinute("*/5"); }
      if (initialValues.preset === "every-hour") { setMinute("0"); }
      if (initialValues.preset === "every-day-at-midnight") { setMinute("0"); setHour("0"); }
      if (initialValues.preset === "every-monday") { setMinute("0"); setHour("0"); setDayOfWeek("1"); }
    }
  }, [initialValues]);
  const [copied, setCopied] = useState(false);

  const [humanReadable, setHumanReadable] = useState("");
  const [isValid, setIsValid] = useState(true);

  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  useEffect(() => {
    if (cronString.length > 100) {
      setHumanReadable(isAr ? "خطأ: التعبير طويل جداً." : "Error: Expression too long. Max 100 characters.");
      setIsValid(false);
      return;
    }
    try {
      // Use cronstrue localization natively!
      setHumanReadable(cronstrue.toString(cronString, { locale: isAr ? "ar" : "en" }));
      setIsValid(true);
    } catch (e) {
      setHumanReadable(isAr ? "تعبير غير صالح" : "Invalid cron expression");
      setIsValid(false);
    }
  }, [cronString, isAr]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templatesEn = [
    { label: "Every Minute", val: ["*", "*", "*", "*", "*"] },
    { label: "Every 5 Minutes", val: ["*/5", "*", "*", "*", "*"] },
    { label: "Every Hour", val: ["0", "*", "*", "*", "*"] },
    { label: "Every Day at Midnight", val: ["0", "0", "*", "*", "*"] },
    { label: "Every Sunday", val: ["0", "0", "*", "*", "0"] },
    { label: "1st of Every Month", val: ["0", "0", "1", "*", "*"] },
  ];

  const templatesAr = [
    { label: "كل دقيقة", val: ["*", "*", "*", "*", "*"] },
    { label: "كل 5 دقائق", val: ["*/5", "*", "*", "*", "*"] },
    { label: "كل ساعة", val: ["0", "*", "*", "*", "*"] },
    { label: "كل يوم عند منتصف الليل", val: ["0", "0", "*", "*", "*"] },
    { label: "كل يوم أحد", val: ["0", "0", "*", "*", "0"] },
    { label: "أول يوم من كل شهر", val: ["0", "0", "1", "*", "*"] },
  ];

  const templates = isAr ? templatesAr : templatesEn;

  const applyTemplate = (val) => {
    setMinute(val[0]); 
    setHour(val[1]); 
    setDayOfMonth(val[2]); 
    setMonth(val[3]); 
    setDayOfWeek(val[4]);
  };

  return (
    <div className="grid-2">
      <div className="card">
        <h3 style={{ marginBottom: "16px" }}>{isAr ? "بناء التعبير" : "Build Expression"}</h3>
        
        <div style={{ marginBottom: "16px" }}>
          <label className="label" htmlFor="cron-minute">{t.minutes} (0-59)</label>
          <input id="cron-minute" type="text" className="input" value={minute} onChange={e => setMinute(e.target.value)} />
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label className="label" htmlFor="cron-hour">{t.hours} (0-23)</label>
          <input id="cron-hour" type="text" className="input" value={hour} onChange={e => setHour(e.target.value)} />
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label className="label" htmlFor="cron-day-of-month">{t.days} (1-31)</label>
          <input id="cron-day-of-month" type="text" className="input" value={dayOfMonth} onChange={e => setDayOfMonth(e.target.value)} />
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label className="label" htmlFor="cron-month">{t.months} (1-12)</label>
          <input id="cron-month" type="text" className="input" value={month} onChange={e => setMonth(e.target.value)} />
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label className="label" htmlFor="cron-day-of-week">{t.weekdays} (0-6, 0={isAr ? "الأحد" : "Sun"})</label>
          <input id="cron-day-of-week" type="text" className="input" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="result-box" style={{ marginBottom: "16px" }}>
          <div className="result-label">{t.result_label}</div>
          <div className="result-value" style={{ fontFamily: "monospace", color: "var(--success)", fontSize: "2.2rem" }}>
            {cronString}
          </div>
          <div style={{ 
            marginTop: "12px", 
            fontSize: "1.2rem", 
            fontWeight: 600, 
            color: isValid ? "var(--success)" : "var(--danger)",
            background: "var(--bg-card)",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid var(--border)"
          }}>
            ✨ "{humanReadable}"
          </div>
          <button onClick={copyToClipboard} className="btn btn-outline" style={{ marginTop: "16px", marginInline: "auto" }}>
            {copied ? (isAr ? "✅ تم النسخ" : "✅ Copied!") : (isAr ? "📋 نسخ إلى الحافظة" : "📋 Copy to Clipboard")}
          </button>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>{isAr ? "قوالب سريعة" : "Quick Templates"}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {templates.map(tmp => (
              <button 
                key={tmp.label} 
                onClick={() => applyTemplate(tmp.val)} 
                className="btn btn-outline" 
                style={{ justifyContent: "space-between", width: "100%", textTransform: "none" }}
              >
                <span>{tmp.label}</span> 
                <span style={{ color: "var(--text-muted)", fontFamily: "monospace" }} dir="ltr">{tmp.val.join(" ")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
