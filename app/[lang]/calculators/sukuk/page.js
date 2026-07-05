import { getDictionary } from "@/app/dictionaries";
import SukukCalculatorClient from "@/app/components/SukukCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.sukuk.title}`,
    description: dict.sukuk.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/sukuk`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/sukuk",
        "ar": "https://smartcalctools.xyz/ar/calculators/sukuk",
      },
    },
    openGraph: {
      title: `${dict.sukuk.title}`,
      description: dict.sukuk.subtitle,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${dict.sukuk.title}`,
      description: dict.sukuk.subtitle,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function SukukPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  const isAr = lang === "ar";
  return (
    <>
      <div className="container" style={{ padding: "40px 20px" }}>
        <SoftwareSchema
          name={isAr ? "حاسبة عوائد الصكوك الإسلامية" : "Islamic Sukuk Returns Calculator"}
          description={isAr ? "احسب العوائد الدورية للصكوك الإسلامية وتوزيعات الأرباح على مدى فترات الاستثمار. تساعدك الحاسبة في تقدير الأرباح وتحديد العائد الإجمالي لتنويع محفظتك الاستثمارية بشكل متوافق مع أحكام الشريعة الإسلامية." : "Calculate periodic returns and dividend distributions for Islamic Sukuk over your investment period. This calculator helps you estimate profits and determine the total yield to diversify your Sharia-compliant investment portfolio."}
          url={`https://smartcalctools.xyz/${lang}/calculators/sukuk`}
          price="0"
        />

        <div className="page-header" style={{ textAlign: "center" }}>
          <h1>{dict.sukuk.title}</h1>
          <p>{dict.sukuk.subtitle}</p>
          <div style={{ marginTop: "12px" }}>
            <Link href={`/${lang}/methodology#sukuk`} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600", fontSize: "0.9rem" }}>
              {isAr ? "📖 اقرأ المنهجية الشرعية ومصادر الحساب لهذه الحاسبة" : "📖 Read Shariah methodology & sources for this calculator"}
            </Link>
          </div>
        </div>

        <SukukCalculatorClient dict={dict} lang={lang} />

        <DisclaimerBox type="religion" lang={lang} />

        <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
          {isAr ? (
            <>
              <h2>حاسبة عوائد الصكوك الإسلامية: التخطيط المالي المتوافق مع الشريعة</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                تُعد الصكوك الإسلامية (Sukuk) إحدى أهم وأبرز أدوات التمويل والاستثمار في الأسواق المالية الإسلامية الحديثة. على عكس السندات التقليدية التي تمثل ديناً بفائدة ربوية (والتي تحرمها الشريعة الإسلامية)، تُمثل الصكوك حصصاً شائعة في ملكية أعيان أو منافع أو خدمات أو موجودات مشروع معين يدر دخلاً. بعبارة أخرى، حامل الصك هو شريك في ملكية الأصل الأساسي، ويستحق حصة من الأرباح الناتجة عن استثمار هذا الأصل، ويتحمل نصيبه من الخسارة إن حدثت.
              </p>
              <h3 style={{ marginTop: "24px" }}>كيف تعمل عوائد الصكوك؟</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                تتنوع أنواع الصكوك (مثل صكوك الإجارة، صكوك المضاربة، صكوك المشاركة، وصكوك المرابحة)، ولكن تشترك جميعها في أن العوائد الموزعة على حملة الصكوك ليست فواتير فائدة ثابتة على قرض، بل هي جزء من الدخل أو الربح الفعلي الذي تحققه الأصول المؤجرة أو المستثمرة. في صكوك الإجارة (وهي الأكثر شيوعاً)، يقوم العائد على أساس الأجرة الدورية المحصلة من تأجير الأصل المستند إليه الصك.
              </p>
              <h3 style={{ marginTop: "24px" }}>فوائد استخدام حاسبة الصكوك</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                تم تصميم هذه الحاسبة لتساعد المستثمرين الأفراد والمؤسسات على توقع التدفقات النقدية المستقبلية من استثماراتهم في الصكوك. من خلال إدخال القيمة الاسمية الإجمالية للاستثمار، ومعدل الربح السنوي المتوقع (أو العائد الكوبوني)، ومدة استحقاق الصك، بالإضافة إلى دورية التوزيع (شهري، ربع سنوي، نصف سنوي، أو سنوي)، ستحصل على تحليل مفصل يوضح الدفعات الدورية وإجمالي العوائد المتوقعة بنهاية المدة. يتيح لك ذلك مقارنة إصدارات الصكوك المختلفة وإدارة محفظتك الاستثمارية بكفاءة عالية وبما يرضي الله عز وجل ويتوافق مع الضوابط الشرعية المعاصرة.
              </p>

              <h3 style={{ marginTop: "24px" }}>ما هي الصكوك الإسلامية (Sukuk) وكيف تعمل؟</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                الصكوك هي النسخة الإسلامية الموافقة للشريعة من "السندات" التقليدية (Bonds). بينما تمثل السندات قرضاً بفائدة ربوية يقدمه المستثمر للجهة المصدرة، تمثل الصكوك <strong>حصة ملكية شائعة</strong> في أصول ملموسة، أو منافع، أو خدمات، أو مشروع استثماري محدد. العوائد التي يوزعها الصك ليست "فائدة على قرض"، بل هي حصة المستثمر من الأرباح أو الإيجارات التي يولدها الأصل الممول بالصك.
              </p>

              <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
              <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>حساب صكوك الإجارة:</strong> أطلقت الحكومة صكوكاً بقيمة اسمية 10,000$ لتمويل بناء مستشفى، بمعدل ربح متوقع 5% سنوياً يُصرف كل 6 أشهر، لمدة 5 سنوات. بإدخال هذه البيانات: ستحصل على دفعة دورية (كل نصف سنة) بقيمة 250$. إجمالي الأرباح بعد 5 سنوات هو 2,500$. وعند الاستحقاق، يُرد لك رأس المال لتصبح القيمة الإجمالية 12,500$.</li>
                <li style={{ marginBottom: "8px" }}><strong>صكوك الشركات:</strong> شركة طيران تصدر صكوكاً بـ 50,000$ بمعدل ربح 7% يُصرف ربع سنوياً. باستخدام الحاسبة، تكتشف أن التوزيع الربع سنوي هو 875$.</li>
                <li style={{ marginBottom: "8px" }}><strong>تخطيط التدفقات النقدية:</strong> يستخدم المستثمرون هذه الحاسبة لمعرفة متى وكم سيحصلون من سيولة نقدية (Cash flow) لتغطية نفقاتهم الدورية من خلال تنويع الصكوك وتوزيعات أرباحها.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>الفرق بين الصكوك والأسهم</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                الأسهم تمثل ملكية في <strong>الشركة بأكملها</strong> وتتذبذب قيمتها بشدة وعوائدها غير محددة سلفاً. أما الصكوك فتمثل ملكية في <strong>مشروع أو أصل محدد</strong> تابع للشركة (مثلاً طائرة أو مبنى معين يتم تأجيره)، وعوائدها تكون متوقعة وشبه مستقرة (مثل إيجار المبنى)، ولها تاريخ انتهاء (Maturity Date) يتم فيه تصفية الأصل ورد رأس المال للمستثمر.
              </p>
            </>
          ) : (
            <>
              <h2>Islamic Sukuk Returns Calculator: Sharia-Compliant Financial Planning</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Islamic Sukuk represents one of the most vital financing and investment instruments in modern Islamic capital markets. Unlike conventional bonds, which are debt obligations that pay a fixed, interest-based coupon (Riba)—a practice strictly prohibited under Islamic law—Sukuk represent undivided ownership shares in tangible assets, usufructs, services, or specific investment projects. As a Sukuk holder, you are a co-owner of the underlying asset, entitled to a share of the actual profits generated, and you bear a proportional share of any potential loss.
              </p>
              <h3 style={{ marginTop: "24px" }}>How Do Sukuk Returns Work?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                There are various structures of Sukuk (e.g., Sukuk al-Ijarah, Sukuk al-Mudarabah, Sukuk al-Musharakah, and Sukuk al-Murabaha), but they all share a common principle: the returns distributed to investors are not guaranteed interest on a loan. Instead, they are derived from the actual income or profit generated by the underlying assets. In Sukuk al-Ijarah (the most common type), the return is based on the periodic rental income collected from leasing the asset backing the Sukuk.
              </p>
              <h3 style={{ marginTop: "24px" }}>Benefits of Using the Sukuk Calculator</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                This calculator is designed to help retail and institutional investors project their future cash flows from Sukuk investments. By entering the total face value (principal) of your investment, the expected annual profit rate (yield), the maturity period, and the payout frequency (monthly, quarterly, semi-annually, or annually), you will receive a detailed breakdown of your periodic dividend payments and the total expected returns by maturity. This enables you to compare different Sukuk issuances, manage your investment portfolio efficiently, and ensure your wealth grows in full compliance with contemporary Islamic financial standards.
              </p>

              <h3 style={{ marginTop: "24px" }}>What are Islamic Sukuk and How Do They Work?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Sukuk is the Sharia-compliant alternative to conventional bonds. While a conventional bond is a debt obligation that pays interest (Riba), a Sukuk represents <strong>undivided ownership</strong> in a tangible asset, usufruct, service, or specific investment project. The returns generated by Sukuk are not "interest on a loan" but rather the investor's rightful share of the profit or rental income generated by the underlying asset.
              </p>

              <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
              <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Ijara (Lease) Sukuk:</strong> A government issues Sukuk with a face value of $10,000 to fund a hospital, offering an expected profit rate of 5% paid semi-annually over 5 years. Using the calculator: Your periodic semi-annual payout is $250. Total profit over 5 years is $2,500. At maturity, your principal is returned for a total of $12,500.</li>
                <li style={{ marginBottom: "8px" }}><strong>Corporate Sukuk:</strong> An airline issues a $50,000 Sukuk offering 7% profit paid quarterly. The calculator shows your quarterly cash flow will be exactly $875.</li>
                <li style={{ marginBottom: "8px" }}><strong>Cash Flow Planning:</strong> Passive investors use this tool to accurately project their periodic income streams to ensure their living expenses are met through Halal fixed-income equivalents.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>Sukuk vs. Stocks (Equities)</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                Stocks represent ownership in the <strong>entire company</strong>, meaning high volatility and unpredictable dividends. Sukuk represents ownership in a <strong>specific asset</strong> of the company (e.g., a specific airplane being leased out). Thus, Sukuk returns are highly predictable (derived from fixed lease contracts), less volatile, and have a defined maturity date when the capital is returned.
              </p>
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
            {
              question: "ما الفرق الأساسي بين الصكوك الإسلامية والسندات التقليدية؟",
              answer: "السندات التقليدية تمثل ديناً على المصدر ويدفع عليها فائدة ثابتة (ربا) مضمونة بغض النظر عن نتيجة المشروع. أما الصكوك الإسلامية فتمثل حصة ملكية في أصول حقيقية أو مشاريع استثمارية، والعائد عليها ناتج عن الربح الفعلي أو الإيجار المتولد من تلك الأصول، مع تحمل حامل الصك لنسبة من المخاطرة."
            },
            {
              question: "هل العائد على الصكوك مضمون تماماً؟",
              answer: "في التمويل الإسلامي، لا يمكن ضمان العائد أو رأس المال في عقود المشاركة والمضاربة لأن ذلك ينافي قاعدة 'الغنم بالغرم'. ومع ذلك، تُهيكل العديد من الصكوك (مثل صكوك الإجارة) بطريقة تجعل العوائد مستقرة وشبه مضمونة من خلال عقود تأجير ملزمة، بالإضافة إلى التعهدات الشرعية المستقلة بإعادة شراء الأصول."
            },
            {
              question: "هل يمكنني بيع الصكوك قبل تاريخ الاستحقاق؟",
              answer: "نعم، معظم أنواع الصكوك (مثل صكوك الإجارة والمشاركة) تمثل أصولاً حقيقية ويمكن تداولها وبيعها في السوق الثانوية بأسعار خاضعة للعرض والطلب. أما صكوك المرابحة التي تمثل ديوناً نقدية، فلا يجوز تداولها إلا بشروط شرعية صارمة (مثل بيعها بالقيمة الاسمية أو قواعد صرف العملات)."
            }
          ] : [
            {
              question: "What is the primary difference between Islamic Sukuk and conventional bonds?",
              answer: "Conventional bonds represent a debt owed by the issuer, paying a fixed, guaranteed interest (Riba) regardless of the project's success. Islamic Sukuk, on the other hand, represent ownership shares in real assets or ventures. The return on Sukuk is generated from actual profits or rental income produced by those assets, meaning the investor shares in the actual business risk."
            },
            {
              question: "Are Sukuk returns 100% guaranteed?",
              answer: "In Islamic finance, returns and principal cannot be legally guaranteed in equity-like contracts, as this violates the principle of risk-sharing. However, many Sukuk (like Ijarah Sukuk) are structured with binding lease agreements and independent Sharia-compliant purchase undertakings that make the cash flows highly stable and predictable."
            },
            {
              question: "Can I sell my Sukuk before the maturity date?",
              answer: "Yes, most types of Sukuk (such as Ijarah and Musharakah) represent physical assets and can be freely traded in the secondary market at market prices driven by supply and demand. However, Sukuk representing pure debt (like Murabaha receivables) generally cannot be traded at a premium or discount due to Islamic rules against trading debt."
            }
          ]}
        />
        
      </div>
    </>
  );
}
