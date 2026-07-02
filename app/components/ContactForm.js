"use client";

import { useState } from "react";

export default function ContactForm({ lang, dict, ...props }) {
  const t = dict.contact;
  const [status, setStatus] = useState(""); // '', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const dataObj = {
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message")
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
      });
      
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: "20px" }}>{t.send_msg}</h3>
      
      {status === "success" ? (
        <div style={{ padding: "20px", background: "var(--success)", color: "white", borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
          {lang === "ar" ? "تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت." : "Your message has been sent successfully! We will get back to you soon."}
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.name_label}</label>
            <input type="text" name="name" className="input" placeholder={t.name_placeholder} required disabled={status === "loading"} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.email_label}</label>
            <input type="email" name="email" className="input" placeholder={t.email_placeholder} required disabled={status === "loading"} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label className="label">{t.msg_label}</label>
            <textarea className="input" name="message" rows="5" placeholder={t.msg_placeholder} required disabled={status === "loading"}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={status === "loading"}>
            {status === "loading" ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") : t.send_btn}
          </button>
          
          {status === "error" && (
            <div style={{ color: "var(--danger)", marginTop: "12px", textAlign: "center", fontSize: "0.9rem" }}>
              {lang === "ar" ? "عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً." : "Sorry, an error occurred. Please try again later."}
            </div>
          )}
        </>
      )}
    </form>
  );
}
