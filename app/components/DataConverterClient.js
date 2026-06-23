"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Papa from "papaparse";
import YAML from "yaml";
import { js2xml, xml2js } from "xml-js";

export default function DataConverterClient({ dict, lang }) {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [fromFormat, setFromFormat] = useState("json");
  const [toFormat, setToFormat] = useState("yaml");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Re-run conversion when inputs change
  useEffect(() => {
    convertData();
  }, [inputData, fromFormat, toFormat]);

  const parseInput = () => {
    if (!inputData.trim()) return null;
    
    switch (fromFormat) {
      case "json":
        return JSON.parse(inputData);
      case "yaml":
        return YAML.parse(inputData);
      case "csv":
        const parsed = Papa.parse(inputData, { header: true, skipEmptyLines: true });
        if (parsed.errors.length > 0) throw new Error(parsed.errors[0].message);
        return parsed.data;
      case "xml":
        return xml2js(inputData, { compact: true, spaces: 4 });
      default:
        throw new Error("Unknown input format");
    }
  };

  const formatOutput = (parsedObj) => {
    if (!parsedObj) return "";
    
    switch (toFormat) {
      case "json":
        return JSON.stringify(parsedObj, null, 2);
      case "yaml":
        return YAML.stringify(parsedObj);
      case "csv":
        // Papa.unparse expects an array of objects
        if (!Array.isArray(parsedObj)) {
            // Try to make it an array
            if (typeof parsedObj === "object" && parsedObj !== null) {
                // If it's an object with one key that contains an array (like XML often parses)
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
        // xml-js expects a specific structure or wrapper if it's an array
        let xmlObj = parsedObj;
        if (Array.isArray(parsedObj)) {
            xmlObj = { root: { item: parsedObj } };
        } else if (typeof parsedObj !== "object" || Object.keys(parsedObj).length !== 1) {
            xmlObj = { root: parsedObj };
        }
        return js2xml(xmlObj, { compact: true, spaces: 2 });
      default:
        throw new Error("Unknown output format");
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
      setError(dict.data_converter.error_parse + " (" + err.message + ")");
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

  const isRtl = lang === "ar";
  const getLanguageForEditor = (format) => {
    switch(format) {
        case 'json': return 'json';
        case 'yaml': return 'yaml';
        case 'xml': return 'xml';
        default: return 'plaintext';
    }
  };

  return (
    <div className={`max-w-6xl mx-auto ${isRtl ? "text-right" : "text-left"}`}>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          {dict.data_converter.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dict.data_converter.subtitle}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                    {dict.data_converter.from_format}
                </label>
                <select
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    value={fromFormat}
                    onChange={(e) => setFromFormat(e.target.value)}
                >
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-inner h-96" dir="ltr">
              <Editor
                height="100%"
                language={getLanguageForEditor(fromFormat)}
                theme="vs-dark"
                value={inputData}
                onChange={(val) => setInputData(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                    {dict.data_converter.to_format}
                </label>
                <select
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    value={toFormat}
                    onChange={(e) => setToFormat(e.target.value)}
                >
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="xml">XML</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-inner h-96 relative" dir="ltr">
              <Editor
                height="100%"
                language={getLanguageForEditor(toFormat)}
                theme="vs-dark"
                value={outputData}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <div className="flex justify-between items-center">
                {success && !error && inputData.trim() ? (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                        {dict.data_converter.success}
                    </span>
                ) : (
                    <span></span>
                )}
                <button
                    onClick={handleCopy}
                    disabled={!outputData}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                    {copied ? "✓" : dict.data_converter.copy_btn}
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
