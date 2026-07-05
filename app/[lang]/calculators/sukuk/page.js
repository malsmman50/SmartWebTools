import { getDictionary } from "@/app/dictionaries";
import SukukCalculatorClient from "@/app/components/SukukCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

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
      <SoftwareSchema
        name={isAr ? "حاسبة عوائد الصكوك الإسلامية" : "Islamic Sukuk Returns Calculator"}
        description={isAr ? "احسب العوائد الدورية للصكوك الإسلامية وتوزيعات الأرباح على مدى فترات الاستثمار. تساعدك الحاسبة في تقدير الأرباح وتحديد العائد الإجمالي لتنويع محفظتك الاستثمارية بشكل متوافق مع أحكام الشريعة الإسلامية." : "Calculate periodic returns and dividend distributions for Islamic Sukuk over your investment period. This calculator helps you estimate profits and determine the total yield to diversify your Sharia-compliant investment portfolio."}
        url={`https://smartcalctools.xyz/${lang}/calculators/sukuk`}
        price="0"
      />
      <div className="container">
        <SukukCalculatorClient dict={dict} lang={lang} />
        
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8", padding: "20px" }}>
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
        
        <div style={{ marginTop: "30px" }}>
          <DisclaimerBox type="religion" lang={lang} />
        </div>
      </div>
    </>
  );
}
