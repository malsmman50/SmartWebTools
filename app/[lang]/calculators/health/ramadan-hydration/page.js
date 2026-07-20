import { getDictionary } from "@/app/dictionaries";
import RamadanHydration from "@/app/components/RamadanHydration";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const url = `https://smartcalctools.xyz/${lang}/calculators/health/ramadan-hydration`;
  
  return {
    title: `${dict.ramadan.title} | SmartCalcTools`,
    description: dict.ramadan.desc,
    openGraph: {
      title: `${dict.ramadan.title} | SmartCalcTools`,
      description: dict.ramadan.desc,
      url: url,
      type: "website",
      images: [
        {
          url: 'https://smartcalctools.xyz/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: dict.ramadan.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.ramadan.title,
      description: dict.ramadan.desc,
      images: ['https://smartcalctools.xyz/twitter-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/health/ramadan-hydration",
        "ar": "https://smartcalctools.xyz/ar/calculators/health/ramadan-hydration",
      },
    },
  };
}

export default async function RamadanHydrationPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  const url = `https://smartcalctools.xyz/${lang}/calculators/health/ramadan-hydration`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://smartcalctools.xyz/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Health Calculators",
        "item": `https://smartcalctools.xyz/${lang}#health`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.ramadan.title,
        "item": url
      }
    ]
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={dict.ramadan.title}
        description={dict.ramadan.desc}
        applicationCategory="HealthApplication"
        url={url}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-header text-center" style={{ marginBottom: "2rem" }}>
        <h1 className="title">💧 {dict.ramadan.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.ramadan.desc}
        </p>
      </div>
      
      {/* Disclaimer Block */}
      <div style={{ maxWidth: "900px", margin: "0 auto 24px", background: "rgba(var(--danger-rgb), 0.05)", borderLeft: "4px solid var(--danger)", padding: "16px", borderRadius: "0 8px 8px 0" }}>
        <strong style={{ color: "var(--danger)" }}>⚠️ {isAr ? "تنويه طبي هام:" : "Important Medical Disclaimer:"}</strong>
        <p style={{ margin: "4px 0 0", fontSize: "0.9rem" }}>
          {isAr 
            ? "هذه الحاسبة توفر تقديرات عامة مبنية على المعادلات الصحية القياسية، ولا تعتبر بديلاً عن الاستشارة الطبية. يرجى استشارة الطبيب في حالات الحمل، الأمراض المزمنة، أو الحالات الخاصة." 
            : "This calculator provides general estimates based on standard health formulas and is not a substitute for professional medical advice. Please consult a doctor for pregnancy, chronic conditions, or special health circumstances."}
        </p>
      </div>

      <div className="calc-container" style={{ maxWidth: "900px", margin: "0 auto 3rem" }}>
        <RamadanHydration dict={dict} lang={lang} />
      </div>

      {/* SEO Article Wrapper */}
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>الدليل الفسيولوجي الشامل لترطيب الجسم أثناء صيام رمضان</h2>
            <p style={{ marginBottom: "20px" }}>
              يمثل الصيام لساعات طويلة تحدياً فسيولوجياً حقيقياً للجسم، وخاصة فيما يتعلق بالحفاظ على توازن السوائل (Hydration). يؤدي الامتناع عن شرب الماء لمدة تصل إلى 14 أو 15 ساعة متواصلة إلى انخفاض حجم الدم وزيادة تركيز الأملاح، مما يسبب الشعور بالإرهاق الشديد، الصداع التوتري، وضعف التركيز. لذلك، فإن تعويض السوائل بين فترتي الإفطار والسحور ليس مجرد مسألة إطفاء للعطش، بل هو استراتيجية طبية لاستعادة كفاءة الخلايا ووظائف الكلى.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>الأساس العلمي لحساب احتياجاتك من الماء</h3>
            <p style={{ marginBottom: "20px" }}>
              تعتمد حاسبتنا الذكية على المعايير الطبية العالمية لتعويض السوائل. كم يجب أن تشرب؟ المعادلة الأساسية تنص على أن البالغين يحتاجون في المتوسط إلى 35 مليلتراً من الماء لكل كيلوغرام من وزن الجسم يومياً. ومع ذلك، لا نتوقف عند هذا الحد، بل نقوم بتعديل هذه الكمية بناءً على مستوى نشاطك البدني. فإذا كنت تمارس الرياضة في رمضان أو تبذل مجهوداً عالياً، يزداد معدل التعرق وفقدان الإلكتروليتات، وتضيف الحاسبة كميات تعويضية دقيقة لضمان عدم تعرضك للجفاف.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>خطأ "التخزين" وقت السحور: لماذا يجب تقسيم شرب الماء؟</h3>
            <p style={{ marginBottom: "20px" }}>
              من أكثر الأخطاء شيوعاً في رمضان هو شرب كميات هائلة من الماء (لتر أو أكثر) دفعة واحدة قبل أذان الفجر بدقائق. من الناحية الفسيولوجية، الكلى البشرية تستطيع تصفية حوالي 800 إلى 1000 مل من الماء في الساعة كحد أقصى. شرب كمية تفوق هذه القدرة يؤدي إلى تحفيز إدرار البول الفوري (Diuresis). النتيجة؟ ستفقد معظم هذا الماء في الساعات الأولى من الصباح وستشعر بالعطش الشديد بقية اليوم.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>الحل البديل:</strong> بدلاً من ذلك، تقوم حاسبتنا بحساب الساعات المتاحة لك بين الإفطار والسحور، وتقسيم إجمالي احتياجك من الماء على هذه الساعات (مثلاً، كوب واحد كل ساعة أو ساعة ونصف). هذه الاستراتيجية "التقطيرية" تضمن امتصاص الخلايا للماء ببطء وتخزينه بكفاءة في الأنسجة.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>سوائل خفية ومشروبات تسبب الجفاف</h3>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>مشروبات الكافيين (الشاي والقهوة):</strong> تعتبر مدرة للبول وتزيد من فقدان السوائل. إذا تناولتها، يجب تعويضها بشرب كوب إضافي من الماء.</li>
              <li><strong>الفواكه والخضروات الغنية بالماء:</strong> البطيخ، الخيار، والبرتقال تحتوي على نسبة تصل إلى 90% من الماء، وهي مصدر ممتاز للإماهة البطيئة (Slow Hydration).</li>
            </ul>

            <DisclaimerBox type="medical" lang={lang} />
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>The Comprehensive Physiological Guide to Ramadan Hydration</h2>
            <p style={{ marginBottom: "20px" }}>
              Fasting for extended hours presents a significant physiological challenge to the human body, particularly concerning fluid balance. Abstaining from water for 13 to 15 continuous hours leads to a temporary reduction in blood plasma volume and an increased concentration of electrolytes, which commonly manifests as profound fatigue, tension headaches, and impaired cognitive function. Therefore, replenishing your fluids between Iftar and Suhoor is not merely about quenching thirst—it is a critical medical strategy to restore cellular efficiency and renal function.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>The Science Behind Calculating Your Water Intake</h3>
            <p style={{ marginBottom: "20px" }}>
              Our smart calculator utilizes global clinical standards for fluid replacement. How much should you drink? The foundational physiological formula dictates that the average adult requires approximately 35 milliliters of water per kilogram of body weight daily. However, we do not stop there. The algorithm dynamically adjusts your target intake based on your physical activity level. If you exercise or engage in manual labor during Ramadan, your sweat rate and electrolyte depletion increase significantly, and the calculator adds precise compensatory volumes to prevent dehydration.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>The "Chugging" Fallacy: Why You Must Pace Your Intake</h3>
            <p style={{ marginBottom: "20px" }}>
              One of the most widespread dietary mistakes during Ramadan is drinking massive volumes of water (a liter or more) in a single sitting just minutes before the Suhoor deadline. Physiologically, healthy human kidneys can filter a maximum of roughly 800 to 1000 ml of water per hour. Chugging excess water abruptly suppresses the antidiuretic hormone (ADH), triggering rapid diuresis (frequent urination). The result? You will expel most of that water within the first few hours of the morning and face severe dehydration for the remainder of the day.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>The Paced Strategy:</strong> To counteract this, our calculator determines the non-fasting window between Iftar and Suhoor and distributes your total water requirement evenly across those hours. This "drip-feed" approach ensures that your cells absorb the water gradually, maintaining optimal hydration levels in your tissues throughout the fasting day.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Hidden Hydration and Diuretics</h3>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>Caffeinated Beverages (Tea and Coffee):</strong> These act as mild diuretics and increase fluid loss. If consumed, you should drink an extra cup of water to offset the diuretic effect.</li>
              <li><strong>Water-Rich Produce:</strong> Watermelon, cucumbers, and oranges are composed of up to 90% water. They provide excellent "slow hydration" because the water is bound within plant cells.</li>
            </ul>

            <DisclaimerBox type="medical" lang={lang} />
          </>
        )}
      </article>

      <FAQSchema faqs={isAr ? [
        {
          question: "كم كوب ماء أحتاج يومياً في رمضان؟",
          answer: "يعتمد ذلك على وزنك ومستوى نشاطك. بشكل عام، يحتاج الجسم إلى 35 مل من الماء لكل كيلوغرام من وزن الجسم، بالإضافة إلى تعويض السوائل المفقودة بسبب التعرق والنشاط البدني."
        },
        {
          question: "ما هو أفضل وقت لشرب الماء في رمضان؟",
          answer: "يُفضل تقسيم شرب الماء بشكل متساوٍ، بحيث يتم تناول كوب كل ساعة أو ساعة ونصف من وقت الإفطار حتى السحور. هذا يضمن الامتصاص البطيء ويمنع إدرار البول السريع."
        },
        {
          question: "هل شرب كمية كبيرة من الماء وقت السحور يمنع العطش؟",
          answer: "لا، هذا خطأ شائع. شرب كميات هائلة دفعة واحدة يدفع الكلى للتخلص منها سريعاً عبر البول في أولى ساعات النهار، مما يتركك عرضة للعطش باقي اليوم."
        }
      ] : [
        {
          question: "How many cups of water do I need during Ramadan?",
          answer: "It depends strictly on your weight and physical activity level. Generally, the human body needs 35ml of water per kilogram of body weight, plus compensatory fluids for any sweating or exercise."
        },
        {
          question: "When is the best time to drink water in Ramadan?",
          answer: "It is medically optimal to pace your water intake by drinking roughly one cup every hour from Iftar to Suhoor. This ensures maximum cellular absorption and prevents rapid fluid loss."
        },
        {
          question: "Does chugging water at Suhoor prevent thirst?",
          answer: "No, this is a common misconception. Chugging massive amounts of water at once forces your kidneys into overdrive, causing you to urinate it out quickly in the morning and leaving you dehydrated later."
        }
      ]} />
    </div>
  );
}
