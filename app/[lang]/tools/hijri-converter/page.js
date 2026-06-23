'use client';
import { useState, useEffect } from 'react';

const hijriMonthNames = [
  "Muharram", "Safar", "Rabi' I", "Rabi' II", 
  "Jumada I", "Jumada II", "Rajab", "Sha'ban", 
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const gregorianMonthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// --- Hybrid Umm al-Qura Algorithm ---
const getExactHijriDate = (dateObj) => {
  // Uses the browser's native Umm al-Qura calendar database (CLDR)
  const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
    day: 'numeric', month: 'numeric', year: 'numeric'
  });
  const parts = formatter.formatToParts(dateObj);
  const hd = parseInt(parts.find(p => p.type === 'day').value, 10);
  const hm = parseInt(parts.find(p => p.type === 'month').value, 10);
  const hy = parseInt(parts.find(p => p.type === 'year').value.split(' ')[0], 10);
  return { year: hy, month: hm, day: hd };
};

const exactHijriToGregorian = (targetY, targetM, targetD) => {
  // 1. Rough estimate baseline
  // Anchor: 1 Muharram 1446 AH = July 7, 2024 CE.
  const anchorHijriY = 1446;
  const anchorGregorian = new Date(2024, 6, 7, 12, 0, 0); // Noon to avoid timezone shifts
  
  const yearDiff = targetY - anchorHijriY;
  const monthDiff = targetM - 1;
  const dayDiff = targetD - 1;
  
  // 1 Hijri year ~ 354.36 days, 1 Hijri month ~ 29.53 days
  const totalDaysOffset = (yearDiff * 354.36) + (monthDiff * 29.53) + dayDiff;
  
  // Baseline Gregorian Date
  let estimatedDate = new Date(anchorGregorian.getTime() + (totalDaysOffset * 86400000));
  
  // 2. Micro-loop Correction (Hybrid approach)
  // Search up to 20 days in both directions to find the EXACT Umm al-Qura day
  let closestMatch = estimatedDate;
  let minDiff = 999999;

  for (let i = -20; i <= 20; i++) {
    const testDate = new Date(estimatedDate.getTime() + (i * 86400000));
    const testHijri = getExactHijriDate(testDate);
    
    if (testHijri.year === targetY && testHijri.month === targetM && testHijri.day === targetD) {
      return testDate; // 100% Exact Umm Al-Qura Match!
    }
    
    // Track closest match in case user entered a non-existent day (e.g. Day 30 in a 29-day month)
    const diff = Math.abs(testHijri.year - targetY) * 354 + 
                 Math.abs(testHijri.month - targetM) * 30 + 
                 Math.abs(testHijri.day - targetD);
                 
    if (diff < minDiff) {
      minDiff = diff;
      closestMatch = testDate;
    }
  }
  
  return closestMatch; // Fallback
};

export default function HijriConverter() {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hDay, setHDay] = useState('1');
  const [hMonth, setHMonth] = useState('1');
  const [hYear, setHYear] = useState('1446');
  const [activeTab, setActiveTab] = useState('g2h'); // 'g2h' or 'h2g'
  
  const [result, setResult] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Setup initial dates to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    setGregorianDate(today.toISOString().split('T')[0]);
    
    // Exactly derive today's Hijri date using Intl
    const hToday = getExactHijriDate(today);
    setHYear(hToday.year.toString());
    setHMonth(hToday.month.toString());
    setHDay(hToday.day.toString());
  }, []);

  const handleConvert = () => {
    try {
      setResult(null);
      
      if (activeTab === 'g2h') {
        // Must use noon to avoid weird midnight UTC timezone shifts
        const date = new Date(gregorianDate + "T12:00:00");
        if (isNaN(date.getTime())) throw new Error("Invalid date selected");
        
        const h = getExactHijriDate(date);
        
        setResult({
          primary: `${h.day} ${hijriMonthNames[h.month - 1]} ${h.year} AH`,
          secondary: `Numeric: ${h.year}-${String(h.month).padStart(2, '0')}-${String(h.day).padStart(2, '0')}`,
          type: 'hijri'
        });
        
      } else {
        const y = parseInt(hYear, 10);
        const m = parseInt(hMonth, 10);
        const d = parseInt(hDay, 10);
        
        if (isNaN(y) || y < 1) throw new Error("Invalid Hijri year");
        
        const gDate = exactHijriToGregorian(y, m, d);
        
        setResult({
          primary: `${gDate.getDate()} ${gregorianMonthNames[gDate.getMonth()]} ${gDate.getFullYear()}`,
          secondary: `ISO Format: ${gDate.getFullYear()}-${String(gDate.getMonth() + 1).padStart(2, '0')}-${String(gDate.getDate()).padStart(2, '0')}`,
          type: 'gregorian'
        });
      }
    } catch (e) {
      setResult({ error: e.message || "An error occurred during conversion." });
    }
  };

  // Prevent rendering interactive dynamic dates until hydration is complete
  if (!isMounted) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Initializing Application Engine...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Smart Date Converter 📅</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Lightning fast, offline-capable conversion between Gregorian and Hijri (Umm al-Qura) calendars.
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
                  {hijriMonthNames.map((name, i) => <option key={i + 1} value={i + 1}>{i + 1} - {name}</option>)}
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
          style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '24px' }}
        >
          Convert Now
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
