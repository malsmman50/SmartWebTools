"use client";

import React, { useState, useEffect } from "react";

export default function RegexTesterClient({ dict, lang }) {
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
          // Prevent infinite loops on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          results.push(match);
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          results.push(match);
        }
      }
      
      setMatches(results);
    } catch (err) {
      setError(dict.regex.error + " (" + err.message + ")");
    }
  };

  const isRtl = lang === "ar";

  // Function to highlight matches in the text
  const getHighlightedText = () => {
    if (!pattern || error || matches.length === 0) return testString;

    let highlighted = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      const start = match.index;
      const end = start + match[0].length;

      // Add text before the match
      if (start > lastIndex) {
        highlighted.push(<span key={`text-${index}`}>{testString.substring(lastIndex, start)}</span>);
      }

      // Add the matched text
      highlighted.push(
        <span key={`match-${index}`} className="bg-indigo-300 dark:bg-indigo-600 text-indigo-900 dark:text-white rounded px-0.5">
          {match[0]}
        </span>
      );

      lastIndex = end;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      highlighted.push(<span key="text-end">{testString.substring(lastIndex)}</span>);
    }

    return highlighted;
  };

  return (
    <div className={`max-w-4xl mx-auto ${isRtl ? "text-right" : "text-left"}`}>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          {dict.regex.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dict.regex.subtitle}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col gap-6">
          
          {/* Regex Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {dict.regex.regex_pattern}
            </label>
            <div className="flex flex-col sm:flex-row gap-4" dir="ltr">
              <div className="flex-grow flex items-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <span className="px-4 text-gray-500 font-mono text-lg">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full py-3 bg-transparent outline-none font-mono text-gray-800 dark:text-white"
                  placeholder="[a-zA-Z0-9]+"
                />
                <span className="px-4 text-gray-500 font-mono text-lg">/</span>
              </div>
              <div className="w-full sm:w-32">
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-gray-800 dark:text-white"
                  placeholder="gim"
                  title={dict.regex.flags}
                />
              </div>
            </div>
            {error && <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>}
          </div>

          {/* Test String Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {dict.regex.test_string}
            </label>
            <div className="relative border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900" dir="ltr">
                {/* Highlighted text behind */}
                <div 
                    className="absolute inset-0 p-4 font-mono text-transparent whitespace-pre-wrap break-words pointer-events-none z-0"
                    aria-hidden="true"
                >
                    {getHighlightedText()}
                </div>
                {/* Transparent textarea in front */}
                <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    className="w-full h-48 p-4 bg-transparent outline-none font-mono text-gray-800 dark:text-gray-100 resize-y relative z-10 whitespace-pre-wrap"
                    placeholder="Enter string to test..."
                    spellCheck="false"
                />
            </div>
          </div>

          {/* Matches Output */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              {dict.regex.matches} ({matches.length})
            </h3>
            
            {matches.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 max-h-64 overflow-y-auto" dir="ltr">
                {matches.map((match, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      Match {i + 1} (Index: {match.index})
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm break-words text-gray-800 dark:text-gray-200">
                      {match[0]}
                    </div>
                    {match.length > 1 && (
                      <div className="mt-2 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                        <div className="text-xs text-gray-500 mb-1">Capture Groups:</div>
                        {Array.from(match).slice(1).map((group, groupIndex) => (
                          <div key={groupIndex} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                            <span className="text-gray-400 mr-2">{groupIndex + 1}:</span> 
                            {group === undefined ? <span className="italic opacity-50">undefined</span> : group}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                {pattern ? dict.regex.no_matches : "Enter a pattern to see results."}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
