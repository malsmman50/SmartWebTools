"use client";

import { useState } from "react";

export default function JsonFormatterClient({ lang, dict, ...props }) {
  
  const t = dict.json;
  const isAr = lang === "ar";

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try { 
      setOutput(JSON.stringify(JSON.parse(input), null, 2)); 
      setError(""); 
    } catch (e) { 
      setError(`${t.status_invalid} ${e.message}`); 
    }
  };
  
  const minify = () => {
    try { 
      setOutput(JSON.stringify(JSON.parse(input))); 
      setError(""); 
    } catch (e) { 
      setError(`${t.status_invalid} ${e.message}`); 
    }
  };
  
  const copy = () => { 
    navigator.clipboard.writeText(output); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", padding: "12px 20px", borderBottom: "1px solid var(--border, #eee)", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={format} style={{ padding: "6px 16px", fontSize: "0.9rem" }}>
          {t.format_btn}
        </button>
        <button className="btn btn-outline" onClick={minify} style={{ padding: "6px 16px", fontSize: "0.9rem" }}>
          {t.minify_btn}
        </button>
        <button className="btn btn-outline" onClick={clear} style={{ padding: "6px 16px", fontSize: "0.9rem" }}>
          {t.clear_btn || (isAr ? "مسح" : "Clear")}
        </button>
        {error && <span style={{ color: "var(--error, #f48771)", fontSize: "0.9rem", marginLeft: isAr ? "0" : "auto", marginRight: isAr ? "auto" : "0" }}>{error}</span>}
        {output && !error && (
          <button className="copy-btn" onClick={copy} style={{ marginLeft: isAr ? "0" : "auto", marginRight: isAr ? "auto" : "0", background: "var(--success, #28a745)", color: "white", border: "none", padding: "6px 16px", borderRadius: "4px", cursor: "pointer" }}>
            {copied ? (isAr ? "✅ تم النسخ" : "✅ Copied") : t.copy_btn}
          </button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", minHeight: "50vh", background: "var(--border, #eee)" }}>
        <div style={{ display: "flex", flexDirection: "column", background: "var(--card-bg, #fff)" }}>
          <div style={{ padding: "8px 16px", fontSize: "0.8rem", borderBottom: "1px solid var(--border, #eee)", color: "var(--text-muted, #666)" }}>INPUT.json</div>
          <textarea
            style={{
              flexGrow: 1,
              width: "100%",
              background: "transparent",
              color: "inherit",
              border: "none",
              padding: "16px",
              fontFamily: "monospace",
              fontSize: "14px",
              resize: "none",
              outline: "none",
              lineHeight: "1.5",
              minHeight: "50vh"
            }}
            placeholder={t.input_placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", background: "var(--card-bg, #fff)" }}>
          <div style={{ padding: "8px 16px", fontSize: "0.8rem", borderBottom: "1px solid var(--border, #eee)", color: "var(--text-muted, #666)" }}>OUTPUT.json</div>
          <textarea
            style={{
              flexGrow: 1,
              width: "100%",
              background: "transparent",
              color: "inherit",
              border: "none",
              padding: "16px",
              fontFamily: "monospace",
              fontSize: "14px",
              resize: "none",
              outline: "none",
              lineHeight: "1.5",
              minHeight: "50vh"
            }}
            readOnly
            value={output}
          />
        </div>
      </div>
    </div>
  );
}
