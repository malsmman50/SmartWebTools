"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function IslamicDepositCalculatorClient({ dict, lang }) {
  const [deposit, setDeposit] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [customerShare, setCustomerShare] = useState("");
  const [duration, setDuration] = useState("");

  const isRtl = lang === "ar";

  const numDeposit = Number(deposit) || 0;
  const numExpectedRate = Number(expectedRate) || 0;
  const numCustomerShare = Number(customerShare) || 0;
  const numDuration = Number(duration) || 0;

  // Math logic
  // Gross Profit = Deposit * Rate * Duration
  const grossProfit = numDeposit * (numExpectedRate / 100) * numDuration;
  
  // Customer Net Profit = Gross Profit * Customer Share Ratio
  const netProfit = grossProfit * (numCustomerShare / 100);
  
  // Bank's Share = Gross Profit - Customer Net Profit
  const bankProfit = grossProfit - netProfit;
  
  // Total Expected Balance for Customer
  const totalBalance = numDeposit + netProfit;

  return (
    <div className={`max-w-4xl mx-auto ${isRtl ? "text-right" : "text-left"}`}>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
          {dict.islamic_deposit.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {dict.islamic_deposit.subtitle}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.islamic_deposit.deposit}
              </label>
              <NumericFormat
                value={deposit}
                onValueChange={(v) => setDeposit(v.floatValue ?? "")}
                thousandSeparator={true}
                allowNegative={false}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 dark:text-white"
                placeholder="10,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.islamic_deposit.expected_rate}
              </label>
              <NumericFormat
                value={expectedRate}
                onValueChange={(v) => setExpectedRate(v.floatValue ?? "")}
                allowNegative={false}
                decimalScale={2}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 dark:text-white"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.islamic_deposit.customer_share}
              </label>
              <NumericFormat
                value={customerShare}
                onValueChange={(v) => setCustomerShare(v.floatValue ?? "")}
                allowNegative={false}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue === undefined || floatValue <= 100;
                }}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 dark:text-white"
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {dict.islamic_deposit.duration}
              </label>
              <NumericFormat
                value={duration}
                onValueChange={(v) => setDuration(v.floatValue ?? "")}
                allowNegative={false}
                decimalScale={1}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-800 dark:text-white"
                placeholder="2"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-6 border-b border-emerald-200 dark:border-emerald-800/50 pb-4">
              {dict.zakat.summary_title}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">{dict.islamic_deposit.deposit}:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  <NumericFormat value={numDeposit} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">{dict.islamic_deposit.net_profit}:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  + <NumericFormat value={netProfit} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-800/30">
                <span className="text-gray-600 dark:text-gray-400">{dict.islamic_deposit.bank_profit}:</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  <NumericFormat value={bankProfit} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800 dark:text-white">{dict.islamic_deposit.total_balance}:</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  <NumericFormat value={totalBalance} displayType="text" thousandSeparator={true} prefix="$" decimalScale={2} fixedDecimalScale />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
