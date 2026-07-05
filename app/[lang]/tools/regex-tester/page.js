import { getDictionary } from "@/app/dictionaries";
import RegexTesterClient from "@/app/components/RegexTesterClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.regex.title}`,
    description: dict.regex.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/regex-tester`,
      languages: {
        "en": "https://smartcalctools.xyz/en/tools/regex-tester",
        "ar": "https://smartcalctools.xyz/ar/tools/regex-tester",
      },
    },
    openGraph: {
      title: `${dict.regex.title}`,
      description: dict.regex.subtitle,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${dict.regex.title}`,
      description: dict.regex.subtitle,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function RegexTesterPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const faqs = isAr ? [
    {
      question: "ما هي التعابير النمطية (Regex) ولماذا نستخدمها؟",
      answer: "التعابير النمطية (Regular Expressions) هي سلسلة من الرموز التي تُشكل نمطاً للبحث، تُستخدم بشكل واسع في البرمجة للبحث عن نصوص معينة، استخراج البيانات، أو التحقق من صحة المدخلات (مثل التأكد من صحة البريد الإلكتروني)."
    },
    {
      question: "كيف يمكنني اختبار كود Regex الخاص بي باستخدام هذه الأداة؟",
      answer: "كل ما عليك هو إدخال التعبير النمطي الخاص بك في حقل (النمط)، ثم إدخال النص الذي ترغب في اختباره في حقل (النص). ستقوم الأداة بتحديد الأجزاء المتطابقة بشكل فوري وتسليط الضوء عليها."
    },
    {
      question: "ما هي الـ Flags في الـ Regex وما فائدتها؟",
      answer: "الـ Flags هي معلمات إضافية تُعدل من سلوك البحث. على سبيل المثال، 'g' يعني بحث شامل (Global) للبحث عن جميع التطابقات، و 'i' يعني تجاهل حالة الأحرف (Case-insensitive) للبحث دون التفريق بين الأحرف الكبيرة والصغيرة."
    },
    {
      question: "هل تدعم هذه الأداة اختبار التعابير النمطية المعقدة؟",
      answer: "نعم، أداتنا تدعم محرك JavaScript للتعابير النمطية ويمكنها التعامل مع الأنماط المعقدة، المجموعات (Groups)، والبحث المتقدم بفعالية وسرعة فائقة."
    }
  ] : [
    {
      question: "What are Regular Expressions (Regex) and why use them?",
      answer: "Regular Expressions are sequences of characters that define a search pattern. They are widely used in programming to find, extract, or validate strings of text (like checking if an email address is valid)."
    },
    {
      question: "How do I test my Regex using this tool?",
      answer: "Simply type your regular expression in the 'Pattern' input field and provide the text you want to test against in the 'Text' field. The tool will instantly highlight any matches in real-time."
    },
    {
      question: "What are Regex flags and what do they do?",
      answer: "Flags are optional parameters that modify how the search is performed. For example, the 'g' (global) flag finds all matches rather than stopping after the first, and 'i' (case-insensitive) makes the search ignore uppercase and lowercase differences."
    },
    {
      question: "Does this tool support complex Regex patterns?",
      answer: "Yes, our tool utilizes the standard JavaScript Regex engine and can efficiently handle complex patterns, capturing groups, and advanced lookarounds instantly."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <RegexTesterClient dict={dict} lang={lang} />
      
      <SoftwareSchema 
        name={isAr ? "أداة اختبار التعابير النمطية (Regex)" : "Regex Tester & Builder"}
        description={isAr ? "اختبر، وابنِ، وصحح أخطاء التعابير النمطية الخاصة بك في الوقت الفعلي." : "Test, build, and debug your Regular Expressions in real-time."}
        applicationCategory="DeveloperApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/regex-tester`}
      />
      <FAQSchema faqs={faqs} />
      
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>الدليل المتكامل لأداة اختبار التعابير النمطية (Regex Tester)</h2>
            <p>
              التعابير النمطية، أو <strong>Regular Expressions</strong>، هي أداة سحرية في يد كل مبرمج ومحلل بيانات. تتيح لك هذه التقنية البحث العميق، الفلترة، والتحقق من صحة النصوص ضمن كميات هائلة من البيانات باستخدام سطر برمجي واحد. مع ذلك، صياغتها قد تكون معقدة وتتطلب تركيزاً شديداً. هنا يبرز دور <strong>أداة اختبار التعابير النمطية</strong> الخاصة بنا.
            </p>
            <h3>لماذا تحتاج إلى أداة اختبار Regex؟</h3>
            <p>
              الخطأ في رمز واحد داخل التعبير النمطي قد يؤدي إما إلى عدم العثور على التطابقات المطلوبة، أو إلى استخراج بيانات خاطئة تماماً. لذلك، توفر لك هذه الأداة بيئة تفاعلية وآمنة تتيح لك:
            </p>
            <ul>
              <li><strong>التحقق الفوري (Real-time Feedback):</strong> بمجرد كتابتك للنمط، تظهر النتائج والتطابقات مسلطاً عليها الضوء مباشرة في النص التجريبي.</li>
              <li><strong>تصحيح الأخطاء (Debugging):</strong> يمكنك تجربة السيناريوهات المختلفة والنصوص المعقدة للتأكد من أن الكود الخاص بك يغطي جميع الحالات (Edge Cases).</li>
              <li><strong>التعلم والتجربة:</strong> إذا كنت مبتدئاً في تعلم التعابير النمطية، فهذه الأداة هي الساحة المثالية لفهم كيفية عمل الرموز مثل <code>.*</code>، و <code>\d+</code>، و المجموعات المعقدة.</li>
            </ul>
            <h3>أهم استخدامات التعابير النمطية</h3>
            <p>
              تُستخدم التعابير النمطية في جميع لغات البرمجة تقريباً (مثل Python, JavaScript, PHP, Java). من أبرز استخداماتها التحقق من صحة المدخلات مثل البريد الإلكتروني وأرقام الهواتف، استخراج الروابط من نصوص طويلة، تنظيف قواعد البيانات من الرموز غير المرغوب فيها، وإعادة صياغة النصوص (Find and Replace) بذكاء ومرونة تفوق طرق البحث التقليدية.
            </p>
          </>
        ) : (
          <>
            <h2>The Complete Guide to Our Regex Tester Tool</h2>
            <p>
              Regular Expressions, commonly known as <strong>Regex</strong>, are like magic wands for developers, system administrators, and data analysts. They allow you to deeply search, filter, and validate text across massive datasets with a single line of code. However, crafting the perfect regex can be notoriously tricky. This is exactly where our <strong>Regex Tester</strong> proves invaluable.
            </p>
            <h3>Why Do You Need a Regex Tester?</h3>
            <p>
              A single misplaced character in a regular expression can mean the difference between extracting the correct data and breaking your entire script. Our interactive tool provides a safe sandbox environment that offers:
            </p>
            <ul>
              <li><strong>Real-time Feedback:</strong> As you type your regex pattern, the matching text is instantly highlighted, ensuring you are on the right track without needing to run a full script.</li>
              <li><strong>Effortless Debugging:</strong> Test complex edge cases by pasting varied sample texts, making sure your regex captures exactly what you want and ignores what you don't.</li>
              <li><strong>A Learning Sandbox:</strong> For beginners, visualizing how quantifiers like <code>+</code> or <code>*</code>, character classes like <code>\w</code>, and capture groups interact with text accelerates the learning curve immensely.</li>
            </ul>
            <h3>Common Use Cases for Regular Expressions</h3>
            <p>
              Regex is supported by almost all modern programming languages (such as Python, JavaScript, Java, and PHP). The most frequent use cases include validating user inputs (like ensuring a string is a valid email address or phone number), web scraping, data sanitization, and executing complex search-and-replace operations that standard string functions simply cannot handle.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
