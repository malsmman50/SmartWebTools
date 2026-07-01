"use client";

import { useState, useEffect } from "react";

export default function CookieBanner({ lang }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
    
    // Optional: If using Google Analytics/Tag Manager, you'd trigger consent update here
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted"
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
    
    // Disable ad personalization
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
  };

  if (!showBanner) return null;

  const isAr = lang === "ar";

  const content = isAr ? {
    title: "🍪 نحن نستخدم ملفات تعريف الارتباط",
    text: "يستخدم هذا الموقع ملفات تعريف الارتباط (Cookies) من خلال خدمة Google AdSense لتقديم إعلانات مخصصة وتحليل الزيارات. لا نقوم بجمع أو حفظ أي من بياناتك المالية المدخلة في الحاسبات. باستمرارك في تصفح الموقع، فإنك توافق على سياسة الخصوصية الخاصة بنا.",
    accept: "موافق",
    decline: "رفض الإعلانات المخصصة",
    privacy: "سياسة الخصوصية"
  } : {
    title: "🍪 We use cookies",
    text: "This site uses cookies via Google AdSense to serve personalized ads and analyze traffic. We DO NOT collect or store any of your financial data entered into the calculators. By continuing to use this site, you agree to our privacy policy.",
    accept: "Accept",
    decline: "Decline Personalized Ads",
    privacy: "Privacy Policy"
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100%",
      backgroundColor: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "16px 20px",
      boxShadow: "0 -10px 30px rgba(0,0,0,0.15)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      direction: isAr ? "rtl" : "ltr",
      textAlign: isAr ? "right" : "left"
    }}>
      <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <strong style={{ margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          {content.title}
        </strong>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", maxWidth: "1000px" }}>
          {content.text}
          {" "}
          <a href={`/${lang}/privacy-policy`} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600" }}>
            {content.privacy}
          </a>
        </p>
      </div>
      
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <button 
          onClick={handleDecline} 
          className="btn btn-outline" 
          style={{ padding: "10px 16px", fontSize: "0.85rem", whiteSpace: "nowrap" }}
        >
          {content.decline}
        </button>
        <button 
          onClick={handleAccept} 
          className="btn btn-primary" 
          style={{ padding: "10px 24px", fontSize: "0.85rem", whiteSpace: "nowrap" }}
        >
          {content.accept}
        </button>
        <button 
          onClick={() => setShowBanner(false)} 
          style={{ 
            background: "transparent", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "1.2rem", 
            color: "var(--text-muted)", 
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            marginLeft: isAr ? "0" : "8px",
            marginRight: isAr ? "8px" : "0"
          }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
