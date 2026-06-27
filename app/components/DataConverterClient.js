"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Papa from "papaparse";
import YAML from "yaml";
import { js2xml, xml2js } from "xml-js";

export default function DataConverterClient({ dict, lang, initialValues }) {
  const t = dict.data_converter;

  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [fromFormat, setFromFormat] = useState(initialValues?.fromFormat ? initialValues.fromFormat : "json");
  const [toFormat, setToFormat] = useState(initialValues?.toFormat ? initialValues.toFormat : "yaml");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    convertData();
  }, [inputData, fromFormat, toFormat]);

  const parseInput = () => {
    if (!inputData.trim()) return null;
    switch (fromFormat) {
      case "json": return JSON.parse(inputData);
      case "yaml": return YAML.parse(inputData);
      case "csv":
        const parsed = Papa.parse(inputData, { header: true, skipEmptyLines: true });
        if (parsed.errors.length > 0) throw new Error(parsed.errors[0].message);
        return parsed.data;
      case "xml": return xml2js(inputData, { compact: true, spaces: 4 });
      default: throw new Error("Unknown input format");
    }
  };

  const formatOutput = (parsedObj) => {
    if (!parsedObj) return "";
    switch (toFormat) {
      case "json": return JSON.stringify(parsedObj, null, 2);
      case "yaml": return YAML.stringify(parsedObj);
      case "csv":
        if (!Array.isArray(parsedObj)) {
            if (typeof parsedObj === "object" && parsedObj !== null) {
                const keys = Object.keys(parsedObj);
                if (keys.length === 1 && Array.isArray(parsedObj[keys[0]])) {
                    parsedObj = parsedObj[keys[0]];
                } else {
                    parsedObj = [parsedObj];
                }
            } else {
                parsedObj = [parsedObj];
            }
        }
        return Papa.unparse(parsedObj);
      case "xml":
        let xmlObj = parsedObj;
        if (Array.isArray(parsedObj)) {
            xmlObj = { root: { item: parsedObj } };
        } else if (typeof parsedObj !== "object" || Object.keys(parsedObj).length !== 1) {
            xmlObj = { root: parsedObj };
        }
        return js2xml(xmlObj, { compact: true, spaces: 2 });
      default: throw new Error("Unknown output format");
    }
  };

  const convertData = () => {
    setError("");
    setSuccess(false);
    if (!inputData.trim()) {
      setOutputData("");
      return;
    }
    try {
      const parsedObj = parseInput();
      const result = formatOutput(parsedObj);
      setOutputData(result);
      setSuccess(true);
    } catch (err) {
      setError(t.error_parse + " (" + err.message + ")");
      setOutputData("");
    }
  };

  const handleCopy = () => {
    if (outputData) {
      navigator.clipboard.writeText(outputData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLanguageForEditor = (format) => {
    switch(format) {
        case 'json': return 'json';
        case 'yaml': return 'yaml';
        case 'xml': return 'xml';
        default: return 'plaintext';
    }
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="card">
        <div className="grid-2">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="label" style={{ marginBottom: 0 }}>{t.from_format}</label>
                <select className="input" style={{ width: "auto", padding: "6px 12px" }} value={fromFormat} onChange={(e) => setFromFormat(e.target.value)}>
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", height: "400px" }} dir="ltr">
              <Editor
                height="100%"
                language={getLanguageForEditor(fromFormat)}
                theme="vs-dark"
                value={inputData}
                onChange={(val) => setInputData(val || "")}
                options={{ minimap: { enabled: false }, fontSize: 14 }}
              />
            </div>
            {error && <div style={{ color: "var(--danger)", background: "rgba(220, 38, 38, 0.1)", padding: "12px", borderRadius: "8px", fontSize: "0.9rem" }}>{error}</div>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="label" style={{ marginBottom: 0 }}>{t.to_format}</label>
                <select className="input" style={{ width: "auto", padding: "6px 12px" }} value={toFormat} onChange={(e) => setToFormat(e.target.value)}>
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", height: "400px" }} dir="ltr">
              <Editor
                height="100%"
                language={getLanguageForEditor(toFormat)}
                theme="vs-dark"
                value={outputData}
                options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                <span style={{ color: "var(--success)", fontSize: "0.9rem", fontWeight: 500 }}>
                    {success && !error && inputData.trim() ? t.success : ""}
                </span>
                <button onClick={handleCopy} disabled={!outputData} className="btn btn-primary" style={{ opacity: outputData ? 1 : 0.5 }}>
                    {copied ? "✓" : t.copy_btn}
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>محول وتنسيق البيانات اللحظي الآمن</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              أداة تحويل البيانات الذكية توفر لك بيئة آمنة وسريعة للتحويل بين أشهر صيغ البيانات التي يستخدمها المطورون والمبرمجون: JSON، XML، YAML، و CSV. تتميز هذه الأداة بأنها تعمل بشكل كامل داخل متصفحك (Offline-First)، مما يعني أن بياناتك الحساسة أو ملفات الإعدادات الخاصة بك لا يتم إرسالها إطلاقاً إلى أي خادم خارجي.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>تحويل ملفات إعدادات التطبيقات:</strong> الكثير من التطبيقات الحديثة (مثل Docker أو Kubernetes) تستخدم YAML بدلاً من JSON لصيغ التكوين (Config files). يمكنك تحويل ملف <code>config.json</code> بكل سهولة إلى <code>config.yaml</code> جاهز للعمل.</li>
              <li style={{ marginBottom: "8px" }}><strong>تصدير البيانات لاستخدامات جداول البيانات (Excel):</strong> عندما يقوم مبرمج الواجهة الخلفية (Backend) بتزويدك ببيانات المستخدمين أو المنتجات بصيغة JSON، يمكنك تحويلها هنا فوراً إلى CSV لفتحها وتحليلها في Microsoft Excel أو Google Sheets.</li>
              <li style={{ marginBottom: "8px" }}><strong>تكامل الأنظمة القديمة (Legacy Systems):</strong> بعض الأنظمة المصرفية أو البرمجيات القديمة لا تقبل إلا بصيغة XML. باستخدام هذه الأداة يمكنك تحويل الردود المستلمة بصيغة JSON إلى XML ليتوافق مع هذه الأنظمة.</li>
              <li style={{ marginBottom: "8px" }}><strong>تصحيح واختبار البيانات (Debugging):</strong> يمكنك نسخ مخرجات واجهات الـ APIs المعقدة ولصقها هنا كـ JSON وتحويلها لـ YAML لتصبح أسهل للقراءة والتحليل السريع.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>لماذا التحويل المحلي أفضل؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              مفاتيح الـ API، ومعلومات الوصول إلى قواعد البيانات، والبيانات الحساسة للعملاء غالباً ما تكون مخزنة في ملفات JSON أو YAML. استخدام أدوات الويب التقليدية للتحويل قد يعرض هذه البيانات لخطر التسريب. أداتنا تقوم بمعالجة هذه الملفات محلياً (Client-Side) باستخدام مكتبات قوية وموثوقة.
            </p>
          </>
        ) : (
          <>
            <h2>Secure Live Data Format Converter</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The Smart Data Format Converter provides a secure, lightning-fast environment to switch between the most popular data serialization formats used by developers: JSON, XML, YAML, and CSV. Built with an "Offline-First" privacy approach, the entire conversion engine runs strictly in your browser. This means your sensitive configuration files, API payloads, or customer data are never transmitted to external servers.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Application Configuration Conversion:</strong> Many modern DevOps tools (like Docker or Kubernetes) rely heavily on YAML, while web APIs prefer JSON. You can easily convert a bulky <code>config.json</code> into a clean, human-readable <code>config.yaml</code> file instantly.</li>
              <li style={{ marginBottom: "8px" }}><strong>Data Export for Spreadsheets (Excel):</strong> If a backend developer provides you with a list of users or analytics in JSON format, you can convert it to CSV here, allowing non-technical teams to open and analyze the data in Microsoft Excel or Google Sheets.</li>
              <li style={{ marginBottom: "8px" }}><strong>Legacy Systems Integration:</strong> Some older enterprise or banking software systems strictly accept XML payloads. You can seamlessly convert modern REST API JSON responses into strictly formatted XML to ensure compatibility.</li>
              <li style={{ marginBottom: "8px" }}><strong>Debugging & Readability:</strong> JSON structures can get deeply nested and hard to read. By copying complex JSON and converting it to YAML, you remove the brackets and quotes, making it significantly easier to debug and scan visually.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Why Local Conversion Matters?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              API keys, database credentials, and proprietary business logic are often stored inside data serialization files. Uploading these to standard online converter websites exposes you to severe data leakage risks. Our tool eliminates this risk entirely by processing logic locally on your device via robust parsing libraries.
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
            "name": "هل يتم حفظ بياناتي أو إرسالها للخوادم أثناء عملية التحويل؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا، إطلاقاً. الأداة تعمل 100% داخل متصفحك ولا تتصل بأي خوادم خارجية لمعالجة البيانات."
            }
          },
          {
            "@type": "Question",
            "name": "كيف أحول بيانات JSON المستلمة من API إلى جدول Excel؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "فقط الصق كود الـ JSON، ثم حدد الصيغة المستهدفة كـ (CSV). انسخ الناتج واحفظه كملف بلاحقة .csv لفتحه في Excel بسهولة."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Is my data saved or sent to a server during conversion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not. The tool is 100% client-side, meaning the parsing and conversion processes happen completely inside your browser."
            }
          },
          {
            "@type": "Question",
            "name": "How do I convert a JSON API response into an Excel table?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply paste your JSON code, select 'CSV' as the target format, and then copy the resulting output. Save it as a .csv file and it will open perfectly in Excel."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
