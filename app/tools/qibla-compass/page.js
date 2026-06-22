'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function QiblaCompass() {
  const [adhanLoaded, setAdhanLoaded] = useState(false);
  const [coords, setCoords] = useState(null); // { lat, lng }
  const [qibla, setQibla] = useState(null); // angle from True North
  const [heading, setHeading] = useState(null); // current compass heading
  const [prayerTimes, setPrayerTimes] = useState(null);
  
  const [status, setStatus] = useState('idle'); // idle, requesting, active, error
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Compass Mathematics
  useEffect(() => {
    if (status !== 'active') return;

    const handleOrientation = (e) => {
      let currentHeading = null;
      
      if (typeof e.webkitCompassHeading === 'number') {
        // iOS Safari
        currentHeading = e.webkitCompassHeading;
      } else if (e.type === 'deviceorientationabsolute' || e.absolute === true) {
        // Android (absolute orientation)
        if (typeof e.alpha === 'number') {
          currentHeading = 360 - e.alpha;
        }
      }
      
      if (currentHeading !== null) {
        setHeading(currentHeading);
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation);
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [status]);

  const calculateIslamicData = (lat, lng) => {
    if (!window.adhan) return;
    const coordinates = new window.adhan.Coordinates(lat, lng);
    
    // Calculate Qibla
    const qiblaDirection = window.adhan.Qibla(coordinates);
    setQibla(qiblaDirection);
    
    // Calculate Prayer Times
    const date = new Date();
    const params = window.adhan.CalculationMethod.MuslimWorldLeague();
    const times = new window.adhan.PrayerTimes(coordinates, date, params);
    
    const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
    setPrayerTimes({
      Fajr: formatter.format(times.fajr),
      Dhuhr: formatter.format(times.dhuhr),
      Asr: formatter.format(times.asr),
      Maghrib: formatter.format(times.maghrib),
      Isha: formatter.format(times.isha),
    });
  };

  const startCompass = async () => {
    setStatus('requesting');
    setErrorMsg('');
    
    // 1. Request Geolocation
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        calculateIslamicData(latitude, longitude);
        
        // 2. Request Compass Permissions (Required for iOS 13+)
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
              if (permissionState === 'granted') {
                setStatus('active');
              } else {
                setErrorMsg("Compass permission denied. Please allow it in settings.");
                setStatus('error');
              }
            })
            .catch(console.error);
        } else {
          // Non-iOS devices usually don't require explicit permission call
          setStatus('active');
        }
      },
      (error) => {
        setErrorMsg("Location access denied. We need your location to find the Qibla.");
        setStatus('error');
      }
    );
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <Script 
        src="/api/adhan" 
        onLoad={() => setAdhanLoaded(true)}
      />

      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1>Live Qibla Compass 🕋</h1>
        <p>100% Private, Offline-Capable Qibla Direction & Prayer Times.</p>
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '40px 20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
        
        {status !== 'active' ? (
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '24px' }}>🧭</div>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem', fontWeight: '800' }}>Find the Qibla</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              We need access to your device's location and compass to calculate the exact direction of Mecca. This data never leaves your device and runs entirely locally.
            </p>
            <button 
              onClick={startCompass} 
              disabled={!adhanLoaded || status === 'requesting'}
              style={{ padding: '16px 32px', background: 'linear-gradient(135deg, var(--primary), #10b981)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(16,185,129,0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {status === 'requesting' ? 'Connecting to Sensors...' : 'Allow Access & Start'}
            </button>
            {errorMsg && <p style={{ color: 'var(--danger)', marginTop: '24px', fontWeight: 'bold' }}>{errorMsg}</p>}
          </div>
        ) : (
          <div>
            {/* The Compass UI - Premium Glassmorphism */}
            <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.1), inset 0 2px 8px rgba(255,255,255,0.1)' }}>
              
              {/* North Indicator - NO CSS TRANSITION to fix 360 wrap-around spinning bug */}
              <div style={{ 
                position: 'absolute', width: '100%', height: '100%', 
                transform: `rotate(${-heading}deg)`
              }}>
                <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', fontWeight: '800', color: '#ef4444', fontSize: '1.2rem' }}>N</div>
                <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold', color: 'var(--text-muted)' }}>S</div>
                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold', color: 'var(--text-muted)' }}>E</div>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold', color: 'var(--text-muted)' }}>W</div>
                
                {/* Tick marks for compass */}
                {Array.from({ length: 12 }).map((_, i) => (
                   <div key={i} style={{ position: 'absolute', width: '2px', height: i % 3 === 0 ? '12px' : '6px', background: 'var(--border)', top: '4px', left: 'calc(50% - 1px)', transformOrigin: '50% 156px', transform: `rotate(${i * 30}deg)` }}></div>
                ))}
              </div>

              {/* Qibla Arrow - NO CSS TRANSITION */}
              {qibla !== null && heading !== null && (
                <div style={{ 
                  position: 'absolute', width: '6px', height: '160px', background: 'transparent',
                  transform: `rotate(${-heading + qibla}deg)`,
                  transformOrigin: 'bottom center', top: '0'
                }}>
                  <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '2.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>🕋</div>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, transparent, #10b981)', borderRadius: '4px' }}></div>
                </div>
              )}

              {/* Phone Center Point */}
              <div style={{ width: '16px', height: '16px', background: 'var(--primary)', borderRadius: '50%', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}></div>
            </div>

            {/* Diagnostics */}
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
              Qibla Angle: {qibla?.toFixed(1)}° | Compass Heading: {heading ? heading.toFixed(1) + '°' : 'Waiting for sensor...'}
            </div>

            {/* Prayer Times Grid */}
            {prayerTimes && (
              <div style={{ textAlign: 'left', paddingTop: '32px' }}>
                <h3 style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.4rem' }}>Daily Prayer Times</h3>
                <div className="grid-2">
                  <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Fajr</strong> <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prayerTimes.Fajr}</span>
                  </div>
                  <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Dhuhr</strong> <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prayerTimes.Dhuhr}</span>
                  </div>
                  <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Asr</strong> <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prayerTimes.Asr}</span>
                  </div>
                  <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Maghrib</strong> <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prayerTimes.Maghrib}</span>
                  </div>
                  <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)', gridColumn: '1 / -1' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Isha</strong> <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{prayerTimes.Isha}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
