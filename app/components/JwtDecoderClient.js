"use client";

import { useState, useEffect } from "react";
import { decodeJwt, decodeProtectedHeader } from "jose";

export default function JwtDecoderClient({ lang, dict, ...props }) {
  
  const t = dict.jwt;
  const isAr = lang === "ar";

  const [token, setToken] = useState("");

  let header = "";
  let payload = "";
  let error = "";

  if (token.trim()) {
    try {
      const decodedHeader = decodeProtectedHeader(token);
      const decodedPayload = decodeJwt(token);
      
      header = JSON.stringify(decodedHeader, null, 2);
      payload = JSON.stringify(decodedPayload, null, 2);
    } catch (e) {
      error = isAr ? "رمز JWT غير صالح البنية" : "Invalid JWT Format";
    }
  }

  return (
      <div className="grid-2">
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <label className="label" htmlFor="jwt-input">
            {isAr ? "الرمز المشفر (الصق هنا):" : "Encoded Token (Paste Here):"}
          </label>
          <textarea 
            id="jwt-input"
            className="input" 
            style={{ flexGrow: 1, minHeight: "400px", fontFamily: "monospace", wordBreak: "break-all", fontSize: "0.9rem", lineHeight: "1.5" }} 
            placeholder={t.input_placeholder}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {error && <p style={{ color: "var(--danger)", marginTop: "12px", fontWeight: "bold" }}>❌ {error}</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card" style={{ padding: 0, overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div style={{ padding: "8px 16px", background: "var(--bg)", color: "var(--text-muted)", fontSize: "0.8rem", borderBottom: "1px solid var(--border)" }}>
              {t.header || (isAr ? "الترويسة: الخوارزمية ونوع الرمز" : "HEADER: ALGORITHM & TOKEN TYPE")}
            </div>
            <textarea
              readOnly
              style={{
                display: "block", width: "100%", height: "150px",
                background: "var(--bg-card)", color: "var(--text)", border: "none",
                padding: "16px", fontFamily: "monospace", fontSize: "14px",
                resize: "none", outline: "none", lineHeight: "1.6",
              }}
              value={header}
            />
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden", background: "var(--bg-card)", border: "1px solid var(--border)", flexGrow: 1 }}>
            <div style={{ padding: "8px 16px", background: "var(--bg)", color: "var(--text-muted)", fontSize: "0.8rem", borderBottom: "1px solid var(--border)" }}>
              {t.payload || (isAr ? "الحمولة: البيانات والادعاءات" : "PAYLOAD: DATA")}
            </div>
            <textarea
              readOnly
              style={{
                display: "block", width: "100%", height: "350px",
                background: "var(--bg-card)", color: "var(--text)", border: "none",
                padding: "16px", fontFamily: "monospace", fontSize: "14px",
                resize: "none", outline: "none", lineHeight: "1.6",
              }}
              value={payload}
            />
          </div>
        </div>
      </div>

  );
}
