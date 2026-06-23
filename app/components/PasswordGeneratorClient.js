"use client";

import { useState } from "react";

export default function PasswordGeneratorClient({ lang, dict, ...props }) {
  
  const t = dict.password;
  const isAr = lang === "ar";

  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charSets = [];
    if (useUpper) charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (useNumbers) charSets.push("0123456789");
    if (useSymbols) charSets.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
    
    // Always include lowercase as base
    charSets.push("abcdefghijklmnopqrstuvwxyz");

    let pwdChars = [];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    // Guarantee one character from each selected set
    for (let i = 0; i < charSets.length && pwdChars.length < length; i++) {
      const set = charSets[i];
      pwdChars.push(set[array[i] % set.length]);
    }

    // Fill the rest randomly from all combined allowed characters
    const allChars = charSets.join("");
    const maxValid = Math.floor(4294967296 / allChars.length) * allChars.length;
    
    while (pwdChars.length < length) {
      crypto.getRandomValues(array);
      for (let i = 0; i < array.length && pwdChars.length < length; i++) {
        if (array[i] < maxValid) {
          pwdChars.push(allChars[array[i] % allChars.length]);
        }
      }
    }

    // Shuffle the characters array using Fisher-Yates
    const shuffleArray = new Uint32Array(pwdChars.length);
    crypto.getRandomValues(shuffleArray);
    for (let i = pwdChars.length - 1; i > 0; i--) {
      const j = shuffleArray[i] % (i + 1);
      [pwdChars[i], pwdChars[j]] = [pwdChars[j], pwdChars[i]];
    }

    setPassword(pwdChars.join(""));
  };

  const copy = () => { 
    navigator.clipboard.writeText(password); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  const strength = () => {
    let charsetSize = 26; // lowercase
    if (useUpper) charsetSize += 26;
    if (useNumbers) charsetSize += 10;
    if (useSymbols) charsetSize += 26; // approx 26 symbols

    const entropy = length * Math.log2(charsetSize);
    
    if (entropy < 50) return { text: t.weak, color: "var(--danger)" };
    if (entropy < 75) return { text: t.good, color: "var(--warning)" };
    return { text: t.strong, color: "var(--success)" };
  };

  const st = strength();

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div>
          <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div className="result-box" style={{ marginBottom: "20px", position: "relative" }}>
              <div style={{ fontFamily: "monospace", fontSize: "1.3rem", wordBreak: "break-all", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center", paddingRight: isAr ? "36px" : "0", paddingLeft: isAr ? "0" : "36px" }}>
                {password || t.click_generate}
              </div>
              {password && (
                <button 
                  className="copy-btn" 
                  onClick={copy} 
                  style={{ position: "absolute", top: "12px", right: isAr ? "auto" : "12px", left: isAr ? "12px" : "auto", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
                  title={isAr ? "نسخ" : "Copy"}
                >
                  {copied ? "✅" : "📋"}
                </button>
              )}
            </div>

            {password && (
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <span style={{ fontWeight: 600, color: st.color }}>{t.strength}: {st.text}</span>
                <div style={{ height: "6px", borderRadius: "3px", background: "var(--border)", marginTop: "8px", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: st.color, width: st.text === t.weak ? "33%" : st.text === t.good ? "66%" : "100%", transition: "width 0.3s" }}></div>
                </div>
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <label className="label" htmlFor="password-length">{t.length}: {length}</label>
              <input id="password-length" type="range" min="8" max="64" value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "24px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> {t.uppercase}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> {t.numbers}
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> {t.symbols}
              </label>
            </div>

            <button className="btn btn-primary" onClick={generate} style={{ width: "100%", justifyContent: "center", background: "var(--success)" }}>{t.generate_btn}</button>
          </div>
        </div>

        <div>
          <article className="card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {isAr ? (
              <>
                <h2>لماذا نستخدم مولد كلمة المرور العشوائية؟</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.8" }}>
                  يميل البشر بطبيعتهم لاختيار كلمات مرور سهلة التذكر، مثل الكلمات الشائعة في القاموس أو تواريخ الميلاد. تستخدم المخترقون برامج آلية سريعة لتخمين هذه الأنماط.
                </p>
                <p style={{ color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.8" }}>
                  تعتمد أداتنا على واجهة التشفير المضمنة في المتصفح (<code>window.crypto</code>) لتوليد رموز عشوائية تماماً ومستحيلة التخمين، مما يضمن أماناً فائقاً لحساباتك.
                </p>
              </>
            ) : (
              <>
                <h2>Why Use a Cryptographic Password Generator?</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.8" }}>
                  Humans are prone to selecting easily guessable passwords, such as keyboard walks, common dictionary words, or personal dates. Hackers use automated tools to exploit these predictable patterns.
                </p>
                <p style={{ color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.8" }}>
                  Our tool leverages the browser's built-in cryptographic API (<code>window.crypto</code>) to generate completely random and unpredictable passwords locally, ensuring absolute security.
                </p>
              </>
            )}
          </article>
        </div>
      </div>

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>الدليل الإرشادي لحماية الحسابات وكلمات المرور</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              في الفضاء الرقمي اليوم، تعد كلمة المرور القوية خط الدفاع الأول والأهم لحماية أصولك وحساباتك وبياناتك الحساسة.
            </p>
            <h3 style={{ marginTop: "24px" }}>أفضل الممارسات لأمن كلمات المرور</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>الطول أهم من التعقيد:</strong> كلمة مرور مكونة من 16 حرفاً عادياً أصعب بكثير في الكسر من كلمة مرور معقدة من 8 أحرف فقط. يفضل ألا يقل الطول عن 16 حرفاً.</li>
              <li><strong>تجنب تكرار كلمة المرور:</strong> إذا تسربت كلمة مرورك في موقع واحد، فسيحاول المخترقون استخدامها في كافة حساباتك الأخرى (حشو الاعتماديات). استخدم كلمة فريدة لكل حساب.</li>
              <li><strong>استخدم مدير كلمات مرور (Password Manager):</strong> لا تحاول حفظ عشرات كلمات المرور العشوائية في ذهنك. استعن بمدير كلمات مرور موثوق مثل Bitwarden أو 1Password لحفظها بأمان وتعبئتها تلقائياً.</li>
              <li><strong>تفعيل المصادقة الثنائية (2FA):</strong> قم دائماً بتفعيل التحقق بخطوتين عبر تطبيقات الجوال المعتمدة (مثل Google Authenticator) لتوفير طبقة حماية إضافية لا يمكن اختراقها بكلمة المرور وحدها.</li>
            </ul>
          </>
        ) : (
          <>
            <h2>Best Practices for Password Security</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              In today's digital landscape, a strong password is your first line of defense against cyber threats.
            </p>
            <h3 style={{ marginTop: "24px" }}>Recommended Guidelines</h3>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>Length Over Complexity:</strong> A 16-character password is often harder to crack than a complex 8-character one. Aim for at least 16 characters.</li>
              <li><strong>Never Reuse Passwords:</strong> Reusing passwords allows hackers to gain access to multiple accounts if one site is breached. Always use unique passwords.</li>
              <li><strong>Use a Password Manager:</strong> Store your unique, random passwords securely using software like Bitwarden or 1Password.</li>
              <li><strong>Enable 2FA:</strong> Turn on Two-Factor Authentication (2FA) for your important accounts to add an extra layer of security.</li>
            </ul>
          </>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": isAr ? [
          {
            "@type": "Question",
            "name": "هل الأداة آمنة تماماً للاستخدام؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم. تعمل الأداة محلياً بالكامل 100% داخل جهازك عبر المتصفح. لا يتم إرسال أو حفظ أي كلمات مرور مولدة في أي مكان على الإنترنت."
            }
          },
          {
            "@type": "Question",
            "name": "هل يجب تغيير كلمات المرور بشكل دوري؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "وفقاً للمنظمات الأمنية العالمية مثل NIST، يُنصح بعدم تغيير كلمات المرور بشكل إجباري متكرر إلا إذا اشتبهت في تسريبها أو اختراقها فعلياً، لضمان عدم اختيار كلمات أسهل وأضعف."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Is this generator safe to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This tool is 100% client-side. The passwords are generated in your local browser and are never sent over the internet."
            }
          },
          {
            "@type": "Question",
            "name": "Should I change my passwords regularly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Modern cybersecurity guidelines (like NIST) now recommend against forced regular password changes, unless you have reason to believe your password was compromised."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
