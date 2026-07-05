import { getDictionary } from "@/app/dictionaries";
import HealthCalculator from "@/app/components/HealthCalculator";
import Link from "next/link";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/health/body-calculator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/health/body-calculator`,
        "ar": `https://smartcalctools.xyz/ar/calculators/health/body-calculator`,
      },
    },
    title: isAr ? "حاسبة الجسم الشاملة (BMI و السعرات) | SmartCalcTools" : "Comprehensive Body Calculator (BMI & TDEE) | SmartCalcTools",
    description: isAr ? "احسب مؤشر كتلة الجسم (BMI)، معدل الأيض (BMR)، احتياج السعرات (TDEE)، والوزن المثالي دفعة واحدة وبخصوصية تامة." : "Calculate your BMI, BMR, TDEE, and Ideal Weight all at once with 100% privacy.",
  };
}

export default async function BodyCalculatorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "16px", color: "var(--primary)" }}>
        {dict.health?.body_calc_title || "Comprehensive Body Calculator"}
      </h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto" }}>
        {dict.health?.body_calc_desc || "Calculate your BMI, BMR, TDEE, and Ideal Weight all at once."}
      </p>

      <HealthCalculator dict={dict} isAr={isAr} />

      {/* Massive AdSense SEO Content - Below the Fold */}
      <article className="card" style={{ marginTop: "60px", padding: "40px", lineHeight: "1.8", borderTop: "4px solid var(--primary)" }}>
        {isAr ? (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>حاسبة مقاييس الجسم المتقدمة: مؤشر الكتلة والأيض واحتياج السعرات</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              لا يمكن قياس الصحة الفسيولوجية واللياقة الأيضية الحقيقية بدقة بمجرد الوقوف على ميزان تقليدي. توفر حاسبتنا المتقدمة تحليلاً علمياً شاملاً لتكوين جسمك. من خلال حساب مؤشر كتلة الجسم (BMI)، ومعدل الأيض الأساسي (BMR)، وإجمالي استهلاك الطاقة اليومي (TDEE)، ونسبة الدهون المقدرة في الجسم (BFP) في وقت واحد، تمنحك هذه الأداة البيانات الفسيولوجية الدقيقة التي تحتاجها لبناء استراتيجيات تغذية وتضخيم أو خسارة دهون فعالة ومبنية على أسس رياضية.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>المنهجية العلمية والرياضيات لتكوين الجسم</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              لا تعتمد حاسبتنا على مقياس واحد معيب. بل تجمع عدة معادلات معتمدة سريرياً لبناء ملف كامل لمحركك الأيضي:
            </p>
            
            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>1. مؤشر كتلة الجسم (BMI) وسياقه السريري</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              تم تطوير الـ BMI في ثلاثينيات القرن التاسع عشر، وهو أداة فحص إحصائية صُممت في الأصل لتقييم الصحة العامة للسكان، وليس الأفراد. المعادلة بسيطة: <code>الوزن (كجم) / الطول (م)²</code>. على الرغم من أنه يظل أداة فرز مفيدة، إلا أننا نوضح حدوده بشدة: هو مجرد مقياس للكتلة. لا يمكنه رياضياً التمييز بين العظام الكثيفة، والكتلة العضلية المخططة، والدهون الحشوية. ولهذا السبب غالباً ما يصنف الرياضيين بشكل خاطئ على أنهم يعانون من السمنة.
            </p>

            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>2. معادلات معدل الأيض الأساسي (BMR)</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              يمثل BMR الحد الأدنى الدقيق لعدد السعرات الحرارية التي يحرقها جسمك أثناء الراحة التامة للحفاظ على الوظائف الحيوية. نحن نستخدم بدقة معادلة <strong>Mifflin-St Jeor</strong> (1990)، والتي أثبتت الدراسات الحديثة أنها أدق بنسبة 5٪ من معادلة هاريس-بنديكت القديمة (1919).
            </p>

            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>3. إجمالي استهلاك الطاقة اليومي (TDEE)</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              نظراً لأنك لست في غيبوبة طوال اليوم، يجب تعديل BMR الخاص بك ليتناسب مع حركتك البدنية. يطبق TDEE مضاعف نشاط بدني مستمد علمياً (مضاعفات كاتش-مكاردل). يحدد هذا الرقم النهائي مستوى "المحافظة" (Maintenance) الدقيق لك—وهي كمية الطعام التي يجب أن تتناولها لتبقى بنفس الوزن بالضبط.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>سيناريوهات واقعية وتطبيقات عملية للياقة البدنية</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>مفارقة الرياضي (BMI مرتفع، دهون منخفضة):</strong> تخيل رباعاً يزن 100 كجم. وفقاً لمقياس BMI القديم، سيُصنف طبياً كـ "سمنة مفرطة". ولكن عبر إدخال قياسات الخصر والرقبة في حاسبة دهون الجسم الخاصة بنا (بطريقة البحرية الأمريكية)، قد يُظهر نسبة دهون 10٪—مما يضعه في فئة "الرياضيين" النخبة. تمنع أداتنا الذعر غير المبرر.</li>
              <li style={{ marginBottom: "8px" }}><strong>فقدان الوزن المضمون رياضياً:</strong> إذا كان TDEE الخاص بك هو 2500 سعرة حرارية، فلديك البيانات لهندسة خسارة الدهون. نظراً لأن رطل الدهون يحتوي على حوالي 3500 سعرة، فإن فقدان رطل أسبوعياً يتطلب عجزاً يومياً قدره 500 سعرة. بتحديد هدفك عند 2000 سعرة، تضمن نزول الوزن بشكل رياضي قابل للتنبؤ.</li>
              <li style={{ marginBottom: "8px" }}><strong>التضخيم العضلي الصافي (Lean Bulking):</strong> لتجنب تخزين الدهون أثناء التضخيم، يمكن إضافة فائض بسيط يبلغ 200 إلى 300 سعرة حرارية فوق الـ TDEE لدعم تخليق البروتين العضلي.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>أي مقياس هو الأهم لصحتي على المدى الطويل؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>نسبة الدهون في الجسم هي بلا شك المؤشر الأفضل. الدهون العالية (خاصة الحشوية) مرتبطة بأمراض القلب. أما مؤشر كتلة الجسم المرتفع فقد يعني فقط أنك تمتلك عضلات كثيفة.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل يقل معدل الأيض (BMR) مع تقدم العمر؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>نعم. كما توضح معادلة Mifflin-St Jeor، ينخفض BMR بشكل مطرد مع تقدم العمر (حوالي 1-2٪ لكل عقد بعد سن العشرين) بسبب فقدان الكتلة العضلية الطبيعي (Sarcopenia).</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>لماذا توقف نزول وزني رغم أنني مستمر على نفس النظام الغذائي؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>مع فقدان الوزن، يصبح جسمك أصغر فعلياً، مما يعني أنه يحتاج إلى طاقة (سعرات) أقل للحركة والبقاء. سعرات الـ "عجز" القديمة تصبح الآن سعرات "محافظة". يجب عليك إعادة حساب أرقامك باستخدام هذه الأداة بشكل دوري.</p>
            </div>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>إخلاء مسؤولية طبي صارم</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              <strong>تحذير:</strong> المقاييس الفسيولوجية، وحسابات السعرات، والمعلومات المقدمة في هذه الأداة مخصصة للأغراض التعليمية والتقديرية فقط. هي لا تشكل بأي حال من الأحوال نصيحة طبية أو تشخيصاً سريرياً. استشر دائماً طبيباً مرخصاً أو أخصائي تغذية قبل البدء في أي برنامج لإنقاص الوزن أو ممارسة تمارين عالية الكثافة.
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Advanced Body Metrics Calculator: BMI, BMR, TDEE & Body Fat</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              True physiological health and metabolic fitness cannot be accurately measured by stepping onto a generic bathroom scale. Our Advanced Body Metrics Calculator provides a holistic, science-based analysis of your physical composition. By simultaneously calculating your Body Mass Index (BMI), Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and estimated Body Fat Percentage, this tool equips you with the exact physiological data you need.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>The Underlying Methodology & Mathematics</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Our calculator does not rely on a single, flawed metric. It aggregates multiple peer-reviewed equations:
            </p>
            
            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>1. Body Mass Index (BMI) & Its Limitations</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              The mathematical formula is simple: <code>BMI = Weight (kg) / Height (m)²</code>. While it remains a useful screening tool for populations, it is purely a measure of mass. It cannot mathematically distinguish between dense bone, lean striated muscle mass, and visceral adipose tissue (fat).
            </p>

            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>2. Basal Metabolic Rate (BMR)</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Your BMR represents the precise minimum number of calories your body burns at absolute rest just to maintain vital autonomic functions. We strictly utilize the <strong>Mifflin-St Jeor Equation</strong> (1990), proven to be roughly 5% more accurate than the antiquated Harris-Benedict equation.
            </p>

            <h4 style={{ fontSize: "1.2rem", marginTop: "16px" }}>3. Total Daily Energy Expenditure (TDEE)</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Your TDEE applies a scientifically derived physical activity multiplier to your BMR. This final number establishes your exact daily caloric maintenance level—the exact amount of food you must eat to stay the exact same weight.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Real-World Scenarios and Practical Fitness Applications</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>The Athlete's Paradox:</strong> A dedicated weightlifter might trigger a BMI score of 31.6 (Obese Class I). However, their actual Body Fat Percentage may be 10% (Elite Athlete). Our comprehensive tool prevents unnecessary panic by contextualizing raw weight with actual lean mass metrics.</li>
              <li style={{ marginBottom: "8px" }}><strong>Mathematically Guaranteed Sustainable Weight Loss:</strong> If your TDEE is exactly 2,500 calories per day, losing one pound of fat per week requires a daily energy deficit of 500 calories. Setting your target to 2,000 calories ensures predictable, sustainable weight loss.</li>
              <li style={{ marginBottom: "8px" }}><strong>Lean Bulking:</strong> By adding just 200 to 300 calories above their TDEE, individuals can construct a precise surplus to fuel muscle protein synthesis while mitigating unnecessary lipid (fat) storage.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Which metric is more important for my long-term health?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Body Fat Percentage is universally considered a vastly superior indicator of true metabolic health compared to BMI. High visceral fat is strongly linked to cardiovascular disease, whereas a high BMI might just indicate heavy musculature.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Does my biological age significantly decrease my BMR?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Yes. BMR decreases steadily with age (roughly 1% to 2% per decade after the age of 20) primarily due to the natural, progressive loss of metabolically active lean muscle mass (sarcopenia).</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why did my TDEE and weight loss suddenly stall?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>As you lose physical mass, your body becomes smaller. It requires significantly less kinetic energy to move and maintain its smaller cellular footprint. Your old "deficit" calories have become your new "maintenance" calories.</p>
            </div>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>Strict Medical Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              <strong>WARNING:</strong> The physiological body metrics, caloric calculations, algorithms, and information provided by this digital tool are strictly intended for educational, informational, and general estimation purposes only. This tool unequivocally does not constitute professional medical advice, clinical diagnosis, or specialized treatment recommendations. Always consult with a licensed physician or registered clinical dietitian.
            </p>
            <DisclaimerBox type="medical" lang={lang} />
          </>
        )}
      </article>

      <SoftwareSchema 
        name={isAr ? "حاسبة مقاييس الجسم" : "Advanced Body Metrics Calculator"}
        description={isAr ? "احسب مؤشر كتلة الجسم، ومعدل الأيض الأساسي، واحتياج السعرات الحرارية بدقة." : "Calculate BMI, BMR, TDEE, and body fat percentage accurately."}
        applicationCategory="HealthApplication"
        url={`https://smartcalctools.com/${lang}/calculators/health/body-calculator`}
      />

      <FAQSchema faqs={isAr ? [
        {
          question: "أي مقياس هو الأهم لصحتي على المدى الطويل؟",
          answer: "نسبة الدهون في الجسم هي المؤشر الأفضل. الدهون العالية مرتبطة بأمراض القلب، بينما مؤشر كتلة الجسم المرتفع قد يعني فقط أنك تمتلك عضلات كثيفة."
        },
        {
          question: "هل يقل معدل الأيض (BMR) مع تقدم العمر؟",
          answer: "نعم. ينخفض BMR بشكل مطرد مع تقدم العمر (حوالي 1-2٪ لكل عقد بعد سن العشرين) بسبب فقدان الكتلة العضلية الطبيعي."
        },
        {
          question: "لماذا توقف نزول وزني رغم أنني مستمر على نفس النظام الغذائي؟",
          answer: "مع فقدان الوزن، يحتاج جسمك طاقة (سعرات) أقل. سعرات العجز القديمة تصبح سعرات المحافظة الجديدة. يجب عليك إعادة حساب أرقامك باستخدام هذه الأداة بشكل دوري."
        }
      ] : [
        {
          question: "Which metric is more important for my long-term health?",
          answer: "Body Fat Percentage is universally considered a vastly superior indicator of true metabolic health compared to BMI. High visceral fat is strongly linked to cardiovascular disease."
        },
        {
          question: "Does my biological age significantly decrease my BMR?",
          answer: "Yes. BMR decreases steadily with age (roughly 1% to 2% per decade after the age of 20) primarily due to the natural, progressive loss of metabolically active lean muscle mass."
        },
        {
          question: "Why did my TDEE and weight loss suddenly stall?",
          answer: "As you lose physical mass, your body requires significantly less kinetic energy to move and maintain its smaller cellular footprint. Your old deficit calories have become your new maintenance calories."
        }
      ]} />
    </div>
  );
}
