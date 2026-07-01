"use client";

import { useState, useEffect } from "react";

// Institutional Native Qibla Math (No dependencies)
const getQiblaDirection = (lat, lng) => {
  const PI = Math.PI;
  const kaabaLat = 21.422487 * (PI / 180);
  const kaabaLng = 39.826206 * (PI / 180);
  const userLat = lat * (PI / 180);
  const userLng = lng * (PI / 180);

  const y = Math.sin(kaabaLng - userLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(kaabaLng - userLng);

  let qibla = Math.atan2(y, x) * (180 / PI);
  return (qibla + 360) % 360;
};

export default function QiblaCompassClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.qibla;
  const isAr = lang === "ar";

  const [coords, setCoords] = useState(null); 
  const [qibla, setQibla] = useState(null); 
  const [heading, setHeading] = useState(null); 
  
  const [status, setStatus] = useState("idle"); // idle, requesting, active, no_sensor, error
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Compass Mathematics
  useEffect(() => {
    if (status !== "active") return;

    let hasSensor = false;

    const handleOrientation = (e) => {
      let currentHeading = null;
      
      if (e.webkitCompassHeading) {
        currentHeading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        currentHeading = 360 - e.alpha;
      }

      if (currentHeading !== null) {
        hasSensor = true;
        setHeading(currentHeading);
      }
    };

    const handleDeviceOrientationAbsolute = (e) => {
      if (e.alpha !== null) {
        hasSensor = true;
        setHeading(360 - e.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener("deviceorientationabsolute", handleDeviceOrientationAbsolute, true);
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    }

    const fallbackTimeout = setTimeout(() => {
      if (!hasSensor) {
        setStatus("no_sensor");
      }
    }, 3000);

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleDeviceOrientationAbsolute, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
      clearTimeout(fallbackTimeout);
    };
  }, [status]);

  const requestAccess = () => {
    setStatus("requesting");
    setErrorMsg("");

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            getLocation();
          } else {
            setStatus("error");
            setErrorMsg(t.error_denied);
          }
        })
        .catch(() => {
          setStatus("error");
          setErrorMsg(t.error_unsupported);
        });
    } else {
      getLocation();
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg(t.error_unsupported);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setQibla(getQiblaDirection(latitude, longitude));
        setStatus("active");
      },
      (err) => {
        setStatus("error");
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg(t.error_location_denied);
        } else {
          setErrorMsg(t.error_general);
        }
      }
    );
  };

  const isAligned = heading !== null && qibla !== null && (Math.abs((heading - qibla + 360) % 360) < 5 || Math.abs((heading - qibla - 360) % 360) < 5);
  
  // Vibrate when aligned
  useEffect(() => {
    if (isAligned && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [isAligned]);

  const displayCity = initialValues?.city ? initialValues.city.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{displayCity ? `${t.title} - ${displayCity}` : t.title}</h1>
        <p>{displayCity ? (isAr ? `تحديد القبلة للصلاة من ${displayCity}` : `Find Qibla Direction from ${displayCity}`) : t.subtitle}</p>
      </div>

      <div className="card" style={{ 
        textAlign: "center", 
        background: isAligned ? "rgba(16, 185, 129, 0.1)" : "var(--bg-card)", 
        padding: "40px 20px", 
        borderRadius: "16px", 
        border: isAligned ? "2px solid var(--success)" : "1px solid var(--border)",
        transition: "all 0.5s ease"
      }}>
        
        {status === "idle" || status === "error" || status === "requesting" ? (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "4.5rem", marginBottom: "24px" }}>🧭</div>
            <h2 style={{ marginBottom: "16px", fontSize: "1.8rem", fontWeight: "800" }}>{t.find_qibla}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "1.1rem", lineHeight: "1.6" }}>
              {t.location_permission_desc}
            </p>
            <button 
              onClick={requestAccess} 
              disabled={status === "requesting"}
              className="btn btn-primary"
              style={{ padding: "16px 32px", background: "linear-gradient(135deg, var(--success), #10b981)", color: "white", border: "none", borderRadius: "12px", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 8px 24px rgba(16,185,129,0.3)", transition: "transform 0.2s", margin: "0 auto" }}
            >
              {status === "requesting" ? t.connecting_sensors : t.allow_access_btn}
            </button>
            {errorMsg && <p style={{ color: "var(--danger)", marginTop: "24px", fontWeight: "bold" }}>{errorMsg}</p>}
          </div>
        ) : status === "no_sensor" ? (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "5rem", marginBottom: "16px" }}>💻</div>
            <h2 style={{ marginBottom: "16px" }}>{t.desktop_device_detected}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              {t.no_sensors_desc}
            </p>
            <div style={{ background: "var(--surface-sunken)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "2rem", color: "var(--success)", marginBottom: "8px" }}>{qibla !== null ? qibla.toFixed(2) + "°" : "--"}</h3>
              <p style={{ fontWeight: "bold" }}>{t.direction_from_north}</p>
              <p style={{ color: "var(--text-muted)", marginTop: "16px", fontSize: "0.9rem" }}>
                {t.physical_compass_instruction}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: "24px", color: isAligned ? "var(--success)" : "var(--text)", transition: "color 0.3s" }}>
              {isAligned ? t.facing_qibla : t.turn_device}
            </h3>

            <div className="qibla-compass-circle" style={{ 
              position: "relative", width: "320px", height: "320px", margin: "0 auto 40px", 
              borderRadius: "50%", border: isAligned ? "4px solid var(--success)" : "1px solid rgba(255,255,255,0.2)", 
              background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              boxShadow: isAligned ? "0 0 40px rgba(16, 185, 129, 0.4)" : "0 12px 32px rgba(0,0,0,0.1)",
              transition: "all 0.5s ease"
            }}>
              
              {/* Radar Tick Marks */}
              <div style={{ position: "absolute", width: "100%", height: "100%", transform: `rotate(${-heading}deg)` }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ position: "absolute", width: "2px", height: i % 3 === 0 ? "12px" : "6px", background: "var(--border)", top: "4px", left: "calc(50% - 1px)", transformOrigin: "50% 156px", transform: `rotate(${i * 30}deg)` }}></div>
                ))}
              </div>

              {/* The Kaaba (Only visible when aligned) */}
              {isAligned ? (
                <div className="pulse-aligned-kaaba" style={{ fontSize: "6rem", filter: "drop-shadow(0 10px 20px rgba(16,185,129,0.5))" }}>
                  🕋
                </div>
              ) : (
                /* Qibla Direction Indicator (Scanner Line) */
                <div style={{ 
                  position: "absolute", width: "6px", height: "160px", background: "transparent",
                  transform: `rotate(${-heading + qibla}deg)`,
                  transformOrigin: "bottom center", top: "0",
                  transition: "transform 0.1s ease-out"
                }}>
                  <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", width: "24px", height: "24px", background: "var(--success)", borderRadius: "50%", boxShadow: "0 0 16px var(--success)" }}></div>
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(to top, transparent, var(--success))", borderRadius: "4px" }}></div>
                </div>
              )}

              {/* Center point */}
              {!isAligned && <div style={{ width: "16px", height: "16px", background: "var(--text)", borderRadius: "50%", zIndex: 10 }}></div>}
            </div>

            {/* Live Diagnostics */}
            <div style={{ display: "flex", justifyContent: "space-around", background: "var(--surface-sunken)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block" }}>{t.qibla_angle_label}</span>
                <strong style={{ fontSize: "1.2rem" }}>{qibla !== null ? qibla.toFixed(1) + "°" : "--"}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block" }}>{t.heading_label}</span>
                <strong style={{ fontSize: "1.2rem", color: isAligned ? "var(--success)" : "inherit" }}>{heading ? heading.toFixed(1) + "°" : "--"}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>محدد اتجاه القبلة الذكي (بوصلة مكة)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              أداة تحديد القبلة تعتمد على حساسات التوجيه (Gyroscope/Magnetometer) المدمجة في هاتفك الذكي بالإضافة إلى موقعك الجغرافي (GPS) لحساب الزاوية الدقيقة للكعبة المشرفة في مكة المكرمة. تم تصميم هذه الأداة لتعمل باحترافية عالية مع تقديم تجربة مرئية مميزة حيث تنبض الشاشة ويهتز الهاتف عند محاذاة الجهاز مع الاتجاه الصحيح للقبلة.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>السفر والفنادق:</strong> عندما تكون مسافراً وتقيم في غرفة فندق جديدة ولا تعرف اتجاه الصلاة، ببساطة افتح الأداة من متصفحك وسيعمل الـ GPS على تحديد موقعك وتوجيهك فوراً للقبلة.</li>
              <li style={{ marginBottom: "8px" }}><strong>الرحلات البرية والتخييم:</strong> في البراري المفتوحة والصحراء، قد يصعب تحديد الاتجاهات. بوصلة القبلة الذكية لا تحتاج لاتصال قوي بالإنترنت بمجرد تحميل الصفحة، مما يجعلها مثالية للمناطق النائية.</li>
              <li style={{ marginBottom: "8px" }}><strong>تحديد اتجاه المحاريب للمساجد الجديدة:</strong> رغم أن المهندسين يستخدمون أجهزة متخصصة، يمكن الاستئناس بهذه الأداة (بفضل حساباتها الفلكية الدقيقة) كمرجع سريع للتحقق المبدئي من اتجاه الجدار القبلي.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>الخصوصية وحساب المسار</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              لحساب القبلة، نستخدم خوارزمية (Great-circle distance) الرياضية التي تحسب أقصر مسار على سطح الكرة الأرضية بين إحداثياتك الحالية وإحداثيات مكة المكرمة (21.4225° شمالاً، 39.8262° شرقاً). تتم هذه العملية الحسابية <strong>محلياً على جهازك</strong> دون إرسال إحداثياتك الدقيقة إلى أي خوادم خارجية، مما يضمن أمان وخصوصية تامة لتحركاتك.
            </p>
          </>
        ) : (
          <>
            <h2>Smart Qibla Finder & Mecca Compass</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The Qibla Finder tool utilizes your smartphone's built-in orientation sensors (gyroscope and magnetometer) along with your GPS location to calculate the precise angle to the Kaaba in Mecca. Designed with a sleek visual interface, the screen pulses and your device gently vibrates the moment you align perfectly with the correct prayer direction.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Travel & Hotel Stays:</strong> When traveling abroad and checking into a new hotel room, you might not know the prayer direction. Simply open this tool, allow location access, and it will instantly point you to Mecca.</li>
              <li style={{ marginBottom: "8px" }}><strong>Outdoor Camping:</strong> Out in the wilderness or desert, landmarks are scarce. Once the page is loaded, the compass logic can function smoothly, making it perfect for remote outdoor prayers.</li>
              <li style={{ marginBottom: "8px" }}><strong>New Prayer Rooms (Musallahs):</strong> If you are setting up a prayer room in your office or university, you can use this accurate mathematical compass as a reliable reference to lay out the prayer rugs correctly.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Privacy & Path Calculation</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              To calculate the Qibla, we use the mathematical "Great-Circle Distance" algorithm. It computes the shortest path across the Earth's sphere from your current coordinates to Mecca (21.4225° N, 39.8262° E). This calculation is performed <strong>100% locally on your device</strong>. Your precise location data is never logged, stored, or transmitted to any external servers.
            </p>
          </>
        )}
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": lang === "ar" ? [
          {
            "@type": "Question",
            "name": "لماذا تطلب الأداة صلاحيات الموقع (GPS) وحساس الحركة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "تحديد القبلة يتطلب معرفة موقعك الجغرافي لحساب الزاوية الصحيحة بالنسبة لمكة. أما حساس الحركة فيستخدم لربط هذه الزاوية مع اتجاه هاتفك الفعلي."
            }
          },
          {
            "@type": "Question",
            "name": "الأداة لا تعمل على جهاز الكمبيوتر المكتبي الخاص بي، لماذا؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "أجهزة الكمبيوتر المكتبية والمحمولة لا تحتوي غالباً على بوصلة مغناطيسية أو حساسات حركة. في هذه الحالة، ستعرض الأداة درجة القبلة كرقم (مثلاً 135 درجة من الشمال) لتستخدمها مع بوصلة يدوية."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Why does the tool ask for Location and Motion sensor permissions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Location (GPS) is required to calculate the mathematical angle to Mecca based on where you are. The motion sensor is needed to map that angle to your phone's physical orientation."
            }
          },
          {
            "@type": "Question",
            "name": "The compass isn't moving on my Desktop/Laptop. Why?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most desktop computers and laptops lack internal magnetic compasses or gyroscopes. If accessed from a PC, the tool falls back to showing you the exact numerical degree (e.g., 135° from North) so you can use a physical compass."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />

      <style jsx global>{`
        .pulse-aligned-kaaba {
          animation: pulse-kf 2s infinite;
        }
        @keyframes pulse-kf {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
