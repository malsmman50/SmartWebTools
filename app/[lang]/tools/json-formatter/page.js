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
      question: "هل يتم إرسال بيانات JSON الخاصة بي إلى خوادمكم؟",
      answer: "لا، على الإطلاق. يعمل منسق الـ JSON الخاص بنا بالكامل محلياً داخل متصفحك باستخدام جافا سكريبت. لا يتم أبداً نقل أي بيانات عبر الشبكة أو حفظها على خوادمنا، مما يضمن بقاء بياناتك الحساسة خاصة تماماً."
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
      question: "Is my JSON data sent to your servers?",
      answer: "Absolutely not. Our JSON Formatter works entirely locally within your browser using JavaScript. No data is ever transmitted over the network or saved on our servers, ensuring your sensitive data remains completely private."
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
    <div className="container mx-auto px-4 py-8">
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/json-formatter`}
      />
      <FAQSchema faqs={faqs} />
      
      <JsonFormatterClient lang={lang} dict={dict} />

      <article className="mt-12 prose dark:prose-invert max-w-none">
        {isAr ? (
          <>
            <h2>منسق ومصحح كود JSON الشامل دون اتصال</h2>
            <p>
              يعد "منسق ومصحح كود JSON" أداة ضرورية لا غنى عنها لمطوري الويب، ومحللي البيانات، ومهندسي البرمجيات الذين يتعاملون بشكل متكرر مع واجهات برمجة التطبيقات (APIs)، وملفات التكوين، وتخزين البيانات. يعتبر JSON (JavaScript Object Notation) هو المعيار الأساسي لنقل البيانات عبر الإنترنت. ومع ذلك، غالباً ما تكون ملفات الـ JSON الخام، خاصة تلك المسترجعة مباشرة من الـ APIs، "مضغوطة" (تم إزالة جميع الفواصل والمسافات منها) لتقليل استهلاك النطاق الترددي (Bandwidth)، مما يجعل من الصعب جداً على الإنسان قراءتها أو فهمها أو اكتشاف الأخطاء فيها.
            </p>
            <p>
              يقوم منسق الـ JSON القوي الخاص بنا بتحويل النص الفوضوي وغير المقروء على الفور إلى كود منظم بشكل جميل، وملون، وسهل القراءة مع مسافات بادئة صحيحة. والأهم من ذلك، أنه يتميز بأداة تحقق متقدمة مدمجة تقوم بفحص قواعد بناء الجملة (Syntax) للـ JSON بحثاً عن الأخطاء الشائعة مثل علامات الاقتباس المفقودة، أو الفواصل الزائدة، أو الأقواس غير المغلقة، ويحدد بدقة مكان حدوث الخطأ ليوفر عليك ساعات طويلة من تصحيح الأخطاء. وعلى العكس من ذلك، إذا كنت بحاجة إلى تحسين الكود الخاص بك لبيئة الإنتاج (Production)، تتضمن الأداة ميزة "الضغط" (Minify) لتقليص حجم الـ JSON المنسق إلى أصغر حجم ممكن.
            </p>
            <p>
              تتمثل إحدى المزايا الرئيسية لأداتنا في التزامها المطلق بالخصوصية. على عكس العديد من المنسقات عبر الإنترنت التي تقوم بإرسال بيانات الـ API الحساسة أو مفاتيح التكوين الخاصة بك إلى خوادم خارجية، يعمل تطبيقنا محلياً بنسبة 100% داخل متصفح الويب الخاص بك. هذا يعني أن بياناتك لا تغادر جهاز الكمبيوتر الخاص بك أبداً، مما يوفر أماناً على مستوى المؤسسات للتعليمات البرمجية الخاصة بك. استمتع بتجربة تنسيق JSON سريعة، آمنة، وتعمل بدون إنترنت وبشكل مجاني بالكامل.
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
            <h2>Ultimate Offline JSON Formatter and Validator</h2>
            <p>
              The JSON Formatter and Validator is an essential utility for web developers, data analysts, and software engineers who frequently work with Application Programming Interfaces (APIs), configuration files, and data storage. JSON (JavaScript Object Notation) is the de facto standard for transmitting data across the internet. However, raw JSON files, especially those returned directly from APIs, are often "minified" (stripped of all line breaks and spaces) to reduce bandwidth, making them incredibly difficult for a human to read, debug, or understand.
            </p>
            <p>
              Our powerful JSON Formatter instantly transforms chaotic, unreadable text into beautifully structured, color-coded, and highly readable code with proper indentation. More importantly, it features an advanced built-in validator that checks your JSON syntax for common errors such as missing quotes, trailing commas, or unclosed brackets, pinpointing exactly where the error occurs to save you hours of debugging time. Conversely, if you need to optimize your code for production, the tool includes a "minify" feature to compress your formatted JSON back into the smallest possible file size. 
            </p>
            <p>
              A major advantage of our tool is its commitment to absolute privacy. Unlike many online formatters that send your potentially sensitive API data or configuration keys to remote servers, our application runs 100% locally in your web browser. This means your data never leaves your computer, providing enterprise-grade security for your proprietary code. Experience fast, secure, and offline JSON formatting completely free.
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
    </div>
  );
}
