"use client";

import { useState } from "react";

export default function UnsubscribeClient({ token, isAr }) {
  const [state, setState] = useState("idle"); // idle | loading | done | error

  const handleUnsub = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/reminder/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p style={{ color: "var(--success, #10b981)", fontWeight: "bold", fontSize: "1.1rem" }}>
        {isAr ? "✅ تم إلغاء اشتراكك بنجاح. لن يصلك أي تذكير بعد الآن." : "✅ You have been unsubscribed. You will no longer receive reminders."}
      </p>
    );
  }

  if (state === "error") {
    return (
      <p style={{ color: "var(--danger, #dc2626)", fontWeight: "bold" }}>
        {isAr ? "⚠️ الرابط غير صالح أو انتهت صلاحيته." : "⚠️ This link is invalid or has expired."}
      </p>
    );
  }

  return (
    <button
      onClick={handleUnsub}
      disabled={state === "loading"}
      style={{ background: "var(--danger, #dc2626)", color: "white", padding: "12px 28px", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", opacity: state === "loading" ? 0.6 : 1 }}
    >
      {state === "loading"
        ? (isAr ? "جارٍ الإلغاء..." : "Unsubscribing...")
        : (isAr ? "تأكيد إلغاء الاشتراك" : "Confirm Unsubscribe")}
    </button>
  );
}
