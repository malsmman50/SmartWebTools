import { getDictionary } from "@/app/dictionaries";
import JsonFormatterClient from "@/app/components/JsonFormatterClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/json-formatter`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/json-formatter`,
        "ar": `https://smartcalctools.xyz/ar/tools/json-formatter`,
      },
    },
    title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
    description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
    openGraph: {
      title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
      description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "منسق ومصحح كود JSON آمن دون اتصال" : "Secure Offline JSON Formatter & Validator",
      description: isAr 
      ? "نسّق، تحقق من صحة، واضغط نصوص الـ JSON الخاصة بك فوراً وبخصوصية تامة 100% داخل جهازك دون رفع أي بيانات للخارج."
      : "Clean, format, validate, and minify JSON data instantly in your browser entirely offline and securely.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function JsonFormatterPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  const softwareName = isAr ? "منسق ومصحح JSON" : "JSON Formatter and Validator";
  const softwareDescription = isAr 
    ? "أداة مجانية لتنسيق والتحقق من صحة وضغط أكواد JSON فورياً وبشكل محلي."
    : "Free tool to format, validate, and minify JSON code instantly and locally.";

  const faqs = isAr ? [
    {
      question: "في ماذا يُستخدم الـ JSON؟",
      answer: "الـ JSON (JavaScript Object Notation) هو تنسيق خفيف لتبادل البيانات. من السهل على البشر قراءته وكتابته ومن السهل على الآلات تحليله وإنشائه. يُستخدم بشكل أساسي لنقل البيانات بين الخادم وتطبيق الويب كبديل لـ XML."
    },
    {
      question: "ما الفرق بين JSON وكائنات JavaScript؟",
      answer: "صيغة JSON هي صيغة نصية مبنية على كائنات JavaScript ولكنها تخضع لقواعد صارمة للغاية؛ حيث يجب إحاطة جميع الأسماء بعلامات اقتباس مزدوجة، ولا يُسمح بالوظائف (Functions) أو القيم غير المعرفة (undefined)."
    },
    {
      question: "هل يتم إرسال بيانات JSON الخاصة بي إلى خوادمكم؟",
      answer: "لا، على الإطلاق. يعمل منسق الـ JSON الخاص بنا بالكامل محلياً داخل متصفحك باستخدام جافا سكريبت. لا يتم أبداً نقل أي بيانات عبر الشبكة أو حفظها على خوادمنا، مما يضمن بقاء بياناتك الحساسة خاصة تماماً."
    },
    {
      question: "هل الأداة آمنة للبيانات الحساسة؟",
      answer: "نعم، يتم تشغيل الأداة محلياً 100% داخل المتصفح دون إرسال أي طلبات شبكة خارجية، وهي مناسبة ومطابقة لمعايير الأمان المؤسسية."
    },
    {
      question: "ماذا تفعل وظيفة \"الضغط\" (Minify)؟",
      answer: "تقوم عملية الضغط بإزالة جميع المسافات البيضاء وفواصل الأسطر والمسافات البادئة غير الضرورية من كود الـ JSON الخاص بك. هذا يقلل بشكل كبير من حجم الملف، مما يجعله أسرع في النقل عبر الإنترنت، وهو مثالي لبيئات الإنتاج (Production)."
    },
    {
      question: "كيف يكتشف المصحح الأخطاء؟",
      answer: "تحاول الأداة تحليل النص المدخل باستخدام قواعد الـ JSON الصارمة. إذا واجهت أخطاء في بناء الجملة (Syntax) مثل الأقواس المفقودة، أو الفواصل في غير محلها، أو المفاتيح غير المحاطة بعلامات اقتباس، فإنها تتوقف وتنبهك برسالة خطأ توضح المشكلة."
    },
    {
      question: "هل يمكنني استخدام هذه الأداة بدون إنترنت؟",
      answer: "نعم! بمجرد تحميل الموقع بالكامل في متصفحك، يمكنك قطع الاتصال بالإنترنت والاستمرار في تنسيق والتحقق من صحة مستندات JSON إلى أجل غير مسمى."
    }
  ] : [
    {
      question: "What is JSON used for?",
      answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. It is primarily used to transmit data between a server and web application as an alternative to XML."
    },
    {
      question: "What is the difference between JSON and JavaScript objects?",
      answer: "JSON is a text-based format. In JSON, all property names must be double-quoted strings, and functions or undefined values are not allowed."
    },
    {
      question: "Is my JSON data sent to your servers?",
      answer: "Absolutely not. Our JSON Formatter works entirely locally within your browser using JavaScript. No data is ever transmitted over the network or saved on our servers, ensuring your sensitive data remains completely private."
    },
    {
      question: "Is this JSON formatter safe for sensitive data?",
      answer: "Yes. Since our tool runs entirely offline in your browser, it is perfectly safe to paste sensitive database dumps or tokens. No network requests are made."
    },
    {
      question: "What does the 'Minify' function do?",
      answer: "Minifying removes all unnecessary whitespace, line breaks, and indentation from your JSON code. This drastically reduces the file size, making it faster to transmit over the internet, which is ideal for production environments."
    },
    {
      question: "How does the validator find errors?",
      answer: "The tool attempts to parse your input string using strict JSON rules. If it encounters syntax errors like missing brackets, misplaced commas, or unquoted keys, it stops and alerts you with an error message detailing the issue."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes! Once the website is fully loaded in your browser, you can disconnect from the internet and continue formatting and validating JSON documents indefinitely."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/json-formatter`}
      />

      <div className="page-header">
        <h1>{dict.json.title}</h1>
        <p>{dict.json.subtitle}</p>
      </div>
      
      <JsonFormatterClient lang={lang} dict={dict} />

      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>الدليل الشامل لتنسيق والتحقق من صحة JSON</h2>
            <p>
              تعد صيغة JSON (JavaScript Object Notation) المعيار الأساسي لتبادل البيانات على شبكة الويب الحديثة. تتميز بخفتها وسهولة قراءتها وكتابتها من قبل البشر وسهولة تحليلها وتوليدها من قبل الآلات. سواء كنت مهندس خلفية برمجية تصمم واجهة برمجة تطبيقات REST، أو مطور واجهة أمامية، فإن JSON هي اللغة العالمية التي تربط الأنظمة ببعضها.
            </p>

            <h3>لماذا تحتاج لتنسيق الـ JSON؟</h3>
            <p>
              يعد "منسق ومصحح كود JSON" أداة ضرورية لا غنى عنها لمطوري الويب، ومحللي البيانات، ومهندسي البرمجيات الذين يتعاملون بشكل متكرر مع واجهات برمجة التطبيقات (APIs)، وملفات التكوين، وتخزين البيانات. يعتبر JSON هو المعيار الأساسي لنقل البيانات عبر الإنترنت. ومع ذلك، غالباً ما تكون ملفات الـ JSON الخام مضغوطة (minify) في سطر واحد لتوفير النطاق الترددي أثناء النقل عبر الشبكة. ورغم أن هذا رائع للأداء، إلا أنه مستحيل للاستكشاف البصري وتصحيح الأخطاء.
            </p>
            <p>
              يقوم منسق الـ JSON القوي الخاص بنا بإعادة صياغة الكود وإضافة مسافات بادئة وسطور جديدة ليسهل فهمه بالعين المجردة واكتشاف الفواصل أو الأقواس الناقصة. والأهم من ذلك، أنه يتميز بأداة تحقق متقدمة مدمجة تقوم بفحص قواعد بناء الجملة (Syntax) للـ JSON بحثاً عن الأخطاء الشائعة مثل علامات الاقتباس المفقودة، أو الفواصل الزائدة، أو الأقواس غير المغلقة، ويحدد بدقة مكان حدوث الخطأ ليوفر عليك ساعات طويلة من تصحيح الأخطاء. وعلى العكس من ذلك، إذا كنت بحاجة إلى تحسين الكود الخاص بك لبيئة الإنتاج (Production)، تتضمن الأداة ميزة "الضغط" (Minify) لتقليص حجم الـ JSON المنسق إلى أصغر حجم ممكن.
            </p>

            <h3>لماذا المعالجة المحلية هي الأكثر أماناً؟</h3>
            <p>
              تقوم العديد من الأدوات عبر الإنترنت بإرسال نصوص الـ JSON الخاصة بك إلى خوادمها الخاصة لمعالجتها. إذا كنت تقوم بتنسيق بيانات حساسة تحتوي على كلمات مرور أو رموز مصادقة (auth tokens)، فقد يعرضك ذلك لخطر تسريب البيانات. منصة SmartCalcTools تقوم بالمعالجة محلياً بالكامل 100% داخل متصفحك. هذا يعني أن بياناتك لا تغادر جهاز الكمبيوتر الخاص بك أبداً، مما يوفر أماناً على مستوى المؤسسات للتعليمات البرمجية الخاصة بك. استمتع بتجربة تنسيق JSON سريعة، آمنة، وتعمل بدون إنترنت وبشكل مجاني بالكامل.
            </p>

            <h3>الأسئلة الشائعة حول منسق ومصحح JSON</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>The Complete Guide to JSON Formatting and Validation</h2>
            <p>
              JSON (JavaScript Object Notation) is the standard data interchange format of the modern web. It is lightweight, easy for humans to read and write, and easy for machines to parse and generate. Whether you are a backend engineer designing a REST API or a frontend developer debugging state, JSON is the universal language.
            </p>

            <h3>Why Format Your JSON?</h3>
            <p>
              The JSON Formatter and Validator is an essential utility for web developers, data analysts, and software engineers who frequently work with Application Programming Interfaces (APIs), configuration files, and data storage. Raw JSON data often comes minified (compressed into a single line) to save bandwidth. While this is great for performance, it is terrible for debugging. 
            </p>
            <p>
              A JSON Formatter takes minified code and adds proper indentation, line breaks, and spacing. This instantly highlights the hierarchy, allowing you to easily spot errors. More importantly, it features an advanced built-in validator that checks your JSON syntax for common errors such as missing quotes, trailing commas, or unclosed brackets, pinpointing exactly where the error occurs to save you hours of debugging time. Conversely, if you need to optimize your code for production, the tool includes a "minify" feature to compress your formatted JSON back into the smallest possible file size. 
            </p>

            <h3>Why Use a Client-Side Formatter?</h3>
            <p>
              Many free online formatting tools send your pasted JSON to a backend server. If you are formatting API payloads containing sensitive user data, auth tokens, or proprietary business logic, you are risking a massive data leak. SmartCalcTools processes your JSON 100% locally in your browser, ensuring enterprise-grade security. This means your data never leaves your computer, providing enterprise-grade security for your proprietary code. Experience fast, secure, and offline JSON formatting completely free.
            </p>

            <h3>Frequently Asked Questions</h3>
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
