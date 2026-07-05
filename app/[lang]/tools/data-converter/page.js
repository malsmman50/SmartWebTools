import { getDictionary } from "@/app/dictionaries";
import DataConverterClient from "@/app/components/DataConverterClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.data_converter.title}`,
    description: dict.data_converter.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/data-converter`,
      languages: {
        "en": "https://smartcalctools.xyz/en/tools/data-converter",
        "ar": "https://smartcalctools.xyz/ar/tools/data-converter",
      },
    },
    openGraph: {
      title: `${dict.data_converter.title}`,
      description: dict.data_converter.subtitle,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${dict.data_converter.title}`,
      description: dict.data_converter.subtitle,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function DataConverterPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  const softwareName = isAr ? "محول وتنسيق البيانات اللحظي الآمن" : "Secure Live Data Format Converter";
  const softwareDescription = isAr 
    ? "أداة تحويل البيانات الذكية توفر لك بيئة آمنة وسريعة للتحويل بين أشهر صيغ البيانات التي يستخدمها المطورون والمبرمجون: JSON، XML، YAML، و CSV."
    : "The Smart Data Format Converter provides a secure, lightning-fast environment to switch between the most popular data serialization formats used by developers: JSON, XML, YAML, and CSV.";

  const faqs = isAr ? [
    {
      question: "هل يتم حفظ بياناتي أو إرسالها للخوادم أثناء عملية التحويل؟",
      answer: "لا، إطلاقاً. الأداة تعمل 100% داخل متصفحك ولا تتصل بأي خوادم خارجية لمعالجة البيانات."
    },
    {
      question: "كيف أحول بيانات JSON المستلمة من API إلى جدول Excel؟",
      answer: "فقط الصق كود الـ JSON، ثم حدد الصيغة المستهدفة كـ (CSV). انسخ الناتج واحفظه كملف بلاحقة .csv لفتحه في Excel بسهولة."
    }
  ] : [
    {
      question: "Is my data saved or sent to a server during conversion?",
      answer: "Absolutely not. The tool is 100% client-side, meaning the parsing and conversion processes happen completely inside your browser."
    },
    {
      question: "How do I convert a JSON API response into an Excel table?",
      answer: "Simply paste your JSON code, select 'CSV' as the target format, and then copy the resulting output. Save it as a .csv file and it will open perfectly in Excel."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/data-converter`}
      />
      
      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{dict.data_converter.title}</h1>
        <p>{dict.data_converter.subtitle}</p>
      </div>
      
      <DataConverterClient dict={dict} lang={lang} />

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>محول وتنسيق البيانات اللحظي الآمن</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              أداة تحويل البيانات الذكية توفر لك بيئة آمنة وسريعة للتحويل بين أشهر صيغ البيانات التي يستخدمها المطورون والمبرمجون: JSON، XML، YAML، و CSV. تتميز هذه الأداة بأنها تعمل بشكل كامل داخل متصفحك (Offline-First)، مما يعني أن بياناتك الحساسة أو ملفات الإعدادات الخاصة بك لا يتم إرسالها إطلاقاً إلى أي خادم خارجي.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>تحويل ملفات إعدادات التطبيقات:</strong> الكثير من التطبيقات الحديثة (مثل Docker أو Kubernetes) تستخدم YAML بدلاً من JSON لصيغ التكوين (Config files). يمكنك تحويل ملف <code>config.json</code> بكل سهولة إلى <code>config.yaml</code> جاهز للعمل.</li>
              <li style={{ marginBottom: "8px" }}><strong>تصدير البيانات لاستخدامات جداول البيانات (Excel):</strong> عندما يقوم مبرمج الواجهة الخلفية (Backend) بتزويدك ببيانات المستخدمين أو المنتجات بصيغة JSON، يمكنك تحويلها هنا فوراً إلى CSV لفتحها وتحليلها في Microsoft Excel أو Google Sheets.</li>
              <li style={{ marginBottom: "8px" }}><strong>تكامل الأنظمة القديمة (Legacy Systems):</strong> بعض الأنظمة المصرفية أو البرمجيات القديمة لا تقبل إلا بصيغة XML. باستخدام هذه الأداة يمكنك تحويل الردود المستلمة بصيغة JSON إلى XML ليتوافق مع هذه الأنظمة.</li>
              <li style={{ marginBottom: "8px" }}><strong>تصحيح واختبار البيانات (Debugging):</strong> يمكنك نسخ مخرجات واجهات الـ APIs المعقدة ولصقها هنا كـ JSON وتحويلها لـ YAML لتصبح أسهل للقراءة والتحليل السريع.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>لماذا التحويل المحلي أفضل؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              مفاتيح الـ API، ومعلومات الوصول إلى قواعد البيانات، والبيانات الحساسة للعملاء غالباً ما تكون مخزنة في ملفات JSON أو YAML. استخدام أدوات الويب التقليدية للتحويل قد يعرض هذه البيانات لخطر التسريب. أداتنا تقوم بمعالجة هذه الملفات محلياً (Client-Side) باستخدام مكتبات قوية وموثوقة.
            </p>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول محول البيانات</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Secure Live Data Format Converter</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The Smart Data Format Converter provides a secure, lightning-fast environment to switch between the most popular data serialization formats used by developers: JSON, XML, YAML, and CSV. Built with an "Offline-First" privacy approach, the entire conversion engine runs strictly in your browser. This means your sensitive configuration files, API payloads, or customer data are never transmitted to external servers.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Application Configuration Conversion:</strong> Many modern DevOps tools (like Docker or Kubernetes) rely heavily on YAML, while web APIs prefer JSON. You can easily convert a bulky <code>config.json</code> into a clean, human-readable <code>config.yaml</code> file instantly.</li>
              <li style={{ marginBottom: "8px" }}><strong>Data Export for Spreadsheets (Excel):</strong> If a backend developer provides you with a list of users or analytics in JSON format, you can convert it to CSV here, allowing non-technical teams to open and analyze the data in Microsoft Excel or Google Sheets.</li>
              <li style={{ marginBottom: "8px" }}><strong>Legacy Systems Integration:</strong> Some older enterprise or banking software systems strictly accept XML payloads. You can seamlessly convert modern REST API JSON responses into strictly formatted XML to ensure compatibility.</li>
              <li style={{ marginBottom: "8px" }}><strong>Debugging & Readability:</strong> JSON structures can get deeply nested and hard to read. By copying complex JSON and converting it to YAML, you remove the brackets and quotes, making it significantly easier to debug and scan visually.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Why Local Conversion Matters?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              API keys, database credentials, and proprietary business logic are often stored inside data serialization files. Uploading these to standard online converter websites exposes you to severe data leakage risks. Our tool eliminates this risk entirely by processing logic locally on your device via robust parsing libraries.
            </p>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>{faq.answer}</p>
              </div>
            ))}
          </>
        )}
      </article>
      <FAQSchema faqs={faqs} />
    </div>
  );
}
