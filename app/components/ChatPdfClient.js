"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPdfClient({ lang, dict, ...props }) {
  
  const t = dict.chatpdf;
  const isAr = lang === "ar";

  const [status, setStatus] = useState(isAr ? "جاهز" : "Idle");
  const [progress, setProgress] = useState(0);
  const [dbLength, setDbLength] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize Web Worker from public directory
    workerRef.current = new Worker("/worker.js", { type: "module" });
    
    workerRef.current.onmessage = (e) => {
      const msg = e.data;
      if (msg.status === "error") {
        setStatus(isAr ? `خطأ داخلي في نظام المعالجة: ${msg.error}` : `Worker Internal Error: ${msg.error}`);
        setProgress(0);
        return;
      }
      if (msg.status === "debug") {
        console.log("[Worker Debug]", msg.msg);
      } else if (msg.status === "progress") {
        setStatus(isAr ? `جاري تحميل نموذج الذكاء الاصطناعي... ${msg.data.file || ""}` : `Loading AI Model... ${msg.data.file || ""}`);
        if (msg.data.progress) setProgress(msg.data.progress);
      } else if (msg.status === "batch_progress") {
        const percentDone = Math.round((msg.processed / msg.total) * 80);
        setProgress(20 + percentDone);
        setDbLength(msg.dbLength);
        setStatus(isAr 
          ? `جاري معالجة المتجهات: ${msg.processed} / ${msg.total} مقطع...` 
          : `Vectorizing: ${msg.processed} / ${msg.total} chunks...`);
      } else if (msg.status === "batch_complete") {
        setDbLength(msg.dbLength);
        setStatus(isAr ? "جاهز" : "Ready");
        setProgress(100);
      } else if (msg.status === "search_results") {
        setResults(msg.results);
        setStatus(isAr ? "جاهز" : "Ready");
        setProgress(100);
      } else if (msg.status === "db_cleared") {
        setDbLength(0);
      }
    };
    
    workerRef.current.onerror = (e) => {
      console.error("Worker error:", e);
      setStatus(isAr 
        ? `فشل في تشغيل نموذج الذكاء الاصطناعي محلياً: ${e.message}` 
        : `Worker Error: Failed to initialize AI model. Details: ${e.message}`);
    };
    
    return () => workerRef.current.terminate();
  }, [isAr]);

  const chunkText = (text, maxLength = 500) => {
    text = text.normalize("NFKC");
    const chunks = [];
    let currentChunk = "";
    const segments = text.split(/([.!?\n،؟]+)/);
    
    for (let i = 0; i < segments.length; i += 2) {
      const sentence = segments[i] + (segments[i + 1] || "");
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      if (currentChunk.length + trimmed.length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = "";
        }
        if (trimmed.length > maxLength) {
          const words = trimmed.split(/\s+/);
          for (const word of words) {
            if (currentChunk.length + word.length > maxLength) {
              if (currentChunk) chunks.push(currentChunk.trim());
              currentChunk = word;
            } else {
              currentChunk += (currentChunk ? " " : "") + word;
            }
          }
        } else {
          currentChunk = trimmed;
        }
      } else {
        currentChunk += (currentChunk ? " " : "") + trimmed;
      }
    }
    
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setStatus(isAr ? "جاري استخراج النصوص من ملف PDF..." : "Extracting text from PDF...");
    setProgress(0);
    setDbLength(0);
    setFileInfo(null);
    setResults([]);
    if (workerRef.current) workerRef.current.postMessage({ type: "clear_db" });
    try {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      setFileInfo({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        pages: pdf.numPages
      });
      
      setStatus(isAr 
        ? `جاري قراءة النصوص من ${pdf.numPages} صفحات...` 
        : `Extracting text sequentially from ${pdf.numPages} pages...`);
      
      let pagesExtracted = 0;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(" ");
        fullText += text + " ";
        pagesExtracted++;
        setProgress(Math.round((pagesExtracted / pdf.numPages) * 20));
      }
      
      setStatus(isAr 
        ? "جاري تهيئة المتجهات وبناء الفهرس المحلي (باستخدام معالج جهازك)..." 
        : "Chunking and Vectorizing Document (Using Local GPU/CPU)...");
      setProgress(20);
      const chunksStr = chunkText(fullText);
      const chunks = chunksStr.map((c, i) => ({ id: i, text: c }));
      
      workerRef.current.postMessage({ type: "embed_batch", chunks });
      
    } catch (err) {
      setStatus(isAr ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!workerRef.current) { 
      setStatus(isAr ? "خطأ: المعالج المحلي غير متوفر" : "Error: Worker not initialized"); 
      return; 
    }
    if (dbLength === 0) { 
      setStatus(isAr ? "يرجى رفع ملف PDF أولاً" : "Please upload a PDF first"); 
      return; 
    }
    setStatus(isAr ? "جاري البحث..." : "Searching...");
    workerRef.current.postMessage({ type: "search", text: query.trim() });
  };

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "1000px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div style={{ marginTop: "12px", padding: "12px 16px", background: "rgba(99,102,241,0.08)", border: "1px solid var(--primary)", borderRadius: "8px", fontSize: "0.88rem", color: "var(--text-muted)", textAlign: isAr ? "right" : "left" }}>
          ⚠️ <strong>{isAr ? "الاستخدام لأول مرة:" : "First use:"}</strong>{" "}
          {isAr 
            ? "سيقوم المتصفح بتحميل نموذج ذكاء اصطناعي خفيف بحجم ~113 ميجابايت ليدعم اللغة العربية ولغات أخرى محلياً 100%. يحدث هذا مرة واحدة فقط ويتم حفظه في ذاكرة التخزين المؤقت لجهازك."
            : "This tool downloads a ~113MB Multilingual AI model to your device to support Arabic & 50+ languages. This happens only once and is cached locally. Subsequent uses are instant."}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px", textAlign: "center", padding: "40px" }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: "none" }} id="pdf-upload" />
        <label htmlFor="pdf-upload" className="btn btn-primary" style={{ cursor: "pointer", fontSize: "1.2rem", padding: "12px 24px", background: "var(--success)" }}>
          {isAr ? "📄 اختر ملف PDF (خصوصية تامة)" : "📄 Upload PDF (Max Security)"}
        </label>


        {fileInfo && (
          <div style={{ marginTop: "24px", textAlign: isAr ? "right" : "left", padding: "16px", background: "rgba(99,102,241,0.05)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "1rem", color: "var(--success)" }}>
              {isAr ? "📄 معلومات المستند" : "📄 Document Information"}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", fontSize: "0.9rem" }}>
              <div><strong style={{ color: "var(--text-muted)" }}>{isAr ? "الاسم:" : "Name:"}</strong> <span style={{ wordBreak: "break-all" }}>{fileInfo.name}</span></div>
              <div><strong style={{ color: "var(--text-muted)" }}>{isAr ? "الحجم:" : "Size:"}</strong> {fileInfo.size}</div>
              <div><strong style={{ color: "var(--text-muted)" }}>{isAr ? "عدد الصفحات:" : "Pages:"}</strong> {fileInfo.pages}</div>
            </div>
          </div>
        )}

        <p style={{ marginTop: "24px", color: "var(--text-muted)" }}>
          {isAr ? "الحالة:" : "Status:"} <strong style={{ color: "var(--success)" }}>{status}</strong>
        </p>
        
        {(progress > 0 && status !== (isAr ? "جاهز" : "Ready")) && (
          <div style={{ width: "100%", height: "8px", background: "#e0e0e0", borderRadius: "4px", overflow: "hidden", marginTop: "12px" }}>
            <div style={{ height: "100%", background: "var(--success)", width: `${progress}%`, transition: "width 0.2s" }}></div>
          </div>
        )}
        
        <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          {isAr ? "عدد المقاطع المفهرسة:" : "Vectors Computed:"} {dbLength}
        </p>
      </div>

      {dbLength > 0 && (
        <div className="card">
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input 
              type="text" 
              className="input" 
              style={{ flexGrow: 1, minWidth: "250px" }} 
              placeholder={t.ask_placeholder} 
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch} style={{ background: "var(--success)" }}>
              {isAr ? "بحث ذكي" : "Semantic Search"}
            </button>
          </div>

          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {results.map((r, i) => (
              <div key={i} style={{ padding: "16px", background: "var(--bg)", borderLeft: isAr ? "none" : "4px solid var(--success)", borderRight: isAr ? "4px solid var(--success)" : "none", borderRadius: "4px", textAlign: isAr ? "right" : "left" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "bold" }}>
                  {isAr ? "نسبة مطابقة المعنى:" : "Match Confidence:"} {(r.score * 100).toFixed(1)}%
                </div>
                <p style={{ lineHeight: "1.6" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>كيف يعمل الذكاء الاصطناعي المحلي بالكامل (أمن صفري)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تتطلب أدوات \"التحدث مع PDF\" التقليدية رفع ملفاتك الحساسة وعقودك ومستنداتك المالية إلى خوادمها السحابية البعيدة لتحليلها، وهو ما يمثل خطورة بالغة على السرية والخصوصية.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              لكن <strong>SmartCalcTools</strong> تأخذ نهج الأمان المطلق. عند رفع الملف هنا، يجري المتصفح عملية المعالجة بالكامل محلياً. يقوم النموذج الرياضي للذكاء الاصطناعي (المحمل سلفاً في متصفحك) بتحويل الفقرات إلى متجهات رقمية ثم مطابقتها مع سؤالك باستخدام خوارزميات جيب التمام (Cosine Similarity) دون إرسال حرف واحد خارج متصفحك.
            </p>

            <h3 style={{ marginTop: "24px" }}>خطوات العمل المحلية للـ RAG</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              1. <strong>استخراج النص:</strong> قراءة نصوص PDF محلياً بالكامل عبر مكتبة PDF.js.<br/>
              2. <strong>التقسيم (Chunking):</strong> تقسيم النص إلى فقرات ومقاطع متناسقة الحجم.<br/>
              3. <strong>التضمين (Embedding):</strong> استخدام الذكاء الاصطناعي المدمج لتحويل كل فقرة لمتجه رياضي ذكي.<br/>
              4. <strong>البحث السيمانتيكي:</strong> تحويل سؤالك لمتجه ومقارنته بالمتجهات المخزنة محلياً لجلب الفقرة الأكثر مطابقة للمعنى، وليس فقط الكلمات المفتاحية المتطابقة حرفياً.
            </p>
          </>
        ) : (
          <>
            <h2>How 100% Client-Side AI Works (Zero Trust Security)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Traditional \"Chat with PDF\" tools require you to upload your sensitive files to their backend servers. This is a massive privacy risk.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              <strong>SmartCalcTools</strong> takes a revolutionary \"Zero Trust\" approach. When you upload a PDF here, our website downloads a highly-optimized Multilingual AI model directly into your browser cache, running on your local machine.
            </p>

            <h3 style={{ marginTop: "24px" }}>The RAG Architecture (Retrieval-Augmented Generation)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              1. <strong>Extraction:</strong> Your PDF is parsed locally using PDF.js.<br/>
              2. <strong>Chunking:</strong> The text is split into paragraphs.<br/>
              3. <strong>Embedding:</strong> The local AI converts each paragraph into a mathematical Vector representation.<br/>
              4. <strong>Semantic Search:</strong> When you ask a question, the AI converts your question into a vector and uses Cosine Similarity to find the exact paragraph.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
