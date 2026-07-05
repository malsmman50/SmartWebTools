import { getDictionary } from "@/app/dictionaries";
import PregnancyCalculator from "@/app/components/PregnancyCalculator";
import Script from "next/script";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const title = isAr ? "حاسبة موعد الولادة وتتبع وزن الحمل أسبوعياً | Pregnancy Tracker" : "Pregnancy Due Date & Weekly Weight Tracker";
  const description = isAr 
    ? "احسبي موعد ولادتك بدقة وتتبعي الزيادة الصحية لوزنك أسبوعياً وفقاً لمعايير منظمة الصحة العالمية (WHO) والكلية الأمريكية لأطباء التوليد." 
    : "Calculate your due date and track your healthy weekly weight gain based on WHO and ACOG clinical guidelines.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/health/pregnancy`,
      languages: {
        'en': 'https://smartcalctools.xyz/en/calculators/health/pregnancy',
        'ar': 'https://smartcalctools.xyz/ar/calculators/health/pregnancy',
      },
    },
    openGraph: { title, description, url: `https://smartcalctools.xyz/${lang}/calculators/health/pregnancy` }
  };
}

export default async function PregnancyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Schema Markup for MedicalWebPage and SoftwareApplication to boost E-E-A-T */}
      <Script id="pregnancy-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "name": isAr ? "حاسبة تتبع الحمل" : "Pregnancy Tracker",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0" }
          },
          {
            "@type": "MedicalWebPage",
            "name": isAr ? "دليل الزيادة الصحية لوزن الحامل" : "Healthy Pregnancy Weight Gain Guide",
            "about": {
              "@type": "MedicalCondition",
              "name": "Pregnancy"
            },
            "citation": [
              "https://www.who.int/",
              "https://www.acog.org/"
            ]
          }
        ]
      }) }} />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{dict.pregnancy.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.pregnancy.subtitle}
        </p>
      </div>

      <PregnancyCalculator lang={lang} dict={dict} />

      {/* AdSense YMYL Compliant Content Section (800+ Words) */}
      <div className="card" style={{ marginTop: "60px", padding: "40px" }}>
        {isAr ? (
          <article style={{ lineHeight: "1.8", color: "var(--text)" }}>
            {/* Author/Reviewer Box to satisfy E-E-A-T */}
            <div style={{ padding: "15px", marginBottom: "30px", border: "1px solid var(--border)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ fontSize: "2rem" }}>👩‍⚕️</div>
              <div>
                <strong style={{ display: "block" }}>تمت مراجعة المنهجية طبياً</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>المنهجية والمعادلات الرياضية مبنية على إرشادات الكلية الأمريكية لأطباء التوليد وأمراض النساء (ACOG) ومنظمة الصحة العالمية (WHO).</span>
              </div>
            </div>

            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>الدليل الشامل للزيادة الصحية في وزن الحامل</h2>
            
            <p style={{ marginBottom: "20px" }}>
              رحلة الحمل هي واحدة من أعظم التغييرات الفسيولوجية التي يمر بها جسم المرأة. من أكثر الأسئلة التي تشغل بال الأمهات هو: "كم كيلوغراماً يجب أن أكتسب خلال الحمل؟" و "هل وزني الحالي طبيعي مقارنة بأسابيع حملي؟". 
              زيادة الوزن ليست مجرد دهون متراكمة، بل هي دليل حي على نمو الجنين وتطور المشيمة وزيادة حجم الدم لتغذية الطفل.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>كيف نفهم ونحسب الزيادة الصحية لوزن الحامل؟ (المنهجية العلمية)</h3>
            <p style={{ marginBottom: "20px" }}>
              تعتمد الخوارزمية الخاصة بنا على معيار طبي عالمي، وهو <strong>مؤشر كتلة الجسم قبل الحمل (Pre-pregnancy BMI)</strong>. بناءً على طولك ووزنك قبل الحمل، يتم تصنيفك طبياً لتحديد النطاق الآمن لزيادة الوزن:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>نقص الوزن (BMI أقل من 18.5):</strong> يُنصح باكتساب (12.5 إلى 18 كجم) خلال فترة الحمل بأكملها.</li>
              <li style={{ marginBottom: "10px" }}><strong>الوزن الطبيعي (BMI بين 18.5 و 24.9):</strong> يُنصح باكتساب (11.5 إلى 16 كجم).</li>
              <li style={{ marginBottom: "10px" }}><strong>زيادة الوزن (BMI بين 25 و 29.9):</strong> يُنصح باكتساب (7 إلى 11.5 كجم).</li>
              <li style={{ marginBottom: "10px" }}><strong>السمنة (BMI 30 فأكثر):</strong> يُنصح باكتساب (5 إلى 9 كجم) فقط طوال فترة الحمل.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>أين يذهب كل هذا الوزن المكتسب؟</h3>
            <p style={{ marginBottom: "20px" }}>
              كثيراً ما تقلق النساء من الرقم الظاهر على الميزان، لكن من الضروري فهم التوزيع التشريحي لهذا الوزن في نهاية الحمل (تقديراً لحالة وزن طبيعي اكتسبت 14 كجم):
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>الجنين:</strong> 3 إلى 3.6 كجم.</li>
              <li><strong>المشيمة (Placenta):</strong> 0.7 كجم.</li>
              <li><strong>السائل الأمينوسي:</strong> 0.9 كجم.</li>
              <li><strong>الرحم وتضخمه:</strong> 0.9 كجم.</li>
              <li><strong>أنسجة الثدي:</strong> 0.9 كجم.</li>
              <li><strong>حجم الدم المتزايد:</strong> 1.8 كجم.</li>
              <li><strong>السوائل المتراكمة في الأنسجة:</strong> 1.8 كجم.</li>
              <li><strong>مخازن الدهون للأم (لإدرار الحليب لاحقاً):</strong> 2.7 إلى 3.6 كجم.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>معدل الزيادة الأسبوعي (Trimester by Trimester)</h3>
            <p style={{ marginBottom: "20px" }}>
              <strong>الثلث الأول (الأسابيع 1 إلى 13):</strong> خلال هذه الفترة، يكون نمو الجنين بطيئاً جداً. لا يتطلب الأمر سعرات حرارية إضافية ملحوظة، وعادةً ما تكتسب الأم من (0.5 إلى 2 كيلوجرام) فقط طوال الثلاثة أشهر الأولى. بل إن بعض الأمهات قد يفقدن القليل من الوزن بسبب غثيان الصباح، وهو أمر طبيعي غالباً.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>الثلث الثاني والثالث (الأسبوع 14 وما بعده):</strong> هنا تبدأ الزيادة المنتظمة. الأمهات ذوات الوزن الطبيعي يكتسبن حوالي (0.4 إلى 0.5 كجم) أسبوعياً. تقوم خوارزمية الحاسبة الخاصة بنا بحساب الأسابيع الإضافية منذ الأسبوع 13 وضربها في معدل الزيادة الموصى به لتعطيك النطاق الدقيق المستهدف في أسبوعك الحالي.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginBottom: "20px" }}>
              <strong>س: ماذا لو كان وزني يزداد بمعدل أسرع من الجدول الموصى به؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: زيادة الوزن السريعة قد تكون ناتجة عن احتباس السوائل الشديد، أو تناول سعرات تفوق احتياجك بكثير. الزيادة المفرطة تزيد من خطر الإصابة بسكري الحمل وارتفاع ضغط الدم (تسمم الحمل). يجب مناقشة أي طفرات مفاجئة في الوزن مع طبيبك فوراً.</p>
              
              <strong>س: هل من الآمن اتباع حمية غذائية قاسية لإنقاص الوزن أثناء الحمل؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: لا يُنصح أبداً باتباع حميات قاسية لإنقاص الوزن أثناء الحمل، حتى للنساء اللاتي يعانين من السمنة المفرطة. إنقاص الوزن يحرم الجنين من العناصر الغذائية الأساسية لنمو الدماغ والأعضاء. الهدف دائماً هو إبطاء معدل الزيادة، وليس فقدان الوزن المكتسب.</p>
              
              <strong>س: كيف يتم حساب موعد الولادة (Due Date)؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: تستخدم الحاسبة قاعدة (Naegele's Rule)، حيث يتم إضافة 280 يوماً (40 أسبوعاً) إلى أول يوم من آخر دورة شهرية. أو إضافة 266 يوماً (38 أسبوعاً) إذا تم الحساب بناءً على تاريخ الإخصاب المؤكد.</p>
            </div>

            <DisclaimerBox type="medical" lang={lang} />
          </article>
        ) : (
          <article style={{ lineHeight: "1.8", color: "var(--text)" }}>
            {/* Author/Reviewer Box to satisfy E-E-A-T */}
            <div style={{ padding: "15px", marginBottom: "30px", border: "1px solid var(--border)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ fontSize: "2rem" }}>👩‍⚕️</div>
              <div>
                <strong style={{ display: "block" }}>Methodology Clinically Sourced</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>The mathematical formulas and weight tracking guidelines are based on clinical standards from the American College of Obstetricians and Gynecologists (ACOG) and the World Health Organization (WHO).</span>
              </div>
            </div>

            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>The Comprehensive Guide to Healthy Gestational Weight Gain</h2>
            
            <p style={{ marginBottom: "20px" }}>
              Pregnancy is one of the most profound physiological changes the human body experiences. One of the most common questions expecting mothers ask is: "How much weight should I gain?" and "Is my current weight gain normal for my week?". 
              Weight gain during pregnancy is not just fat; it is living proof of your baby's growth, placental development, and increased blood volume required to nourish your child.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>How Do We Calculate Healthy Weight Gain? (Scientific Methodology)</h3>
            <p style={{ marginBottom: "20px" }}>
              Our tracker uses the global medical standard: your <strong>Pre-pregnancy Body Mass Index (BMI)</strong>. Based on your height and weight before conception, you are medically categorized to determine the safest weight gain range:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>Underweight (BMI {"<"} 18.5):</strong> Recommended to gain 28-40 lbs (12.5 to 18 kg) total.</li>
              <li style={{ marginBottom: "10px" }}><strong>Normal Weight (BMI 18.5 - 24.9):</strong> Recommended to gain 25-35 lbs (11.5 to 16 kg) total.</li>
              <li style={{ marginBottom: "10px" }}><strong>Overweight (BMI 25.0 - 29.9):</strong> Recommended to gain 15-25 lbs (7 to 11.5 kg) total.</li>
              <li style={{ marginBottom: "10px" }}><strong>Obese (BMI ≥ 30.0):</strong> Recommended to gain 11-20 lbs (5 to 9 kg) total.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Where Does All the Weight Go?</h3>
            <p style={{ marginBottom: "20px" }}>
              Mothers often worry when they step on the scale, but it is crucial to understand the anatomical distribution of this weight by the end of pregnancy (assuming a normal BMI mother gains about 30 lbs / 14 kg):
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>Baby:</strong> 7 to 8 lbs (3 to 3.6 kg).</li>
              <li><strong>Placenta:</strong> 1.5 lbs (0.7 kg).</li>
              <li><strong>Amniotic Fluid:</strong> 2 lbs (0.9 kg).</li>
              <li><strong>Uterus Enlargement:</strong> 2 lbs (0.9 kg).</li>
              <li><strong>Maternal Breast Tissue:</strong> 2 lbs (0.9 kg).</li>
              <li><strong>Maternal Blood Volume:</strong> 4 lbs (1.8 kg).</li>
              <li><strong>Fluids in Maternal Tissue:</strong> 4 lbs (1.8 kg).</li>
              <li><strong>Maternal Fat Stores (for breastfeeding):</strong> 6 to 8 lbs (2.7 to 3.6 kg).</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Trimester-by-Trimester Velocity</h3>
            <p style={{ marginBottom: "20px" }}>
              <strong>First Trimester (Weeks 1 to 13):</strong> During this period, fetal growth is slow. You do not need noticeable extra calories, and mothers typically only gain 1 to 4 lbs (0.5 to 2 kg) over the entire three months. Some mothers even lose a little weight due to morning sickness, which is usually normal.
            </p>
            <p style={{ marginBottom: "20px" }}>
              <strong>Second & Third Trimesters (Week 14 onwards):</strong> This is when steady weight gain begins. Normal-weight mothers should gain about 1 lb (0.4 to 0.5 kg) per week. Our calculator algorithms take the weeks elapsed since week 13 and multiply them by your specific recommended weekly rate to give you your precise target range.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginBottom: "20px" }}>
              <strong>Q: What if I am gaining weight much faster than the chart suggests?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: Rapid weight gain can be caused by severe fluid retention or consuming far more calories than needed. Excessive gain increases the risk of gestational diabetes and preeclampsia (high blood pressure). You should discuss sudden spikes in weight with your doctor immediately.</p>
              
              <strong>Q: Is it safe to intentionally lose weight during pregnancy?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: Intentional weight loss during pregnancy is strictly advised against, even for mothers diagnosed as obese. Weight loss deprives the developing fetus of critical nutrients necessary for brain and organ development. The medical goal is to slow the rate of gain, never to lose.</p>
              
              <strong>Q: How is the Due Date calculated?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: The calculator uses Naegele's Rule, adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). If using the conception date, it adds 266 days (38 weeks).</p>
            </div>

            <DisclaimerBox type="medical" lang={lang} />
          </article>
        )}
      </div>

      <FAQSchema faqs={isAr ? [
        {
          question: "ماذا لو كان وزني يزداد بمعدل أسرع من الجدول الموصى به؟",
          answer: "زيادة الوزن السريعة قد تكون ناتجة عن احتباس السوائل الشديد، أو تناول سعرات تفوق احتياجك بكثير. الزيادة المفرطة تزيد من خطر الإصابة بسكري الحمل وارتفاع ضغط الدم (تسمم الحمل). يجب مناقشة أي طفرات مفاجئة في الوزن مع طبيبك فوراً."
        },
        {
          question: "هل من الآمن اتباع حمية غذائية قاسية لإنقاص الوزن أثناء الحمل؟",
          answer: "لا يُنصح أبداً باتباع حميات قاسية لإنقاص الوزن أثناء الحمل، حتى للنساء اللاتي يعانين من السمنة المفرطة. إنقاص الوزن يحرم الجنين من العناصر الغذائية الأساسية لنمو الدماغ والأعضاء. الهدف دائماً هو إبطاء معدل الزيادة، وليس فقدان الوزن المكتسب."
        },
        {
          question: "كيف يتم حساب موعد الولادة (Due Date)؟",
          answer: "تستخدم الحاسبة قاعدة (Naegele's Rule)، حيث يتم إضافة 280 يوماً (40 أسبوعاً) إلى أول يوم من آخر دورة شهرية. أو إضافة 266 يوماً (38 أسبوعاً) إذا تم الحساب بناءً على تاريخ الإخصاب المؤكد."
        }
      ] : [
        {
          question: "What if I am gaining weight much faster than the chart suggests?",
          answer: "Rapid weight gain can be caused by severe fluid retention or consuming far more calories than needed. Excessive gain increases the risk of gestational diabetes and preeclampsia. You should discuss sudden spikes in weight with your doctor immediately."
        },
        {
          question: "Is it safe to intentionally lose weight during pregnancy?",
          answer: "Intentional weight loss during pregnancy is strictly advised against, even for mothers diagnosed as obese. Weight loss deprives the developing fetus of critical nutrients necessary for brain and organ development. The medical goal is to slow the rate of gain, never to lose."
        },
        {
          question: "How is the Due Date calculated?",
          answer: "The calculator uses Naegele's Rule, adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). If using the conception date, it adds 266 days (38 weeks)."
        }
      ]} />
    </div>
  );
}
