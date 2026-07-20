import { getDictionary } from "@/app/dictionaries";
import ImageCompressorClient from "@/app/components/ImageCompressorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

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
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={isAr ? "ضاغط ومحسن الصور" : "Image Compressor"}
        description={isAr ? "أداة ضغط الصور وتقليل حجمها مجاناً" : "Free image compressor and size reducer"}
        applicationCategory="UtilityApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/image-compressor`}
      />

      <div className="page-header">
        <h1>{dict.compressor.title}</h1>
        <p>{dict.compressor.subtitle}</p>
      </div>

      <ImageCompressorClient lang={lang} dict={dict} />

      <article className="card guide-article blog-content">
        {isAr ? (
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

            <h2 style={{ fontSize: "2rem", marginBottom: "20px", marginTop: "32px" }}>الضغط الذكي للصور: تحسين الوسائط لأداء الويب وتقنية السيو (SEO)</h2>
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

            <h2 style={{ fontSize: "2rem", marginBottom: "20px", marginTop: "32px" }}>Intelligent Image Compressor: Optimize Media for Ultimate Web Performance & SEO</h2>
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

      <FAQSchema faqs={isAr ? [
        { question: "هل الأداة مجانية؟", answer: "نعم، أداة ضغط الصور مجانية بالكامل ولا تتطلب أي تسجيل." },
        { question: "هل يتم الاحتفاظ بنسخة من صوري الشخصية؟", answer: "لا، صورك لا تُرفع إلى أي خادم. عملية الضغط تتم برمجياً داخل متصفحك (Google Chrome أو Safari) على جهازك الشخصي فقط." },
        { question: "ما هي صيغ الصور التي يدعمها المحول؟", answer: "الأداة تدعم حالياً جميع الصيغ الشائعة مثل JPG و PNG و WebP، وتقوم بتصدير النتيجة كملف JPG محسن." },
        { question: "هل يؤدي الضغط إلى تصغير أبعاد الصورة (العرض والطول)؟", answer: "لا. يركز الضغط على البيانات المخفية وهيكل الملف والعمق اللوني. الأبعاد الفيزيائية تبقى كما هي بدون أي تغيير." },
        { question: "هل أستطيع استعادة الجودة المفقودة من الصور لاحقاً؟", answer: "لا، عند استخدام الضغط الفُقداني فإنه يتم مسح البيانات نهائياً. يجب الاحتفاظ بنسخة أصلية قبل الضغط." }
      ] : [
        { question: "Is this tool free?", answer: "Yes, the image compressor tool is completely free and requires no registration." },
        { question: "Are my personal photos kept or stored anywhere?", answer: "No, your photos are never uploaded to any server. The compression process is executed programmatically inside your browser (Chrome/Safari) exclusively on your local machine." },
        { question: "What image formats are supported?", answer: "The tool supports all common web formats including JPG, PNG, and WebP, and exports the optimized result as a JPG file." },
        { question: "Will compressing my image reduce its physical dimensions?", answer: "No. Image compression primarily targets the file's binary data structure and color depth. Physical dimensions remain untouched." },
        { question: "Can I reverse a lossy compressed image back to original quality?", answer: "No. Lossy compression is a strictly destructive, one-way process. Always maintain raw backups of your original high-resolution files." }
      ]} />
    </div>
  );
}
