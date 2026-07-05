import { getDictionary } from "@/app/dictionaries";
import MurabahaCalculatorClient from "@/app/components/MurabahaCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";
import Link from "next/link";

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
  const t = dict.murabaha;
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema
        name={isAr ? "حاسبة المرابحة الإسلامية" : "Murabaha Calculator (Islamic Financing)"}
        description={isAr ? "احسب أقساط تمويل المرابحة بهامش الربح الثابت. البديل الشرعي الخالي من الفوائد للقروض الربوية بالتوافق مع معايير AAOIFI. تساعدك الحاسبة على معرفة القسط الشهري، إجمالي التكلفة، ومقدار الربح للبنك." : "Calculate cost-plus financing installments using our Murabaha Calculator. A strictly Halal, interest-free alternative to traditional loans. Determine your monthly installment, total financing cost, and bank's profit margin easily."}
        url={`https://smartcalctools.xyz/${lang}/calculators/murabaha`}
        price="0"
      />
      
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div style={{ marginTop: "12px" }}>
          <Link href={`/${lang}/methodology#murabaha`} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600", fontSize: "0.9rem" }}>
            {lang === "ar" ? "📖 اقرأ المنهجية الشرعية ومصادر الحساب لهذه الحاسبة" : "📖 Read Shariah methodology & sources for this calculator"}
          </Link>
        </div>
      </div>

      <MurabahaCalculatorClient lang={lang} dict={dict} />
      
      <div style={{ marginTop: "30px" }}>
        <DisclaimerBox type="religion" lang={lang} />
      </div>

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {isAr ? (
          <>
            <h2>حاسبة تمويل المرابحة الإسلامية: بديل القروض الربوية</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تعتبر "المرابحة" من أشهر صيغ التمويل الإسلامي التي تستخدمها البنوك والمؤسسات المالية الإسلامية حول العالم لتلبية احتياجات العملاء سواء للتمويل الشخصي، تمويل السيارات، أو التمويل العقاري. على عكس القرض الربوي التقليدي الذي يقوم على إقراض المال مقابل فائدة (ربا)، تقوم المرابحة على مبدأ البيع والشراء (بيع الأمانة). حيث يقوم البنك بشراء السلعة أو الأصل المطلوب من قبل العميل، ثم يبيعه للعميل بثمن آجل يتضمن التكلفة الأصلية بالإضافة إلى هامش ربح معلوم ومتفق عليه مسبقاً.
            </p>

            <h3 style={{ marginTop: "24px" }}>الدليل الشامل للتمويل الإسلامي بالمرابحة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تمويل المرابحة هو أحد أكثر صيغ التمويل الإسلامي شيوعاً واستخداماً حول العالم لشراء العقارات، المركبات، والآلات التجارية دون الوقوع في شبهة المعاملات الربوية وفائدة القروض التقليدية. فبينما يرتكز القرض التقليدي على إقراض المال مقابل فائدة متراكمة بمرور الزمن، ترتكز المرابحة على قيام الممول بشراء السلعة وتملكها ثم إعادة بيعها لك بهامش ربح متفق عليه ومحدد سلفاً، لتقوم أنت بدفع قيمتها على أقساط مؤجلة.
            </p>

            <h3 style={{ marginTop: "24px" }}>خطوات عملية المرابحة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تتسم عملية التمويل بالمرابحة بالشفافية الكاملة وتعتمد على أصل ملموس وحقيقي:
            </p>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>تحديد الأصل:</strong> يقوم العميل باختيار العقار أو السيارة التي يود شرائها من البائع مباشرة.</li>
              <li><strong>شراء البنك للأصل:</strong> يقوم البنك الإسلامي بشراء الأصل بشكل مباشر من البائع وتملك حيازته شرعاً وقانوناً.</li>
              <li><strong>البيع للعميل:</strong> يبيع البنك الأصل للعميل بسعر التكلفة الأصلية مضافاً إليه هامش ربح محدد وواضح متفق عليه.</li>
              <li><strong>الأقساط الثابتة:</strong> يقوم العميل بسداد إجمالي المبلغ (التكلفة + الأرباح) على أقساط شهرية متساوية على مدى فترة متفق عليها.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>الفرق بين المرابحة والقروض العقارية التقليدية</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              يكمن الاختلاف الجوهري في طبيعة العقد القانونية والشرعية؛ فالتمويل العقاري التقليدي هو عقد إقراض للمال بفائدة مركبة متراكمة، وتكون فيه السلعة مجرد رهن. وإذا تأخرت في السداد، تتراكم الفوائد العقابية وتتضاعف ديونك. أما المرابحة فهي عقد بيع تجاري، وتكون أرباح البنك فيه ثابتة ومحددة منذ اليوم الأول ولا يجوز قانوناً ولا شرعاً زيادتها أو احتساب فائدة مركبة على التأخير (قد تفرض البنوك غرامة للتبرع بها للجمعيات الخيرية للحد من المماطلة ولكن لا تدخل ضمن أرباح البنك).
            </p>

            <h3 style={{ marginTop: "24px" }}>كيف يتم حساب أقساط المرابحة؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              في تمويل المرابحة، يكون إجمالي المبلغ المستحق على العميل ثابتاً ولا يتغير بمرور الزمن أو بتأخر السداد (لا توجد فائدة مركبة أو غرامات تأخير تذهب كربح للبنك). يتم حساب التكلفة الإجمالية بجمع مبلغ التمويل (تكلفة السلعة) مع هامش الربح الإجمالي (مبلغ التمويل × نسبة الربح × عدد السنوات). بعد ذلك، يتم تقسيم هذا الإجمالي على عدد أشهر فترة السداد لمعرفة القسط الشهري الثابت.
            </p>
            
            <h3 style={{ marginTop: "24px" }}>حساب هامش ربح المرابحة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              على عكس القروض التقليدية التي تحتسب فائدتها على الرصيد المتناقص وتتراكم، يُحتسب ربح المرابحة كنسبة مسطحة وثابتة تضاف إلى أصل التمويل في البداية. تتيح لك حاسبة المرابحة الخاصة بنا إدخال تكلفة الأصل، وقيمة الدفعة الأولى، وهامش الربح السنوي المتفق عليه لتظهر لك فوراً قيمة القسط الشهري الثابت وإجمالي الأرباح المستحقة للممول.
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

            <h3 style={{ marginTop: "24px" }}>The Complete Guide to Murabaha (Islamic Financing)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Murabaha is one of the most common modes of Islamic financing used globally to purchase homes, vehicles, and business equipment without resorting to interest-based (Riba) loans. In a conventional loan, a bank lends you money and charges compounding interest over time. In a Murabaha transaction, the financier purchases the actual asset and sells it to you at a pre-agreed profit margin. You then pay for the asset in fixed monthly installments.
            </p>

            <h3 style={{ marginTop: "24px" }}>How Murabaha Works</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The process of Murabaha is entirely transparent and based on a tangible asset. Here are the typical steps:
            </p>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>Asset Identification:</strong> You identify the property or vehicle you wish to buy.</li>
              <li><strong>Purchase by Bank:</strong> The Islamic bank purchases the asset directly from the seller and takes ownership.</li>
              <li><strong>Sale to Customer:</strong> The bank sells the asset to you at the original cost plus a transparent, mutually agreed profit margin.</li>
              <li><strong>Fixed Installments:</strong> You pay the total price (Cost + Profit) over a set period (e.g., 5 years) in equal monthly installments.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Murabaha vs. Conventional Mortgage</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The key difference lies in the nature of the contract. A conventional mortgage is a money-lending contract where the asset is just collateral. If you default or miss payments, the bank charges penalty interest, compounding your debt. A Murabaha is a trading contract. The profit is fixed on day one. If you delay a payment, the bank cannot charge you additional profit or interest.
            </p>

            <h3 style={{ marginTop: "24px" }}>How are Murabaha Installments Calculated?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              In a Murabaha contract, the total debt owed by the customer is fixed from day one and does not increase over time, even in the event of late payment (there is no compounding interest or late payment penalties that benefit the bank as profit). The total financing cost is calculated by taking the principal amount (asset cost) and adding the total profit margin (Principal × Profit Rate × Tenure in Years). This fixed total is then divided by the total number of months to determine the flat monthly installment.
            </p>

            <h3 style={{ marginTop: "24px" }}>Calculating the Profit Margin</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Unlike a conventional APR that compounds over the remaining balance, the profit margin in a Murabaha contract is often calculated upfront as a flat rate against the financed amount. Our Murabaha calculator allows you to input the cost of the asset, your down payment, and the agreed profit margin to instantly see your fixed monthly installment and the exact profit the financier will earn.
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
          },
          {
            question: "ماذا يحدث في حال رغبتي في السداد المبكر لعقد المرابحة؟",
            answer: "يعتمد السداد المبكر على مبدأ الإبراء (الخصم الاختياري للربح المتبقي) والذي تقره معظم المصارف الإسلامية. تقوم معظم البنوك الإسلامية طواعية بخصم الأرباح غير المكتسبة للسنوات المتبقية وإبراء العميل منها، رغم عدم إلزام العقد بذلك قانونياً مسبقاً."
          },
          {
            question: "هل يمكن استخدام المرابحة للحصول على قروض نقدية شخصية؟",
            answer: "لا. تشترط المرابحة وجود أصول ملموسة للبيع والشراء، ولا يمكن تقديم النقد المباشر بها. ولا يجوز استخدامها للحصول على سيولة نقدية مباشرة دون أصل حقيقي لأنها بذلك تصبح حيلة لتوليد فائدة ربوية على المال. وتستخدم المصارف الإسلامية صيغاً أخرى مثل التورق للسيولة النقدية وفق ضوابط محددة."
          }
        ] : [
          {
            question: "What is the difference between Murabaha and a conventional interest-based loan?",
            answer: "A conventional loan involves lending money for money with an added interest (Riba), which is prohibited. Murabaha is a genuine trade transaction where the bank buys a tangible asset and resells it to the customer at a known markup. In Murabaha, the total debt is fixed and does not grow with time, whereas conventional loans apply compounding interest."
          },
          {
            question: "Is the profit rate in Murabaha just another name for interest?",
            answer: "No. While Islamic banks may use market benchmark rates (like LIBOR or SOFR) to price their profit margins, the underlying legal and religious nature is entirely different. Murabaha profit is a fixed markup from a commercial sale of a real asset. Once the contract is signed, the markup is locked and cannot be increased, unlike floating or compounding interest. Profit from trade is Halal, whereas profit from lending money is Haram."
          },
          {
            question: "What happens if I am late on a Murabaha installment?",
            answer: "Under Islamic finance rules, a bank cannot charge late payment penalties to increase its own profits, as this constitutes Riba. However, the contract may include a 'charity clause' where unjustified late payments result in a penalty fee that the bank must donate to charity, acting solely as a deterrent against deliberate delays."
          },
          {
            question: "What happens if I want to pay off a Murabaha early?",
            answer: "Early settlement relies on a concept called Ibra' (rebate). Most Islamic banks will voluntarily grant a rebate on the unearned profit for the remaining years."
          },
          {
            question: "Can Murabaha be used for personal cash loans?",
            answer: "No. Murabaha requires a tangible asset (like a house, car, or commodities). It cannot be used to simply generate cash liquidity."
          }
        ]}
      />
    </div>
  );
}
