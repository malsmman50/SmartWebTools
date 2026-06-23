"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function IslamicFireCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.fire;
  const isAr = lang === "ar";

  const [annualExpenses, setAnnualExpenses] = useState(60000);
  const [expectedReturn, setExpectedReturn] = useState(8.0);
  const [inflationRate, setInflationRate] = useState(3.0);
  const [zakatType, setZakatType] = useState("long-term");

  // Math
  const realReturn = (expectedReturn - inflationRate) / 100;
  
  // Conventional: SWR = Real Return
  const conventionalSWR = realReturn;
  const conventionalFireNumber = conventionalSWR > 0 ? annualExpenses / conventionalSWR : 0;

  // Islamic: Subtract Zakat from real return
  const zakatRate = zakatType === "long-term" ? 0.008 : zakatType === "active" ? 0.025 : 0;
  const islamicSWR = realReturn - zakatRate;
  const islamicFireNumber = islamicSWR > 0 ? annualExpenses / islamicSWR : 0;

  const zakatGap = islamicFireNumber - conventionalFireNumber;

  const fmt = (n) => {
    if (isAr) {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>
            {isAr ? "الأهداف وافتراضات السوق" : "Your Goals & Market Assumptions"}
          </h3>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="annual-expenses">
              {isAr ? "المصروفات السنوية المطلوبة ($)" : "Desired Annual Living Expenses ($)"}
            </label>
            <NumericFormat 
              id="annual-expenses"
              className="input" 
              value={annualExpenses} 
              onValueChange={(values) => setAnnualExpenses(values.floatValue || 0)}
              thousandSeparator={true}
              prefix="$"
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "ما هو المبلغ السنوي الذي تحتاجه للعيش براحة؟" : "How much money do you need per year to live comfortably?"}
            </p>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="expected-return">
              {isAr ? "العائد الاستثماري الحلال المتوقع (%)" : "Expected Halal Investment Return (%)"}
            </label>
            <input 
              id="expected-return"
              type="number" 
              className="input" 
              value={expectedReturn} 
              step="0.1" 
              onChange={e => setExpectedReturn(Number(e.target.value))} 
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "المعدل التاريخي لصناديق المؤشرات الإسلامية (مثل SPUS, HLAL) هو حوالي 8-10%." : "Historical average of Halal Index Funds (e.g., SPUS, HLAL) is around 8-10%."}
            </p>
          </div>
          
          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="inflation-rate">
              {isAr ? "معدل التضخم السنوي المتوقع (%)" : "Expected Inflation Rate (%)"}
            </label>
            <input 
              id="inflation-rate"
              type="number" 
              className="input" 
              value={inflationRate} 
              step="0.1" 
              onChange={e => setInflationRate(Number(e.target.value))} 
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isAr ? "المعدل التاريخي للتضخم هو حوالي 3%." : "Historical average is around 3%."}
            </p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label className="label" htmlFor="zakat-strategy">
              {isAr ? "استراتيجية زكاة المحفظة الاستثمارية (معيار أيوفي)" : "Portfolio Zakat Strategy (AAOIFI Standard)"}
            </label>
            <select 
              id="zakat-strategy"
              className="input" 
              value={zakatType} 
              onChange={e => setZakatType(e.target.value)}
            >
              <option value="long-term">
                {isAr ? "صناديق المؤشرات والأسهم طويلة الأجل (الزكاة الفعلية ~0.8%)" : "Long-Term Index Funds/ETFs (Effective Zakat ~0.8%)"}
              </option>
              <option value="active">
                {isAr ? "التداول النشط / المحفظة النقدية (الزكاة الكاملة 2.5%)" : "Active Trading/Cash Portfolio (Zakat 2.5%)"}
              </option>
              <option value="none">
                {isAr ? "العقارات المؤجرة (الزكاة على الدخل فقط، 0% على أصل العقار)" : "Real Estate Rentals (Zakat on income only, 0% on property value)"}
              </option>
            </select>
          </div>
        </div>

        <div>
          {islamicSWR <= 0 ? (
             <div className="card" style={{ border: "1px solid var(--danger)" }}>
                <h3 style={{ color: "var(--danger)" }}>
                  {isAr ? "⚠️ افتراضات غير مستدامة" : "⚠️ Unsustainable Assumptions"}
                </h3>
                <p style={{ marginTop: "12px" }}>
                  {isAr 
                    ? `العائد المتوقع الخاص بك (${expectedReturn}%) بعد طرح التضخم (${inflationRate}%) والزكاة (${(zakatRate*100)}%) يؤدي إلى نمو سلبي أو معدوم.`
                    : `Your expected return (${expectedReturn}%) minus inflation (${inflationRate}%) and Zakat (${(zakatRate*100)}%) results in a negative or zero growth rate.`}
                </p>
                <p style={{ marginTop: "8px" }}>
                  {isAr
                    ? "ستنفد محفظتك الحالية بمرور الوقت. يجب أن تبحث عن استثمارات ذات عوائد أعلى أو تقلل من توقعات التضخم للاستمرار بأمان."
                    : "Your portfolio will inevitably deplete over time. You must find investments with higher returns or lower your inflation expectations to sustain a permanent retirement."}
                </p>
             </div>
          ) : (
            <>
              <div className="result-box" style={{ marginBottom: "16px", background: "var(--success)", color: "white" }} aria-live="polite">
                <div className="result-label" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {isAr ? "رقم الاستقلال المالي الإسلامي (صافي الأصول المستهدف)" : "Islamic FIRE Number (Target Net Worth)"}
                </div>
                <div className="result-value" style={{ fontSize: "2.5rem", color: "white" }}>{fmt(islamicFireNumber)}</div>
                <p style={{ fontSize: "0.9rem", marginTop: "12px" }}>
                  {isAr 
                    ? `هذا هو إجمالي المبلغ المستثمر المطلوب لتأمين نمط حياتك البالغ ${fmt(annualExpenses)} سنوياً للأبد، مع إخراج ${fmt(islamicFireNumber * zakatRate)} للزكاة السنوية.`
                    : `This is the total invested amount needed to sustain your ${fmt(annualExpenses)} lifestyle forever, while paying ${fmt(islamicFireNumber * zakatRate)} in Zakat every year.`}
                </p>
              </div>

              <div className="grid-2">
                <div className="result-box" aria-live="polite">
                  <div className="result-label">{isAr ? "رقم التقاعد التقليدي" : "Conventional FIRE Number"}</div>
                  <div className="result-value" style={{ fontSize: "1.4rem" }}>{fmt(conventionalFireNumber)}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    {isAr ? "بدون احتساب الزكاة" : "Ignoring Zakat"}
                  </p>
                </div>
                <div className="result-box" aria-live="polite">
                  <div className="result-label">{isAr ? "فجوة الزكاة الإضافية" : 'The "Zakat Gap"'}</div>
                  <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--warning)" }}>+{fmt(zakatGap)}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    {isAr ? "رأس مال إضافي مطلوب لاستدامة الزكاة" : "Extra capital needed to sustain charity."}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>حاسبة الاستقلال المالي والتقاعد المبكر الإسلامي (FIRE)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              حركة الاستقلال المالي والتقاعد المبكر (FIRE) تعتمد على فكرة توفير مبلغ استثماري يكفي لتغطية نفقاتك المعيشية من خلال الأرباح السنوية دون المساس برأس المال. ولكن في السياق الإسلامي، يجب أن ينمو رأس المال هذا بمعدل يكفي لمواجهة أمرين: <strong>التضخم المالي</strong>، و<strong>الزكاة السنوية المفروضة</strong>. هذه الحاسبة الذكية تحسب لك "الرقم السري" (Target Net Worth) الذي تحتاجه لتحقيق الاستقلال المالي مع الحفاظ على التزامك بأداء فريضة الزكاة بشكل مستدام.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>مستثمر صناديق المؤشرات طويلة الأجل:</strong> تحتاج لـ 60,000$ سنوياً للمعيشة. استثماراتك في صناديق إسلامية (مثل SPUS) بعائد 8%. التضخم 3%. طبقاً لمعيار أيوفي (الزكاة على الموجودات الزكوية فقط)، نسبة الزكاة الفعالة تكون حوالي 0.8%. رقم التقاعد الإسلامي سيكون حوالي 1.4 مليون دولار.</li>
              <li style={{ marginBottom: "8px" }}><strong>المتداول النشط (الأسهم أو العملات الرقمية):</strong> نفس المعطيات السابقة، ولكن بما أنك تتداول بنية البيع والشراء السريع (عروض التجارة)، فالزكاة تُحسب بنسبة 2.5% على إجمالي المحفظة كل عام. رقم التقاعد سيقفز إلى حوالي 2.4 مليون دولار! (هذه الفجوة الضخمة هي فجوة الزكاة).</li>
              <li style={{ marginBottom: "8px" }}><strong>المستثمر العقاري:</strong> لو قررت تحقيق الاستقلال المالي عبر تأجير العقارات. الزكاة تكون على "الدخل الإيجاري" فقط وليس على أصل العقار (بشرط عدم نية المتاجرة بالعقار). هنا رقم التقاعد الإسلامي يتطابق مع التقليدي.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>ما هي "فجوة الزكاة"؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              النماذج الغربية تعتمد على "قاعدة الـ 4%" لسحب الأرباح. لكن المسلم يحتاج إلى سحب إضافي لدفع الزكاة. "فجوة الزكاة" هي رأس المال الإضافي (Buffer) الذي يجب أن توفره الآن لكي تتمكن مستقبلاً من دفع راتبك لنفسك + دفع زكاة أموالك للفقراء إلى الأبد دون أن ينفد رصيدك الاستثماري.
            </p>
          </>
        ) : (
          <>
            <h2>Islamic Financial Independence, Retire Early (FIRE) Calculator</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The FIRE movement relies on accumulating a large enough investment portfolio where the annual returns cover your living expenses permanently. However, for a Muslim, the portfolio must grow enough to outpace two things: <strong>Economic Inflation</strong> and <strong>Annual Zakat</strong>. This smart calculator computes the exact "Target Net Worth" required to sustain your lifestyle while perpetually fulfilling your Zakat obligations without depleting your principal amount.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Long-Term Index Fund Investor:</strong> You need $60,000/year to live. Your Halal ETF (like SPUS) yields 8%. Inflation is 3%. According to AAOIFI standards (Zakat only on Zakatable assets within the fund), the effective Zakat rate is roughly 0.8%. Your Islamic FIRE number is ~$1.4 Million.</li>
              <li style={{ marginBottom: "8px" }}><strong>Active Stock/Crypto Trader:</strong> Same as above, but because you actively trade (goods for trade), Zakat is strictly 2.5% on the entire portfolio value annually. Your FIRE number drastically spikes to ~$2.4 Million! (This massive difference is the Zakat Gap).</li>
              <li style={{ marginBottom: "8px" }}><strong>Real Estate Rental Investor:</strong> If you plan to retire on rental yields, Zakat is only due on the net rental income, not the property's capital value (assuming you hold, not flip). In this specific scenario, your Islamic FIRE number matches the conventional one.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>What is the "Zakat Gap"?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Western FIRE models rely on the "4% Rule" for safe withdrawal rates. A Muslim, however, must make an additional withdrawal for charity. The "Zakat Gap" is the extra capital buffer you must build now so that your investments generate enough returns to pay both your living expenses and your Zakat to the poor, forever.
            </p>
          </>
        )}
      </article>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": lang === "ar" ? [
          {
            "@type": "Question",
            "name": "لماذا يتم استقطاع الزكاة في حاسبة الاستقلال المالي؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لأن المال المدخر والمستثمر للاستقلال المالي يبلغ النصاب ويحول عليه الحول، فتجب فيه الزكاة. تجاهل الزكاة في التخطيط المالي سيؤدي إلى نفاد محفظتك الاستثمارية قبل وفاتك."
            }
          },
          {
            "@type": "Question",
            "name": "ما معنى معيار أيوفي (0.8%) للزكاة على الأسهم؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "طبقاً لهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI)، إذا كنت تستثمر في الأسهم بنية طويلة الأجل (احتفاظ)، فإنك لا تزكي كامل قيمة السهم 2.5%، بل تزكي فقط الأصول الزكوية للشركة (كالنقد والبضائع)، مما يجعل النسبة الفعالة غالباً أقل من 1%."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Why is Zakat subtracted in the FIRE calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because the wealth accumulated for retirement surpasses the Nisab and is held for over a lunar year, making it Zakatable. Ignoring Zakat in your math means your portfolio will run out prematurely."
            }
          },
          {
            "@type": "Question",
            "name": "What is the AAOIFI standard (0.8%) for Zakat on stocks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "According to the AAOIFI, if you buy stocks/ETFs to hold long-term (not for active trading), you don't pay 2.5% on the market value. You only pay 2.5% on the company's Zakatable assets (cash, inventory), which effectively brings the rate down to roughly 0.8% of the total portfolio value."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
