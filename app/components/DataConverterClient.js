"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

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
    let isActive = true;

    const convertDataAsync = async () => {
      setError("");
      setSuccess(false);
      if (!inputData.trim()) {
        if (isActive) setOutputData("");
        return;
      }
      try {
        let parsedObj;
        switch (fromFormat) {
          case "json":
            parsedObj = JSON.parse(inputData);
            break;
          case "yaml":
            const YAML = (await import("yaml")).default;
            parsedObj = YAML.parse(inputData);
            break;
          case "csv":
            const Papa = (await import("papaparse")).default;
            const parsed = Papa.parse(inputData, { header: true, skipEmptyLines: true });
            if (parsed.errors.length > 0) throw new Error(parsed.errors[0].message);
            parsedObj = parsed.data;
            break;
          case "xml":
            const { xml2js } = await import("xml-js");
            parsedObj = xml2js(inputData, { compact: true, spaces: 4 });
            break;
          default:
            throw new Error("Unknown input format");
        }

        let result = "";
        switch (toFormat) {
          case "json":
            result = JSON.stringify(parsedObj, null, 2);
            break;
          case "yaml":
            const YAMLOut = (await import("yaml")).default;
            result = YAMLOut.stringify(parsedObj);
            break;
          case "csv":
            const PapaOut = (await import("papaparse")).default;
            let csvObj = parsedObj;
            if (!Array.isArray(csvObj)) {
              if (typeof csvObj === "object" && csvObj !== null) {
                const keys = Object.keys(csvObj);
                if (keys.length === 1 && Array.isArray(csvObj[keys[0]])) csvObj = csvObj[keys[0]];
                else csvObj = [csvObj];
              } else csvObj = [csvObj];
            }
            result = PapaOut.unparse(csvObj);
            break;
          case "xml":
            const { js2xml } = await import("xml-js");
            let xmlObj = parsedObj;
            if (Array.isArray(parsedObj)) xmlObj = { root: { item: parsedObj } };
            else if (typeof parsedObj !== "object" || Object.keys(parsedObj).length !== 1) xmlObj = { root: parsedObj };
            result = js2xml(xmlObj, { compact: true, spaces: 2 });
            break;
          default:
            throw new Error("Unknown output format");
        }

        if (isActive) {
          setOutputData(result);
          setSuccess(true);
        }
      } catch (err) {
        if (isActive) {
          setError(t.error_parse + " (" + err.message + ")");
          setOutputData("");
        }
      }
    };

    convertDataAsync();

    return () => {
      isActive = false;
    };
  }, [inputData, fromFormat, toFormat, t.error_parse]);

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
  );
}
