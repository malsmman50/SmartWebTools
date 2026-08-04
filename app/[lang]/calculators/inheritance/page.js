import { getDictionary } from "@/app/dictionaries";
import InheritanceCalculatorClient from "@/app/components/InheritanceCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import Hashiya from "@/app/components/UI/Hashiya";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/inheritance`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/inheritance`,
        "ar": `https://smartcalctools.xyz/ar/calculators/inheritance`,
      },
    },
    title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
    description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
    openGraph: {
      title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
      description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)",
      description: isAr 
      ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة."
      : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith) and standard Fiqh guidelines.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function InheritanceCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const faqs = isAr ? [
    {
      question: "ما هي حاسبة المواريث والتركات الشرعية؟",
      answer: "هي أداة رقمية متطورة مصممة لمساعدة الأفراد في حساب وتوزيع التركة أو الميراث وفقاً للأحكام والضوابط الشرعية الإسلامية (علم الفرائض). توفر الحاسبة تفصيلاً دقيقاً لنصيب كل وارث بناءً على درجة قرابته للمتوفى."
    },
    {
      question: "هل النتائج المستخرجة من الحاسبة نهائية ومعتمدة قانونياً؟",
      answer: "الحاسبة تقدم تقديراً دقيقاً مبنياً على القواعد الشرعية الأساسية، ولكن لا يمكن اعتبارها وثيقة قانونية أو شرعية نهائية. يُنصح دائماً بعرض النتائج على القضاء أو الجهات المختصة أو دار الإفتاء لاعتماد التوزيع."
    },
    {
      question: "كيف يتم التعامل مع الوصية والديون قبل توزيع التركة؟",
      answer: "حسب الشريعة الإسلامية، يجب أولاً تسديد نفقات التجهيز والدفن، ثم سداد ديون المتوفى، ثم تنفيذ الوصية (في حدود الثلث)، وما يتبقى بعد ذلك يتم إدخاله في الحاسبة لتوزيعه على الورثة الشرعيين."
    },
    {
      question: "هل تدعم الحاسبة جميع حالات الحجب والتعصيب المعقدة؟",
      answer: "نعم، الخوارزمية الخاصة بنا مُصممة للتعامل مع معظم حالات الحجب (حرمان وارث بوجود وارث أقرب) والتعصيب وفقاً للمذاهب الفقهية المعتمدة، مع تبسيط عرض النتائج لتكون مفهومة لغير المختصين."
    }
  ] : [
    {
      question: "What is the Islamic Inheritance Calculator (Mawarith)?",
      answer: "It is an advanced digital tool designed to help individuals calculate and distribute an estate or inheritance strictly according to Islamic Sharia law (Ilm al-Fara'id). The calculator provides a detailed breakdown of each heir's share based on their relationship to the deceased."
    },
    {
      question: "Are the results from the calculator legally and religiously binding?",
      answer: "The calculator provides a highly accurate estimate based on foundational Sharia rules, but it is not a legally binding document. It is strongly advised to consult a religious scholar (Mufti) or a legal court for the final approved distribution."
    },
    {
      question: "How are debts and wills handled before distributing the inheritance?",
      answer: "According to Islamic law, you must first pay for funeral expenses, settle all debts of the deceased, and execute any valid will (up to one-third of the estate). Only the remaining balance should be entered into the calculator for distribution among the legal heirs."
    },
    {
      question: "Does the calculator support complex cases of exclusion (Hajb) and residue (Ta'seeb)?",
      answer: "Yes, our algorithm is engineered to handle most scenarios of exclusion (where a closer relative blocks a more distant one) and residuary inheritance according to standard Fiqh, presenting the results in an easy-to-understand format."
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={isAr ? "حاسبة المواريث والتركات الشرعية" : "Islamic Inheritance Calculator (Mawarith)"}
        description={isAr ? "احسب أنصبة الورثة الشرعيين والتركات وفقاً لقواعد علم الفرائض والفقه الإسلامي المعتمدة." : "Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith)."}
        applicationCategory="EducationalApplication"
        url={`https://smartcalctools.xyz/${lang}/calculators/inheritance`}
      />

      <div className="page-header">
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{dict.inheritance.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "12px" }}>
          {dict.inheritance.subtitle}
        </p>

        <div style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--primary)", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.9rem", lineHeight: "1.5" }}>
          {isAr ? (
            <><strong>تحديث جديد:</strong> تم ترقية الحاسبة لتشمل أحكام الجدود والجدات والإخوة الأشقاء ولأب ولأم، مع تطبيق قواعد العول والحجب (بناءً على المذهب الحنفي).</>
          ) : (
            <><strong>Major Update:</strong> The calculator now includes extended heirs (Grandparents, Full/Paternal/Maternal Siblings) and applies Awl and Hajb rules (based on Hanafi fiqh).</>
          )}
        </div>
      </div>

      <div className="matn-hashiya">
        <div>
          <InheritanceCalculatorClient lang={lang} dict={dict} />
        </div>
        <Hashiya source="inheritance" lang={lang} methodologyAnchor="inheritance" />
      </div>
      
      <FAQSchema faqs={faqs} />
      
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>حاسبة المواريث الشرعية (النسخة الشاملة)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px", marginBottom: "24px" }}>
              تم تطوير حاسبة المواريث لتشمل الأصول (الأب، الجد، الأم، الجدات)، والفروع (الأبناء والبنات)، والحواشي (الإخوة الأشقاء، الإخوة لأب، والإخوة لأم). تطبق الحاسبة قواعد الحجب المعتمدة (Hajb) ومبدأ العول ('Awl) بدقة وفقاً للراجح من المذهب الحنفي.
            </p>

            <h2>الدليل الإرشادي لحاسبة المواريث والتركات (علم الفرائض)</h2>
            <p>
              يُعد علم المواريث، أو ما يُعرف بـ <em>علم الفرائض</em>، من أدق وأهم العلوم في الشريعة الإسلامية. فقد تكفل الله سبحانه وتعالى بتفصيل أنصبة الورثة في القرآن الكريم لضمان العدل والإنصاف بين أفراد الأسرة. صُممت <strong>حاسبة المواريث الشرعية</strong> لتكون أداة مساعدة تترجم هذه القواعد المعقدة إلى نتائج رقمية دقيقة ومبسطة بضغطة زر.
            </p>
            <h3>كيفية استخدام الحاسبة خطوة بخطوة</h3>
            <ol>
              <li>
                <strong>تصفية التركة:</strong> قبل إدخال أي مبلغ، تأكد من خصم تكاليف التجهيز، سداد الديون، وتنفيذ الوصايا المشروعة (في حدود الثلث) من إجمالي مال المتوفى.
              </li>
              <li>
                <strong>تحديد الورثة:</strong> قم بتحديد جنس المتوفى، ثم أدخل أعداد الورثة الأحياء (الزوج/الزوجة، الأبناء، البنات، الآباء، والإخوة).
              </li>
              <li>
                <strong>النتيجة التفصيلية:</strong> ستقوم الحاسبة تلقائياً بتطبيق قواعد الحجب (منع وارث بسبب وجود وارث أقرب) والتعصيب (أخذ ما تبقى من التركة)، لتظهر لك جدولاً مفصلاً يوضح الكسر الشرعي (مثل الثمن أو السدس) والمبلغ المستحق لكل فرد.
              </li>
            </ol>
            <h3>أهمية فهم قواعد الحجب والتعصيب</h3>
            <p>
              الاعتماد على الحاسبة يوفر وقتاً وجهداً كبيراً، خصوصاً في المسائل المتشابكة التي تتطلب حساب أصول المسائل وتصحيحها. ومع ذلك، تبقى هذه الأداة وسيلة تعليمية وتثقيفية، تمنحك نظرة عامة شاملة حول كيفية التوزيع.
            </p>
            
            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>تنبيه فقهي وقانوني</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px", marginBottom: "24px" }}>
              على الرغم من دقة هذه الخوارزميات، علم المواريث معقد جداً ويحتوي على اختلافات فقهية في مسائل محددة (مثل مسألة الجد مع الإخوة، والمناسخات). هذه الحاسبة للاستخدام التعليمي والتقريبي فقط. <strong>لا تعتمد عليها في التقاضي أو تقسيم تركة حقيقية</strong>، ويجب الرجوع للمحاكم الشرعية الرسمية.
            </p>
            <DisclaimerBox type="religious" lang={lang} />
          </>
        ) : (
          <>
            <h2>Comprehensive Islamic Inheritance (Mawarith) Calculator</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px", marginBottom: "24px" }}>
              This calculator has been upgraded to handle extended heirs including Ascendants (Grandparents) and Collaterals (Full, Paternal, and Maternal Siblings). It automatically applies the complex rules of exclusion (Hajb) and proportional reduction (Awl) based on the Hanafi school of thought.
            </p>

            <h2>A Guide to the Islamic Inheritance Calculator (Mawarith)</h2>
            <p>
              The science of inheritance, known as <em>Ilm al-Fara'id</em>, is one of the most detailed and crucial disciplines within Islamic jurisprudence (Sharia). To ensure complete justice and fairness among family members, the shares of heirs are explicitly detailed in the Quran. Our <strong>Islamic Inheritance Calculator</strong> is designed to translate these intricate rules into precise, easy-to-understand numerical results with just a few clicks.
            </p>
            <h3>Step-by-Step Guide to Using the Calculator</h3>
            <ol>
              <li>
                <strong>Purify the Estate:</strong> Before entering any monetary value, ensure you have deducted funeral expenses, settled all outstanding debts, and executed any legitimate wills (which cannot exceed one-third of the total estate).
              </li>
              <li>
                <strong>Identify the Heirs:</strong> Select the gender of the deceased, then input the number of surviving relatives (spouse, sons, daughters, parents, and siblings).
              </li>
              <li>
                <strong>Detailed Breakdown:</strong> The calculator automatically applies the complex rules of exclusion (Hajb) and residuary entitlement (Ta'seeb). It provides a comprehensive table displaying the exact fractional share (e.g., 1/8 or 1/6) and the specific monetary amount for each individual.
              </li>
            </ol>
            <h3>The Importance of Precision in Mawarith</h3>
            <p>
              Relying on an automated calculator saves significant time and effort, especially in convoluted scenarios that require calculating common denominators and correcting base numbers. Nevertheless, this tool primarily serves an educational purpose, giving you a clear overview of the distribution process.
            </p>
            
            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>Legal & Fiqh Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px", marginBottom: "24px" }}>
              Despite the accuracy of these algorithms, Islamic inheritance contains fiqhi differences of opinion in rare edge cases. This calculator is for educational and approximation purposes only. <strong>Never use it as a final legal arbiter for an actual estate.</strong> Always consult official Sharia courts.
            </p>
            <DisclaimerBox type="religious" lang={lang} />
          </>
        )}
      </article>
    </div>
  );
}
