"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Papa from "papaparse";
import YAML from "yaml";
import { js2xml, xml2js } from "xml-js";

export default function DataConverterClient({ dict, lang }) {
  const t = dict.data_converter;

  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [fromFormat, setFromFormat] = useState("json");
  const [toFormat, setToFormat] = useState("yaml");
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
    </div>
  );
}
