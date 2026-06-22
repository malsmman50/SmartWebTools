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

      const arFormatted = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', optionsAr).format(date);
      const enFormatted = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', optionsEn).format(date); // M/D/YYYY
      
      setResult({
        primary: arFormatted,
        secondary: enFormatted,
        type: 'hijri'
      });
    } catch (e) {
      setResult({ error: "الرجاء إدخال تاريخ صحيح" });
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
        const optionsAr = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        const arFormatted = new Intl.DateTimeFormat('ar-SA', optionsAr).format(currentGDate);
        const iso = currentGDate.toISOString().split('T')[0];
        
        setResult({
          primary: arFormatted,
          secondary: iso,
          type: 'gregorian'
        });
      } else {
        setResult({ error: "التاريخ الهجري غير صالح أو خارج النطاق المدعوم" });
      }
    } catch (e) {
      setResult({ error: "حدث خطأ أثناء التحويل" });
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
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>محول التاريخ الذكي 📅</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          تحويل دقيق بين التقويم الميلادي والهجري (أم القرى) مباشرة في متصفحك.
        </p>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
          <button 
            className={`tab-btn ${activeTab === 'g2h' ? 'active' : ''}`}
            onClick={() => { setActiveTab('g2h'); setResult(null); }}
            style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'g2h' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'g2h' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ميلادي إلى هجري
          </button>
          <button 
            className={`tab-btn ${activeTab === 'h2g' ? 'active' : ''}`}
            onClick={() => { setActiveTab('h2g'); setResult(null); }}
            style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: activeTab === 'h2g' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'h2g' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            هجري إلى ميلادي
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          {activeTab === 'g2h' ? (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>اختر التاريخ الميلادي:</label>
              <input 
                type="date" 
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
              />
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>أدخل التاريخ الهجري:</label>
              <div style={{ display: 'flex', gap: '12px', direction: 'ltr' }}>
                <input 
                  type="date" 
                  value={hijriDate}
                  onChange={(e) => setHijriDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem', direction: 'rtl' }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>ملاحظة: بعض المتصفحات لا تدعم منتقي التاريخ الهجري، يمكنك كتابة التاريخ يدوياً (سنة-شهر-يوم).</p>
            </div>
          )}
        </div>

        <button 
          onClick={handleConvert}
          style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '24px' }}
        >
          تحويل الآن
        </button>

        {result && (
          <div style={{ padding: '20px', borderRadius: '8px', background: 'var(--surface-sunken)', border: '1px solid var(--border)', textAlign: 'center' }}>
            {result.error ? (
              <div style={{ color: '#ef4444' }}>{result.error}</div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>{result.primary}</h2>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }} dir="ltr">{result.secondary}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
