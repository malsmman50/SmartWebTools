"use client";

import { useState } from "react";

// Click-to-load YouTube embed. Renders only a lightweight thumbnail image
// until clicked, so the YouTube iframe (and its trackers) never loads
// unless the visitor explicitly asks for the video. Uses youtube-nocookie.com
// to avoid setting any cookie before that consent-like click happens.
export default function YouTubeFacade({ videoId, title, lang = "en" }) {
  const [loaded, setLoaded] = useState(false);
  const isAr = lang === "ar";

  if (!videoId) return null;

  if (loaded) {
    return (
      <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: "12px", overflow: "hidden", margin: "24px 0" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      aria-label={isAr ? `تشغيل الفيديو: ${title}` : `Play video: ${title}`}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        paddingTop: "56.25%",
        borderRadius: "12px",
        overflow: "hidden",
        margin: "24px 0",
        border: "1px solid var(--border)",
        cursor: "pointer",
        background: "#000",
        padding: 0
      }}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
      />
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{
          width: "68px", height: "68px", borderRadius: "50%",
          background: "rgba(220, 38, 38, 0.92)", display: "flex",
          alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
        }}>
          <span style={{
            width: 0, height: 0,
            borderTop: "13px solid transparent", borderBottom: "13px solid transparent",
            borderLeft: "22px solid white", marginLeft: "5px"
          }} />
        </span>
      </span>
      <span style={{
        position: "absolute", bottom: 0, insetInline: 0, padding: "10px 14px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
        color: "#fff", fontSize: "0.9rem", fontWeight: 600, textAlign: isAr ? "right" : "left"
      }}>
        {title}
      </span>
    </button>
  );
}
