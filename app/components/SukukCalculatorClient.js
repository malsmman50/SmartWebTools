"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function SukukCalculatorClient({ dict, lang }) {
  const [faceValue, setFaceValue] = useState("");
  const [profitRate, setProfitRate] = useState("");
  const [frequency, setFrequency] = useState("2");
  const [duration, setDuration] = useState("");

  const isRtl = lang === "ar";

  const numFaceValue = Number(faceValue) || 0;
  const numProfitRate = Number(profitRate) || 0;
  const numFrequency = Number(frequency) || 1;
  const numDuration = Number(duration) || 0;

  // Math logic
  // Periodic Profit = Face Value * (Profit Rate / 100) / Frequency
  const periodicProfit = numFaceValue * (numProfitRate / 100) / numFrequency;
  
  // Total Profit Earned over the tenor
  const totalProfit = periodicProfit * numFrequency * numDuration;
  
  // Total Maturity Value
  const totalReturn = numFaceValue + totalProfit;

  return (
    <div className={`max-w-4xl mx-auto ${isRtl ? "text-right" : "text-left"}`}>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-4">
          {dict.sukuk.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dict.sukuk.subtitle}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.sukuk.face_value}
              </label>
              <NumericFormat
                value={faceValue}
                onValueChange={(v) => setFaceValue(v.floatValue ?? "")}
                thousandSeparator={true}
                allowNegative={false}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 dark:text-white"
                placeholder="100,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.sukuk.profit_rate}
              </label>
              <NumericFormat
                value={profitRate}
                onValueChange={(v) => setProfitRate(v.floatValue ?? "")}
                allowNegative={false}
                decimalScale={2}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 dark:text-white"
                placeholder="6.5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.sukuk.frequency}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 dark:text-white"
              >
                <option value="1">{isRtl ? "سنوياً (1 مرة)" : "Annually (1 time)"}</option>
                <option value="2">{isRtl ? "نصف سنوي (مرتين)" : "Semi-Annually (2 times)"}</option>
                <option value="4">{isRtl ? "ربع سنوي (4 مرات)" : "Quarterly (4 times)"}</option>
                <option value="12">{isRtl ? "شهرياً (12 مرة)" : "Monthly (12 times)"}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.sukuk.duration}
              </label>
              <NumericFormat
                value={duration}
                onValueChange={(v) => setDuration(v.floatValue ?? "")}
                allowNegative={false}
                decimalScale={1}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 dark:text-white"
                placeholder="5"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/30 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-6 border-b border-teal-200 dark:border-teal-800/50 pb-4">
              {dict.zakat.summary_title}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-teal-100 dark:border-teal-800/30">
                <span className="text-gray-600 dark:text-gray-400">{dict.sukuk.periodic_profit}:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  <NumericFormat value={periodicProfit} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-teal-100 dark:border-teal-800/30">
                <span className="text-gray-600 dark:text-gray-400">{dict.sukuk.total_profit}:</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  + <NumericFormat value={totalProfit} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800 dark:text-white">{dict.sukuk.total_return}:</span>
                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  <NumericFormat value={totalReturn} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
