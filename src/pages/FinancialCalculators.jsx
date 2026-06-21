import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

export default function FinancialCalculators() {
  const [activeTab, setActiveTab] = useState('roi');

  // ROI State
  const [investment, setInvestment] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  
  // Compound Interest State
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  
  const calculateROI = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returnAmount);
    if (!inv || !ret) return 0;
    return (((ret - inv) / inv) * 100).toFixed(2);
  };

  const calculateCompound = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    if (!p || !r || !t) return 0;
    return (p * Math.pow((1 + r), t)).toFixed(2);
  };

  const roiResult = calculateROI();
  const compoundResult = calculateCompound();

  return (
    <div className="glass-panel" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Calculator size={36} color="var(--accent)" />
        <h2>Financial Calculators</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('roi')}
          className="btn-primary" 
          style={{ background: activeTab === 'roi' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--panel-bg)', border: '1px solid var(--border-color)', color: activeTab === 'roi' ? '#fff' : 'var(--text-main)' }}>
          <TrendingUp size={18} /> ROI Calculator
        </button>
        <button 
          onClick={() => setActiveTab('compound')}
          className="btn-primary" 
          style={{ background: activeTab === 'compound' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'var(--panel-bg)', border: '1px solid var(--border-color)', color: activeTab === 'compound' ? '#fff' : 'var(--text-main)' }}>
          <DollarSign size={18} /> Compound Interest
        </button>
      </div>

      {activeTab === 'roi' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '500px' }}>
          <h3>Return on Investment (ROI)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Calculate the profitability of an investment.</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Amount Invested ($)</label>
            <input 
              type="number" 
              className="input-field" 
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="e.g. 1000"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Amount Returned ($)</label>
            <input 
              type="number" 
              className="input-field" 
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              placeholder="e.g. 1500"
            />
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>ROI Percentage</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: roiResult >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {roiResult}%
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compound' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out', maxWidth: '500px' }}>
          <h3>Compound Interest Calculator</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>See how your money grows over time.</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Initial Principal ($)</label>
            <input 
              type="number" 
              className="input-field" 
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 5000"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Annual Interest Rate (%)</label>
            <input 
              type="number" 
              className="input-field" 
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Years to Grow</label>
            <input 
              type="number" 
              className="input-field" 
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Future Value</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
              ${compoundResult}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
