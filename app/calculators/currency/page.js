'use client';
import { useState, useEffect, useMemo } from 'react';

// Common currencies to show at the top
const COMMON_CURRENCIES = ['USD', 'EUR', 'GBP', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP', 'JOD'];

export default function CurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('SAR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // Using the free jsDelivr CDN currency API
        const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setRates(data.usd);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching currencies", err);
        setError("Failed to fetch live exchange rates. Please check your internet connection.");
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const currencies = useMemo(() => {
    if (!rates) return [];
    const all = Object.keys(rates).map(c => c.toUpperCase());
    
    // Sort so common currencies are at the top
    const top = COMMON_CURRENCIES.filter(c => all.includes(c));
    const rest = all.filter(c => !COMMON_CURRENCIES.includes(c)).sort();
    return [...top, '---', ...rest];
  }, [rates]);

  // Math to convert from A to B using USD as base
  const calculateResult = () => {
    if (!rates || isNaN(parseFloat(amount))) return '0.00';
    
    const fromRate = rates[fromCurrency.toLowerCase()];
    const toRate = rates[toCurrency.toLowerCase()];
    
    if (!fromRate || !toRate) return '0.00';
    
    // Convert to USD first
    const amountInUsd = parseFloat(amount) / fromRate;
    // Convert from USD to target
    const result = amountInUsd * toRate;
    
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(result);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Live Currency Converter 💱</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Real-time exchange rates updated daily for over 150 global currencies.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Loading live exchange rates...
          </div>
        ) : error ? (
          <div style={{ padding: '20px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            {error}
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Amount:</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.2rem', fontFamily: 'monospace' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>From:</label>
                <select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                >
                  {currencies.map(c => (
                    <option key={`from-${c}`} value={c} disabled={c === '---'}>{c}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleSwap}
                style={{ marginTop: '28px', padding: '12px', borderRadius: '50%', background: 'var(--surface-sunken)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Swap Currencies"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
              </button>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>To:</label>
                <select 
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                >
                  {currencies.map(c => (
                    <option key={`to-${c}`} value={c} disabled={c === '---'}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ padding: '24px', borderRadius: '8px', background: 'var(--surface-sunken)', border: '1px solid var(--border)', textAlign: 'center', marginTop: '32px' }}>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Result</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'monospace' }} dir="ltr">
                {calculateResult()} <span style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{toCurrency}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                1 {fromCurrency} = {rates ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(rates[toCurrency.toLowerCase()] / rates[fromCurrency.toLowerCase()]) : '...'} {toCurrency}
              </div>
            </div>
            
            <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Exchange rates are fetched daily via a global CDN. This platform is not responsible for any trading decisions made based on these rates.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
