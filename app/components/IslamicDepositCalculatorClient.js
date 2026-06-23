"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function IslamicDepositCalculatorClient({ dict, lang }) {
  const t = dict.islamic_deposit;

  const [deposit, setDeposit] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [customerShare, setCustomerShare] = useState("");
  const [duration, setDuration] = useState("");

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

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US", { maximumFractionDigits: 2 })} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-amount" className="label">{t.deposit}</label>
            <NumericFormat 
              id="dep-amount" 
              className="input" 
              value={deposit} 
              onValueChange={v => setDeposit(v.floatValue ?? '')} 
              thousandSeparator={true} 
              allowNegative={false} 
              prefix="$" 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-rate" className="label">{t.expected_rate}</label>
            <NumericFormat 
              id="dep-rate" 
              className="input" 
              value={expectedRate} 
              onValueChange={v => setExpectedRate(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={2} 
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="dep-share" className="label">{t.customer_share}</label>
            <NumericFormat 
              id="dep-share" 
              className="input" 
              value={customerShare} 
              onValueChange={v => setCustomerShare(v.floatValue ?? '')} 
              allowNegative={false} 
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue === undefined || floatValue <= 100;
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="dep-duration" className="label">{t.duration}</label>
            <NumericFormat 
              id="dep-duration" 
              className="input" 
              value={duration} 
              onValueChange={v => setDuration(v.floatValue ?? '')} 
              allowNegative={false} 
              decimalScale={1} 
            />
          </div>
        </div>

        <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="result-box">
            <div className="result-label">{t.deposit}</div>
            <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>
              {fmt(numDeposit)}
            </div>
          </div>

          <div className="grid-2">
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.net_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: "var(--success)" }}>
                + {fmt(netProfit)}
              </div>
            </div>
            
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.bank_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: "var(--warning)" }}>
                {fmt(bankProfit)}
              </div>
            </div>
          </div>

          <div className="result-box" style={{ background: "var(--success)", color: "#fff", borderColor: "var(--success)" }}>
            <div className="result-label" style={{ color: "rgba(255,255,255,0.8)" }}>{t.total_balance}</div>
            <div className="result-value">
              {fmt(totalBalance)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
