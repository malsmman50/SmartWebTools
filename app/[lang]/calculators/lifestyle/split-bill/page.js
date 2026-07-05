import { getDictionary } from "@/app/dictionaries";
import SplitBillCalculator from "@/app/components/SplitBillCalculator";
import Script from "next/script";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const title = isAr ? "مقسم الفواتير الحلال الذكي | Halal Bill Splitter" : "Halal Bill Splitter | Fairly Divide Restaurant Bills";
  const description = isAr 
    ? "قسم فواتير المطاعم بدقة واستبعد الطلبات المحرمة (كحول، خنزير) أو الخاصة ليتم حساب ضريبتها بشكل منفصل. احمِ حصتك الحلال الآن." 
    : "Quickly and fairly split restaurant bills. Exclude haram or special items so their tax is calculated separately, protecting your Halal share.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/lifestyle/split-bill`,
      languages: {
        'en': 'https://smartcalctools.xyz/en/calculators/lifestyle/split-bill',
        'ar': 'https://smartcalctools.xyz/ar/calculators/lifestyle/split-bill',
      },
    },
    openGraph: { title, description, url: `https://smartcalctools.xyz/${lang}/calculators/lifestyle/split-bill` }
  };
}

export default async function SplitBillPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <SoftwareSchema 
        name={isAr ? "مقسم الفواتير الحلال" : "Halal Bill Splitter"}
        description={isAr ? "قسم فواتير المطاعم بدقة واستبعد الطلبات المحرمة." : "Quickly and fairly split restaurant bills and exclude haram items."}
        applicationCategory="FinanceApplication"
        url={`https://smartcalctools.xyz/${lang}/calculators/lifestyle/split-bill`}
      />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{dict.split_bill.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.split_bill.subtitle}
        </p>
      </div>

      <SplitBillCalculator lang={lang} dict={dict} />

      {/* AdSense Compliant Content Section */}
      <div className="card" style={{ marginTop: "60px", padding: "40px" }}>
        {isAr ? (
          <article style={{ lineHeight: "1.8", color: "var(--text)" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>دليلك الشامل لتقسيم الفواتير بطريقة حلال وعادلة</h2>
            
            <p style={{ marginBottom: "20px" }}>
              في كثير من الأحيان، نجد أنفسنا في مواقف اجتماعية مثل حفلات العشاء، أو غداء العمل، أو حتى السكن المشترك مع زملاء غير مسلمين، حيث تتضمن الفاتورة المشتركة عناصر لا تتوافق مع الشريعة الإسلامية مثل الكحوليات أو لحم الخنزير. المشكلة الأكبر لا تكمن فقط في التكلفة الأساسية لهذه العناصر، بل في <strong>الضرائب المضافة (VAT) ورسوم الخدمة (الإكرامية)</strong> التي تُحسب على إجمالي الفاتورة. هنا تبرز أهمية "مقسم الفواتير الحلال الذكي" (Halal Bill Splitter).
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>أخلاقيات التعامل المالي في الإسلام</h3>
            <p style={{ marginBottom: "20px" }}>
              حث الإسلام على الدقة والعدل في المعاملات المالية، كما نهى عن تمويل أو المشاركة في دفع ثمن المحرمات بأي شكل من الأشكال. عند تقسيم فاتورة مطعم بالتساوي بين جميع الأطراف، فإنك تدفع فعلياً جزءاً من قيمة المشروبات أو الأطباق المحرمة التي طلبها غيرك، وتدفع أيضاً جزءاً من الضريبة والإكرامية المفروضة عليها. الأداة التي قمنا بتطويرها تضمن لك براءة الذمة المالية بدقة رياضية متناهية.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>منهجية الحساب (كيف تعمل الخوارزمية؟)</h3>
            <p style={{ marginBottom: "20px" }}>
              لضمان الشفافية المطلقة، تعمل خوارزمية الحاسبة الخاصة بنا بناءً على الخطوات الرياضية التالية:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>عزل الطلبات المستبعدة:</strong> تقوم الآلة الحاسبة أولاً بطرح القيمة الأساسية (قبل الضريبة) للعناصر المحرمة أو الخاصة من القيمة الإجمالية للفاتورة. ينتج عن ذلك "الإجمالي الحلال".</li>
              <li style={{ marginBottom: "10px" }}><strong>توزيع الضرائب والإكرامية بشكل نسبي (Proportional Distribution):</strong> بدلاً من قسمة الضريبة بالتساوي، يتم حساب الضريبة الخاصة فقط بالجزء الحلال من الفاتورة. على سبيل المثال، إذا كانت الطلبات المحرمة تشكل 20% من الفاتورة، فإن الحاسبة تعفيك من 20% من قيمة الضريبة والإكرامية.</li>
              <li style={{ marginBottom: "10px" }}><strong>حساب الحصة الصافية:</strong> يتم إضافة الضريبة المخصصة للقسم الحلال إلى "الإجمالي الحلال"، ثم يتم تقسيم الناتج على عدد الأشخاص المشاركين في هذا القسم.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>سيناريو وعملي لاستخدام الأداة</h3>
            <p style={{ marginBottom: "20px" }}>
              تخيل أنك واثنين من زملائك في العمل تتناولون العشاء. كانت قيمة الفاتورة 100 دولار قبل الضريبة. أحد الزملاء طلب مشروباً كحولياً بقيمة 25 دولاراً. الضريبة والإكرامية الإجمالية تبلغ 20%. 
              باستخدام الحاسبة التقليدية، سيدفع كل شخص 40 دولاراً! أما باستخدام مقسم الفواتير الحلال، ستقوم بإدخال 100 في الفاتورة، و 25 في الطلبات المستبعدة. الحاسبة ستخبرك أن الإجمالي الحلال هو 75 دولاراً، وبعد إضافة ضريبته (20%) يصبح 90 دولاراً. أي أنك أنت والزميل الآخر ستدفعان 45 دولاراً فقط (نصيبكما العادل)، بينما يتحمل الزميل الثالث قيمة مشروبه مع ضريبته بشكل منفصل.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginBottom: "20px" }}>
              <strong>س: ماذا لو طلب شخص وجبة حلال لكنها باهظة الثمن جداً وأراد دفعها بمفرده؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: يمكنك استخدام الأداة بنفس الطريقة! فقط ضع قيمة الوجبة الباهظة في خانة "الطلبات المستبعدة". الأداة ليست مخصصة فقط للأمور المحرمة، بل لأي طلب خاص لا ترغب في أن يشارك البقية في دفع ضريبته وإكراميته.</p>
              
              <strong>س: كيف تتعامل الحاسبة مع رسوم التوصيل الثابتة (Flat Delivery Fees)؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: رسوم التوصيل الثابتة يمكن إضافتها إما للقيمة الأساسية أو قسمتها يدوياً خارج الفاتورة. ومع ذلك، إذا كانت الرسوم نسبية مئوية فتسري عليها نفس قواعد الإكرامية.</p>
              
              <strong>س: هل الأداة تجمع أي بيانات عني أو عن فواتيري؟</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>ج: مطلقاً. وفقاً لسياسة الخصوصية (Zero-Trust) الخاصة بنا، تتم كافة العمليات الحسابية محلياً داخل متصفحك ولا يتم إرسال أي أرقام إلى أي خادم.</p>
            </div>

            <DisclaimerBox type="financial" lang={lang} />
          </article>
        ) : (
          <article style={{ lineHeight: "1.8", color: "var(--text)" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>The Comprehensive Guide to Halal and Fair Bill Splitting</h2>
            
            <p style={{ marginBottom: "20px" }}>
              In many social situations, such as business lunches, flatmate dinners, or dining out with non-Muslim colleagues, a shared bill might include items that do not align with Islamic principles, such as alcohol or pork. The problem is not only the cost of the item itself but also the <strong>Value Added Tax (VAT) and service charge (tip)</strong> applied to the total bill. This is where the Halal Bill Splitter becomes an essential tool.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>The Ethics of Financial Dealings in Islam</h3>
            <p style={{ marginBottom: "20px" }}>
              Islam emphasizes justice, fairness, and precision in financial dealings. It also explicitly prohibits funding or facilitating the purchase of Haram (forbidden) items. When you split a restaurant bill equally, you are inevitably paying a portion of the tax and tip for the alcohol or forbidden items ordered by others. Our calculator ensures that you maintain your financial boundaries with absolute mathematical precision.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Methodology (How the Algorithm Works)</h3>
            <p style={{ marginBottom: "20px" }}>
              To guarantee total transparency, our calculator's algorithm operates on the following mathematical steps:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>Isolating Excluded Items:</strong> The calculator subtracts the subtotal of the Haram or special items from the overall bill subtotal. The result is the "Halal Subtotal".</li>
              <li style={{ marginBottom: "10px" }}><strong>Proportional Tax/Tip Distribution:</strong> Instead of dividing the tax equally, the tax and tip are calculated proportionally. If the excluded items make up 20% of the bill, you are exempted from paying 20% of the overall tax and tip.</li>
              <li style={{ marginBottom: "10px" }}><strong>Calculating Net Share:</strong> The tax assigned to the Halal subtotal is added to it, and the final sum is divided strictly among the people participating in the Halal share.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>A Practical Scenario</h3>
            <p style={{ marginBottom: "20px" }}>
              Imagine you and two colleagues are having dinner. The bill subtotal is $100. One colleague orders an alcoholic beverage for $25. The tax and tip total 20%.
              Using a standard calculator, everyone would pay $40. By using the Halal Bill Splitter, you input $100 as the bill and $25 as the excluded item. The calculator isolates the $75 Halal portion, adds its proportional 20% tax ($15), making the Halal total $90. You and the other colleague simply split the $90, paying exactly $45 each (your fair share). The colleague who ordered the drink will pay their exact share plus the tax on their drink.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginBottom: "20px" }}>
              <strong>Q: What if someone ordered an expensive Halal meal and wants to pay for it themselves?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: You can use the tool exactly the same way! Just put the cost of their expensive meal into the "Excluded Items" field. The tool isn't just for Haram items; it's perfect for any item you don't want others to pay tax and tip on.</p>
              
              <strong>Q: How does the calculator handle flat delivery fees?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: Flat delivery fees can either be added to the subtotal or split manually. However, if the fee is a percentage, it follows the exact same proportional rules as the tip.</p>
              
              <strong>Q: Does this tool collect any data about my bills?</strong>
              <p style={{ marginBottom: "15px", color: "var(--text-muted)" }}>A: Absolutely not. In accordance with our Zero-Trust privacy policy, all calculations happen locally in your browser. No numbers are ever sent to a server.</p>
            </div>

            <DisclaimerBox type="financial" lang={lang} />
          </article>
        )}
      </div>

      <FAQSchema faqs={isAr ? [
        {
          question: "ماذا لو طلب شخص وجبة حلال لكنها باهظة الثمن جداً وأراد دفعها بمفرده؟",
          answer: "يمكنك استخدام الأداة بنفس الطريقة! فقط ضع قيمة الوجبة الباهظة في خانة 'الطلبات المستبعدة'. الأداة ليست مخصصة فقط للأمور المحرمة، بل لأي طلب خاص لا ترغب في أن يشارك البقية في دفع ضريبته وإكراميته."
        },
        {
          question: "كيف تتعامل الحاسبة مع رسوم التوصيل الثابتة (Flat Delivery Fees)؟",
          answer: "رسوم التوصيل الثابتة يمكن إضافتها إما للقيمة الأساسية أو قسمتها يدوياً خارج الفاتورة. ومع ذلك، إذا كانت الرسوم نسبية مئوية فتسري عليها نفس قواعد الإكرامية."
        },
        {
          question: "هل الأداة تجمع أي بيانات عني أو عن فواتيري؟",
          answer: "مطلقاً. وفقاً لسياسة الخصوصية (Zero-Trust) الخاصة بنا، تتم كافة العمليات الحسابية محلياً داخل متصفحك ولا يتم إرسال أي أرقام إلى أي خادم."
        }
      ] : [
        {
          question: "What if someone ordered an expensive Halal meal and wants to pay for it themselves?",
          answer: "You can use the tool exactly the same way! Just put the cost of their expensive meal into the 'Excluded Items' field. The tool isn't just for Haram items; it's perfect for any item you don't want others to pay tax and tip on."
        },
        {
          question: "How does the calculator handle flat delivery fees?",
          answer: "Flat delivery fees can either be added to the subtotal or split manually. However, if the fee is a percentage, it follows the exact same proportional rules as the tip."
        },
        {
          question: "Does this tool collect any data about my bills?",
          answer: "Absolutely not. In accordance with our Zero-Trust privacy policy, all calculations happen locally in your browser. No numbers are ever sent to a server."
        }
      ]} />
    </div>
  );
}
