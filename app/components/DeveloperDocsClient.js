"use client";

import { useState } from "react";

export default function DeveloperDocsClient({ lang }) {
  const [activeTab, setActiveTab] = useState("zakat"); // 'zakat', 'murabaha', 'sukuk'
  const [codeLang, setCodeLang] = useState("curl"); // 'curl', 'javascript', 'python'

  // Input states for Live Try-out Console
  const [zakatInputs, setZakatInputs] = useState({ cash: 5000, gold: 120, silver: 0, business: 0, debts: 1000, goldPrice: 75 });
  const [murabahaInputs, setMurabahaInputs] = useState({ amount: 50000, rate: 4.5, years: 5 });
  const [sukukInputs, setSukukInputs] = useState({ amount: 10000, rate: 6.2, years: 3 });

  const [apiResponse, setApiResponse] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Send request live to current API routes
  const handleTryItOut = async () => {
    setApiLoading(true);
    setApiResponse(null);
    try {
      let endpoint = `/api/v1/calculate/${activeTab}`;
      let bodyData = {};
      
      if (activeTab === "zakat") {
        bodyData = {
          cash: Number(zakatInputs.cash),
          gold: Number(zakatInputs.gold),
          silver: Number(zakatInputs.silver),
          business: Number(zakatInputs.business),
          debts: Number(zakatInputs.debts),
          goldPricePerGram: Number(zakatInputs.goldPrice)
        };
      } else if (activeTab === "murabaha") {
        bodyData = {
          amount: Number(murabahaInputs.amount),
          rate: Number(murabahaInputs.rate),
          years: Number(murabahaInputs.years)
        };
      } else if (activeTab === "sukuk") {
        bodyData = {
          amount: Number(sukukInputs.amount),
          rate: Number(sukukInputs.rate),
          years: Number(sukukInputs.years)
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setApiLoading(false);
    }
  };

  // Code snippets generator
  const getCodeSnippet = () => {
    let url = `https://smartcalctools.xyz/api/v1/calculate/${activeTab}`;
    let body = {};
    if (activeTab === "zakat") {
      body = zakatInputs;
    } else if (activeTab === "murabaha") {
      body = murabahaInputs;
    } else if (activeTab === "sukuk") {
      body = sukukInputs;
    }
    const jsonStr = JSON.stringify(body, null, 2);

    if (codeLang === "curl") {
      return `curl -X POST "${url}" \\\n  -H "Content-Type: application/json" \\\n  -d '${jsonStr}'`;
    } else if (codeLang === "javascript") {
      return `fetch("${url}", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(${jsonStr.replace(/\n/g, "\n  ")})\n})\n.then(res => res.json())\n.then(data => console.log(data));`;
    } else if (codeLang === "python") {
      return `import requests\n\nurl = "${url}"\ndata = ${jsonStr.replace(/true/g, "True").replace(/false/g, "False")}\n\nresponse = requests.post(url, json=data)\nprint(response.json())`;
    }
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ marginBottom: "32px" }}>
        <h1>{lang === "ar" ? "💻 بوابة المطورين والـ API" : "💻 Developer API & Documentation"}</h1>
        <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
          {lang === "ar"
            ? "دليل المطورين لدمج حاسبات التمويل الإسلامي والزكاة والصكوك في تطبيقات ومواقع أندرويد/آيفون مجاناً."
            : "Developer guide to integrate Sharia-compliant Zakat, Murabaha, and Sukuk calculators into your mobile and web apps for free."}
        </p>
      </div>

      {/* Stripe-like 3-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr", gap: "32px", alignItems: "start" }}>
        
        {/* Column 1: Navigation Sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase", paddingLeft: "8px" }}>
            {lang === "ar" ? "الحاسبات التمويلية" : "Calculators"}
          </span>
          <button 
            onClick={() => { setActiveTab("zakat"); setApiResponse(null); }} 
            className={`btn ${activeTab === "zakat" ? "btn-primary" : "btn-outline"}`}
            style={{ width: "100%", justifyContent: "flex-start", textAlign: "left", fontSize: "0.9rem" }}
          >
            🧮 {lang === "ar" ? "حاسبة الزكاة" : "Zakat API"}
          </button>
          <button 
            onClick={() => { setActiveTab("murabaha"); setApiResponse(null); }} 
            className={`btn ${activeTab === "murabaha" ? "btn-primary" : "btn-outline"}`}
            style={{ width: "100%", justifyContent: "flex-start", textAlign: "left", fontSize: "0.9rem" }}
          >
            🤝 {lang === "ar" ? "حاسبة المرابحة" : "Murabaha API"}
          </button>
          <button 
            onClick={() => { setActiveTab("sukuk"); setApiResponse(null); }} 
            className={`btn ${activeTab === "sukuk" ? "btn-primary" : "btn-outline"}`}
            style={{ width: "100%", justifyContent: "flex-start", textAlign: "left", fontSize: "0.9rem" }}
          >
            📜 {lang === "ar" ? "حاسبة الصكوك" : "Sukuk API"}
          </button>
        </aside>

        {/* Column 2: Parameters Documentation */}
        <section className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "16px", textTransform: "capitalize" }}>
            {activeTab} Calculation Endpoint
          </h2>
          <div style={{ background: "var(--surface-sunken)", padding: "10px", borderRadius: "6px", fontSize: "0.85rem", fontFamily: "monospace", marginBottom: "20px" }}>
            <span style={{ background: "var(--success)", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold", marginRight: "8px" }}>POST</span>
            /api/v1/calculate/{activeTab}
          </div>

          <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>{lang === "ar" ? "معاملات المدخلات (JSON)" : "Request Parameters (JSON)"}</h3>
          
          {/* Zakat Doc */}
          {activeTab === "zakat" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <div>
                <strong>cash</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>(number, optional)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "السيولة النقدية والمدخرات بالدولار." : "Cash and savings in USD."}</p>
              </div>
              <div>
                <strong>gold</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>(number, optional)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "قيمة الذهب المملوك بالدولار." : "Gold value in USD."}</p>
              </div>
              <div>
                <strong>silver</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>(number, optional)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "قيمة الفضة المملوكة بالدولار." : "Silver value in USD."}</p>
              </div>
              <div>
                <strong>business</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>(number, optional)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "قيمة البضائع التجارية بالدولار." : "Business inventory value in USD."}</p>
              </div>
              <div>
                <strong>debts</strong> <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>(number, optional)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "الديون والالتزامات المخصومة." : "Debts to be deducted."}</p>
              </div>
            </div>
          )}

          {/* Murabaha Doc */}
          {activeTab === "murabaha" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <div>
                <strong>amount</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "مبلغ التمويل أو ثمن السلعة الأساسي." : "Principal financing amount or asset cost."}</p>
              </div>
              <div>
                <strong>rate</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "هامش ربح المرابحة السنوي كنسبة مئوية (%)" : "Annual Murabaha profit margin rate (%)"}</p>
              </div>
              <div>
                <strong>years</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "فترة التمويل بالسنوات." : "Financing duration in years."}</p>
              </div>
            </div>
          )}

          {/* Sukuk Doc */}
          {activeTab === "sukuk" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <div>
                <strong>amount</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "القيمة الاسمية للاستثمار في الصكوك." : "Face value of the Sukuk investment."}</p>
              </div>
              <div>
                <strong>rate</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "معدل الربح أو عائد الإيجار السنوي المقدر (%)" : "Annual yield/lease profit margin rate (%)"}</p>
              </div>
              <div>
                <strong>years</strong> <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>(number, required)</span>
                <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0" }}>{lang === "ar" ? "مدة الصك بالسنوات." : "Sukuk tenure in years."}</p>
              </div>
            </div>
          )}
        </section>

        {/* Column 3: Live Try-out Console & Code Snippet */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Interactive Live Input Form */}
          <div className="card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>⚡</span> {lang === "ar" ? "التجربة الحية للـ API" : "Live Try-out Console"}
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {activeTab === "zakat" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Cash</label>
                      <input type="number" className="input" style={{ padding: "6px" }} value={zakatInputs.cash} onChange={e => setZakatInputs({...zakatInputs, cash: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Gold</label>
                      <input type="number" className="input" style={{ padding: "6px" }} value={zakatInputs.gold} onChange={e => setZakatInputs({...zakatInputs, gold: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem" }}>Debts</label>
                    <input type="number" className="input" style={{ padding: "6px" }} value={zakatInputs.debts} onChange={e => setZakatInputs({...zakatInputs, debts: e.target.value})} />
                  </div>
                </>
              )}

              {activeTab === "murabaha" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem" }}>Amount</label>
                    <input type="number" className="input" style={{ padding: "6px" }} value={murabahaInputs.amount} onChange={e => setMurabahaInputs({...murabahaInputs, amount: e.target.value})} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Rate (%)</label>
                      <input type="number" step="0.1" className="input" style={{ padding: "6px" }} value={murabahaInputs.rate} onChange={e => setMurabahaInputs({...murabahaInputs, rate: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Years</label>
                      <input type="number" className="input" style={{ padding: "6px" }} value={murabahaInputs.years} onChange={e => setMurabahaInputs({...murabahaInputs, years: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sukuk" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem" }}>Amount</label>
                    <input type="number" className="input" style={{ padding: "6px" }} value={sukukInputs.amount} onChange={e => setSukukInputs({...sukukInputs, amount: e.target.value})} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Rate (%)</label>
                      <input type="number" step="0.1" className="input" style={{ padding: "6px" }} value={sukukInputs.rate} onChange={e => setSukukInputs({...sukukInputs, rate: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem" }}>Years</label>
                      <input type="number" className="input" style={{ padding: "6px" }} value={sukukInputs.years} onChange={e => setSukukInputs({...sukukInputs, years: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleTryItOut} className="btn btn-primary" style={{ width: "100%", padding: "10px" }} disabled={apiLoading}>
              {apiLoading ? "Sending..." : "Send Live Request 🚀"}
            </button>
          </div>

          {/* Code Snippet Card */}
          <div className="card" style={{ padding: "20px", background: "#1e1e1e", color: "#f8f8f2", border: "none" }}>
            <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "12px" }}>
              <button onClick={() => setCodeLang("curl")} style={{ background: codeLang === "curl" ? "#333" : "transparent", border: "none", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>cURL</button>
              <button onClick={() => setCodeLang("javascript")} style={{ background: codeLang === "javascript" ? "#333" : "transparent", border: "none", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>JavaScript</button>
              <button onClick={() => setCodeLang("python")} style={{ background: codeLang === "python" ? "#333" : "transparent", border: "none", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>Python</button>
            </div>
            <pre style={{ margin: 0, overflowX: "auto", fontSize: "0.8rem", fontFamily: "monospace", color: "#a6e22e", whiteSpace: "pre-wrap" }}>
              {getCodeSnippet()}
            </pre>
          </div>

          {/* Live Response Card */}
          <div className="card" style={{ padding: "20px", background: "#272822", color: "#f8f8f2", border: "none", minHeight: "180px", display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#a6e22e", display: "block", marginBottom: "8px" }}>HTTP RESPONSE</span>
            <pre style={{ margin: 0, overflow: "auto", flex: 1, fontSize: "0.8rem", fontFamily: "monospace", color: apiResponse ? "#66d9ef" : "#888", whiteSpace: "pre-wrap" }}>
              {apiResponse || (lang === "ar" ? "// اضغط على زر الإرسال لمشاهدة الاستجابة هنا..." : "// Click 'Send Live Request' to see response output here...")}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
