import { getDictionary } from "@/app/dictionaries";
import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/murabaha`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/murabaha`,
        "ar": `https://smartcalctools.xyz/ar/calculators/murabaha`,
      },
    },
    title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
    description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
    openGraph: {
      title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
      description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)",
      description: isAr 
      ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI."
      : "Calculate cost-plus financing installments. A strictly Halal, interest-free alternative to traditional loans.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function MurabahaCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  return (
    <>
      <SoftwareSchema
        name={isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)"}
        description={isAr ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI. تساعدك الحاسبة على معرفة القسط الشهري، إجمالي التكلفة، ومقدار الربح للبنك." : "Calculate cost-plus financing installments using our Murabaha Calculator. A strictly Halal, interest-free alternative to traditional loans. Determine your monthly installment, total financing cost, and bank's profit margin easily."}
        url={`https://smartcalctools.xyz/${lang}/calculators/murabaha`}
        price="0"
      />
      <div className="container">
        <MurabahaCalculatorClient lang={lang} dict={dict} />
        
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8", padding: "20px" }}>
          {isAr ? (
            <>
              <h2>حاسبة تمويل المرابحة الإسلامية: بديل القروض الربوية</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                تعتبر "المرابحة" من أشهر صيغ التمويل الإسلامي التي تستخدمها البنوك والمؤسسات المالية الإسلامية حول العالم لتلبية احتياجات العملاء سواء للتمويل الشخصي، تمويل السيارات، أو التمويل العقاري. على عكس القرض الربوي التقليدي الذي يقوم على إقراض المال مقابل فائدة (ربا)، تقوم المرابحة على مبدأ البيع والشراء (بيع الأمانة). حيث يقوم البنك بشراء السلعة أو الأصل المطلوب من قبل العميل، ثم يبيعه للعميل بثمن آجل يتضمن التكلفة الأصلية بالإضافة إلى هامش ربح معلوم ومتفق عليه مسبقاً.
              </p>
              <h3 style={{ marginTop: "24px" }}>كيف يتم حساب أقساط المرابحة؟</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                في تمويل المرابحة، يكون إجمالي المبلغ المستحق على العميل ثابتاً ولا يتغير بمرور الزمن أو بتأخر السداد (لا توجد فائدة مركبة أو غرامات تأخير تذهب كربح للبنك). يتم حساب التكلفة الإجمالية بجمع مبلغ التمويل (تكلفة السلعة) مع هامش الربح الإجمالي (مبلغ التمويل × نسبة الربح × عدد السنوات). بعد ذلك، يتم تقسيم هذا الإجمالي على عدد أشهر فترة السداد لمعرفة القسط الشهري الثابت.
              </p>
              <h3 style={{ marginTop: "24px" }}>أهمية استخدام حاسبة المرابحة</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                توفر لك حاسبة المرابحة أداة مالية دقيقة وسريعة لمعرفة التزاماتك المالية المستقبلية قبل توقيع عقود التمويل. من خلال إدخال تكلفة الأصل، الدفعة المقدمة (إن وجدت)، نسبة هامش الربح السنوي، ومدة التمويل، ستحصل فوراً على قيمة القسط الشهري، إجمالي الأرباح التي سيحصل عليها البنك، وإجمالي المبلغ الذي ستقوم بسداده. هذا يمنحك الشفافية الكاملة لاتخاذ قرار مالي متوافق مع مبادئك الدينية ومعايير (AAOIFI)، ويساعدك في مقارنة عروض التمويل الإسلامي المختلفة واختيار الأنسب لميزانيتك.
              </p>
            </>
          ) : (
            <>
              <h2>Islamic Murabaha Financing Calculator</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Murabaha (cost-plus financing) is one of the most widely used Islamic financing structures globally, offered by Islamic banks for personal, auto, and home financing. Unlike conventional loans that lend money at an interest rate (Riba)—which is strictly prohibited in Islam—Murabaha is an asset-backed sale transaction. The bank purchases the specific asset requested by the customer and then resells it to the customer on a deferred payment basis. The resale price includes the original cost of the asset plus a pre-agreed, transparent profit margin.
              </p>
              <h3 style={{ marginTop: "24px" }}>How are Murabaha Installments Calculated?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                In a Murabaha contract, the total debt owed by the customer is fixed from day one and does not increase over time, even in the event of late payment (there is no compounding interest or late payment penalties that benefit the bank as profit). The total financing cost is calculated by taking the principal amount (asset cost) and adding the total profit margin (Principal × Profit Rate × Tenure in Years). This fixed total is then divided by the total number of months to determine the flat monthly installment.
              </p>
              <h3 style={{ marginTop: "24px" }}>Why Use the Murabaha Calculator?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                The Murabaha Calculator provides you with a precise, instant assessment of your future financial commitments before you sign any financing agreements. By entering the asset price, down payment (if any), the annual profit rate, and the financing tenure, the tool instantly calculates your monthly installment, the total profit the bank will earn, and the overall total repayment amount. This ensures full transparency, helping you make informed financial decisions that comply with your religious values and AAOIFI standards, and enabling you to compare different Islamic financing offers effectively.
              </p>
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
            {
              question: "ما الفرق بين المرابحة والقرض الربوي؟",
              answer: "القرض الربوي هو إعطاء نقد مقابل نقد بزيادة (فائدة)، وهو محرم. أما المرابحة فهي عملية بيع وشراء حقيقية لسلعة، حيث يمتلك البنك السلعة أولاً ثم يبيعها للعميل بربح معلوم. في المرابحة، إجمالي الدين ثابت لا يزيد بتأخر السداد، بينما في القرض الربوي تتراكم الفوائد (الفائدة المركبة)."
            },
            {
              question: "هل نسبة الربح في المرابحة هي نفسها الفائدة (الإنترست)؟",
              answer: "لا، رغم أن بعض البنوك تستخدم نسباً مئوية مشابهة للسوق كطريقة لتسعير ربحها (Benchmarking)، إلا أن الطبيعة القانونية والشرعية مختلفة تماماً. الربح في المرابحة هو هامش ربح ثابت ناتج عن بيع سلعة ملموسة، ولا يمكن تغييره أو زيادته بعد إبرام العقد، بخلاف الفائدة التي قد تتغير أو تتراكم."
            },
            {
              question: "ماذا يحدث إذا تأخرت في سداد قسط المرابحة؟",
              answer: "في التمويل الإسلامي، لا يجوز للبنك فرض غرامات تأخير كأرباح إضافية لنفسه لأن ذلك يعتبر ربا. ومع ذلك، قد ينص العقد على التزام العميل بدفع مبلغ معين كـ (تبرع لجهات خيرية) في حال التأخر غير المبرر لمنع المماطلة، ولا يدخل هذا المبلغ في أرباح البنك."
            }
          ] : [
            {
              question: "What is the difference between Murabaha and a conventional interest-based loan?",
              answer: "A conventional loan involves lending money for money with an added interest (Riba), which is prohibited. Murabaha is a genuine trade transaction where the bank buys a tangible asset and resells it to the customer at a known markup. In Murabaha, the total debt is fixed and does not grow with time, whereas conventional loans apply compounding interest."
            },
            {
              question: "Is the profit rate in Murabaha just another name for interest?",
              answer: "No. While Islamic banks may use market benchmark rates (like LIBOR or SOFR) to price their profit margins, the underlying legal and religious nature is entirely different. Murabaha profit is a fixed markup from a commercial sale of a real asset. Once the contract is signed, the markup is locked and cannot be increased, unlike floating or compounding interest."
            },
            {
              question: "What happens if I am late on a Murabaha installment?",
              answer: "Under Islamic finance rules, a bank cannot charge late payment penalties to increase its own profits, as this constitutes Riba. However, the contract may include a 'charity clause' where unjustified late payments result in a penalty fee that the bank must donate to charity, acting solely as a deterrent against deliberate delays."
            }
          ]}
        />
        
        <div style={{ marginTop: "30px" }}>
          <DisclaimerBox type="religion" lang={lang} />
        </div>
      </div>
    </>
  );
}
