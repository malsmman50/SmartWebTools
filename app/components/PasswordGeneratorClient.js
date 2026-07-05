"use client";

import { useState, useEffect } from "react";

export default function PasswordGeneratorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.password;
  const isAr = lang === "ar";

  const [length, setLength] = useState(initialValues?.length ? parseInt(initialValues.length) : 20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialValues?.length) {
      // Auto-generate on load for PSEO
      generate();
    }
  }, []);

  const generate = () => {
    let charSets = [];
    if (useUpper) charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (useNumbers) charSets.push("0123456789");
    if (useSymbols) charSets.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
    
    // Always include lowercase as base
    charSets.push("abcdefghijklmnopqrstuvwxyz");

    let pwdChars = [];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    // Guarantee one character from each selected set
    for (let i = 0; i < charSets.length && pwdChars.length < length; i++) {
      const set = charSets[i];
      pwdChars.push(set[array[i] % set.length]);
    }

    // Fill the rest randomly from all combined allowed characters
    const allChars = charSets.join("");
    const maxValid = Math.floor(4294967296 / allChars.length) * allChars.length;
    
    while (pwdChars.length < length) {
      crypto.getRandomValues(array);
      for (let i = 0; i < array.length && pwdChars.length < length; i++) {
        if (array[i] < maxValid) {
          pwdChars.push(allChars[array[i] % allChars.length]);
        }
      }
    }

    // Shuffle the characters array using Fisher-Yates
    const shuffleArray = new Uint32Array(pwdChars.length);
    crypto.getRandomValues(shuffleArray);
    for (let i = pwdChars.length - 1; i > 0; i--) {
      const j = shuffleArray[i] % (i + 1);
      [pwdChars[i], pwdChars[j]] = [pwdChars[j], pwdChars[i]];
    }

    setPassword(pwdChars.join(""));
  };

  const copy = () => { 
    navigator.clipboard.writeText(password); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  const strength = () => {
    let charsetSize = 26; // lowercase
    if (useUpper) charsetSize += 26;
    if (useNumbers) charsetSize += 10;
    if (useSymbols) charsetSize += 26; // approx 26 symbols

    const entropy = length * Math.log2(charsetSize);
    
    if (entropy < 50) return { text: t.weak, color: "var(--danger)" };
    if (entropy < 75) return { text: t.good, color: "var(--warning)" };
    return { text: t.strong, color: "var(--success)" };
  };

  const st = strength();

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="result-box" style={{ marginBottom: "20px", position: "relative" }}>
        <div style={{ fontFamily: "monospace", fontSize: "1.3rem", wordBreak: "break-all", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center", paddingRight: isAr ? "36px" : "0", paddingLeft: isAr ? "0" : "36px" }}>
          {password || t.click_generate}
        </div>
        {password && (
          <button 
            className="copy-btn" 
            onClick={copy} 
            style={{ position: "absolute", top: "12px", right: isAr ? "auto" : "12px", left: isAr ? "12px" : "auto", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
            title={isAr ? "نسخ" : "Copy"}
          >
            {copied ? "✅" : "📋"}
          </button>
        )}
      </div>

      {password && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <span style={{ fontWeight: 600, color: st.color }}>{t.strength}: {st.text}</span>
          <div style={{ height: "6px", borderRadius: "3px", background: "var(--border)", marginTop: "8px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: st.color, width: st.text === t.weak ? "33%" : st.text === t.good ? "66%" : "100%", transition: "width 0.3s" }}></div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <label className="label" htmlFor="password-length">{t.length}: {length}</label>
        <input id="password-length" type="range" min="8" max="64" value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "24px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
          <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> {t.uppercase}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
          <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> {t.numbers}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
          <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> {t.symbols}
        </label>
      </div>

      <button className="btn btn-primary" onClick={generate} style={{ width: "100%", justifyContent: "center", background: "var(--success)" }}>{t.generate_btn}</button>
    </div>
  );
}
