'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function HijriConverter() {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hDay, setHDay] = useState('1');
  const [hMonth, setHMonth] = useState('1');
  const [hYear, setHYear] = useState('1446');
  const [activeTab, setActiveTab] = useState('g2h'); // 'g2h' or 'h2g'
  
  const [result, setResult] = useState(null);
  const [momentLoaded, setMomentLoaded] = useState(false);

  const hijriMonths = [
    "Muharram", "Safar", "Rabi' I", "Rabi' II", 
    "Jumada I", "Jumada II", "Rajab", "Sha'ban", 
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  // Get today's date formatted for input on mount
  useEffect(() => {
    const today = new Date();
    setGregorianDate(today.toISOString().split('T')[0]);
  }, []);

  // Sync default Hijri date when moment is loaded
  useEffect(() => {
    if (momentLoaded && window.moment) {
      const today = window.moment();
      setHYear(today.iYear().toString());
      setHMonth((today.iMonth() + 1).toString());
      setHDay(today.iDate().toString());
    }
  }, [momentLoaded]);

  const checkMomentLoaded = () => {
    if (window.moment && window.moment().iYear) {
      setMomentLoaded(true);
    } else {
      setTimeout(checkMomentLoaded, 100);
    }
  };

  const convertGregorianToHijri = (dateString) => {
    try {
      setResult(null);
      if (!window.moment || !window.moment().iYear) throw new Error("Library loading...");
      
      const m = window.moment(dateString, 'YYYY-MM-DD');
      if (!m.isValid()) throw new Error("Invalid date");
      
      const hDate = `${m.iDate()} ${m.format('iMMMM')} ${m.iYear()} AH`;
      const numeric = `${m.iYear()}-${String(m.iMonth() + 1).padStart(2, '0')}-${String(m.iDate()).padStart(2, '0')}`;
      
      setResult({
        primary: hDate,
        secondary: `Numeric: ${numeric}`,
        type: 'hijri'
      });
    } catch (e) {
      setResult({ error: e.message === "Library loading..." ? e.message : "Failed to convert date. Please ensure your input is valid." });
    }
  };

  const convertHijriToGregorian = (hijriStr) => {
    try {
      setResult(null);
      if (!window.moment || !window.moment().iYear) throw new Error("Library loading...");
      
      // hijriStr format: YYYY-M-D
      // moment-hijri parses iYYYY-iM-iD
      const m = window.moment(hijriStr, 'iYYYY-iM-iD');
      if (!m.isValid()) throw new Error("Invalid date");
      
      const gDate = m.format('D MMMM YYYY');
      const iso = m.format('YYYY-MM-DD');
      
      setResult({
        primary: gDate,
        secondary: `ISO Format: ${iso}`,
        type: 'gregorian'
      });
    } catch (e) {
      setResult({ error: e.message === "Library loading..." ? e.message : "Invalid Hijri date or conversion error." });
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
      {/* Load Moment.js and Moment-Hijri */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/moment-hijri@2.1.2/moment-hijri.min.js" onLoad={checkMomentLoaded} />

      <div className="card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Smart Date Converter 📅</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Accurate conversion between Gregorian and Hijri (Umm al-Qura) calendars locally in your browser.
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
                  {hijriMonths.map((name, i) => <option key={i + 1} value={i + 1}>{i + 1} - {name}</option>)}
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
          disabled={!momentLoaded}
          style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: !momentLoaded ? 'not-allowed' : 'pointer', marginBottom: '24px', opacity: !momentLoaded ? 0.7 : 1 }}
        >
          {!momentLoaded ? 'Loading Engine...' : 'Convert Now'}
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
