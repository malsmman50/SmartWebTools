"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/components/LanguageProvider";

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

export default function QiblaCompassClient() {
  const { lang, dict } = useLanguage();
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
      
      if (typeof e.webkitCompassHeading === "number") {
        currentHeading = e.webkitCompassHeading;
        hasSensor = true;
      } else if (e.type === "deviceorientationabsolute" || e.absolute === true) {
        if (typeof e.alpha === "number") {
          currentHeading = 360 - e.alpha;
          hasSensor = true;
        }
      }
      
      if (currentHeading !== null) {
        setHeading(currentHeading);
      }
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation);
    window.addEventListener("deviceorientation", handleOrientation);

    // Fallback for Desktop/Laptops without motion sensors
    const sensorTimeout = setTimeout(() => {
      if (!hasSensor && heading === null) {
        setStatus("no_sensor");
      }
    }, 3000);

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
      window.removeEventListener("deviceorientation", handleOrientation);
      clearTimeout(sensorTimeout);
    };
  }, [status, heading]);

  const startCompass = async () => {
    setStatus("requesting");
    setErrorMsg("");
    
    if (!navigator.geolocation) {
      setErrorMsg(t.geolocation_unsupported);
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        
        const qiblaAngle = getQiblaDirection(latitude, longitude);
        setQibla(qiblaAngle);
        
        // iOS 13+ requires explicit permission
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
          DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
              if (permissionState === "granted") {
                setStatus("active");
              } else {
                setErrorMsg(t.permission_denied);
                setStatus("error");
              }
            })
            .catch(console.error);
        } else {
          setStatus("active");
        }
      },
      (error) => {
        setErrorMsg(t.location_denied);
        setStatus("error");
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

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
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
              onClick={startCompass} 
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
