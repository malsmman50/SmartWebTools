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

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>مولد الأوامر (Prompts) الاحترافي للذكاء الاصطناعي</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              سر الحصول على إجابات دقيقة ومفيدة من نماذج الذكاء الاصطناعي (مثل ChatGPT, Claude, Gemini) يكمن في جودة "الأمر" أو الـ (Prompt) الذي تكتبه. يقوم مولد الأوامر الذكي هذا بمساعدتك على هندسة نصوص أوامر احترافية بخطوات بسيطة. بدلاً من كتابة أمر عشوائي قصير، تضمن لك هذه الأداة دمج سياق العمل، وتحديد الدور المطلوب، وتوضيح شكل المخرجات بأسلوب منهجي ومجرب.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>مبرمج يبحث عن حل لمشكلة:</strong> بدلاً من قول "حل مشكلة كذا"، جرب إعدادات الأداة: الدور (مهندس برمجيات)، المهمة (كتابة مكون تفاعلي)، التنسيق (خطوة بخطوة مع أمثلة الكود). النتيجة ستكون كوداً نظيفاً ومشروحاً بعناية.</li>
              <li style={{ marginBottom: "8px" }}><strong>مسوق يحتاج خطة إعلانية:</strong> اختر الدور (مخطط تسويقي)، المهمة (كتابة خطة إطلاق منتج)، الأسلوب (إبداعي)، والتنسيق (جدول بيانات). ستحصل على جدول زمني مفصل ومقسم بدلاً من نص سردي ممل.</li>
              <li style={{ marginBottom: "8px" }}><strong>كاتب محتوى لمقال أكاديمي:</strong> اختر الدور (عالم بيانات أو كاتب تقني)، الأسلوب (أكاديمي)، والمهمة (تلخيص ورقة بحثية). هذا سيجبر الذكاء الاصطناعي على تجنب اللغة التسويقية واستخدام مصطلحات رصينة.</li>
              <li style={{ marginBottom: "8px" }}><strong>محلل مالي يستعرض خيارات الاستثمار:</strong> اختر الدور (مستشار مالي)، المهمة (تقييم شراء أسهم مقابل عقار)، والتنسيق (المميزات والعيوب). ستحصل على مقارنة محايدة ودقيقة.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>مبادئ هندسة الأوامر (Prompt Engineering)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تم تصميم هذه الأداة بناءً على أفضل الممارسات في هندسة الأوامر والتي تشمل: إعطاء النموذج <strong>دوراً وشخصية</strong> لضبط المصطلحات، إضافة عبارة <strong>"فكر خطوة بخطوة" (Chain of Thought)</strong> لتقليل الهلوسات وتحسين المنطق، وتحديد <strong>هيكل واضح للمخرجات</strong> لتسهيل القراءة والنسخ.
            </p>
          </>
        ) : (
          <>
            <h2>Professional AI Prompt Generator</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The secret to getting highly accurate, brilliant responses from AI models (like ChatGPT, Claude, or Gemini) lies entirely in the quality of your prompt. This smart Prompt Generator helps you engineer professional prompts through simple dropdowns. Instead of writing short, vague requests, this tool structurally binds role-playing, clear tasks, deep context, and exact output formats into a proven, optimized formula.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Developer Seeking a Bug Fix:</strong> Instead of asking "fix this code", set the Role to "Senior Software Engineer", Task to "Debug an authentication bug", and Format to "Step-by-step with code examples". You'll get clean, fully explained, and modular code.</li>
              <li style={{ marginBottom: "8px" }}><strong>Marketer Launching a Product:</strong> Choose Role: "Marketing Strategist", Tone: "Creative", and Format: "Table format". The AI will generate a structured week-by-week spreadsheet of tasks rather than a block of generic text.</li>
              <li style={{ marginBottom: "8px" }}><strong>Technical Writer Summarizing Data:</strong> Select Role "Data Scientist" and Tone "Academic". This forces the AI to avoid fluffy, colloquial language and stick to objective, precise terminology when summarizing research or charts.</li>
              <li style={{ marginBottom: "8px" }}><strong>Decision Making & Financials:</strong> Set Role to "Financial Advisor", Task to "Compare renting vs buying a house", and Format to "Pros and cons". The output will be neatly divided for an objective evaluation.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Principles of Prompt Engineering</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              This tool is built upon the best practices of AI Prompt Engineering. It automatically incorporates: <strong>Role-playing</strong> (to lock the AI into specific domain knowledge), <strong>"Chain of Thought" reasoning</strong> (by asking the AI to think step-by-step to drastically reduce hallucinations), and <strong>Strict formatting rules</strong>.
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
            "name": "لماذا أحتاج إلى أداة لكتابة أوامر الذكاء الاصطناعي بدلاً من كتابتها بنفسي؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "النماذج اللغوية تستجيب بناءً على السياق. كتابة أمر قصير كـ 'اكتب لي مقال' سيعطي نتيجة عامة وضعيفة. الأداة تساعدك على بناء هيكل (هندسة أوامر) يجمع بين الدور، والأسلوب، والصيغة لضمان مخرجات ذات جودة احترافية من المحاولة الأولى."
            }
          },
          {
            "@type": "Question",
            "name": "هل تدعم الأوامر المولدة نماذج محددة مثل ChatGPT فقط؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا، الأوامر المهندسة هنا متوافقة وتعمل بكفاءة عالية جداً مع جميع النماذج اللغوية الكبيرة (LLMs) مثل ChatGPT، و Google Gemini، و Claude، وغيرها."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Why do I need a tool to generate prompts instead of writing them myself?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI models are highly sensitive to context and structure. A simple prompt like 'write an article' yields generic results. This tool builds a structured 'engineered prompt' combining persona, tone, and format to guarantee professional-grade outputs on the first try."
            }
          },
          {
            "@type": "Question",
            "name": "Are the generated prompts only for ChatGPT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the prompts generated are universally optimized and will work exceptionally well on any Large Language Model (LLM) including ChatGPT, Google Gemini, Anthropic Claude, and Meta Llama."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
