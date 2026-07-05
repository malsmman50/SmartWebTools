import { getDictionary } from "@/app/dictionaries";
import ChatPdfClient from "@/app/components/ChatPdfClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/chatpdf`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/chatpdf`,
        "ar": `https://smartcalctools.xyz/ar/tools/chatpdf`,
      },
    },
    title: isAr ? "البحث الذكي والمحادثة الآمنة مع الـ PDF محلياً" : "Secure Local Semantic PDF Chat & Search",
    description: isAr 
      ? "تفاعل وابحث في مستندات الـ PDF الخاصة بك بشكل آمن وسري تماماً 100% داخل متصفحك باستخدام الذكاء الاصطناعي المحلي."
      : "Chat directly with your PDF documents securely in your browser using secure on-device AI embeddings.",
    openGraph: {
      title: isAr ? "البحث الذكي والمحادثة الآمنة مع الـ PDF محلياً" : "Secure Local Semantic PDF Chat & Search",
      description: isAr 
      ? "تفاعل وابحث في مستندات الـ PDF الخاصة بك بشكل آمن وسري تماماً 100% داخل متصفحك باستخدام الذكاء الاصطناعي المحلي."
      : "Chat directly with your PDF documents securely in your browser using secure on-device AI embeddings.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "البحث الذكي والمحادثة الآمنة مع الـ PDF محلياً" : "Secure Local Semantic PDF Chat & Search",
      description: isAr 
      ? "تفاعل وابحث في مستندات الـ PDF الخاصة بك بشكل آمن وسري تماماً 100% داخل متصفحك باستخدام الذكاء الاصطناعي المحلي."
      : "Chat directly with your PDF documents securely in your browser using secure on-device AI embeddings.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function ChatPdfPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  const t = dict.chatpdf;

  const softwareName = isAr ? "محادثة PDF الذكية والمحلية" : "Local ChatPDF Tool";
  const softwareDescription = isAr 
    ? "تفاعل وابحث في مستندات الـ PDF الخاصة بك بشكل آمن وسري تماماً 100% داخل متصفحك."
    : "Chat directly with your PDF documents securely in your browser using local AI.";

  const faqs = isAr ? [
    {
      question: "هل يتم رفع ملف PDF الخاص بي إلى الإنترنت؟",
      answer: "لا، تتم معالجة ملف PDF الخاص بك بالكامل محليًا داخل متصفح الويب الخاص بك. نحن لا نقوم برفع أو تخزين أو نقل أي جزء من مستندك إلى خوادمنا."
    },
    {
      question: "كيف يعمل البحث الدلالي المحلي؟",
      answer: "تستخدم الأداة نموذج ذكاء اصطناعي متطور يعمل على جهازك لإنشاء تضمينات نصية (Embeddings) مباشرة في المتصفح. هذا يسمح لها بفهم معنى وسياق أسئلتك للعثور على الإجابات ذات الصلة داخل المستند."
    },
    {
      question: "هل يمكنني استخدام هذه الأداة بدون إنترنت؟",
      answer: "بمجرد تحميل صفحة الويب ونماذج الذكاء الاصطناعي الضرورية بالكامل في متصفحك، يمكن أن تتم معالجة المستندات والبحث دون الحاجة إلى اتصال نشط بالإنترنت بالخوادم الخارجية."
    },
    {
      question: "ما هي أنواع ملفات PDF المدعومة؟",
      answer: "يمكنك رفع ملفات PDF النصية مثل التقارير، الكتب، الأوراق البحثية، والعقود القانونية. لا يمكن البحث في المستندات الممسوحة ضوئياً أو الصور داخل ملفات PDF التي تفتقر إلى طبقات نصية."
    },
    {
      question: "هل هناك حد أقصى لحجم ملف PDF؟",
      answer: "نظراً لأن المعالجة تتم محلياً، فإن الحد الأقصى لحجم الملف يعتمد بشكل أساسي على ذاكرة جهازك وقدرات متصفحك. للحصول على أفضل أداء، نوصي باستخدام ملفات يقل حجمها عن 50 ميغابايت."
    }
  ] : [
    {
      question: "Is my PDF document uploaded to the internet?",
      answer: "No, your PDF document is completely processed locally within your web browser. We do not upload, store, or transmit any part of your document to our servers."
    },
    {
      question: "How does the local semantic search work?",
      answer: "The tool uses an advanced on-device AI model to create text embeddings directly in your browser. This allows it to understand the meaning and context of your questions to find relevant answers within your document."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Once the web page and its necessary AI models are fully loaded in your browser, the document processing and searching can occur without needing an active internet connection to external servers."
    },
    {
      question: "What types of PDF files are supported?",
      answer: "You can upload text-based PDF files such as reports, books, research papers, and legal contracts. Scanned documents or images within PDFs that lack text layers cannot be searched."
    },
    {
      question: "Is there a file size limit for the PDFs?",
      answer: "Since the processing is done locally, the file size limit is primarily determined by your device's memory and browser capabilities. For optimal performance, we recommend using files under 50MB."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/chatpdf`}
      />
      
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

      <ChatPdfClient lang={lang} dict={dict} />

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>المحادثة الذكية والبحث الدلالي الآمن في ملفات PDF محلياً</h2>
            <p>
              مرحباً بك في أداة "ChatPDF" الأكثر تطوراً وأماناً على الإنترنت. على عكس خدمات محادثة مستندات PDF التقليدية التي تقوم برفع ملفاتك الحساسة إلى خوادم خارجية، تعمل أداتنا لمعالجة ومحادثة ملفات PDF بالكامل داخل متصفحك بشكل محلي. من خلال استخدام أحدث تقنيات الذكاء الاصطناعي ومعالجة اللغات الطبيعية التي تعمل على جهازك مباشرة (On-device AI)، نضمن لك أن ملفاتك لن تغادر حاسوبك أبداً. هذا يوفر خصوصية وسرية تامة بنسبة 100% لمستنداتك الشخصية، الأكاديمية، أو الخاصة بالعمل.
            </p>
            <p>
              يمكنك الآن الاستعلام فوراً عن التقارير الطويلة، استخراج بيانات محددة من الأوراق البحثية، والتفاعل ديناميكياً مع محتوى الـ PDF دون أي قلق بشأن تسريب البيانات أو تتبع الأطراف الثالثة. يدعم التطبيق تقنية "البحث الدلالي"، مما يعني أنه يفهم سياق أسئلتك بدلاً من مجرد البحث عن الكلمات المفتاحية المطابقة تماماً. 
            </p>
            <p>
              سواء كنت طالباً يراجع مذكرات محاضرات مكثفة، أو محامياً يحلل عقوداً قانونية، أو باحثاً يستخرج معلومات هامة من المجلات العلمية، تمنحك هذه الأداة القدرة على العثور على المعلومات بكفاءة وأمان تام. اكتشف مستقبل التفاعل مع المستندات من خلال تطبيق محادثة PDF الذي لا يحتفظ بأي بيانات إطلاقاً ويوفر سرعة استجابة فائقة.
            </p>

            <h2>كيف يعمل الذكاء الاصطناعي المحلي بالكامل (أمن صفري)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تتطلب أدوات "التحدث مع PDF" التقليدية رفع ملفاتك الحساسة وعقودك ومستنداتك المالية إلى خوادمها السحابية البعيدة لتحليلها، وهو ما يمثل خطورة بالغة على السرية والخصوصية.
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

            <h3>أهم الأسئلة الشائعة حول أداة ChatPDF المحلية</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Secure Local PDF Chat and Semantic Search</h2>
            <p>
              Welcome to the most advanced and secure ChatPDF tool available online. Unlike traditional PDF chatting services that upload your sensitive documents to remote servers, our Local PDF Chat tool processes everything directly within your browser. By utilizing state-of-the-art on-device AI embeddings and natural language processing, your files never leave your computer. This guarantees 100% privacy and confidentiality for your personal, academic, or corporate documents.
            </p>
            <p>
              You can instantly query long reports, extract specific data from research papers, and interact dynamically with your PDF content without worrying about data breaches or third-party tracking. The application supports semantic search, meaning it understands the context of your questions rather than just matching exact keywords.
            </p>
            <p>
              Whether you are a student reviewing extensive lecture notes, a lawyer analyzing contracts, or a researcher extracting insights from scientific journals, this tool empowers you to find information efficiently and securely. Experience the future of document interaction with our zero-data-retention ChatPDF application, providing both unmatched privacy and lightning-fast responsiveness.
            </p>

            <h2>How 100% Client-Side AI Works (Zero Trust Security)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Traditional "Chat with PDF" tools require you to upload your sensitive files to their backend servers. This is a massive privacy risk.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              <strong>SmartCalcTools</strong> takes a revolutionary "Zero Trust" approach. When you upload a PDF here, our website downloads a highly-optimized Multilingual AI model directly into your browser cache, running on your local machine.
            </p>

            <h3 style={{ marginTop: "24px" }}>The RAG Architecture (Retrieval-Augmented Generation)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              1. <strong>Extraction:</strong> Your PDF is parsed locally using PDF.js.<br/>
              2. <strong>Chunking:</strong> The text is split into paragraphs.<br/>
              3. <strong>Embedding:</strong> The local AI converts each paragraph into a mathematical Vector representation.<br/>
              4. <strong>Semantic Search:</strong> When you ask a question, the AI converts your question into a vector and uses Cosine Similarity to find the exact paragraph.
            </p>

            <h3>Frequently Asked Questions about our Local ChatPDF Tool</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        )}
      </article>

      <FAQSchema faqs={faqs} />
    </div>
  );
}
