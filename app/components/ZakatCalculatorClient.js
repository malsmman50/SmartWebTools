"use client";

import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";
import { FALLBACK_GOLD_PRICE_PER_GRAM, NISAB_GOLD_GRAMS } from "../../lib/goldPrice";

export default function ZakatCalculatorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.zakat;

  const [cash, setCash] = useState(0);
  const [gold, setGold] = useState(initialValues?.gold ? parseFloat(initialValues.gold) * FALLBACK_GOLD_PRICE_PER_GRAM : 0); // Approx: gold grams * fallback $/g
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [debts, setDebts] = useState(0);
  const [nisab, setNisab] = useState(0);
  
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [isManualNisab, setIsManualNisab] = useState(false);

  // Zakat Reminder States
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderMonth, setReminderMonth] = useState("ramadan");
  const [reminderLoading, setReminderLoading] = useState(false);
  const [reminderSuccess, setReminderSuccess] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");

  const handleReminderSubmit = async (e) => {
    e.preventDefault();
    setReminderLoading(true);
    setReminderMessage("");
    try {
      const res = await fetch("/api/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: reminderEmail, month: reminderMonth, lang: lang })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReminderSuccess(true);
        setReminderMessage(
          lang === "ar"
            ? "أرسلنا رابط تأكيد إلى بريدك. اضغط عليه لتفعيل التذكير (تحقّق من مجلد الرسائل غير المرغوبة)."
            : "We sent a confirmation link to your email. Click it to activate the reminder (check your spam folder)."
        );
        setReminderEmail("");
      } else {
        throw new Error(data.error || "Failed to activate reminder");
      }
    } catch (err) {
      setReminderSuccess(false);
      setReminderMessage(
        lang === "ar"
          ? `عذراً، حدث خطأ: ${err.message}`
          : `Sorry, an error occurred: ${err.message}`
      );
    } finally {
      setReminderLoading(false);
    }
  };

  useEffect(() => {
    const fetchNisab = async () => {
      try {
        const res = await fetch("/api/gold", {
          headers: { "Accept": "application/json" },
          signal: AbortSignal.timeout(4000)
        });
        if (!res.ok) throw new Error("API Response not OK");
        const data = await res.json();
        
        if (!data.pricePerOunce) {
          throw new Error("Missing pricePerOunce in response");
        }

        const goldPricePerOz = data.pricePerOunce;
        const goldPricePerGram = goldPricePerOz / 31.1035;
        const nisabGold = goldPricePerGram * NISAB_GOLD_GRAMS;
        setNisab(Math.round(nisabGold));
        setApiStatus("success");
      } catch (err) {
        console.warn("Failed to fetch Nisab:", err);
        setApiStatus("error");
        setIsManualNisab(true);
      }
    };
    fetchNisab();
  }, []);

  const numCash = Number(cash) || 0;
  const numGold = Number(gold) || 0;
  const numSilver = Number(silver) || 0;
  const numBusiness = Number(business) || 0;
  const numDebts = Number(debts) || 0;
  const numNisab = Number(nisab) || 0;

  const totalWealth = numCash + numGold + numSilver + numBusiness;
  const eligibleWealth = totalWealth - numDebts;
  const isEligible = eligibleWealth >= numNisab;
  const zakatDue = isEligible ? eligibleWealth * 0.025 : 0;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>{t.assets_title}</h3>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-cash" className="label">{t.cash_label}</label>
            <NumericFormat id="zakat-cash" className="input" value={cash} onValueChange={v => setCash(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-gold" className="label">{t.gold_label}</label>
            <NumericFormat id="zakat-gold" className="input" value={gold} onValueChange={v => setGold(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-silver" className="label">{t.silver_label}</label>
            <NumericFormat id="zakat-silver" className="input" value={silver} onValueChange={v => setSilver(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="zakat-business" className="label">{t.business_label}</label>
            <NumericFormat id="zakat-business" className="input" value={business} onValueChange={v => setBusiness(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{t.liabilities_title}</h3>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="zakat-debts" className="label">{t.debts_label}</label>
            <NumericFormat id="zakat-debts" className="input" value={debts} onValueChange={v => setDebts(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{t.threshold_title}</h3>
          <div style={{ padding: "16px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            {apiStatus === "loading" && <p style={{ color: "var(--text-muted)" }}>{t.fetching_nisab}</p>}
            
            {apiStatus === "success" && !isManualNisab && (
              <div>
                <p style={{ color: "var(--success)", marginBottom: "8px", fontWeight: 600 }}>{t.live_nisab_loaded} {fmt(nisab)}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px" }}>{t.nisab_description}</p>
                <button onClick={() => setIsManualNisab(true)} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "4px 8px" }}>{t.manual_nisab_btn}</button>
              </div>
            )}

            {(apiStatus === "error" || isManualNisab) && (
              <div>
                {apiStatus === "error" && (
                  <p style={{ color: "var(--danger)", fontSize: "0.9rem", marginBottom: "12px" }}>{t.api_failed}</p>
                )}
                <label htmlFor="zakat-manual-nisab" className="label">{t.manual_nisab_label}</label>
                <NumericFormat id="zakat-manual-nisab" className="input" value={nisab} onValueChange={v => setNisab(v.floatValue === undefined ? '' : v.floatValue)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
                {apiStatus === "success" && (
                  <button onClick={() => setIsManualNisab(false)} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "4px 8px", marginTop: "12px" }}>{t.use_live_nisab_btn}</button>
                )}
              </div>
            )}
          </div>
        </div>

        <div aria-live="polite">
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.zakat_due}</div>
            <div className="result-value" style={{ color: isEligible ? "var(--success)" : "var(--text-muted)" }}>
              {isEligible ? fmt(zakatDue) : "$0.00"}
            </div>
            {isEligible ? (
              <p style={{ color: "var(--success)", marginTop: "8px", fontSize: "0.9rem" }}>{t.status_eligible}</p>
            ) : (
              <p style={{ color: "var(--danger)", marginTop: "8px", fontSize: "0.9rem" }}>{t.status_not_eligible}</p>
            )}
          </div>

          {/* Ehsan Platform direct donation card without commission */}
          {isEligible && (
            <div className="card" style={{ marginTop: "16px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.05)", padding: "16px" }}>
              <h4 style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span>🕊️</span> {lang === "ar" ? "دفع الزكاة للجهات الرسمية" : "Pay Zakat directly"}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "12px" }}>
                {lang === "ar" 
                  ? "يمكنك دفع زكاتك مباشرة وبشكل آمن 100% دون أي عمولات عبر المنصات الحكومية والرسمية المعتمدة:"
                  : "You can pay your Zakat directly and 100% securely without any commissions via globally trusted and official channels:"}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {lang === "ar" ? (
                  <a href="https://ehsan.sa/zakat" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "6px 12px", borderColor: "var(--success)", color: "var(--success)", textDecoration: "none" }}>
                    منصة إحسان (السعودية)
                  </a>
                ) : (
                  <>
                    <a href="https://www.islamic-relief.org/zakat/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "6px 12px", borderColor: "var(--success)", color: "var(--success)", textDecoration: "none" }}>
                      Islamic Relief Worldwide
                    </a>
                    <a href="https://www.zakat.org/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "6px 12px", textDecoration: "none" }}>
                      Zakat Foundation
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Zakat Reminder Subscription Card */}
          <div className="card" style={{ marginTop: "16px", padding: "20px" }}>
            <h4 style={{ marginBottom: "8px", fontSize: "1rem" }}>{lang === "ar" ? "🔔 تذكير الزكاة السنوي" : "🔔 Annual Zakat Reminder"}</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px", lineHeight: "1.5" }}>
              {lang === "ar" 
                ? "احصل على تذكير تلقائي عبر البريد الإلكتروني قبل حلول موعد زكاتك السنوية بـ 30 يوماً."
                : "Receive an automated email reminder 30 days before your annual Zakat due date."}
            </p>
            <form onSubmit={handleReminderSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input 
                type="email" 
                placeholder={lang === "ar" ? "بريدك الإلكتروني" : "Your email address"}
                value={reminderEmail} 
                onChange={(e) => setReminderEmail(e.target.value)}
                required
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "0.9rem" }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <select 
                  value={reminderMonth} 
                  onChange={(e) => setReminderMonth(e.target.value)}
                  style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "0.9rem" }}
                  aria-label={lang === "ar" ? "الشهر المفضل للتذكير" : "Preferred month for reminder"}
                >
                  <option value="ramadan">{lang === "ar" ? "قبل رمضان بـ 30 يوماً" : "30 days before Ramadan"}</option>
                  <option value="muharram">{lang === "ar" ? "بداية العام الهجري (محرم)" : "Beginning of Hijri Year (Muharram)"}</option>
                  <option value="shawwal">{lang === "ar" ? "شوال" : "Shawwal"}</option>
                  <option value="dhul-hijjah">{lang === "ar" ? "ذو الحجة" : "Dhul-Hijjah"}</option>
                </select>
                <button type="submit" className="btn btn-primary" style={{ padding: "10px 16px", fontSize: "0.9rem" }} disabled={reminderLoading}>
                  {reminderLoading ? (lang === "ar" ? "..." : "...") : (lang === "ar" ? "تفعيل" : "Set")}
                </button>
              </div>
              {reminderMessage && (
                <p style={{ fontSize: "0.85rem", color: reminderSuccess ? "var(--success)" : "var(--danger)", marginTop: "4px" }}>
                  {reminderMessage}
                </p>
              )}
            </form>
          </div>

          {/* Embed Code Box Card */}
          <div className="card" style={{ marginTop: "16px", padding: "20px" }}>
            <h4 style={{ marginBottom: "8px", fontSize: "1rem" }}>{lang === "ar" ? "💻 تضمين الحاسبة في موقعك" : "💻 Embed this Calculator"}</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px", lineHeight: "1.5" }}>
              {lang === "ar" 
                ? "انسخ الكود أدناه لتضمين حاسبة الزكاة مباشرة في موقعك الإلكتروني أو مدونتك:"
                : "Copy the code below to embed the Zakat Calculator directly on your website or blog:"}
            </p>
            <textarea 
              readOnly 
              value={`<iframe src="https://smartcalctools.xyz/${lang}/embed/zakat" width="100%" height="600" style="border:1px solid #ccc; border-radius:8px;" frameborder="0"></iframe>`}
              onClick={(e) => e.target.select()}
              style={{ width: "100%", height: "80px", padding: "8px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace", resize: "none", cursor: "pointer" }}
            />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", textAlign: "center" }}>
              {lang === "ar" ? "اضغط داخل الصندوق لتحديد الكود بالكامل" : "Click inside the box to select all code"}
            </p>
          </div>

          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">{t.total_wealth}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(totalWealth)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">{t.net_assets}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{fmt(eligibleWealth)}</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: "16px", padding: "20px" }}>
            <h4 style={{ marginBottom: "12px" }}>{t.notes_title}</h4>
            <ul style={{ paddingLeft: lang === "ar" ? "0" : "20px", paddingRight: lang === "ar" ? "20px" : "0", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "6px" }}>{t.note1}</li>
              <li style={{ marginBottom: "6px" }}>{t.note2}</li>
              <li style={{ marginBottom: "6px" }}>{t.note3}</li>
              <li style={{ marginBottom: "6px" }}>{t.note4}</li>
            </ul>
          </div>
        </div>
      </div>

  );
}
