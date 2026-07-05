import { getDictionary } from "@/app/dictionaries";
import MudarabahCalculatorClient from "@/app/components/MudarabahCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/mudarabah`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/mudarabah`,
        "ar": `https://smartcalctools.xyz/ar/calculators/mudarabah`,
      },
    },
    title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
    description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
    openGraph: {
      title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
      description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator",
      description: isAr 
      ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية."
      : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships between investors and entrepreneurs.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function MudarabahCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  return (
    <>
      <SoftwareSchema
        name={isAr ? "حاسبة شراكة المضاربة" : "Mudarabah Profit Calculator"}
        description={isAr ? "احسب نسب توزيع الأرباح وتخصيص الخسائر المالية لشراكات المضاربة الاستثمارية المتوافقة مع الشريعة الإسلامية. تتيح لك الأداة إدخال رأس المال والنسب المتفق عليها بين رب المال والمضارب وتوزيع الأرباح بدقة." : "Calculate capital returns and profit-split ratios for Sharia-compliant partnerships (Mudarabah) between investors and entrepreneurs. Easily input capital amounts and profit ratios to split returns securely and accurately."}
        url={`https://smartcalctools.xyz/${lang}/calculators/mudarabah`}
        price="0"
      />
      <div className="container">
        <MudarabahCalculatorClient lang={lang} dict={dict} />
        
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8", padding: "20px" }}>
          {isAr ? (
            <>
              <h2>حاسبة المضاربة الإسلامية: توزيع الأرباح والخسائر</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                تعد المضاربة من أهم عقود التمويل والاستثمار في الفقه الإسلامي المالي الحديث، وهي شراكة يقدّم فيها أحد الأطراف رأس المال (يُسمى رب المال)، بينما يقدّم الطرف الآخر الجهد والعمل والإدارة (يُسمى المضارب). يتم تقاسم الأرباح الناتجة عن هذا العمل المشترك بناءً على نسبة مئوية مشاعة يتفق عليها الطرفان مسبقاً، ولا يجوز تحديد مبلغ مقطوع كربح لأي منهما. وفي حالة حدوث خسارة (بدون تعدٍ أو تفريط من المضارب)، يتحمل رب المال الخسارة المالية كاملة، بينما يخسر المضارب جهده ووقته.
              </p>
              <h3 style={{ marginTop: "24px" }}>شروط صحة عقد المضاربة</h3>
              <ul style={{ color: "var(--text-muted)", marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
                <li><strong>تحديد رأس المال:</strong> يجب أن يكون رأس المال معلوماً ومحدداً وتسليمه للمضارب ليتمكن من التصرف فيه.</li>
                <li><strong>نسبة الربح المشاعة:</strong> يجب الاتفاق على نسبة توزيع الأرباح كنسبة مئوية مشاعة (مثل 50% أو 60%) ولا يجوز تخصيص مبلغ ثابت.</li>
                <li><strong>تحمل الخسارة:</strong> الخسارة المالية يتحملها رأس المال فقط، ما لم يثبت وجود إهمال أو تعدٍ من قبل المضارب.</li>
                <li><strong>طبيعة النشاط:</strong> يجب أن يكون النشاط التجاري مشروعاً ومتوافقاً مع أحكام الشريعة الإسلامية.</li>
              </ul>
              <h3 style={{ marginTop: "24px" }}>كيف تستفيد من حاسبة المضاربة؟</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                صُممت هذه الحاسبة لتسهيل عملية حساب وتوزيع الأرباح بين الشركاء في عقود المضاربة. من خلال إدخال مبلغ رأس المال المستثمر، ونسبة الربح المتفق عليها لكل من رب المال والمضارب، وإجمالي الأرباح أو الخسائر المحققة، تقوم الحاسبة فوراً بتوضيح نصيب كل طرف. كما توضح الحاسبة آلية تحمل الخسارة في حال حدوثها لتجنب النزاعات وتأكيد الامتثال للضوابط الشرعية المعتمدة من المجامع الفقهية وهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI).
              </p>
            </>
          ) : (
            <>
              <h2>Islamic Mudarabah Calculator: Profit and Loss Distribution</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Mudarabah is a prominent Islamic financing and investment contract based on a partnership where one party provides the capital (Rab-ul-Mal) and the other party provides the labor, skill, and management (Mudarib). Any profits generated from the business venture are shared according to a mutually pre-agreed profit-sharing ratio (PSR). In the event of a financial loss—provided there is no negligence or breach of contract by the Mudarib—the capital provider bears the entire financial loss, while the Mudarib loses their time and effort.
              </p>
              <h3 style={{ marginTop: "24px" }}>Key Conditions of a Mudarabah Contract</h3>
              <ul style={{ color: "var(--text-muted)", marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
                <li><strong>Capital Contribution:</strong> The capital must be clearly specified, quantified, and handed over to the Mudarib to manage.</li>
                <li><strong>Profit Sharing Ratio:</strong> Profits must be distributed based on a pre-agreed percentage (e.g., 60% for the investor, 40% for the manager). A fixed lump-sum profit cannot be guaranteed.</li>
                <li><strong>Loss Allocation:</strong> Financial losses are exclusively borne by the Rab-ul-Mal, unless the Mudarib is proven guilty of misconduct, negligence, or violating agreed terms.</li>
                <li><strong>Halal Activities:</strong> The business activities undertaken must be permissible (Halal) and strictly compliant with Sharia principles.</li>
              </ul>
              <h3 style={{ marginTop: "24px" }}>How Does the Mudarabah Calculator Help?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                This calculator is designed to simplify the complex profit and loss distribution process in Mudarabah partnerships. By inputting the initial capital, the agreed-upon profit-sharing percentages, and the net profit or loss of the venture, the tool instantly calculates the exact financial share for both the investor and the entrepreneur. It strictly adheres to the Islamic rules of loss allocation, ensuring transparency, preventing disputes, and maintaining compliance with standards set by the Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI).
              </p>
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
            {
              question: "ماذا يحدث إذا خسر مشروع المضاربة؟",
              answer: "في حال تعرض مشروع المضاربة لخسارة مالية دون تعدٍ أو تقصير من المضارب (مدير المشروع)، يتحمل رب المال (المستثمر) الخسارة المالية بالكامل من رأس ماله. أما المضارب، فيتحمل خسارة جهده ووقته الذي بذله في إدارة المشروع."
            },
            {
              question: "هل يجوز تحديد مبلغ ربح ثابت للمضارب أو لرب المال؟",
              answer: "لا يجوز شرعاً تحديد مبلغ مقطوع (ثابت) كربح لأي من الطرفين، لأن ذلك ينافي مبدأ المشاركة في المخاطرة ويحول العقد إلى قرض ربوي. يجب أن يكون الربح نسبة مئوية مشاعة من صافي الأرباح المحققة (مثل 30% للمضارب و 70% لرب المال)."
            },
            {
              question: "هل يمكن للمضارب أن يشارك بجزء من رأس المال؟",
              answer: "نعم، إذا شارك المضارب بجزء من رأس المال إلى جانب جهده، يتحول العقد إلى ما يسمى (مضاربة ومشاركة). في هذه الحالة، يتم توزيع الأرباح حسب الاتفاق، أما في حال الخسارة، فتوزع الخسارة المالية على الطرفين كل بنسبة حصته في رأس المال فقط."
            }
          ] : [
            {
              question: "What happens if a Mudarabah venture incurs a financial loss?",
              answer: "If the business incurs a loss without any negligence, misconduct, or breach of terms by the Mudarib (the manager), the Rab-ul-Mal (the capital provider) bears the entire financial loss. The Mudarib only loses the time and effort invested in managing the project."
            },
            {
              question: "Can a fixed profit amount be guaranteed to either party?",
              answer: "No, under Sharia law, it is strictly prohibited to guarantee a fixed lump-sum profit to either party. Doing so eliminates the risk-sharing nature of the contract, effectively making it an interest-bearing loan (Riba). Profits must be allocated as a pre-agreed percentage of the actual net profits."
            },
            {
              question: "Can the Mudarib also contribute capital to the business?",
              answer: "Yes. If the Mudarib also contributes capital alongside their managerial effort, the contract becomes a combination of Musharakah and Mudarabah. In this scenario, profits are distributed according to the mutual agreement, but any financial loss must be borne by both parties strictly in proportion to their respective capital contributions."
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
