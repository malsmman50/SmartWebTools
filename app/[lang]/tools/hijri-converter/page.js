import { getDictionary } from "@/app/dictionaries";
import Hashiya from "@/app/components/UI/Hashiya";
import HijriConverterClient from "@/app/components/HijriConverterClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/hijri-converter`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/hijri-converter`,
        "ar": `https://smartcalctools.xyz/ar/tools/hijri-converter`,
      },
    },
    title: isAr ? "محول التاريخ الهجري والميلادي الدقيق" : "Hijri Date Converter (Umm al-Qura)",
    description: isAr 
      ? "حول التواريخ فورياً وبدقة بالغة بين التقويم الهجري (أم القرى) والتقويم الميلادي CE دون اتصال بالإنترنت."
      : "Convert dates instantly and accurately between Gregorian and Hijri (Umm al-Qura) calendars entirely offline.",
    openGraph: {
      title: isAr ? "محول التاريخ الهجري والميلادي الدقيق" : "Hijri Date Converter (Umm al-Qura)",
      description: isAr 
      ? "حول التواريخ فورياً وبدقة بالغة بين التقويم الهجري (أم القرى) والتقويم الميلادي CE دون اتصال بالإنترنت."
      : "Convert dates instantly and accurately between Gregorian and Hijri (Umm al-Qura) calendars entirely offline.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "محول التاريخ الهجري والميلادي الدقيق" : "Hijri Date Converter (Umm al-Qura)",
      description: isAr 
      ? "حول التواريخ فورياً وبدقة بالغة بين التقويم الهجري (أم القرى) والتقويم الميلادي CE دون اتصال بالإنترنت."
      : "Convert dates instantly and accurately between Gregorian and Hijri (Umm al-Qura) calendars entirely offline.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function HijriConverterPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  const softwareName = isAr ? "محول التاريخ الهجري والميلادي" : "Hijri to Gregorian Converter";
  const softwareDescription = isAr 
    ? "حول التواريخ فورياً وبدقة بالغة بين التقويم الهجري والميلادي."
    : "Convert dates instantly and accurately between Gregorian and Hijri calendars.";

  const faqs = isAr ? [
    {
      question: "ما هو تقويم أم القرى؟",
      answer: "تقويم أم القرى هو التقويم الإسلامي الرسمي المستخدم في المملكة العربية السعودية. يتم حسابه بناءً على أسس فلكية دقيقة تتعلق بموقع القمر فوق مكة المكرمة، بدلاً من الاعتماد الكلي على الرؤية البصرية للهلال، مما يجعله قابلاً للتنبؤ بدقة عالية لغرض تحويل التواريخ."
    },
    {
      question: "هل يمكنني استخدام هذه الأداة لتحديد البداية الدقيقة لشهر رمضان؟",
      answer: "على الرغم من أن الأداة توفر تواريخ دقيقة للغاية بناءً على الحسابات الفلكية لتقويم أم القرى، إلا أن البداية الفعلية لشهر رمضان والأشهر الإسلامية الأخرى تعتمد تقليدياً على الرؤية المحلية للهلال. يجب عليك دائماً الرجوع إلى السلطات الدينية المحلية للإعلانات الرسمية."
    },
    {
      question: "هل يعمل المحول بدون اتصال بالإنترنت؟",
      answer: "نعم، بمجرد تحميل صفحة الويب، يعمل منطق التحويل بشكل كامل محلياً داخل متصفحك، مما يتيح لك استخدامه دون الاتصال بالإنترنت."
    },
    {
      question: "كيف يتعامل المحول مع السنوات الكبيسة في كلا التقويمين؟",
      answer: "تأخذ الخوارزمية الخاصة بنا في الاعتبار تلقائياً السنوات الكبيسة في التقويم الميلادي (إضافة 29 فبراير) ودورة الكبس المعقدة المكونة من 30 عاماً داخل الحساب الهجري القياسي لضمان أقصى درجات الدقة الرياضية."
    },
    {
      question: "هل هناك فرق بين التاريخ الهجري في الدول المختلفة؟",
      answer: "نعم، في بعض الأحيان قد يختلف التاريخ الهجري بمقدار يوم واحد بين الدول المختلفة اعتماداً على وقت الرؤية البصرية للهلال في موقعهم الجغرافي المحدد. تقوم أداتنا بتوحيد ذلك من خلال استخدام نموذج أم القرى المقبول على نطاق واسع."
    },
    {
      question: "هل هذا المحول دقيق ومطابق لتقويم السعودية؟",
      answer: "نعم، نستخدم خوارزمية أم القرى الفلكية المعتمدة رسمياً في المملكة العربية السعودية للحصول على أدق نتيجة ممكنة."
    },
    {
      question: "لماذا تظهر لي رسالة أن التاريخ الهجري الذي أدخلته غير موجود؟",
      answer: "الشهر الهجري إما 29 أو 30 يوماً حسب السنة، فتاريخ مثل 30 رمضان قد يكون موجوداً في سنة وغير موجود في أخرى. عندما تختار يوماً لا وجود له في تقويم أم القرى لتلك السنة، يخبرك المحول صراحة بذلك ويبين لك طول الشهر الفعلي بدلاً من إعطائك أقرب تاريخ بشكل صامت قد يسبب خطأً في وثائقك."
    }
  ] : [
    {
      question: "What is the Umm al-Qura calendar?",
      answer: "The Umm al-Qura calendar is the official Islamic calendar used by Saudi Arabia. It is calculated based on astronomical principles regarding the moon's position over Mecca, rather than strictly relying on visual moon sightings, making it highly predictable and accurate for date conversion."
    },
    {
      question: "Can I use this tool to determine the exact start of Ramadan?",
      answer: "While the tool provides highly accurate dates based on the Umm al-Qura astronomical calculations, the actual start of Ramadan and other Islamic months traditionally depends on local moon sightings. You should always refer to your local religious authorities for official announcements."
    },
    {
      question: "Does the converter work without an internet connection?",
      answer: "Yes, once you have loaded the web page, the conversion logic runs completely locally within your browser, allowing you to use it offline."
    },
    {
      question: "How does the converter handle leap years in both calendars?",
      answer: "Our algorithm automatically accounts for leap years in the Gregorian calendar (adding February 29th) and the complex 30-year leap cycle within the standard Hijri calculation to ensure maximum mathematical accuracy."
    },
    {
      question: "Is there a difference between the Hijri date in different countries?",
      answer: "Yes, occasionally the Hijri date may vary by one day between different countries depending on when the new moon was visually sighted in their specific geographical location. Our tool standardizes this by using the widely accepted Umm al-Qura model."
    },
    {
      question: "Is this converter accurate and aligned with the Saudi calendar?",
      answer: "Yes, it uses the official Umm al-Qura astronomical algorithm which is the standard utilized by the government of Saudi Arabia."
    },
    {
      question: "Why am I told that the Hijri date I entered does not exist?",
      answer: "A Hijri month has either 29 or 30 days depending on the year, so a date like 30 Ramadan may exist in one year but not another. When you pick a day that does not exist in the Umm al-Qura calendar for that year, the converter tells you explicitly and shows the month's actual length, instead of silently returning a nearby date that could corrupt your documents."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={softwareName}
        description={softwareDescription}
        url={`https://smartcalctools.xyz/${lang}/tools/hijri-converter`}
      />
      <FAQSchema faqs={faqs} />
      
      <div className="page-header">
        <h1>{dict.hijri.title}</h1>
        <p>{dict.hijri.subtitle}</p>
      </div>

      <div className="matn-hashiya">
        <div>
          <HijriConverterClient lang={lang} dict={dict} />
        </div>
        <Hashiya source="hijri" lang={lang} methodologyAnchor="hijri" religious={false} />
      </div>
      
      <DisclaimerBox type="calendar" lang={lang} />

      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>المحول الدقيق للتاريخ الهجري والميلادي (حسب تقويم أم القرى)</h2>
            <p>
              يُعد "محول التاريخ الهجري والميلادي" تطبيقاً قيماً جداً للمسلمين في جميع أنحاء العالم، بالإضافة إلى المؤرخين والباحثين والمحترفين العاملين في منطقة الشرق الأوسط. التقويم الإسلامي (الهجري) هو تقويم قمري يتكون من 12 شهراً في سنة تبلغ 354 أو 355 يوماً. ونظراً لأن السنة الهجرية أقصر بحوالي 11 يوماً من السنة الميلادية الشمسية، فإن التواريخ الإسلامية تتغير باستمرار مقارنة بالتواريخ الميلادية. هذا يجعل التحويل الدقيق للأحداث التاريخية، أو الأعياد الدينية، أو الوثائق الإدارية الرسمية مهمة حسابية معقدة بعض الشيء.
            </p>
            <p>
              يستخدم المحول الخاص بنا نظام تقويم "أم القرى" عالي الدقة، وهو التقويم الرسمي المستخدم في المملكة العربية السعودية والمقبول على نطاق واسع من قبل العديد من المنظمات الإسلامية حول العالم. من خلال واجهتنا البديهية، يمكنك بسهولة تحويل أي تاريخ من الصيغة الميلادية إلى الصيغة الهجرية، والعكس بالعكس، في الوقت الفعلي. ما عليك سوى تحديد اليوم والشهر والسنة، وستوفر لك الأداة على الفور التاريخ المقابل في التقويم الآخر.
            </p>
            <p>
              هذه الأداة مفيدة بشكل استثنائي في تحديد التواريخ الدقيقة للمناسبات الدينية مثل بداية صيام شهر رمضان المبارك، وموسم الحج، وعيد الفطر، وعيد الأضحى. وعلاوة على ذلك، فهي أداة حيوية لتحويل تواريخ الميلاد الرسمية الموجودة في الهويات الحكومية، مما يضمن تطابق وثائقك بدقة عند الهجرة أو السفر أو التقدم للحصول على تأشيرات. يعمل التطبيق بالكامل على متصفحك المحلي، مما يعني أنه يوفر تحويلات فورية حتى بدون اتصال بالإنترنت ولا يحتفظ بأي بيانات شخصية على الإطلاق.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>المناسبات الدينية:</strong> معرفة متى يوافق الأول من رمضان، أو يوم عرفة (9 ذو الحجة)، أو عيد الفطر بالتاريخ الميلادي لترتيب الإجازات المسبقة.</li>
              <li style={{ marginBottom: "8px" }}><strong>الوثائق الرسمية الحكومية:</strong> في العديد من الدول العربية كالسعودية، تُستخدم التواريخ الهجرية في العقود والوثائق. يمكنك استخدام المحول لمعرفة تاريخ ميلادك الهجري المطابق للميلادي لتعبئة النماذج الحكومية.</li>
              <li style={{ marginBottom: "8px" }}><strong>الحسابات الشرعية:</strong> حساب حول الزكاة (الذي يعتمد على السنة القمرية 354 يوماً) بدقة تامة دون الاعتماد على السنة الشمسية.</li>
              <li style={{ marginBottom: "8px" }}><strong>عقود الإيجار والموظفين:</strong> مطابقة تواريخ بدء وانتهاء العقود للمؤسسات التي تعتمد التقويمين معاً لتجنب أي إشكالات قانونية.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>لماذا "أم القرى"؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              التقويم الهجري يعتمد على دورة القمر، مما يجعل الأطوال الشهرية تتراوح بين 29 و 30 يوماً. خوارزمية "أم القرى" تقوم بحساب ولادة الهلال فلكياً فوق خط طول مكة المكرمة، مما يعطي دقة رياضية وموحدة تتفوق على التقويم الهجري الجدولي (الاصطلاحي) البسيط.
            </p>

            <h3 style={{ marginTop: "24px" }}>التواريخ غير الموجودة: لماذا يرفض المحول 30 رمضان أحياناً؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              على عكس الشهر الميلادي الثابت الطول، لا يمكن معرفة طول الشهر الهجري (29 أم 30 يوماً) إلا من التقويم نفسه؛ فرمضان مثلاً كان 30 يوماً في بعض السنوات و29 في أخرى. لذلك يتحقق محولنا من وجود التاريخ فعلاً في تقويم أم القرى قبل التحويل: قائمة الأيام تعرض العدد الصحيح لأيام الشهر الذي اخترته تلقائياً، وإن وصلك رابط بتاريخ غير موجود (مثل 30 من شهر طوله 29) فسترى رسالة واضحة تبين طول الشهر الفعلي بدلاً من تحويل صامت لتاريخ مجاور — فالانزياح بيوم واحد قد يعني خطأً في تاريخ ميلاد بوثيقة رسمية أو في حساب حول الزكاة. نطاق التحويل المدعوم من سنة 1350هـ إلى 1500هـ (نحو 1931–2077م) وهو نطاق صلاحية بيانات أم القرى الموثوقة.
            </p>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول تحويل التاريخ الهجري والميلادي</h3>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Precision Hijri to Gregorian Date Converter (Umm al-Qura)</h2>
            <p>
              The Hijri and Gregorian Date Converter is an invaluable application designed for Muslims globally, as well as historians, researchers, and professionals working in the Middle East. The Islamic calendar (Hijri) is a lunar calendar consisting of 12 months in a year of 354 or 355 days. Because it is approximately 11 days shorter than the solar Gregorian calendar, Islamic dates shift continuously relative to the Gregorian dates. This makes accurately converting historical events, religious holidays, or official administrative documents a complex mathematical task. 
            </p>
            <p>
              Our converter utilizes the highly accurate Umm al-Qura calendar system, the official calendar utilized in Saudi Arabia and widely accepted by many Islamic organizations around the world. With our intuitive interface, you can seamlessly convert any date from the Gregorian format to the Hijri format, and vice versa, in real-time. Simply select the day, month, and year, and the tool will instantly provide the corresponding date in the other calendar.
            </p>
            <p>
              This is exceptionally useful for determining the exact dates of religious observances like Ramadan fasting, Hajj, Eid al-Fitr, and Eid al-Adha. Furthermore, it is a vital tool for converting official birth dates on governmental IDs, ensuring your documentation matches precisely when migrating, traveling, or applying for visas. The application runs entirely on your local browser, meaning it provides instant offline conversions without retaining any personal data.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Religious Observances:</strong> Calculate exactly when the 1st of Ramadan, the Day of Arafah (9 Dhu al-Hijjah), or Eid al-Fitr will occur in the Gregorian calendar to plan vacations.</li>
              <li style={{ marginBottom: "8px" }}><strong>Official Documentation:</strong> If you are working or living in the Middle East (like Saudi Arabia), you often need your exact Hijri birth date to fill out residency or visa applications.</li>
              <li style={{ marginBottom: "8px" }}><strong>Zakat Calculation:</strong> Zakat is paid annually based on the lunar Hijri year (roughly 354 days). This converter helps you accurately track your Zakat due date.</li>
              <li style={{ marginBottom: "8px" }}><strong>Contract Management:</strong> Easily align start and end dates for employment or rental contracts that legally require Hijri dates alongside Gregorian dates.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Why Umm al-Qura?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The Hijri calendar is lunar, meaning months are 29 or 30 days based on the moon's sighting. The Umm al-Qura algorithm uses complex astronomical calculations based on the coordinates of Mecca to predict the new moon, providing a standardized and mathematically precise calendar compared to simple tabular Hijri approximations.
            </p>

            <h3 style={{ marginTop: "24px" }}>Non-Existent Dates: Why the Converter Sometimes Rejects 30 Ramadan</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Unlike fixed-length Gregorian months, a Hijri month's length (29 or 30 days) can only be known from the calendar itself — Ramadan, for instance, has 30 days in some years and 29 in others. Our converter therefore validates that a date actually exists in the Umm al-Qura calendar before converting: the day dropdown automatically offers the correct number of days for the month you selected, and if a link brings you a non-existent date (such as day 30 of a 29-day month), you get a clear message stating the month's real length instead of a silent conversion to a neighboring date — a one-day shift can mean a wrong birth date on an official document or a misplaced Zakat anniversary. The supported conversion range is 1350–1500 AH (roughly 1931–2077 CE), the validity window of reliable Umm al-Qura data.
            </p>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
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
