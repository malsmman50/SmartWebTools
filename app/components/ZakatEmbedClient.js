"use client";

import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

export default function ZakatEmbedClient({ lang, dict }) {
  const t = dict.zakat;

  const [cash, setCash] = useState(0);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [debts, setDebts] = useState(0);
  const [nisab, setNisab] = useState(0);
  const [apiStatus, setApiStatus] = useState("loading");
  const [isManualNisab, setIsManualNisab] = useState(false);

  useEffect(() => {
    const fetchNisab = async () => {
      try {
        const res = await fetch("/api/gold", {
          headers: { "Accept": "application/json" },
          signal: AbortSignal.timeout(4000)
        });
        if (!res.ok) throw new Error("API Response not OK");
        const data = await res.json();
        const goldPricePerOz = data.pricePerOunce;
        const goldPricePerGram = goldPricePerOz / 31.1035;
        const nisabGold = goldPricePerGram * 85; 
        setNisab(Math.round(nisabGold));
        setApiStatus("success");
      } catch (err) {
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
    <div style={{ padding: "16px", background: "var(--bg-surface)", minHeight: "100vh", fontFamily: "sans-serif", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.2rem", margin: "0 0 4px 0", color: "var(--text)" }}>{t.title}</h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>{t.subtitle}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Input Card */}
        <div className="card" style={{ padding: "16px" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "12px", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
            {lang === "ar" ? "الأصول والخصوم" : "Assets & Liabilities"}
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="embed-cash" style={{ fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>{t.cash_label}</label>
              <NumericFormat id="embed-cash" className="input" style={{ padding: "8px", fontSize: "0.85rem" }} value={cash} onValueChange={v => setCash(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
            </div>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="embed-gold" style={{ fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>{t.gold_label}</label>
              <NumericFormat id="embed-gold" className="input" style={{ padding: "8px", fontSize: "0.85rem" }} value={gold} onValueChange={v => setGold(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
            </div>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="embed-silver" style={{ fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>{t.silver_label}</label>
              <NumericFormat id="embed-silver" className="input" style={{ padding: "8px", fontSize: "0.85rem" }} value={silver} onValueChange={v => setSilver(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
            </div>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="embed-business" style={{ fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>{t.business_label}</label>
              <NumericFormat id="embed-business" className="input" style={{ padding: "8px", fontSize: "0.85rem" }} value={business} onValueChange={v => setBusiness(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
            </div>
          </div>

          <div style={{ marginTop: "8px" }}>
            <label htmlFor="embed-debts" style={{ fontSize: "0.8rem", display: "block", marginBottom: "4px" }}>{t.debts_label}</label>
            <NumericFormat id="embed-debts" className="input" style={{ padding: "8px", fontSize: "0.85rem" }} value={debts} onValueChange={v => setDebts(v.floatValue === undefined ? '' : v.floatValue)} thousandSeparator={true} prefix="$" />
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ padding: "16px", background: "var(--surface-sunken)" }}>
          <div className="result-box" style={{ marginBottom: "12px", padding: "12px" }}>
            <div className="result-label" style={{ fontSize: "0.8rem" }}>{t.zakat_due}</div>
            <div className="result-value" style={{ fontSize: "1.6rem", color: isEligible ? "var(--success)" : "var(--text-muted)" }}>
              {isEligible ? fmt(zakatDue) : "$0.00"}
            </div>
            <p style={{ fontSize: "0.75rem", margin: "4px 0 0 0", color: isEligible ? "var(--success)" : "var(--danger)" }}>
              {isEligible ? t.status_eligible : t.status_not_eligible}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", textAlign: "center" }}>
            <div style={{ background: "var(--bg)", padding: "8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.total_wealth}</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "bold", color: "var(--text)" }}>{fmt(totalWealth)}</div>
            </div>
            <div style={{ background: "var(--bg)", padding: "8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{t.net_assets}</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "bold", color: "var(--primary)" }}>{fmt(eligibleWealth)}</div>
            </div>
          </div>

          {isEligible && (
            <div style={{ marginTop: "12px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.05)", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 8px 0" }}>
                {lang === "ar" ? "ادفع زكاتك مباشرة ودون أي عمولة عبر:" : "Pay directly without any commission via:"}
              </p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                {lang === "ar" ? (
                  <>
                    <a href="https://ehsan.sa/zakat" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--success)", color: "white", borderRadius: "4px", textDecoration: "none", fontWeight: "bold" }}>
                      منصة إحسان
                    </a>
                    <a href="https://zakaty.gov.sa/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--primary)", color: "white", borderRadius: "4px", textDecoration: "none", fontWeight: "bold" }}>
                      بوابة زكاتي
                    </a>
                  </>
                ) : (
                  <>
                    <a href="https://www.islamic-relief.org/zakat/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--success)", color: "white", borderRadius: "4px", textDecoration: "none", fontWeight: "bold" }}>
                      Islamic Relief
                    </a>
                    <a href="https://www.zakat.org/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", padding: "4px 8px", background: "var(--primary)", color: "white", borderRadius: "4px", textDecoration: "none", fontWeight: "bold" }}>
                      Zakat Foundation
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Brand Link */}
        <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
          <a href="https://smartcalctools.xyz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "bold" }}>
            Powered by SmartCalcTools.xyz
          </a>
        </div>
      </div>
    </div>
  );
}
