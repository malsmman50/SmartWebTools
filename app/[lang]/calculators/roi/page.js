import { getDictionary } from "@/app/dictionaries";
import RoiCalculatorClient from "@/app/components/RoiCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
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
      <RoiCalculatorClient  lang={lang} dict={dict} />
      
      <div className="container" style={{ padding: "0 20px 40px" }}>
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8" }}>
          {isAr ? (
            <>
              <h2>كيفية حساب العائد على الاستثمار (ROI)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                العائد على الاستثمار (ROI) هو مقياس مالي شائع الاستخدام لقياس كفاءة الاستثمار أو مقارنة كفاءة عدد من الاستثمارات المختلفة.
                المعادلة البسيطة له هي:
              </p>
              <div style={{ background: "var(--bg)", padding: "12px", borderRadius: "8px", margin: "12px 0", fontFamily: "monospace", textAlign: "center" }}>
                ROI = ((صافي الربح) / تكلفة الاستثمار) × 100
              </div>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                العائد الإيجابي يعني أنك حققت أرباحاً، بينما العائد السلبي يعني الخسارة.
              </p>
              <h3 style={{ marginTop: "24px" }}>العائد السنوي المركب (Annualized ROI)</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                الـ ROI البسيط لا يأخذ في الاعتبار الفترة الزمنية للاستثمار. عائد بنسبة 50% على مدار 10 سنوات يختلف تماماً عن عائد بنسبة 50% في سنة واحدة.
                لذلك نقوم باحتساب العائد السنوي المركب لمعرفة النمو الفعلي للاستثمار على أساس سنوي لتسهيل المقارنة بين الفرص الاستثمارية المختلفة.
              </p>
            </>
          ) : (
            <>
              <h2>How to Calculate Return on Investment (ROI)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Return on Investment (ROI) is one of the most widely used financial metrics to evaluate the efficiency of an investment or compare the efficiencies of several different investments.
                The formula is simple:
              </p>
              <div style={{ background: "var(--bg)", padding: "12px", borderRadius: "8px", margin: "12px 0", fontFamily: "monospace", textAlign: "center" }}>
                ROI = ((Net Profit) / Cost of Investment) × 100
              </div>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                A positive ROI means you made money; a negative ROI means you lost money.
              </p>
              <h3 style={{ marginTop: "24px" }}>Annualized ROI</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                Simple ROI doesn't account for the time period of the investment. An ROI of 50% over 10 years is very different from 50% over 1 year.
                Annualized ROI resolves this issue by calculating the average annual growth rate of the investment, making it easier to compare investments of different durations.
              </p>
            </>
          )}
        </article>
      </div>
    </>
  );
}
