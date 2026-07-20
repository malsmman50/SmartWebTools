import { getDictionary } from "@/app/dictionaries";
import CronGeneratorClient from "@/app/components/CronGeneratorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/cron-generator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/cron-generator`,
        "ar": `https://smartcalctools.xyz/ar/tools/cron-generator`,
      },
    },
    title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
    description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
    openGraph: {
      title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
      description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مولد ومفسر تعبيرات جدولة المهام Cron آمن" : "Secure Cron Expression Generator & Explainer",
      description: isAr 
      ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
      : "Easily build, validate, and translate complex cron expressions into human-readable text visually.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function CronGeneratorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  const t = dict.cron;

  const softwareName = isAr ? "مولد ومفسر Cron" : "Cron Expression Generator";
  const softwareDescription = isAr 
    ? "قم بإنشاء وتفسير تعبيرات جدولة المهام (cron) بأسلوب مرئي تفاعلي مع ترجمة معانيها للغة العربية فورياً."
    : "Easily build, validate, and translate complex cron expressions into human-readable text visually.";

  const faqs = isAr ? [
    {
      question: "ما هو تعبير الكرون (Cron expression)؟",
      answer: "تعبير الكرون هو سلسلة نصية تتكون من خمسة أو ستة حقول تمثل جدولاً زمنياً. يُستخدم في أنظمة التشغيل الشبيهة بيونكس (Unix-like) لجدولة المهام (الأوامر أو السكربتات) لتعمل بشكل دوري في أوقات أو تواريخ أو فترات زمنية محددة."
    },
    {
      question: "هل تدعم هذه الأداة ميزات الكرون غير القياسية؟",
      answer: "تركز أداتنا بشكل أساسي على تنسيق الكرون القياسي المكون من 5 حقول (الدقيقة، الساعة، يوم الشهر، الشهر، يوم الأسبوع) وهو التنسيق المدعوم عالمياً من قبل أنظمة إدارة المهام و GitHub Actions و Kubernetes."
    },
    {
      question: "هل يمكنني لصق تعبير كرون موجود مسبقاً لفهمه؟",
      answer: "نعم! تعمل أداتنا كمولد ومفسر في نفس الوقت. يمكنك لصق أي تعبير كرون قياسي صحيح في حقل الإدخال، وستقوم الأداة فوراً بترجمته إلى نص مقروء وتحديث عناصر التحكم المرئية."
    },
    {
      question: "هل تتم أي عمليات تحقق على الخادم (Server-side)؟",
      answer: "لا، جميع عمليات التوليد والترجمة تتم محلياً في متصفح الويب الخاص بك. هذا يضمن سرعة الاستجابة اللحظية والخصوصية التامة لإعدادات سير عملك."
    },
    {
      question: "لماذا لم تعمل مهمة الكرون الخاصة بي بالثانية بالضبط؟",
      answer: "تعمل مهام الكرون القياسية على أساس الدقائق. فهي لا تدعم الدقة على مستوى الثواني. إذا كنت بحاجة إلى تنفيذ مهام بدقة الثواني، فقد تحتاج إلى مجدول مهام مخصص داخل تطبيقك بدلاً من الكرون القياسي."
    }
  ] : [
    {
      question: "What is a cron expression?",
      answer: "A cron expression is a string of five or six fields representing a time schedule. It is used in Unix-like operating systems to schedule jobs (commands or scripts) to run periodically at fixed times, dates, or intervals."
    },
    {
      question: "Does this tool support non-standard cron features?",
      answer: "Our tool primarily focuses on the standard 5-field cron format (minute, hour, day of month, month, day of week) which is universally supported by cron daemons, GitHub Actions, and Kubernetes."
    },
    {
      question: "Can I paste an existing cron expression to understand it?",
      answer: "Yes! Our tool acts as both a generator and a parser. You can paste any valid standard cron expression into the input field, and the tool will instantly translate it into human-readable text and update the visual controls."
    },
    {
      question: "Are there any server-side validations happening?",
      answer: "No, all generation and translation happen locally in your web browser. This ensures zero latency and absolute privacy for your workflow configurations."
    },
    {
      question: "Why did my cron expression not run exactly on the second?",
      answer: "Standard cron jobs operate on a minute-by-minute basis. They do not support sub-minute (seconds) precision. If you need task execution down to the second, you might need a custom application scheduler rather than standard cron."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/cron-generator`}
      />
      
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <CronGeneratorClient lang={lang} dict={dict} />

      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>المولد والمفسر الشامل لتعبيرات Cron لجدولة المهام</h2>
            <p>
              يُعدّ "مولد ومفسر تعبيرات Cron" أداة أساسية لا غنى عنها للمطورين، ومديري الأنظمة، ومهندسي عمليات التطوير (DevOps) الذين يحتاجون إلى أتمتة المهام المتكررة بدقة وموثوقية عالية. تعبير الـ Cron هو عبارة عن سلسلة نصية تتكون من خمسة أو ستة حقول تفصل بينها مسافات، وتمثل جدولاً زمنياً دقيقاً لتنفيذ مهمة معينة. ومع ذلك، قد تكون كتابة هذه التعبيرات يدوياً أمراً معقداً وعرضة للأخطاء، مما قد يؤدي إلى تفويت المهام الهامة أو تنفيذها في أوقات غير متوقعة.
            </p>
            <p>
              يعمل منشئ الكرون المرئي الخاص بنا على تبسيط هذه العملية بالكامل. سواء كنت تحتاج إلى تشغيل نص برمجي كل خمس دقائق، أو في يوم الإثنين الأول من كل شهر، أو فقط في أيام الأسبوع خلال ساعات العمل الرسمية، تتيح لك واجهتنا التفاعلية سهلة الاستخدام تحديد جدولك الزمني المطلوب باستخدام قوائم منسدلة وأزرار بسيطة. تقوم الأداة على الفور بإنشاء صيغة الـ Cron الصحيحة، مع توفير ترجمة نصية واضحة ومقروءة باللغة البشرية لمعنى هذا التعبير.
            </p>
            <p>
              هذه الوظيفة المزدوجة لا تساعدك فقط في إنشاء جداول المهام، بل تُعدّ أيضاً وسيلة تعليمية ممتازة لفهم كيفية عمل صيغة الـ Cron. علاوة على ذلك، تعمل أداتنا بالكامل داخل متصفحك باستخدام معالجة من جانب العميل، مما يضمن بقاء منطق الجدولة الخاص بك خاصاً ويعمل بسرعة فائقة دون أي تأخير في الشبكة. تدعم الأداة صيغة Cron القياسية لنظام لينكس، مما يجعلها متوافقة تماماً مع Crontab، وإجراءات GitHub Actions، ووظائف Kubernetes، وغيرها الكثير من مجدولات المهام. تجنب أخطاء الصياغة وحسّن سير عملك اليوم.
            </p>
            <h3>هيكل التعبير والرموز الشائعة</h3>
            <p>
              يتكون التعبير من خمسة حقول زمنية مرتبة كالتالي: الدقيقة، الساعة، يوم الشهر، الشهر، ويوم الأسبوع. وتستخدم الرموز لتعريف التكرار:
            </p>
            <ul>
              <li><strong>* (الكل):</strong> تشغيل الأداة في كل وحدة زمنية (مثال: * في حقل الدقيقة يعني كل دقيقة).</li>
              <li><strong>/ (الخطوة):</strong> لتعريف فترات التكرار (مثال: */5 في حقل الدقيقة يعني كل 5 دقائق).</li>
              <li><strong>, (القائمة):</strong> لتحديد قيم محددة متعددة (مثال: 1,3,5 في حقل يوم الأسبوع).</li>
              <li><strong>- (النطاق):</strong> لتحديد نطاق زمني مستمر (مثال: 9-17 في حقل الساعة).</li>
            </ul>
            <h3>الأسئلة الشائعة حول مولد ومفسر تعبيرات الكرون</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Ultimate Free Cron Expression Generator & Parser</h2>
            <p>
              The Cron Expression Generator and Parser is a vital utility for developers, system administrators, and DevOps engineers who need to automate repetitive tasks reliably. A cron expression is a string comprising five or six fields separated by white space that represents a set of times, normally as a schedule to execute a specific task. However, writing these expressions manually can be confusing and prone to errors, which may lead to missed tasks or unexpected executions.
            </p>
            <p>
              Our visual cron builder simplifies this process completely. Whether you need a job to run every five minutes, on the first Monday of every month, or only on specific weekdays during working hours, our intuitive interface allows you to select your desired schedule using simple dropdowns and buttons. Instantly, the tool generates the correct cron syntax, while simultaneously providing a human-readable translation of what the expression means.
            </p>
            <p>
              This dual functionality not only helps you generate schedules but also acts as an excellent learning tool for understanding cron syntax. Furthermore, our tool operates entirely within your browser using client-side processing, ensuring that your scheduling logic remains private and executes instantly without any network delays. It supports standard Linux cron syntax, making it compatible with crontab, GitHub Actions, Kubernetes cronjobs, and many other task schedulers. Avoid syntax errors and streamline your workflow today with the best free online cron generator.
            </p>
            <h3>Expression Structure</h3>
            <p>
              The standard fields are Minute, Hour, Day of Month, Month, and Day of Week. Special characters are used to define frequencies:
            </p>
            <ul>
              <li><strong>* (Wildcard):</strong> Specifies all values (e.g., * in the minute field runs every minute).</li>
              <li><strong>/ (Step):</strong> Specifies increments (e.g., */15 runs every 15 minutes).</li>
              <li><strong>, (List):</strong> Specifies multiple specific values (e.g., 1,2,3).</li>
              <li><strong>- (Range):</strong> Specifies a range of values (e.g., 1-5 runs on those values inclusive).</li>
            </ul>
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
