"use client";

import { useState } from "react";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function JsonFormatterClient() {
  const { lang, dict } = useLanguage();
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
    <div className="container" style={{ padding: "40px 20px", maxWidth: "1400px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden", background: "#1e1e1e", border: "1px solid #333" }}>
        <div style={{ display: "flex", padding: "12px 20px", background: "#252526", borderBottom: "1px solid #333", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={format} style={{ padding: "6px 16px", fontSize: "0.9rem", background: "var(--success)" }}>
            {t.format_btn}
          </button>
          <button className="btn btn-outline" onClick={minify} style={{ padding: "6px 16px", fontSize: "0.9rem", borderColor: "#444", color: "#ccc" }}>
            {t.minify_btn}
          </button>
          <button className="btn btn-outline" onClick={clear} style={{ padding: "6px 16px", fontSize: "0.9rem", borderColor: "#444", color: "#ccc" }}>
            {t.clear_btn || (isAr ? "مسح" : "Clear")}
          </button>
          {error && <span style={{ color: "#f48771", fontSize: "0.9rem", marginLeft: isAr ? "0" : "auto", marginRight: isAr ? "auto" : "0" }}>{error}</span>}
          {output && !error && (
            <button className="copy-btn" onClick={copy} style={{ marginLeft: isAr ? "0" : "auto", marginRight: isAr ? "auto" : "0", background: "var(--success)", color: "white", border: "none", padding: "6px 16px", borderRadius: "4px", cursor: "pointer" }}>
              {copied ? (isAr ? "✅ تم النسخ" : "✅ Copied") : t.copy_btn}
            </button>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#333", minHeight: "50vh" }}>
          <div style={{ background: "#1e1e1e", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "8px 16px", color: "#858585", fontSize: "0.8rem", borderBottom: "1px solid #333" }}>INPUT.json</div>
            <textarea
              style={{
                flexGrow: 1,
                width: "100%",
                background: "#1e1e1e",
                color: "#d4d4d4",
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
          <div style={{ background: "#1e1e1e", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "8px 16px", color: "#858585", fontSize: "0.8rem", borderBottom: "1px solid #333" }}>OUTPUT.json</div>
            <textarea
              style={{
                flexGrow: 1,
                width: "100%",
                background: "#1e1e1e",
                color: "#d4d4d4",
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

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>الدليل الشامل لتنسيق والتحقق من صحة JSON</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تعد صيغة JSON (JavaScript Object Notation) المعيار الأساسي لتبادل البيانات على شبكة الويب الحديثة. تتميز بخفتها وسهولة قراءتها وكتابتها من قبل البشر وسهولة تحليلها وتوليدها من قبل الآلات. سواء كنت مهندس خلفية برمجية تصمم واجهة برمجة تطبيقات REST، أو مطور واجهة أمامية، فإن JSON هي اللغة العالمية التي تربط الأنظمة ببعضها.
            </p>

            <h3 style={{ marginTop: "24px" }}>لماذا تحتاج لتنسيق الـ JSON؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              غالباً ما تأتي بيانات JSON مضغوطة (minify) في سطر واحد لتوفير النطاق الترددي أثناء النقل عبر الشبكة. ورغم أن هذا رائع للأداء، إلا أنه مستحيل للاستكشاف البصري وتصحيح الأخطاء. منسق الـ JSON يقوم بإعادة صياغة الكود وإضافة مسافات بادئة وسطور جديدة ليسهل فهمه بالعين المجردة واكتشاف الفواصل أو الأقواس الناقصة.
            </p>

            <h3 style={{ marginTop: "24px" }}>لماذا المعالجة المحلية هي الأكثر أماناً؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تقوم العديد من الأدوات عبر الإنترنت بإرسال نصوص الـ JSON الخاصة بك إلى خوادمها الخاصة لمعالجتها. إذا كنت تقوم بتنسيق بيانات حساسة تحتوي على كلمات مرور أو رموز مصادقة (auth tokens)، فقد يعرضك ذلك لخطر تسريب البيانات. منصة SmartCalcTools تقوم بالمعالجة محلياً بالكامل 100% داخل متصفحك، مما يحقق أعلى درجات الأمان المطلوبة للمطورين والمؤسسات.
            </p>
          </>
        ) : (
          <>
            <h2>The Complete Guide to JSON Formatting and Validation</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              JSON (JavaScript Object Notation) is the standard data interchange format of the modern web. It is lightweight, easy for humans to read and write, and easy for machines to parse and generate. Whether you are a backend engineer designing a REST API or a frontend developer debugging state, JSON is the universal language.
            </p>

            <h3 style={{ marginTop: "24px" }}>Why Format Your JSON?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Raw JSON data often comes minified (compressed into a single line) to save bandwidth. While this is great for performance, it is terrible for debugging. A JSON Formatter takes minified code and adds proper indentation, line breaks, and spacing. This instantly highlights the hierarchy, allowing you to easily spot errors.
            </p>

            <h3 style={{ marginTop: "24px" }}>Why Use a Client-Side Formatter?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Many free online formatting tools send your pasted JSON to a backend server. If you are formatting API payloads containing sensitive user data, auth tokens, or proprietary business logic, you are risking a massive data leak. SmartCalcTools processes your JSON 100% locally in your browser, ensuring enterprise-grade security.
            </p>
          </>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": isAr ? [
          {
            "@type": "Question",
            "name": "ما الفرق بين JSON وكائنات JavaScript؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "صيغة JSON هي صيغة نصية مبنية على كائنات JavaScript ولكنها تخضع لقواعد صارمة للغاية؛ حيث يجب إحاطة جميع الأسماء بعلامات اقتباس مزدوجة، ولا يُسمح بالوظائف (Functions) أو القيم غير المعرفة (undefined)."
            }
          },
          {
            "@type": "Question",
            "name": "هل الأداة آمنة للبيانات الحساسة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، يتم تشغيل الأداة محلياً 100% داخل المتصفح دون إرسال أي طلبات شبكة خارجية، وهي مناسبة ومطابقة لمعايير الأمان المؤسسية."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "What is the difference between JSON and JavaScript objects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JSON is a text-based format. In JSON, all property names must be double-quoted strings, and functions or undefined values are not allowed."
            }
          },
          {
            "@type": "Question",
            "name": "Is this JSON formatter safe for sensitive data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Since our tool runs entirely offline in your browser, it is perfectly safe to paste sensitive database dumps or tokens. No network requests are made."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
