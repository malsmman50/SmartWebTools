"use client";

import { useLanguage } from "./LanguageProvider";

export default function ContactForm({ lang, dict, ...props }) {
  const t = dict.contact;

  return (
    <form className="card" onSubmit={(e) => e.preventDefault()}>
      <h3 style={{ marginBottom: "20px" }}>{t.send_msg}</h3>
      <div style={{ marginBottom: "16px" }}>
        <label className="label">{t.name_label}</label>
        <input type="text" className="input" placeholder={t.name_placeholder} required />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label className="label">{t.email_label}</label>
        <input type="email" className="input" placeholder={t.email_placeholder} required />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label className="label">{t.msg_label}</label>
        <textarea className="input" rows="5" placeholder={t.msg_placeholder} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        {t.send_btn}
      </button>
    </form>
  );
}
