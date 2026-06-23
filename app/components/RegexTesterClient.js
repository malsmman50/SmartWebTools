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

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>مختبر التعابير النمطية (Regex Tester) والمطابقة الفورية</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              التعابير النمطية (Regular Expressions) هي أداة قوية للغاية تستخدم للبحث، والمطابقة، ومعالجة النصوص المتقدمة في البرمجة. يتيح لك "مختبر التعابير النمطية" كتابة أنماط Regex وتجربتها فورياً على نصوص حية. تدعم الأداة تسليط الضوء المباشر (Syntax Highlighting) على التطابقات، مع استخراج وفصل مجموعات الالتقاط (Capture Groups) لتبسيط عملية تصحيح أخطاء الأنماط المعقدة.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة جاهزة للتعابير النمطية (Common Regex Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px", direction: "ltr", textAlign: "left" }}>
              <li style={{ marginBottom: "8px" }}><strong>استخراج الإيميلات (Email Match):</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;</code></li>
              <li style={{ marginBottom: "8px" }}><strong>مطابقة أرقام الهواتف (Phone Numbers):</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>\+?[0-9]&#123;1,3&#125;?[-.\s]?\?[0-9]&#123;1,4&#125;?\)?[-.\s]?[0-9]&#123;1,4&#125;[-.\s]?[0-9]&#123;1,9&#125;</code></li>
              <li style={{ marginBottom: "8px" }}><strong>استخراج الروابط (URL Match):</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]&#123;1,256&#125;\.[a-zA-Z0-9()]&#123;1,6&#125;\b([-a-zA-Z0-9()!@:%_\+.~#?&//=]*)</code></li>
              <li style={{ marginBottom: "8px" }}><strong>كلمة مرور قوية (Strong Password):</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]&#123;8,&#125;$</code></li>
            </ul>

            <h3 style={{ marginTop: "24px", textAlign: "right" }}>علامات البحث الشائعة (Regex Flags)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px", textAlign: "right" }}>
              تُستخدم العلامات (Flags) لتعديل سلوك البحث. <strong>(g)</strong>: للبحث الشامل (Global) لاستخراج جميع التطابقات وليس الأول فقط. <strong>(i)</strong>: تجاهل حالة الأحرف الكبيرة والصغيرة (Case-insensitive). <strong>(m)</strong>: البحث متعدد الأسطر (Multiline)، مفيد عند استخدام `^` و `$`.
            </p>
          </>
        ) : (
          <>
            <h2>Real-Time Regular Expression (Regex) Tester</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Regular Expressions (Regex) are an incredibly powerful tool for searching, matching, and manipulating text in programming. This live Regex Tester allows you to write patterns and instantly evaluate them against test strings. It features real-time syntax highlighting of matches and elegantly separates capture groups, making debugging complex patterns a breeze.
            </p>

            <h3 style={{ marginTop: "24px" }}>Common Regex Examples to Try</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Match Email Addresses:</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;</code></li>
              <li style={{ marginBottom: "8px" }}><strong>Match Phone Numbers:</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>\+?[0-9]&#123;1,3&#125;?[-.\s]?\(?[0-9]&#123;1,4&#125;?\)?[-.\s]?[0-9]&#123;1,4&#125;[-.\s]?[0-9]&#123;1,9&#125;</code></li>
              <li style={{ marginBottom: "8px" }}><strong>Match URLs:</strong><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]&#123;1,256&#125;\.[a-zA-Z0-9()]&#123;1,6&#125;\b([-a-zA-Z0-9()!@:%_\+.~#?&//=]*)</code></li>
              <li style={{ marginBottom: "8px" }}><strong>Validate Strong Password:</strong><br/><span style={{ fontSize: "0.85rem" }}>(Min 8 chars, 1 letter, 1 number, 1 special char)</span><br/><code style={{ background: "var(--bg-card)", padding: "2px 6px", borderRadius: "4px" }}>^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]&#123;8,&#125;$</code></li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Understanding Common Flags</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Regex flags modify how the search behaves. <strong>(g) Global</strong>: Finds all matches rather than stopping after the first one. <strong>(i) Ignore Case</strong>: Makes the match case-insensitive. <strong>(m) Multiline</strong>: Causes the start `^` and end `$` anchors to match the start and end of a line, rather than the whole string.
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
            "name": "ما هي مجموعات الالتقاط (Capture Groups) في الريجكس؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "مجموعات الالتقاط تسمح لك باستخراج جزء معين من النص المطابق. يتم إنشاؤها بوضع أقواس () حول جزء من التعبير النمطي. أداتنا تقوم بفصل وعرض هذه المجموعات تلقائياً لتسهيل فحصها."
            }
          },
          {
            "@type": "Question",
            "name": "لماذا تظهر رسالة خطأ عند كتابة نمط Regex الخاص بي؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "عادة ما يحدث هذا بسبب وجود خطأ في الصياغة، مثل قوس مفتوح غير مغلق أو استخدام رموز غير مدعومة في محرك JavaScript للتعابير النمطية."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "What are Capture Groups in Regex?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Capture groups allow you to isolate and extract a specific portion of the matched text. They are created by placing parentheses () around a part of the regex pattern. Our tool automatically separates and displays these groups for easy debugging."
            }
          },
          {
            "@type": "Question",
            "name": "Why do I see an error when writing my Regex pattern?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This usually happens due to a syntax error, such as an unclosed parenthesis/bracket or using lookbehind assertions that might not be fully supported depending on the exact JavaScript engine variant."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
