'use client';
import { useState, useEffect } from 'react';

export default function HijriConverter() {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [activeTab, setActiveTab] = useState('g2h'); // 'g2h' or 'h2g'
  
  const [result, setResult] = useState(null);

  // Get today's date formatted for input on mount
  useEffect(() => {
    const today = new Date();
    setGregorianDate(today.toISOString().split('T')[0]);
    
    // Estimate today's Hijri for default
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', calendar: 'islamic-umalqura' };
    const hDateStr = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', options).format(today);
    // hDateStr format is usually M/D/YYYY
    if (hDateStr) {
      const parts = hDateStr.split('/');
      if (parts.length === 3) {
        // format to YYYY-MM-DD
        setHijriDate(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
      }
    }
  }, []);

  const convertGregorianToHijri = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");

      // We still use 'ar-SA' locale for the primary visual display because Islamic month names 
      // (Muharram, Safar) are best represented natively, but we can also use 'en-US'
      const optionsAr = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        calendar: 'islamic-umalqura' 
      };
      
      const optionsEn = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        calendar: 'islamic-umalqura' 
      };

      // Force English locale for the primary string to match the site language
      const enLongFormatted = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
      const enFormatted = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', optionsEn).format(date); // M/D/YYYY
      
      setResult({
        primary: enLongFormatted,
        secondary: `Numeric: ${enFormatted}`,
        type: 'hijri'
      });
    } catch (e) {
      setResult({ error: "Please enter a valid date" });
    }
  };

  // Binary search approach to find Gregorian date from Hijri using Intl
  const convertHijriToGregorian = (hijriStr) => {
    try {
      if (!hijriStr) return;
      const [hYear, hMonth, hDay] = hijriStr.split('-').map(Number);
      
      // Estimate Gregorian year
      const gYearEstimate = Math.floor((hYear * 0.970229) + 622.5);
      
      let currentGDate = new Date(gYearEstimate, hMonth - 1, 15); // start somewhere in the estimated month
      
      // We will step day by day until we match the Hijri date
      // We limit to 3000 iterations (approx 8 years) to prevent infinite loops
      let found = false;
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', calendar: 'islamic-umalqura' };
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', options);
      
      // Move backwards roughly to be safe
      currentGDate.setDate(currentGDate.getDate() - 30);
      
      for (let i = 0; i < 2000; i++) {
        const testStr = formatter.format(currentGDate); // M/D/YYYY
        const [tm, td, ty] = testStr.split('/').map(Number);
        
        if (ty === hYear && tm === hMonth && td === hDay) {
          found = true;
          break;
        }
        
        // Optimize search direction
        if (ty < hYear || (ty === hYear && tm < hMonth) || (ty === hYear && tm === hMonth && td < hDay)) {
           currentGDate.setDate(currentGDate.getDate() + 1);
        } else {
           currentGDate.setDate(currentGDate.getDate() - 1);
        }
      }

      if (found) {
        const optionsEn = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        const enLongFormatted = new Intl.DateTimeFormat('en-US', optionsEn).format(currentGDate);
        const iso = currentGDate.toISOString().split('T')[0];
        
        setResult({
          primary: enLongFormatted,
          secondary: `ISO Format: ${iso}`,
          type: 'gregorian'
        });
      } else {
        setResult({ error: "Invalid Hijri date or out of supported range" });
      }
    } catch (e) {
      setResult({ error: "An error occurred during conversion" });
    }
  };

  const handleConvert = () => {
    if (activeTab === 'g2h') {
      convertGregorianToHijri(gregorianDate);
    } else {
      convertHijriToGregorian(hijriDate);
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Enter Hijri Date:</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="date" 
                  value={hijriDate}
                  onChange={(e) => setHijriDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Note: Some browsers lack a native Hijri picker. You can type the date manually (YYYY-MM-DD).</p>
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
