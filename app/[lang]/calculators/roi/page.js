import { getDictionary } from "@/app/dictionaries";
import RoiCalculatorClient from "@/app/components/RoiCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/roi`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/roi`,
        "ar": `https://smartcalctools.xyz/ar/calculators/roi`,
      },
    },
    title: isAr ? "حاسبة العائد الاستثماري (ROI)" : "Halal ROI Calculator",
    description: isAr 
      ? "احسب نسبة العائد على الاستثمار وصافي الأرباح أو الخسائر بالإضافة للعائد السنوي المركب لمشاريعك واستثماراتك."
      : "Calculate Return on Investment (ROI), net profit, and annualized yield for your business ventures and investments.",
    openGraph: {
      title: isAr ? "حاسبة العائد الاستثماري (ROI)" : "Halal ROI Calculator",
      description: isAr 
      ? "احسب نسبة العائد على الاستثمار وصافي الأرباح أو الخسائر بالإضافة للعائد السنوي المركب لمشاريعك واستثماراتك."
      : "Calculate Return on Investment (ROI), net profit, and annualized yield for your business ventures and investments.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة العائد الاستثماري (ROI)" : "Halal ROI Calculator",
      description: isAr 
      ? "احسب نسبة العائد على الاستثمار وصافي الأرباح أو الخسائر بالإضافة للعائد السنوي المركب لمشاريعك واستثماراتك."
      : "Calculate Return on Investment (ROI), net profit, and annualized yield for your business ventures and investments.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function RoiCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  return (
    <>
      <div className="container" style={{ padding: "40px 20px" }}>
        <SoftwareSchema
          name={isAr ? "حاسبة العائد الاستثماري (ROI)" : "ROI Calculator"}
          description={isAr ? "احسب نسبة العائد على الاستثمار وصافي الأرباح أو الخسائر بالإضافة للعائد السنوي المركب لمشاريعك واستثماراتك التجارية بشكل دقيق. أداة مالية متقدمة لتسهيل اتخاذ القرارات الاستثمارية." : "Calculate Return on Investment (ROI), net profit, and annualized yield for your business ventures and investments easily. An advanced financial tool to evaluate your portfolio performance and make informed decisions."}
          url={`https://smartcalctools.xyz/${lang}/calculators/roi`}
          price="0"
        />

        <div className="page-header">
          <h1>{dict.roi.title}</h1>
          <p>{dict.roi.subtitle}</p>
        </div>

        <RoiCalculatorClient lang={lang} dict={dict} />
        
        <div style={{ marginTop: "30px" }}>
          <DisclaimerBox type="financial" lang={lang} />
        </div>

        <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
          {isAr ? (
            <>
              <h2>العائد على الاستثمار (ROI): الدليل الشامل</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                يعتبر العائد على الاستثمار (Return on Investment - ROI) من أهم المؤشرات والمقاييس المالية التي يعتمد عليها رواد الأعمال والمستثمرون في جميع أنحاء العالم. يهدف هذا المقياس إلى تقييم كفاءة وربحية استثمار معين، أو للمقارنة بين كفاءة عدة خيارات استثمارية متاحة في السوق. يتميز العائد على الاستثمار بسهولة حسابه وقابليته للتطبيق على مختلف أنواع الأصول، سواء كانت أسهم، عقارات، أو مشاريع تجارية ناشئة.
              </p>

              <h3 style={{ marginTop: "24px" }}>المعادلة الأساسية لحساب العائد على الاستثمار</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                المعادلة البسيطة له هي:
              </p>
              <div style={{ background: "var(--bg)", padding: "12px", borderRadius: "8px", margin: "12px 0", fontFamily: "monospace", textAlign: "center" }}>
                ROI = ((صافي الربح) / تكلفة الاستثمار) × 100
              </div>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                العائد الإيجابي (الرقم الموجب) يعني أن الاستثمار قد حقق أرباحاً تغطي التكاليف وتزيد عليها، بينما العائد السلبي (الرقم السالب) يشير إلى أن المشروع يتكبد خسائر مالية وأن الإيرادات لم تغطِ تكلفة الاستثمار الأساسية.
              </p>

              <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
              <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>الاستثمار في الأسهم:</strong> اشتريت أسهماً بقيمة 5,000$، وبعد سنتين ارتفعت قيمتها لتصل إلى 7,500$. العائد على الاستثمار الإجمالي هو 50%، بصافي ربح 2,500$. ولكن الأهم هو "العائد السنوي" والذي يعادل تقريباً 22.47% سنوياً.</li>
                <li style={{ marginBottom: "8px" }}><strong>الحملات الإعلانية (ROAS):</strong> صرفت 1,000$ على إعلانات جوجل، وحققت لك مبيعات بقيمة 3,000$. العائد على استثمارك هنا هو 200%. أي أن كل دولار دفعته أعاد لك رأس مالك بالإضافة إلى دولارين ربح.</li>
                <li style={{ marginBottom: "8px" }}><strong>العقارات:</strong> اشتريت عقاراً بـ 100,000$ وبعته بعد 5 سنوات بـ 150,000$. العائد الإجمالي 50%، والعائد السنوي المركب هو 8.44%. مقارنة العائد السنوي المركب بالاستثمارات الأخرى يساعدك في اتخاذ قرار أفضل.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>أهمية العائد السنوي المركب (Annualized ROI)</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                الـ ROI البسيط يعطيك صورة عامة عن الربح الكلي، لكنه لا يأخذ في الاعتبار الفترة الزمنية للاستثمار. على سبيل المثال، تحقيق عائد بنسبة 50% على مدار 10 سنوات يختلف تماماً من حيث الكفاءة عن تحقيق نفس العائد (50%) في سنة واحدة فقط.
                لذلك، نستخدم ما يُسمى بـ "العائد السنوي المركب" لمعرفة النمو الفعلي للاستثمار على أساس سنوي. هذا المؤشر يسهّل عملية المقارنة الدقيقة بين الفرص الاستثمارية التي تختلف في مددها الزمنية، مما يساعد المستثمر في اتخاذ القرار الأمثل لتوجيه رأس ماله. العائد السنوي يوحد الزمن، مما يسمح لك بمقارنة استثمار دام 6 أشهر باستثمار آخر دام 10 سنوات بشكل عادل ومنطقي.
              </p>
            </>
          ) : (
            <>
              <h2>Return on Investment (ROI): The Complete Guide</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Return on Investment (ROI) is one of the most widely used and essential financial metrics relied upon by entrepreneurs, portfolio managers, and individual investors globally. It serves to evaluate the efficiency and profitability of a particular investment, or to compare the relative efficiencies of several different investment opportunities in the market. ROI is highly versatile and can be applied to almost any asset class, including stocks, real estate properties, and startup business ventures.
              </p>

              <h3 style={{ marginTop: "24px" }}>The Basic ROI Formula</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                The mathematical formula for calculating ROI is straightforward:
              </p>
              <div style={{ background: "var(--bg)", padding: "12px", borderRadius: "8px", margin: "12px 0", fontFamily: "monospace", textAlign: "center" }}>
                ROI = ((Net Profit) / Cost of Investment) × 100
              </div>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                A positive ROI means that the investment has generated profits exceeding its costs, indicating a successful venture. Conversely, a negative ROI means the investment has incurred a financial loss, as the total returns failed to cover the initial capital outlay.
              </p>

              <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
              <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Stock Market:</strong> You buy shares worth $5,000. After exactly 2 years, your portfolio grows to $7,500. Your total ROI is 50%, with a net profit of $2,500. More importantly, the Annualized ROI stands at a highly impressive 22.47% per year.</li>
                <li style={{ marginBottom: "8px" }}><strong>Marketing & Ads (ROAS):</strong> You spend $1,000 on Facebook ads, which directly generate $3,000 in sales. Your ROI is 200%. Every dollar spent returned the principal plus two additional dollars in profit.</li>
                <li style={{ marginBottom: "8px" }}><strong>Real Estate Flipping:</strong> You buy a house for $100,000 and sell it 5 years later for $150,000. Total ROI is 50%. However, your Annualized ROI is 8.44%. Comparing the annualized figure with index funds helps you judge opportunity costs.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>The Importance of Annualized ROI</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                While the simple ROI calculation gives you a snapshot of total profitability, it does not account for the holding period of the investment. For instance, generating an ROI of 50% over a span of 10 years is vastly different in terms of performance compared to making a 50% return in just one year. Standard ROI can be incredibly misleading. An investment returning 100% sounds phenomenal, but if it takes 20 years to achieve that 100% gain, the Annualized ROI is only about 3.5%.
                Annualized ROI resolves this issue by calculating the average, compounded annual growth rate of the investment. This standardizes the return metric, making it highly effective for comparing investments of varying durations and helping you allocate your capital consolidated more intelligently.
              </p>
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
            {
              question: "ما هي النسبة الجيدة للعائد على الاستثمار (ROI)؟",
              answer: "لا توجد نسبة واحدة تناسب الجميع وتختلف باختلاف قطاع الاستثمار ومستوى المخاطرة. ولكن بشكل عام في سوق الأسهم، يُعتبر العائد السنوي البالغ 7% إلى 10% (بعد استقطاع التضخم) عائداً جيداً وتاريخياً وممتازة في الاستثمارات التقليدية كصناديق المؤشرات. أما في المشاريع الناشئة والعقارات، قد يبحث المستثمرون عن عوائد أعلى تتجاوز 15% لتعويض المخاطر الأكبر ونقص السيولة."
            },
            {
              question: "كيف أحسب العائد على الاستثمار بشكل صحيح؟",
              answer: "الصيغة الأساسية هي: (صافي الربح / إجمالي الاستثمار) × 100. للحصول على العائد السنوي الدقيق، نستخدم حاسبتنا المتقدمة أعلاه لتجنب أخطاء الرياضيات المعقدة."
            },
            {
              question: "هل العائد على الاستثمار يأخذ التضخم في الاعتبار؟",
              answer: "لا، العائد على الاستثمار البسيط (ROI) أو السنوي لا يأخذ التضخم أو الضرائب في الاعتبار. لذلك يُنصح دائماً بحساب 'العائد الحقيقي' (Real ROI) وهو العائد الاسمي مطروحاً منه معدل التضخم السنوي للحصول على صورة أدق للقوة الشرائية لأرباحك."
            },
            {
              question: "ما الفرق بين ROI وهامش الربح (Profit Margin)؟",
              answer: "هامش الربح يقيس مدى كفاءة الشركة في تحويل المبيعات والإيرادات إلى أرباح صافية (صافي الربح / الإيرادات). أما العائد على الاستثمار (ROI) فيقيس العائد الناتج مقارنة برأس المال الذي تم استثماره لتمويل المشروع أو شراء الأصل (صافي الربح / تكلفة الاستثمار)."
            }
          ] : [
            {
              question: "What is considered a 'good' ROI?",
              answer: "It depends on the specific industry, asset class, and your risk tolerance. However, for passive stock market investments (like S&P 500 index funds), an annualized return of 7% to 10% (adjusted for inflation) is historically considered solid and excellent. For real estate or high-risk startup investments, investors typically seek higher returns (15% or more) to compensate for the higher risk and lack of liquidity."
            },
            {
              question: "How is ROI calculated?",
              answer: "The basic formula is: (Net Profit / Total Investment) x 100. To factor in time, you must calculate the Annualized ROI, which our calculator handles automatically."
            },
            {
              question: "Does ROI account for inflation and taxes?",
              answer: "No, the standard or annualized ROI calculations are nominal figures and do not factor in inflation, taxes, or transactional fees. To get a true picture of your increased purchasing power, you should calculate the 'Real ROI' by subtracting the inflation rate and expected taxes from your nominal ROI."
            },
            {
              question: "What is the difference between ROI and Profit Margin?",
              answer: "Profit margin measures how efficiently a company converts its sales revenue into net income (Net Profit / Total Revenue). ROI, on the other hand, measures the return generated relative to the initial capital invested to fund the project or purchase the asset (Net Profit / Cost of Investment)."
            }
          ]}
        />
      </div>
    </>
  );
}
