"use client";

import { useState, useRef } from "react";

export default function ImageCompressorClient({ lang, dict, ...props }) {
  
  const t = dict.compressor;
  const isAr = lang === "ar";

  const [originalFile, setOriginalFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [isCompressing, setIsCompressing] = useState(false);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(isAr ? "يرجى تحديد ملف صورة صالح." : "Please select a valid image file.");
      return;
    }

    setOriginalFile(file);
    const objectUrl = URL.createObjectURL(file);
    setOriginalUrl(objectUrl);
    setCompressedUrl(null);
    setCompressedFile(null);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = isAr 
      ? ["بايت", "كيلوبايت", "ميغابايت", "جيجابايت"] 
      : ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const compressImage = () => {
    if (!originalFile || !originalUrl) return;
    setIsCompressing(true);

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      const width = img.width;
      const height = img.height;
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const newUrl = URL.createObjectURL(blob);
          setCompressedUrl(newUrl);
          
          const newFile = new File([blob], `compressed_${originalFile.name.replace(/\.[^/.]+$/, "")}.jpg`, {
            type: "image/jpeg",
          });
          setCompressedFile(newFile);
        }
        setIsCompressing(false);
      }, "image/jpeg", parseFloat(quality));
    };
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{t.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>{t.subtitle}</p>

        <div style={{ marginBottom: "24px" }}>
          <label 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              padding: "40px", 
              border: "2px dashed var(--success)", 
              borderRadius: "8px", 
              background: "var(--surface-sunken)", 
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--success)" }}>
              {t.drag_drop}
            </span>
            <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "8px" }}>(JPG, PNG, WebP)</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>

        {originalFile && (
          <div style={{ padding: "24px", border: "1px solid var(--border)", borderRadius: "8px", marginBottom: "24px" }}>
            <h3 style={{ marginBottom: "16px" }}>{isAr ? "إعدادات الضغط" : "Compression Settings"}</h3>
            
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label htmlFor="quality-slider">{isAr ? "جودة الصورة:" : "Image Quality:"}</label>
                <span style={{ fontWeight: "bold" }}>{Math.round(quality * 100)}%</span>
              </div>
              <input 
                id="quality-slider"
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                <span>{isAr ? "حجم أصغر (جودة أقل)" : "Smaller Size (Lower Quality)"}</span>
                <span>{isAr ? "حجم أكبر (جودة أعلى)" : "Larger Size (Higher Quality)"}</span>
              </div>
            </div>

            <button 
              onClick={compressImage}
              disabled={isCompressing}
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", borderRadius: "8px", background: "var(--success)", color: "white", border: "none", fontWeight: "bold", fontSize: "1.1rem", cursor: isCompressing ? "not-allowed" : "pointer", opacity: isCompressing ? 0.7 : 1, justifyContent: "center" }}
            >
              {isCompressing 
                ? (isAr ? "جاري الضغط..." : "Compressing...") 
                : t.btn}
            </button>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {compressedUrl && (
          <div className="grid-2" style={{ marginTop: "32px", gap: "24px" }}>
            <div style={{ padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", textAlign: "center" }}>
              <h4 style={{ color: "var(--danger)", marginBottom: "8px" }}>{isAr ? "الصورة الأصلية" : "Original Image"}</h4>
              <img src={originalUrl} alt="Original" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "4px", marginBottom: "12px" }} />
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{t.original}: {formatBytes(originalFile.size)}</div>
            </div>

            <div style={{ padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", textAlign: "center" }}>
              <h4 style={{ color: "var(--success)", marginBottom: "8px" }}>{isAr ? "الصورة المضغوطة" : "Compressed Image"}</h4>
              <img src={compressedUrl} alt="Compressed" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "4px", marginBottom: "12px" }} />
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: compressedFile.size > originalFile.size ? "var(--danger)" : "var(--success)" }}>
                {t.compressed}: {formatBytes(compressedFile.size)}
                <span style={{ fontSize: "0.9rem", color: compressedFile.size > originalFile.size ? "var(--danger)" : "var(--text-muted)", marginLeft: "8px", marginRight: "8px" }}>
                  ({compressedFile.size > originalFile.size ? "+" : "-"}{Math.abs(Math.round(((originalFile.size - compressedFile.size) / originalFile.size) * 100))}%)
                </span>
              </div>
              {compressedFile.size > originalFile.size && (
                <div style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "8px", lineHeight: "1.4" }}>
                  {isAr ? "حجم الصورة أصبح أكبر! حاول خفض شريط الجودة." : "Image became larger! Try lowering the quality slider."}
                </div>
              )}
              
              <a 
                href={compressedUrl} 
                download={compressedFile.name}
                className="btn btn-primary"
                style={{ display: "flex", width: "100%", padding: "10px", background: "var(--success)", color: "white", textDecoration: "none", borderRadius: "6px", fontWeight: "bold", marginTop: "16px", justifyContent: "center" }}
              >
                {t.download} ⬇️
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: "24px", fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", lineHeight: "1.6" }}>
          {isAr 
            ? "تنويه الخصوصية: تستخدم هذه الأداة واجهة Canvas البرمجية المدمجة في متصفحك. لا يتم إرسال صورك أو رفعها إلى أي خادم خارجي أبداً، مما يضمن خصوصية تامة بنسبة 100%."
            : "Privacy Note: This tool utilizes the Canvas API built into your browser. Your images are never sent or uploaded to any server, ensuring 100% privacy as all processing happens locally on your device."}
        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>أداة ضغط الصور وتقليل حجمها (بدون إنترنت)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              أداة ضغط الصور هي الحل الأمثل والمجاني لتقليل حجم صورك بنسبة تصل إلى 80% دون فقدان ملحوظ في الجودة. تعتمد هذه الأداة على تقنيات المتصفح المدمجة (Canvas API) لمعالجة الصور محلياً. هذا يعني أن صورك الشخصية، أو وثائقك الحساسة، أو صور منتجاتك لا تغادر جهازك أبداً ولا تُرفع إلى أي سيرفر أو خادم تخزين خارجي، مما يوفر لك أقصى درجات الخصوصية والأمان.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>تسريع مواقع الويب (SEO):</strong> إذا كنت مطور ويب أو تمتلك مدونة، فإن رفع صور بحجم 5 ميجابايت سيبطئ موقعك بشدة. يمكنك ضغطها هنا إلى أقل من 200 كيلوبايت لتحسين سرعة التحميل وتصدر نتائج جوجل.</li>
              <li style={{ marginBottom: "8px" }}><strong>رفع الوثائق للجهات الحكومية:</strong> الكثير من المنصات الحكومية والبنوك ترفض استقبال صور الهوية أو المستندات إذا تجاوز حجمها 2 ميجابايت. باستخدام شريط الجودة، يمكنك تقليل حجم الوثيقة لتُقبل فوراً.</li>
              <li style={{ marginBottom: "8px" }}><strong>تطبيقات المراسلة والبريد الإلكتروني:</strong> في حال رغبتك بإرسال ألبوم صور عبر البريد الإلكتروني الذي يحدك بـ 25 ميجابايت، أو إرسال صور عبر واتساب دون استهلاك باقة الإنترنت، فإن الضغط المسبق يوفر الكثير من البيانات.</li>
              <li style={{ marginBottom: "8px" }}><strong>توفير مساحة التخزين:</strong> تقليص حجم الصور الكبيرة المأخوذة بكاميرات عالية الدقة قبل أرشفتها في قرصك الصلب أو رفعها للسحابة (Google Drive).</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>نصائح للوصول لأفضل جودة وحجم</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              إذا كانت الصورة تحتوي على نصوص دقيقة (مثل تصوير شاشة لمستند)، يُفضل إبقاء الجودة بين 70% إلى 80% لضمان وضوح النص. أما إذا كانت صورة طبيعية أو فوتوغرافية، فيمكنك تقليل الجودة حتى 40% للحصول على حجم صغير جداً دون أن تلاحظ العين البشرية فرقاً كبيراً في الألوان.
            </p>
          </>
        ) : (
          <>
            <h2>Free Image Compressor & Optimizer (Offline-First)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The Free Image Compressor is your perfect tool to reduce image file sizes by up to 80% without noticeable quality loss. Unlike traditional websites that require you to upload your files, this tool leverages your browser's built-in Canvas API to process images locally. This means your personal photos, sensitive documents, and proprietary product shots never leave your device, ensuring 100% privacy and blazing-fast performance.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Web Development & SEO:</strong> Uploading heavy 5MB images drastically slows down website loading speeds. Use this tool to compress banner images to under 200KB, drastically improving your Google Lighthouse scores.</li>
              <li style={{ marginBottom: "8px" }}><strong>Government & Banking Portals:</strong> Many official portals restrict document uploads to a maximum of 1MB or 2MB. Use the quality slider to quickly shrink a high-res photo of your passport or ID to meet these strict limits.</li>
              <li style={{ marginBottom: "8px" }}><strong>Email Attachments:</strong> When sending a batch of photos to clients via email (which typically has a 25MB limit), pre-compressing the images allows you to attach significantly more photos in a single email.</li>
              <li style={{ marginBottom: "8px" }}><strong>Storage Optimization:</strong> Shrink large photos taken with high-end smartphone cameras before archiving them on your hard drive or Google Drive to save gigabytes of cloud storage space.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Tips for Optimal Compression</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              If your image contains fine text (like a screenshot of a document), we recommend keeping the quality slider between 70% to 80% to maintain legibility. For landscape or portrait photography, you can aggressively slide down to 40% or 50% to achieve massive file size reductions while keeping the visual fidelity largely intact to the human eye.
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
            "name": "هل يتم الاحتفاظ بنسخة من صوري الشخصية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا، صورك لا تُرفع إلى أي خادم. عملية الضغط تتم برمجياً داخل متصفحك (Google Chrome أو Safari) على جهازك الشخصي فقط."
            }
          },
          {
            "@type": "Question",
            "name": "ما هي صيغ الصور التي يدعمها المحول؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "الأداة تدعم حالياً جميع الصيغ الشائعة مثل JPG و PNG و WebP، وتقوم بتصدير النتيجة كملف JPG محسن."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Are my personal photos kept or stored anywhere?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, your photos are never uploaded to any server. The compression process is executed programmatically inside your browser (Chrome/Safari) exclusively on your local machine."
            }
          },
          {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool supports all common web formats including JPG, PNG, and WebP, and exports the optimized result as a JPG file."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
