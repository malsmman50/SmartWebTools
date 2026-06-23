"use client";

import { useState, useEffect } from "react";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function JwtDecoderClient() {
  const { lang, dict } = useLanguage();
  const t = dict.jwt;
  const isAr = lang === "ar";

  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setError("");
      return;
    }

    try {
      const decodedHeader = decodeProtectedHeader(token);
      const decodedPayload = decodeJwt(token);
      
      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError("");
    } catch (e) {
      setError(isAr ? "رمز JWT غير صالح البنية" : "Invalid JWT Format");
      setHeader("");
      setPayload("");
    }
  }, [token, isAr]);

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "1400px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        
        <div style={{ marginTop: "20px", padding: "16px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", borderRadius: "8px", color: "#b45309", textAlign: isAr ? "right" : "left", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem" }}>⚠️</span>
          <div>
            <strong style={{ display: "block", marginBottom: "4px" }}>
              {isAr ? "تنبيه أمني هام" : "Security Warning"}
            </strong>
            {isAr 
              ? "تقوم هذه الأداة بفك ترميز Base64Url فقط. هي لا تتحقق من التوقيع الرقمي (Signature) للرمز. فك تشفير البيانات لا يضمن صحتها أو عدم العبث بها. يجب دائماً التحقق من صحة التوقيع رقمياً على الخوادم الخاصة بك."
              : "This tool performs Base64Url decode only. It does NOT verify the cryptographic signature of the token. A decoded payload does not guarantee the token is authentic or untampered. Always perform signature verification on your backend server."}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <label className="label" htmlFor="jwt-input">
            {isAr ? "الرمز المشفر (الصق هنا):" : "Encoded Token (Paste Here):"}
          </label>
          <textarea 
            id="jwt-input"
            className="input" 
            style={{ flexGrow: 1, minHeight: "400px", fontFamily: "monospace", wordBreak: "break-all", fontSize: "0.9rem", lineHeight: "1.5" }} 
            placeholder={t.input_placeholder}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {error && <p style={{ color: "var(--danger)", marginTop: "12px", fontWeight: "bold" }}>❌ {error}</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card" style={{ padding: 0, overflow: "hidden", background: "#1e1e1e", border: "1px solid #333" }}>
            <div style={{ padding: "8px 16px", background: "#252526", color: "#858585", fontSize: "0.8rem", borderBottom: "1px solid #333" }}>
              {t.header || (isAr ? "الترويسة: الخوارزمية ونوع الرمز" : "HEADER: ALGORITHM & TOKEN TYPE")}
            </div>
            <textarea
              readOnly
              style={{
                display: "block", width: "100%", height: "150px",
                background: "#1e1e1e", color: "#d4d4d4", border: "none",
                padding: "16px", fontFamily: "monospace", fontSize: "14px",
                resize: "none", outline: "none", lineHeight: "1.6",
              }}
              value={header}
            />
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden", background: "#1e1e1e", border: "1px solid #333", flexGrow: 1 }}>
            <div style={{ padding: "8px 16px", background: "#252526", color: "#858585", fontSize: "0.8rem", borderBottom: "1px solid #333" }}>
              {t.payload || (isAr ? "الحمولة: البيانات والادعاءات" : "PAYLOAD: DATA")}
            </div>
            <textarea
              readOnly
              style={{
                display: "block", width: "100%", height: "350px",
                background: "#1e1e1e", color: "#d4d4d4", border: "none",
                padding: "16px", fontFamily: "monospace", fontSize: "14px",
                resize: "none", outline: "none", lineHeight: "1.6",
              }}
              value={payload}
            />
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>الدليل الشامل لرموز الويب المميزة (JWT)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تعد رموز ويب JSON (JWT) معياراً مفتوحاً (RFC 7519) يحدد طريقة مدمجة ومستقلة لنقل المعلومات بشكل آمن بين الأطراف ككائن JSON. يمكن التحقق من هذه المعلومات والوثوق بها لأنها موقعة رقمياً باستخدام مفتاح سري مشترك أو مفتاحين (خاص وعام).
            </p>

            <h3 style={{ marginTop: "24px" }}>هل يتحقق هذا المفكك من التوقيع؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              لا. هذا المفكك مصمم ومبني بالكامل لأغراض التطوير والاختبار وقراءة المحتوى وتصحيح الأخطاء محلياً. للتحقق الفعلي من صحة الرمز وعدم التلاعب به، يجب تمريره إلى السيرفر الخاص بك الذي يستخدم المفتاح السري للتحقق التام من التوقيع الرقمي.
            </p>

            <h3 style={{ marginTop: "24px" }}>لماذا معالجة الـ JWT محلياً أمر ضروري؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تحتوي رموز JWT غالباً على معلومات الهوية، والصلاحيات، والبيانات الشخصية للمستخدمين. إن لصق هذه الرموز الحساسة في أدوات إلكترونية مجهولة المصدر قد يعرضك لتسريب الرموز، مما يتيح للمهاجمين انتحال هوية مستخدميك. منصة <strong>SmartCalcTools</strong> تفك الرموز محلياً بالكامل عبر مكتبة <code>jose</code> المدمجة في متصفحك دون إرسال أي بت من البيانات عبر الإنترنت.
            </p>
          </>
        ) : (
          <>
            <h2>The Complete Guide to JSON Web Tokens (JWT)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
            </p>

            <h3 style={{ marginTop: "24px" }}>Does this tool verify the signature?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              No. This tool is designed purely for decoding and inspecting the payload and headers of a token during development. It does not perform cryptographic signature validation. Signature verification must happen server-side using the appropriate secret or public key.
            </p>

            <h3 style={{ marginTop: "24px" }}>Why You Need a Client-Side JWT Decoder</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              JWTs often contain sensitive User Identifiers (PII), Roles, and Authorization claims. Pasting your production JWT into a random online tool is a massive security risk. SmartCalcTools eliminates this risk completely. All decoding happens in your local browser using the <code>jose</code> library.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
