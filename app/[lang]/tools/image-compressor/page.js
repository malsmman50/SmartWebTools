import { getDictionary } from "@/app/dictionaries";
import ImageCompressorClient from "@/app/components/ImageCompressorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/image-compressor`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/image-compressor`,
        "ar": `https://smartcalctools.xyz/ar/tools/image-compressor`,
      },
    },
    title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
    description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
    openGraph: {
      title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
      description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "أداة ضغط الصور المحلية الآمنة" : "Secure Local Image Compressor",
      description: isAr 
      ? "اضغط صورك بصيغ JPG و PNG و WebP محلياً بالكامل داخل متصفحك دون رفعها إلى أي سيرفر، للحفاظ على الخصوصية."
      : "Compress JPG, PNG, and WebP images locally in your browser. 100% private, no server uploads.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function ImageCompressorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  
  return (
    <>
      <ImageCompressorClient lang={lang} dict={dict} />

      {/* Massive AdSense SEO Content - Below the Fold */}
      <div className="container" style={{ padding: "0 20px 60px 20px", maxWidth: "1400px" }}>
        <article className="card" style={{ marginTop: "20px", padding: "40px", lineHeight: "1.8", borderTop: "4px solid var(--primary)" }}>
          {isAr ? (
            <>
              <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>الضغط الذكي للصور: تحسين الوسائط لأداء الويب وتقنية السيو (SEO)</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                في المشهد الرقمي الحديث للويب، تُعد سرعة تحميل الصفحة عاملاً أساسياً في الترتيب لمحركات البحث وتجربة المستخدم. الصور الثقيلة وغير المحسنة هي السبب الأول لبطء المواقع. أداة "ضغط الصور الذكي" تستخدم خوارزميات متقدمة لتقليل حجم الملفات بشكل كبير مع الحفاظ على دقة بصرية شبه مثالية، مما يساعد على تحميل المواقع فوراً وتوفير التكاليف.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>المنهجية: كيف تعمل خوارزميات ضغط الصور</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                ضغط الصور هو علم معقد يتضمن الرياضيات، والإدراك البصري البشري، والترميز المتقدم.
              </p>
              
              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>1. الضغط الفُقداني مقابل اللا-فُقداني (Lossless vs Lossy)</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                <strong>الضغط اللا-فُقداني (Lossless):</strong> تعتمد هذه الطريقة على إعادة ترتيب البيانات بدون حذف أي بكسل، عن طريق إزالة البيانات الوصفية (EXIF metadata) المخفية مثل معلومات الكاميرا والإحداثيات. حجم الملف ينقص بنسبة بسيطة (10-20٪) ولكن الجودة تظل أصلية 100٪.
                <br />
                <strong>الضغط الفُقداني (Lossy):</strong> هذه الطريقة القوية تتخلص من بيانات بصرية عالية التردد لا يمكن للعين البشرية ملاحظتها. على الرغم من حذف البيانات إلى الأبد، فإن هذه الطريقة يمكنها تقليص الحجم بنسبة تصل إلى 90٪ دون تدهور ملحوظ في الرؤية العادية.
              </p>

              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>2. تقنية (Chroma Subsampling)</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                النظام البصري البشري حساس جدًا لتغيرات السطوع والتباين، ولكنه أقل حساسية في إدراك التغيرات الدقيقة في الألوان. يقوم محرك الضغط باستغلال هذه الحقيقة لحذف جزء من معلومات الألوان مع الاحتفاظ بمعلومات السطوع، مما يخفض الحجم إلى النصف والنتيجة تبدو مثالية للعين.
              </p>

              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>3. تفوق تقنية WebP الحديثة</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                صيغة WebP (المطورة من جوجل) تستخدم تقنيات تكرار توقعية معقدة لتقليل المساحة. ملفات WebP عادة ما تكون أصغر بـ 25٪ إلى 34٪ من صور JPEG مع نفس الجودة، وهي مثالية للاستخدام على المواقع الإلكترونية الحديثة.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>تطبيقات الأداة وسيناريوهات الاستخدام</h3>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>المتاجر الإلكترونية (E-commerce):</strong> تحسين صور مئات المنتجات لتقليل سرعة تحميل الصفحات وتقليل نسبة انسحاب العملاء (Bounce Rate)، مما يعزز أرباح المتجر.</li>
                <li style={{ marginBottom: "8px" }}><strong>ملفات المصورين:</strong> استخدام الضغط (Lossless) للحفاظ على تدرجات الألوان الطبيعية للصور الفنية وتقليل حجم التخزين السحابي دون خسارة الجودة.</li>
                <li style={{ marginBottom: "8px" }}><strong>تطبيقات الجوال:</strong> ضغط واجهات التطبيق الرسومية بصيغة WebP للحفاظ على صغر حجم التطبيق الكلي وجعل تحميله أسهل عبر شبكات 4G.</li>
              </ul>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل يؤدي الضغط إلى تصغير أبعاد الصورة (العرض والطول)؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>لا. يركز الضغط على البيانات المخفية وهيكل الملف والعمق اللوني. الأبعاد الفيزيائية (مثل 1920x1080) تبقى كما هي بدون أي تغيير.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>ما هو الحجم المثالي للصور في مواقع الإنترنت؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>بالنسبة لصور الترويسة الكبيرة، يجب أن تستهدف حجماً يقل عن 200 كيلوبايت. أما لصور المقالات العادية فيفضل أن تكون أقل من 100 كيلوبايت.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل أستطيع استعادة الجودة المفقودة من الصور لاحقاً؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>لا، عند استخدام الضغط الفُقداني (Lossy) فإنه يتم مسح البيانات نهائياً. يجب عليك دائماً الاحتفاظ بنسخة من الصورة الأصلية ذات الدقة العالية قبل الضغط.</p>
              </div>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>تصريح الخصوصية (Zero-Trust Privacy)</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                نحن نعطي أولوية قصوى لخصوصيتك. جميع عمليات معالجة وضغط الصور تتم بالكامل <strong>محلياً داخل ذاكرة متصفحك</strong>. لا يتم رفع أي صورة أو ملف إلى خوادمنا إطلاقاً، مما يضمن سرية ملفاتك الشخصية وعدم تتبع بيانات الموقع المخفية (GPS Metadata).
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Intelligent Image Compressor: Optimize Media for Ultimate Web Performance & SEO</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                In the modern digital web landscape, page load speed is a massive, strictly enforced ranking factor for Google's Core Web Vitals algorithms. Heavy, unoptimized images are universally the leading cause of slow, unresponsive websites. Our Intelligent Image Compressor utilizes advanced algorithmic data reduction to drastically shrink file sizes while maintaining near-perfect visual fidelity.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>The Deep Methodology: How Image Compression Actually Works</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                Image compression is an incredibly deep computer science discipline involving psychoacoustics (or psychovisuals), mathematical transforms, and strict encoding logic.
              </p>

              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>1. Lossless vs. Lossy Mathematical Algorithms</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                <strong>Lossless Compression:</strong> This method scans the file's binary code to find repeating patterns of identical pixels and encodes them efficiently without deleting a single piece of visual data. It aggressively strips out hidden, unnecessary EXIF metadata (such as camera models and GPS coordinates). The output remains visually identical to the original, though size reduction is typically modest (10% to 20%).<br/>
                <strong>Lossy Compression:</strong> This aggressive method permanently discards high-frequency visual data that the human eye cannot easily perceive. While the data is gone forever, this method can effortlessly reduce raw file sizes by up to 90% with minimal visual degradation.
              </p>

              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>2. Chroma Subsampling</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                The human optical system is incredibly sensitive to changes in brightness and contrast but terrible at detecting fine microscopic details in color gradients. Our compression engine exploits this flaw via chroma subsampling, keeping the brightness map perfectly intact while deleting color resolution data.
              </p>

              <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>3. The Supremacy of WebP</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                Modern formats like WebP (developed by Google) utilize complex predictive coding, making them 25% to 34% smaller than equivalent JPEGs at perfectly identical quality scores, driving massive SEO benefits for web performance.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Real-World Practical Scenarios & Technical Use Cases</h3>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>E-commerce Optimization:</strong> 500 product images weighing 3MB each will destroy conversion rates. Passing them through lossy compression to 150KB reduces payload size and stops abandoned carts.</li>
                <li style={{ marginBottom: "8px" }}><strong>Photography Portfolios:</strong> Professionals can safely use Lossless compression to strip hidden ICC color profiles and EXIF metadata to save 15% on costly local storage without destroying their art's RGB values.</li>
                <li style={{ marginBottom: "8px" }}><strong>Mobile App Asset Pipelines:</strong> Developers compress static UI elements in WebP to keep `.apk` bundle sizes small, increasing downloads over slow cellular networks.</li>
              </ul>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Will compressing my image reduce its physical dimensions?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>No. Image compression primarily targets the file's binary data structure and color depth. The physical dimensions (width and height) remain 100% untouched.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>What is the optimal target file size for websites?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>For large hero banners, aim for under 200KB. For standard content images, aim for under 100KB. Using modern WebP compression makes these targets highly achievable.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Can I reverse a lossy compressed image back to original quality?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>No. Lossy compression is a strictly destructive, one-way process. Always maintain raw backups of your original high-resolution files before compression.</p>
              </div>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>Zero-Trust Privacy & Security</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                Your data privacy is our absolute priority. All image processing and compression handled by this digital tool occur <strong>entirely on the client side (locally within your web browser)</strong>. Your sensitive, raw image files are never uploaded to our servers. Your personal media and EXIF location data remain 100% private.
              </p>
            </>
          )}
        </article>

        {/* JSON-LD Structured Data for AdSense SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": isAr ? [
            {
              "@type": "Question",
              "name": "هل يؤدي الضغط إلى تصغير أبعاد الصورة (العرض والطول)؟",
              "acceptedAnswer": { "@type": "Answer", "text": "لا. يركز الضغط على البيانات المخفية وهيكل الملف والعمق اللوني. الأبعاد الفيزيائية تبقى كما هي بدون أي تغيير." }
            },
            {
              "@type": "Question",
              "name": "هل أستطيع استعادة الجودة المفقودة من الصور لاحقاً؟",
              "acceptedAnswer": { "@type": "Answer", "text": "لا، عند استخدام الضغط الفُقداني فإنه يتم مسح البيانات نهائياً. يجب الاحتفاظ بنسخة أصلية قبل الضغط." }
            }
          ] : [
            {
              "@type": "Question",
              "name": "Will compressing my image reduce its physical dimensions?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. Image compression primarily targets the file's binary data structure and color depth. Physical dimensions remain untouched." }
            },
            {
              "@type": "Question",
              "name": "Can I reverse a lossy compressed image back to original quality?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. Lossy compression is a strictly destructive, one-way process. Always maintain raw backups of your original high-resolution files." }
            }
          ]
        }).replace(/</g, '\\u003c')}} />
      </div>
    </>
  );
}

