import { getDictionary } from "@/app/dictionaries";
import QiblaCompassClient from "@/app/components/QiblaCompassClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/qibla-compass`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/qibla-compass`,
        "ar": `https://smartcalctools.xyz/ar/tools/qibla-compass`,
      },
    },
    title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
    description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
    openGraph: {
      title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
      description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker",
      description: isAr 
      ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك باستخدام بوصلة تفاعلية 100% بدون إضافات خارجية."
      : "Find the exact Qibla direction towards the Kaaba in Mecca instantly from your device using our native compass sensor tracker.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function QiblaCompassPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const faqs = isAr ? [
    {
      question: "كيف تعمل بوصلة القبلة التفاعلية لتحديد اتجاه مكة؟",
      answer: "تعتمد البوصلة على مستشعرات الموقع (GPS) والبوصلة المغناطيسية المدمجة في هاتفك الذكي. تقوم الأداة بحساب الزاوية الدقيقة بين موقعك الحالي وموقع الكعبة المشرفة في مكة المكرمة لتعطيك الاتجاه بدقة."
    },
    {
      question: "هل أحتاج للاتصال بالإنترنت لاستخدام بوصلة القبلة؟",
      answer: "تحتاج إلى الإنترنت مرة واحدة لتحميل الصفحة وتحديد موقعك عبر الـ GPS، ولكن بمجرد تحميلها ومعرفة إحداثيات موقعك، تستطيع البوصلة الاعتماد على مستشعر الهاتف المغناطيسي لتوجيهك."
    },
    {
      question: "لماذا تطلب البوصلة إذن الوصول إلى الموقع؟",
      answer: "تحديد اتجاه القبلة يتطلب معرفة خطوط الطول والعرض الخاصة بك لكي تتمكن الخوارزميات الرياضية من حساب الاتجاه بدقة نحو الكعبة. نحن لا نقوم بتخزين أو مشاركة موقعك، وتتم العملية محلياً على جهازك."
    },
    {
      question: "ماذا أفعل إذا كان مؤشر البوصلة غير دقيق أو لا يتحرك؟",
      answer: "قد يحدث تداخل مغناطيسي. لتصحيح ذلك، قم بمعايرة بوصلة هاتفك عبر تحريكه على شكل الرقم 8 باللغة الإنجليزية في الهواء. وتأكد أيضاً من الابتعاد عن الأجهزة الإلكترونية والمعادن الكبيرة."
    },
    {
      question: "لماذا تطلب الأداة صلاحيات الموقع (GPS) وحساس الحركة؟",
      answer: "تحديد القبلة يتطلب معرفة موقعك الجغرافي لحساب الزاوية الصحيحة بالنسبة لمكة. أما حساس الحركة فيستخدم لربط هذه الزاوية مع اتجاه هاتفك الفعلي."
    },
    {
      question: "الأداة لا تعمل على جهاز الكمبيوتر المكتبي الخاص بي، لماذا؟",
      answer: "أجهزة الكمبيوتر المكتبية والمحمولة لا تحتوي غالباً على بوصلة مغناطيسية أو حساسات حركة. في هذه الحالة، ستعرض الأداة درجة القبلة كرقم (مثلاً 135 درجة من الشمال) لتستخدمها مع بوصلة يدوية."
    }
  ] : [
    {
      question: "How does the Live Qibla Compass determine the direction of Mecca?",
      answer: "The compass uses your device's GPS to find your location and its built-in magnetic compass sensors. It calculates the exact angle between your current coordinates and the Kaaba in Mecca."
    },
    {
      question: "Do I need an internet connection to use the Qibla Compass?",
      answer: "You need a brief internet connection to load the tool and initially fetch your GPS coordinates. Once your location is locked, the magnetic sensor handles the real-time direction finding."
    },
    {
      question: "Why does the compass require location permissions?",
      answer: "Calculating the precise direction to the Kaaba requires knowing your exact latitude and longitude. Your location data is processed locally on your device and is never stored or shared by us."
    },
    {
      question: "What should I do if the compass pointer is inaccurate or stuck?",
      answer: "Magnetic interference is a common issue. To fix this, calibrate your phone's compass by moving it in a figure-8 motion in the air. Also, ensure you are away from large metal objects and electronic devices."
    },
    {
      question: "Why does the tool ask for Location and Motion sensor permissions?",
      answer: "Location (GPS) is required to calculate the mathematical angle to Mecca based on where you are. The motion sensor is needed to map that angle to your phone's physical orientation."
    },
    {
      question: "The compass isn't moving on my Desktop/Laptop. Why?",
      answer: "Most desktop computers and laptops lack internal magnetic compasses or gyroscopes. If accessed from a PC, the tool falls back to showing you the exact numerical degree (e.g., 135° from North) so you can use a physical compass."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={isAr ? "بوصلة القبلة التفاعلية المباشرة" : "Live Qibla Compass & Tracker"}
        description={isAr ? "حدد اتجاه القبلة الدقيق نحو الكعبة المشرفة في مكة المكرمة مباشرة من مكانك" : "Find the exact Qibla direction towards the Kaaba in Mecca instantly"}
        applicationCategory="UtilityApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/qibla-compass`}
      />

      <div className="page-header" style={{ textAlign: "center" }}>
        <h1>{dict.qibla.title}</h1>
        <p>{dict.qibla.subtitle}</p>
      </div>

      <QiblaCompassClient lang={lang} dict={dict} />
      
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>أدق بوصلة لمعرفة اتجاه القبلة مباشرة من متصفحك</h2>
            <p>
              تعتبر معرفة اتجاه القبلة نحو الكعبة المشرفة في مكة المكرمة شرطاً أساسياً لأداء فريضة الصلاة للمسلمين في جميع أنحاء العالم. مع تطور التكنولوجيا، لم يعد من الضروري حمل بوصلة مادية أو سؤال الآخرين عن الاتجاه الصحيح. تقدم لك <strong>بوصلة القبلة التفاعلية المباشرة</strong> حلاً دقيقاً وفورياً يعمل مباشرة من متصفح هاتفك المحمول أو حاسوبك الشخصي.
            </p>
            <h3>كيف نضمن دقة تحديد الاتجاه؟</h3>
            <p>
              تعتمد أداتنا على خوارزميات رياضية فلكية دقيقة، تُعرف بصيغ حساب المسافات الدائرية الكبرى (Great-circle distance). عندما تمنح المتصفح صلاحية الوصول إلى موقعك الجغرافي (GPS)، تقوم الأداة باستخراج إحداثيات خطوط الطول والعرض الخاصة بك. وبمعرفة إحداثيات الكعبة المشرفة الدائمة (خط العرض 21.4224779، وخط الطول 39.8251832)، يتم حساب الزاوية المطلوبة بدقة متناهية. لحساب القبلة، تتم هذه العملية الحسابية <strong>محلياً على جهازك</strong> دون إرسال إحداثياتك الدقيقة إلى أي خوادم خارجية، مما يضمن أمان وخصوصية تامة لتحركاتك.
            </p>
            <h3>أمثلة واستخدامات شائعة</h3>
            <ul>
              <li><strong>السفر والفنادق:</strong> عندما تكون مسافراً وتقيم في غرفة فندق جديدة ولا تعرف اتجاه الصلاة، ببساطة افتح الأداة من متصفحك وسيعمل الـ GPS على تحديد موقعك وتوجيهك فوراً للقبلة.</li>
              <li><strong>الرحلات البرية والتخييم:</strong> في البراري المفتوحة والصحراء، قد يصعب تحديد الاتجاهات. بوصلة القبلة الذكية لا تحتاج لاتصال قوي بالإنترنت بمجرد تحميل الصفحة، مما يجعلها مثالية للمناطق النائية.</li>
              <li><strong>تحديد اتجاه المحاريب للمساجد الجديدة:</strong> رغم أن المهندسين يستخدمون أجهزة متخصصة، يمكن الاستئناس بهذه الأداة كمرجع سريع للتحقق المبدئي من اتجاه الجدار القبلي.</li>
            </ul>
            <h3>نصائح لاستخدام البوصلة بكفاءة عالية</h3>
            <ul>
              <li><strong>المعايرة:</strong> مستشعرات الهواتف قد تتأثر مع مرور الوقت. قم بمعايرة البوصلة بتحريك الهاتف على شكل رقم 8 في الهواء قبل الاستخدام لضمان الدقة.</li>
              <li><strong>تجنب التشويش:</strong> ابتعد عن مصادر المجالات المغناطيسية القوية مثل أجهزة التلفاز، الثلاجات، الميكروويف، أو حتى الأغطية المعدنية للهواتف.</li>
              <li><strong>الوضع الأفقي:</strong> ضع هاتفك بشكل مسطح تماماً (أفقي) على راحة يدك أو على طاولة، وتأكد من عدم إمالته لأعلى أو لأسفل.</li>
            </ul>
            <p>
              نسعى دائماً لتقديم أداة سهلة وسريعة لخدمة المسلمين في شتى بقاع الأرض، لتتمكنوا من إقامة الصلاة في أوقاتها وفي الاتجاه الصحيح بكل طمأنينة ويقين.
            </p>
          </>
        ) : (
          <>
            <h2>The Most Accurate Live Qibla Compass in Your Browser</h2>
            <p>
              Determining the precise direction of the Qibla (towards the Kaaba in Mecca) is a fundamental requirement for Muslims worldwide to perform their daily prayers (Salah). Thanks to modern web technologies, you no longer need to carry a physical compass or guess the direction. Our <strong>Live Qibla Compass & Tracker</strong> offers a highly accurate, instant solution that works directly from your smartphone or desktop browser.
            </p>
            <h3>How Do We Ensure Accuracy?</h3>
            <p>
              Our tool relies on precise astronomical and mathematical algorithms, specifically the Great-circle distance formula. When you grant the browser permission to access your GPS location, the tool retrieves your exact latitude and longitude. By comparing your coordinates with the fixed coordinates of the Kaaba (Latitude 21.4224779, Longitude 39.8251832), it calculates the exact bearing required. This calculation is performed <strong>100% locally on your device</strong>. Your precise location data is never logged, stored, or transmitted to any external servers.
            </p>
            <h3>Examples & Use Cases</h3>
            <ul>
              <li><strong>Travel & Hotel Stays:</strong> When traveling abroad and checking into a new hotel room, you might not know the prayer direction. Simply open this tool, allow location access, and it will instantly point you to Mecca.</li>
              <li><strong>Outdoor Camping:</strong> Out in the wilderness or desert, landmarks are scarce. Once the page is loaded, the compass logic can function smoothly, making it perfect for remote outdoor prayers.</li>
              <li><strong>New Prayer Rooms (Musallahs):</strong> If you are setting up a prayer room in your office or university, you can use this accurate mathematical compass as a reliable reference to lay out the prayer rugs correctly.</li>
            </ul>
            <h3>Tips for Using the Compass Effectively</h3>
            <ul>
              <li><strong>Calibration:</strong> Phone sensors can sometimes drift. Calibrate your compass by moving your phone in a figure-8 motion in the air before use.</li>
              <li><strong>Avoid Interference:</strong> Stay away from strong magnetic fields or large metallic objects, such as refrigerators, televisions, microwaves, or thick metal phone cases.</li>
              <li><strong>Keep it Flat:</strong> Hold your phone completely flat horizontally on the palm of your hand or place it on a flat table to get the most accurate sensor readings.</li>
            </ul>
            <p>
              We are dedicated to providing a fast, reliable, and accessible tool for Muslims everywhere, ensuring you can perform your prayers on time and in the right direction with complete peace of mind.
            </p>
          </>
        )}
      </article>

      <FAQSchema faqs={faqs} />
    </div>
  );
}
