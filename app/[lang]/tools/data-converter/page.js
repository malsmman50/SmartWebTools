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

  const softwareName = isAr ? "محول وحدات البيانات الرقمية" : "Digital Data Size Converter";
  const softwareDescription = isAr 
    ? "محول مجاني وسريع لتحويل أحجام البيانات بين البايت والميجابايت والجيجابايت والتيرابايت وغيرها من الوحدات."
    : "Free and fast tool to convert digital data sizes between Bytes, Megabytes, Gigabytes, Terabytes, and more.";

  const faqs = isAr ? [
    {
      question: "ما الفرق بين البت (Bit) والبايت (Byte)؟",
      answer: "البت (b) هو أصغر وحدة للبيانات الرقمية، ويمثل قيمة ثنائية إما 0 أو 1. أما البايت (B) فيتكون من 8 بتات. تُقاس أحجام التخزين عادةً بالبايت، بينما تُقاس سرعات الشبكة غالباً بالبت (مثل ميجابت في الثانية)."
    },
    {
      question: "لماذا يُظهر القرص الصلب بسعة 1 تيرابايت مساحة أقل في نظام ويندوز؟",
      answer: "تستخدم الشركات المصنعة للأقراص الصلبة النظام العشري (الأساس 10) حيث يعادل 1 تيرابايت 1000 جيجابايت. بينما يستخدم ويندوز النظام الثنائي (الأساس 2) حيث يعادل 1 تيبي بايت 1024 جيبي بايت. هذا الاختلاف في الحساب يجعل القرص بسعة 1TB يظهر بحوالي 931 جيجابايت في ويندوز."
    },
    {
      question: "ما هي الوحدات التي تدعمها هذه الأداة؟",
      answer: "تدعم هذه الأداة جميع الوحدات الرقمية القياسية بما في ذلك البت، البايت، الكيلوبايت، الميجابايت، الجيجابايت، التيرابايت، البيتابايت، الإكسابايت، الزيتابايت، واليوتابايت."
    },
    {
      question: "هل أحتاج إلى اتصال بالإنترنت لاستخدام المحول؟",
      answer: "تحتاج إلى الاتصال بالإنترنت فقط لتحميل الصفحة في البداية. بمجرد تحميلها، تعمل جميع خوارزميات التحويل محلياً في متصفحك عبر جافا سكريبت، مما يسمح لها بالعمل دون اتصال بالإنترنت."
    },
    {
      question: "هل استخدام هذه الأداة مجاني؟",
      answer: "نعم، محول البيانات الخاص بنا مجاني 100%، بدون أي رسوم خفية، أو قيود، أو الحاجة إلى التسجيل."
    }
  ] : [
    {
      question: "What is the difference between a bit and a byte?",
      answer: "A bit (b) is the smallest unit of digital data, representing a binary value of 0 or 1. A byte (B) consists of 8 bits. Storage sizes are usually measured in bytes, while network speeds are often measured in bits (e.g., Megabits per second)."
    },
    {
      question: "Why does my 1TB hard drive show less capacity in Windows?",
      answer: "Hard drive manufacturers use the decimal system (base 10) where 1 Terabyte (TB) equals 1,000 Gigabytes. Windows uses the binary system (base 2) where 1 Tebibyte (TiB) equals 1,024 Gibibytes. This calculation difference makes the 1TB drive appear as approximately 931 GB in Windows."
    },
    {
      question: "Which units does this tool support?",
      answer: "This tool supports all standard digital units including Bits, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Petabytes, Exabytes, Zettabytes, and Yottabytes."
    },
    {
      question: "Do I need an internet connection to use the converter?",
      answer: "You only need an internet connection to load the page initially. Once loaded, all conversion algorithms run locally in your browser via JavaScript, allowing it to function completely offline."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, our Data Converter is 100% free to use, with no hidden fees, limits, or required registrations."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/data-converter`}
      />
      <FAQSchema faqs={faqs} />
      
      <DataConverterClient dict={dict} lang={lang} />

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>المحول الشامل لوحدات تخزين البيانات الرقمية</h2>
            <p>
              يعد "محول حجم البيانات الرقمية" أداة أساسية لمحترفي تكنولوجيا المعلومات، ومطوري البرمجيات، ومهندسي الشبكات، وأي شخص يتعامل مع تخزين الحواسيب أو قيود النطاق الترددي. في مجال الحوسبة، يمكن قياس حجم البيانات بمجموعة واسعة من الوحدات بدءًا من أصغر وحدة أساسية (البت) وصولاً إلى المقاييس الهائلة مثل اليوتابايت. في كثير من الأحيان، يتم تمثيل الملفات والأقراص الصلبة ومساحات التخزين السحابية بوحدات مختلفة، مما يخلق بعض الارتباك. 
            </p>
            <p>
              على سبيل المثال، قد تعلن الشركة المصنعة للقرص الصلب عن سعته بالجيجابايت العشري (GB)، بينما يعرض نظام التشغيل السعة بالجيبي بايت الثنائي (GiB)، مما يؤدي إلى تباين ملحوظ في المساحة المتاحة المتوقعة. يقوم المحول الشامل للبيانات الخاص بنا بسد هذه الفجوة من خلال توفير تحويلات فورية ودقيقة عبر جميع وحدات التخزين الرقمية القياسية. يمكنك التحويل بسلاسة بين البت (Bits)، البايت (Bytes)، الكيلوبايت (KB)، الميجابايت (MB)، الجيجابايت (GB)، التيرابايت (TB)، البيتابايت (PB)، وحتى الوحدات الأكثر تقدماً مثل الإكسابايت، الزيتابايت، واليوتابايت.
            </p>
            <p>
              كما أنه يتعامل مع كل من النظامين العشري (الأساس 10) والثنائي (الأساس 2)، مما يضمن حصولك على الأرقام الدقيقة التي تحتاجها بغض النظر عن السياق المرجعي. تم تصميم هذه الأداة ببنية تعتمد كلياً على العميل (Client-side)، مما يعني أن جميع التحويلات الرياضية تتم معالجتها فوراً داخل متصفحك دون الحاجة إلى التواصل مع الخادم. هذا يضمن نتائج سريعة، وخصوصية تامة، ويتيح استخدام الأداة حتى مع اتصالات الإنترنت البطيئة. سواء كنت تحسب أوقات نقل الشبكة، أو تخصص مساحة تخزين لقواعد البيانات، يوفر هذا المحول إجابات فورية وموثوقة.
            </p>
            <h3>الأسئلة الشائعة حول محول البيانات الرقمية</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Ultimate Digital Data Size Converter</h2>
            <p>
              The Digital Data Size Converter is an essential utility for IT professionals, software developers, network engineers, and anyone dealing with computer storage or bandwidth constraints. In computing, data size can be measured in a wide array of units ranging from the smallest basic unit (a bit) up to massive scales like Yottabytes. Often, files, hard drives, and cloud storage allocations are represented in different units, creating confusion. 
            </p>
            <p>
              For instance, a hard drive manufacturer might advertise capacity in decimal Gigabytes (GB), while your operating system displays it in binary Gibibytes (GiB), leading to a noticeable discrepancy in expected available space. Our comprehensive data converter bridges this gap by offering instant, accurate conversions across all standard digital storage units. You can seamlessly convert between Bits, Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), Petabytes (PB), and even more advanced units like Exabytes, Zettabytes, and Yottabytes.
            </p>
            <p>
              It also handles both the decimal (base 10) and binary (base 2) systems, ensuring you have the exact numbers you need regardless of the context. The tool is built with a completely client-side architecture, meaning all mathematical conversions are processed instantly in your browser without requiring server communication. This ensures rapid results, total privacy, and allows the tool to be used even on slow internet connections once the page has loaded. Whether you're calculating network transfer times, allocating database storage, or simply trying to figure out how many photos will fit on your flash drive, this data converter provides reliable and immediate answers.
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
