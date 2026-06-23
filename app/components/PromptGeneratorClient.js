"use client";

import { useState } from "react";

const rolesEn = ["Senior Software Engineer", "Marketing Strategist", "Financial Advisor", "Data Scientist", "UX Designer", "Technical Writer", "Product Manager", "DevOps Engineer"];
const rolesAr = ["مهندس برمجيات محترف", "مخطط تسويقي", "مستشار مالي", "عالم بيانات", "مصمم واجهات UX", "كاتب تقني", "مدير منتج", "مهندس DevOps"];

const tonesEn = ["Professional", "Casual", "Academic", "Concise", "Detailed", "Creative"];
const tonesAr = ["مهني / رسمي", "ودي / غير رسمي", "أكاديمي", "مختصر وموجز", "تفصيلي وشامل", "إبداعي"];

const formatsEn = ["Step-by-step with code examples", "Bullet points", "Numbered list", "Paragraph format", "Table format", "Pros and cons"];
const formatsAr = ["خطوة بخطوة مع أمثلة الكود", "نقاط تعداد نقطي", "قائمة مرقمة", "فقرات نصية", "جدول بيانات", "المميزات والعيوب"];

export default function PromptGeneratorClient({ lang, dict, ...props }) {
  
  const t = dict.prompt;
  const isAr = lang === "ar";

  const roles = isAr ? rolesAr : rolesEn;
  const tones = isAr ? tonesAr : tonesEn;
  const formats = isAr ? formatsAr : formatsEn;

  const [role, setRole] = useState(roles[0]);
  const [task, setTask] = useState(isAr ? "كتابة مكون ريأكت" : "write a React component");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [format, setFormat] = useState(formats[0]);
  const [copied, setCopied] = useState(false);

  // Dynamic Prompt template construction
  const prompt = isAr
    ? `تقمص دور: ${role}.\n\nمهمتك هي: ${task}${context ? ` بخصوص: "${context}"` : ""}.\n\nالمتطلبات الإضافية:\n- أسلوب الصياغة: ${tone}\n- شكل المخرجات المطلوبة: ${format}\n- فكر خطوة بخطوة قبل إعطاء الإجابة النهائية\n- كن دقيقاً وقدم نصائح عملية قابلة للتطبيق مباشرة.`
    : `Act as a ${role}.\n\nYour task is to ${task}${context ? ` about: "${context}"` : ""}.\n\nRequirements:\n- Tone: ${tone}\n- Output format: ${format}\n- Think step-by-step before providing your answer\n- Be thorough and provide practical, actionable advice`;

  const copy = () => { 
    navigator.clipboard.writeText(prompt); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="prompt-role">{t.role}</label>
            <select id="prompt-role" className="input" value={role} onChange={e => setRole(e.target.value)}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="prompt-task">{t.task}</label>
            <input 
              id="prompt-task"
              className="input" 
              value={task} 
              onChange={e => setTask(e.target.value)} 
              placeholder={t.task_placeholder} 
            />
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="prompt-context">{t.context}</label>
            <textarea 
              id="prompt-context"
              className="input" 
              rows="3" 
              value={context} 
              onChange={e => setContext(e.target.value)} 
              placeholder={t.context_placeholder} 
            />
          </div>
          
          <div className="grid-2">
            <div>
              <label className="label" htmlFor="prompt-tone">{isAr ? "أسلوب الكتابة" : "Tone"}</label>
              <select id="prompt-tone" className="input" value={tone} onChange={e => setTone(e.target.value)}>
                {tones.map(tn => <option key={tn} value={tn}>{tn}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="prompt-format">{t.output}</label>
              <select id="prompt-format" className="input" value={format} onChange={e => setFormat(e.target.value)}>
                {formats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--success)" }}>
            {isAr ? "الأمر المولد تلقائياً:" : "Generated Prompt:"}
          </h3>
          <pre style={{ 
            whiteSpace: "pre-wrap", 
            fontFamily: "monospace", 
            fontSize: "0.95rem", 
            lineHeight: "1.7", 
            color: "var(--text)", 
            background: "var(--surface-sunken)",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            flexGrow: 1,
            direction: isAr ? "rtl" : "ltr"
          }}>{prompt}</pre>
          <button className="btn btn-primary" onClick={copy} style={{ marginTop: "16px", background: "var(--success)", justifyContent: "center" }}>
            {copied ? (isAr ? "✅ تم النسخ!" : "✅ Copied!") : t.copy}
          </button>
        </div>
      </div>
    </div>
  );
}
