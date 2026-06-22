'use client';
import { useState, useEffect } from 'react';

// --- Zero-Dependency Tabular Islamic (Kuwaiti) Algorithm ---
function gregorianToHijri(date) {
  let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
  let m = month + 1, y = year;
  if (m < 3) { y -= 1; m += 12; }
  
  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y === 1582 && (m > 10 || (m === 10 && day > 4))) b = -10;
  else if (y === 1582 && m === 10) b = 0;

  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
  
  let z = jd - 1948085;
  let cyc = Math.floor(z / 10631);
  z = z - 10631 * cyc;
  let j = Math.floor((z - 0.1335) / 354.36667);
  let iy = 30 * cyc + j;
  z = z - Math.floor(j * 354.36667 + 0.1335);
  let im = Math.floor((z + 28.5001) / 29.5);
  if (im === 13) im = 12;
  let id = z - Math.floor(29.5001 * im - 29);

  return { year: iy, month: im, day: Math.floor(id) };
}

function hijriToGregorian(iy, im, id) {
  let cyc = Math.floor((iy - 1) / 30);
  let j = iy - 1 - 30 * cyc;
  let y = Math.floor(j * 354.36667 + 0.1335);
  let jd = Math.floor(29.5001 * im - 29) + id + y + 10631 * cyc + 1948085;

  let zWhole = Math.floor(jd + 0.5);
  let f = (jd + 0.5) - zWhole;
  let a = zWhole;
  if (zWhole >= 2299161) {
    let alpha = Math.floor((zWhole - 1867216.25) / 36524.25);
    a = zWhole + 1 + alpha - Math.floor(alpha / 4);
  }
  let b = a + 1524;
  let c = Math.floor((b - 122.1) / 365.25);
  let d = Math.floor(365.25 * c);
  let e = Math.floor((b - d) / 30.6001);

  let day = Math.floor(b - d - Math.floor(30.6001 * e) + f);
  let month = e < 14 ? e - 1 : e - 13;
  let year = month > 2 ? c - 4716 : c - 4715;

  return new Date(year, month - 1, day);
}

const hijriMonthNames = [
  "Muharram", "Safar", "Rabi' I", "Rabi' II", 
  "Jumada I", "Jumada II", "Rajab", "Sha'ban", 
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const gregorianMonthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
// --------------------------------------------------------

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
    
    // Mathematically derive today's Hijri date
    const hToday = gregorianToHijri(today);
    setHYear(hToday.year.toString());
    setHMonth(hToday.month.toString());
    setHDay(hToday.day.toString());
  }, []);

  const handleConvert = () => {
    try {
      setResult(null);
      
      if (activeTab === 'g2h') {
        const date = new Date(gregorianDate);
        if (isNaN(date.getTime())) throw new Error("Invalid date selected");
        
        const h = gregorianToHijri(date);
        
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
        
        const gDate = hijriToGregorian(y, m, d);
        
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
          Lightning fast, offline-capable conversion between Gregorian and Hijri calendars using the Kuwaiti Algorithm.
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
