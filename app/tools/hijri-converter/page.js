'use client';
import { useState, useEffect } from 'react';

export default function HijriConverter() {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hDay, setHDay] = useState('1');
  const [hMonth, setHMonth] = useState('1');
  const [hYear, setHYear] = useState('1446');
  const [activeTab, setActiveTab] = useState('g2h'); // 'g2h' or 'h2g'
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get today's date formatted for input on mount
  useEffect(() => {
    const today = new Date();
    setGregorianDate(today.toISOString().split('T')[0]);
    
    // Default Hijri to a roughly current date
    setHDay(today.getDate().toString());
    setHMonth(((today.getMonth() + 6) % 12 + 1).toString()); // rough approximation
    setHYear('1446');
  }, []);

  const convertGregorianToHijri = async (dateString) => {
    try {
      setLoading(true);
      setResult(null);
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      
      const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${dd}-${mm}-${yyyy}`);
      const data = await res.json();
      
      if (data.code === 200) {
        const h = data.data.hijri;
        setResult({
          primary: `${h.day} ${h.month.en} ${h.year} AH`,
          secondary: `Numeric: ${h.date}`,
          type: 'hijri'
        });
      } else {
        throw new Error(data.data || "API Error");
      }
    } catch (e) {
      setResult({ error: "Failed to convert date. Please ensure your input is valid." });
    } finally {
      setLoading(false);
    }
  };

  const convertHijriToGregorian = async (hijriStr) => {
    try {
      setLoading(true);
      setResult(null);
      
      const [hy, hm, hd] = hijriStr.split('-');
      const dd = String(hd).padStart(2, '0');
      const mm = String(hm).padStart(2, '0');
      
      const res = await fetch(`https://api.aladhan.com/v1/hToG?date=${dd}-${mm}-${hy}`);
      const data = await res.json();
      
      if (data.code === 200) {
        const g = data.data.gregorian;
        setResult({
          primary: `${g.day} ${g.month.en} ${g.year}`,
          secondary: `ISO Format: ${g.date.split('-').reverse().join('-')}`, // YYYY-MM-DD
          type: 'gregorian'
        });
      } else {
        throw new Error(data.data || "API Error");
      }
    } catch (e) {
      setResult({ error: "Invalid Hijri date. Please note that some Islamic months have only 29 days." });
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (activeTab === 'g2h') {
      convertGregorianToHijri(gregorianDate);
    } else {
      convertHijriToGregorian(`${hYear}-${hMonth}-${hDay}`);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Smart Date Converter 📅</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Accurate conversion between Gregorian and Hijri (Umm al-Qura) calendars directly in your browser.
        </p>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
          <button 
            className={`tab-btn ${activeTab === 'g2h' ? 'active' : ''}`}
            onClick={() => { setActiveTab('g2h'); setResult(null); }}
            style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'g2h' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'g2h' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Gregorian to Hijri
          </button>
          <button 
            className={`tab-btn ${activeTab === 'h2g' ? 'active' : ''}`}
            onClick={() => { setActiveTab('h2g'); setResult(null); }}
            style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'h2g' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'h2g' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Hijri to Gregorian
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          {activeTab === 'g2h' ? (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Gregorian Date:</label>
              <input 
                type="date" 
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
              />
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Hijri Date:</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  value={hDay}
                  onChange={(e) => setHDay(e.target.value)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                >
                  {Array.from({length: 30}, (_, i) => i + 1).map(d => <option key={d} value={d}>Day {d}</option>)}
                </select>
                <select 
                  value={hMonth}
                  onChange={(e) => setHMonth(e.target.value)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m}>Month {m}</option>)}
                </select>
                <input 
                  type="number" 
                  value={hYear}
                  onChange={(e) => setHYear(e.target.value)}
                  placeholder="Year"
                  min="1350"
                  max="1500"
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                />
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleConvert}
          disabled={loading}
          style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '24px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Converting...' : 'Convert Now'}
        </button>

        {result && (
          <div style={{ padding: '20px', borderRadius: '8px', background: 'var(--surface-sunken)', border: '1px solid var(--border)', textAlign: 'center' }}>
            {result.error ? (
              <div style={{ color: '#ef4444' }}>{result.error}</div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>{result.primary}</h2>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{result.secondary}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
