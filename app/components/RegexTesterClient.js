"use client";

import React, { useState, useEffect } from "react";

export default function RegexTesterClient({ dict, lang }) {
  const t = dict.regex;

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    evaluateRegex();
  }, [pattern, flags, testString]);

  const evaluateRegex = () => {
    setError("");
    setMatches([]);
    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      if (!testString) return;

      const results = [];
      let match;
      if (regex.global) {
        while ((match = regex.exec(testString)) !== null) {
          if (match.index === regex.lastIndex) regex.lastIndex++;
          results.push(match);
        }
      } else {
        match = regex.exec(testString);
        if (match) results.push(match);
      }
      setMatches(results);
    } catch (err) {
      setError(t.error + " (" + err.message + ")");
    }
  };

  const getHighlightedText = () => {
    if (!pattern || error || matches.length === 0) return testString;

    let highlighted = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      const start = match.index;
      const end = start + match[0].length;
      if (start > lastIndex) {
        highlighted.push(<span key={`text-${index}`}>{testString.substring(lastIndex, start)}</span>);
      }
      highlighted.push(
        <span key={`match-${index}`} style={{ background: "rgba(37, 99, 235, 0.3)", borderRadius: "2px" }}>
          {match[0]}
        </span>
      );
      lastIndex = end;
    });

    if (lastIndex < testString.length) {
      highlighted.push(<span key="text-end">{testString.substring(lastIndex)}</span>);
    }
    return highlighted;
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="card">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div>
            <label className="label">{t.regex_pattern}</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }} dir="ltr">
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
                <span style={{ padding: "0 16px", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "1.2rem" }}>/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  style={{ width: "100%", padding: "12px 0", background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "monospace", fontSize: "1.1rem" }}
                  placeholder="[a-zA-Z0-9]+"
                />
                <span style={{ padding: "0 16px", color: "var(--text-muted)", fontFamily: "monospace", fontSize: "1.2rem" }}>/</span>
              </div>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="input"
                style={{ width: "100px", fontFamily: "monospace", fontSize: "1.1rem" }}
                placeholder="gim"
                title={t.flags}
              />
            </div>
            {error && <p style={{ marginTop: "8px", color: "var(--danger)", fontSize: "0.9rem" }}>{error}</p>}
          </div>

          <div>
            <label className="label">{t.test_string}</label>
            <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", background: "var(--bg)" }} dir="ltr">
                <div 
                    style={{ position: "absolute", inset: 0, padding: "16px", fontFamily: "monospace", color: "transparent", whiteSpace: "pre-wrap", wordBreak: "break-word", pointerEvents: "none", zIndex: 0 }}
                    aria-hidden="true"
                >
                    {getHighlightedText()}
                </div>
                <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    className="input"
                    style={{ width: "100%", height: "200px", padding: "16px", background: "transparent", border: "none", fontFamily: "monospace", color: "var(--text)", resize: "vertical", position: "relative", zIndex: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    placeholder="Enter string to test..."
                    spellCheck="false"
                />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "16px" }}>
              {t.matches} ({matches.length})
            </h3>
            
            {matches.length > 0 ? (
              <div style={{ background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)", padding: "16px", maxHeight: "300px", overflowY: "auto" }} dir="ltr">
                {matches.map((match, i) => (
                  <div key={i} style={{ marginBottom: i === matches.length - 1 ? 0 : "16px" }}>
                    <div style={{ fontWeight: 600, color: "var(--primary)", marginBottom: "4px", fontSize: "0.9rem" }}>
                      Match {i + 1} (Index: {match.index})
                    </div>
                    <div style={{ background: "var(--bg-card)", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "0.95rem", wordBreak: "break-word" }}>
                      {match[0]}
                    </div>
                    {match.length > 1 && (
                      <div style={{ marginTop: "8px", paddingLeft: "16px", borderLeft: "2px solid var(--border)" }}>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>Capture Groups:</div>
                        {Array.from(match).slice(1).map((group, groupIndex) => (
                          <div key={groupIndex} style={{ fontSize: "0.9rem", fontFamily: "monospace", color: "var(--text)" }}>
                            <span style={{ color: "var(--text-muted)", marginRight: "8px" }}>{groupIndex + 1}:</span> 
                            {group === undefined ? <span style={{ fontStyle: "italic", opacity: 0.5 }}>undefined</span> : group}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                {pattern ? t.no_matches : "Enter a pattern to see results."}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
