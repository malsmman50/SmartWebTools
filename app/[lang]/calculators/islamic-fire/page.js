import { getDictionary } from "@/app/dictionaries";
import IslamicFireCalculatorClient from "@/app/components/IslamicFireCalculatorClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "حاسبة التقاعد المبكر الإسلامي (FIRE) | أدوات الحساب الذكية" : "Islamic FIRE Calculator | SmartCalcTools",
    description: isAr 
      ? "احسب رقم الاستقلال المالي والتقاعد المبكر المتوافق مع الشريعة الإسلامية مع احتساب فريضة الزكاة السنوية وفجوة الزكاة."
      : "Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the annual Zakat obligation and the Zakat Gap."
  };
}

export default async function IslamicFireCalculatorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";

  return (
    <>
      <IslamicFireCalculatorClient  lang={lang} dict={dict} />
      
      <div className="container" style={{ padding: "0 20px 40px" }}>
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8" }}>
          {isAr ? (
            <>
              <h2>الدليل الشامل للتقاعد المبكر الإسلامي (Islamic FIRE)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                تعتمد حركة التقاعد المبكر التقليدية (FIRE) على ركيزة بسيطة: الادخار بقوة، والاستثمار في صناديق المؤشرات، والعيش على العائد السنوي السلبي للمحفظة للتقاعد مبكراً. ويعتمد هذا النظام على ما يُعرف بـ <strong>\"قاعدة الـ 4%\"</strong> (معدل السحب الآمن)، والتي تفترض إمكانية سحب 4% من المحفظة سنوياً دون نفادها أبداً.
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                ومع ذلك، تفشل الحاسبات التقليدية في تلبية احتياجات المسلمين لأنها تتجاهل واقعين ماليين أساسيين في الإسلام: <strong>تحريم الربا والفوائد البنكية</strong>، و<strong>فرض الزكاة السنوية بنسبة 2.5%</strong> على الثروة النقدية والأسهم السائلة.
              </p>

              <h3 style={{ marginTop: "24px" }}>تأثير الزكاة على حسابات التقاعد الإسلامي</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                في التقاعد التقليدي، إذا كانت عوائد سوق الأسهم 7% والتضخم 3%، يتبقى لك 4% عائد حقيقي للعيش عليه. لكن بالنسبة للمسلم، فإن الأموال المستثمرة في الأصول السائلة (مثل الأسهم المتوافقة مع الشريعة أو النقد) تخضع للزكاة السنوية.
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                إذا كان العائد الحقيقي الصافي 4%، وقمت بإخراج زكاة بنسبة 2.5% (على أساس المحفظة النشطة)، فسيتبقى لك <strong>1.5% فقط للعيش!</strong> وإذا سحبت 4% كالمعتاد، فسيصل إجمالي المسحوبات السنوية إلى 6.5% (4% مصاريف + 2.5% زكاة)، مما يؤدي لتناقص محفظتك الاستثمارية ونفادها التدريجي.
              </p>

              <h3 style={{ marginTop: "24px" }}>الحل الشرعي: فجوة الزكاة (Zakat Gap)</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                للتقاعد بأمان مع الحفاظ على الفريضة، يجب أن يكون \"رقم الاستقلال المالي\" المستهدف أعلى بكثير. نسمي هذا الفارق بـ <strong>فجوة الزكاة</strong>. من خلال بناء قاعدة رأس مال أكبر، يولد استثمارك عوائد تكفي لتأمين معيشتك ودفع زكاتك السنوية للفقراء بشكل مستدام ومستمر للأبد.
              </p>

              <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول الاستقلال المالي الإسلامي</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.1rem" }}>كيف يمكنني تقليل فجوة الزكاة؟</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>يمكنك تنويع استثماراتك في أصول غير خاضعة لزكاة كامل القيمة. على سبيل المثال، في العقارات المؤجرة، لا تجب الزكاة على قيمة العقار نفسه بل على الدخل الصافي الناتج عن الإيجار فقط (بعد احتساب المصاريف وبلوغ النصاب)، مما يخفض مقدار الزكاة مقارنة بالأسهم السائلة.</p>

                <h4 style={{ fontSize: "1.1rem" }}>هل يمكن الاستثمار في صناديق التقاعد التقليدية (401k / Roth IRA)؟</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>نعم، بشرط توجيه هذه الحسابات لشراء صناديق استثمار متوافقة مع الشريعة وتجنب الصناديق الافتراضية المعتمدة على السندات التقليدية الربوية.</p>

                <h4 style={{ fontSize: "1.1rem" }}>هل عوائد الاستثمارات الإسلامية أقل من التقليدية؟</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>تاريخياً، تحقق صناديق المؤشرات الإسلامية (مثل SPUS و HLAL) أداءً متقارباً جداً وأحياناً تتفوق على مؤشر S&P 500 نظراً لأنها تستبعد الشركات المثقلة بالديون والبنوك التقليدية التي تتأثر بالأزمات الاقتصادية.</p>
              </div>
            </>
          ) : (
            <>
              <h2>The Ultimate Guide to Islamic FIRE (Financial Independence, Retire Early)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                The FIRE movement is built on a simple premise: save aggressively, invest in index funds, and live off the passive income so you can retire decades earlier than the traditional age of 65. The backbone of FIRE is the <strong>\"4% Rule\"</strong> (Safe Withdrawal Rate), which states you can safely withdraw 4% of your portfolio every year without running out of money. 
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                However, conventional FIRE calculators fail Muslims because they ignore two critical Islamic financial realities: <strong>Riba (Interest) is forbidden</strong>, and <strong>Zakat (2.5% wealth tax) is mandatory</strong>.
              </p>

              <h3 style={{ marginTop: "24px" }}>Accounting for the Zakat Obligation in Islamic FIRE</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                In a conventional FIRE plan, if the stock market grows by 7% and inflation is 3%, you have a 4% \"real return\" to live on. But for a Muslim, wealth that sits in liquid, Zakatable assets (like Shariah-compliant stock portfolios, cash, or gold) is subject to a 2.5% annual Zakat.
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                If your real return is 4%, and you pay 2.5% in Zakat, you only have <strong>1.5% left to live on!</strong> If you withdraw 4% for your living expenses anyway, your total outflow becomes 6.5% (4% living + 2.5% Zakat), which means your portfolio is shrinking every year and will eventually run out.
              </p>

              <h3 style={{ marginTop: "24px" }}>The Solution: The Zakat Gap</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                To retire safely while fulfilling your religious obligations, your target \"FIRE Number\" must be significantly higher than a non-Muslim's FIRE number. We call this difference the <strong>Zakat Gap</strong>. By building a larger capital base, you generate enough returns to comfortably pay for your life AND give massive amounts of charity to the poor every single year, indefinitely.
              </p>

              <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions (FAQ)</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.1rem" }}>How can I reduce the Zakat Gap?</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>You can invest in non-Zakatable assets. For example, if you buy a rental property, Zakat is generally not paid on the value of the property itself, but only on the rental income (after expenses and if it reaches Nisab). This lowers the total Zakat obligation compared to holding a massive liquid stock portfolio.</p>

                <h4 style={{ fontSize: "1.1rem" }}>Can I use a regular 401(k) for Halal FIRE?</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Yes, if you self-direct your 401(k) or use a brokerage link to buy Shariah-compliant mutual funds or ETFs (like SPUS, HLAL, AMJA). You must ensure your money is not sitting in default target-date funds, which heavily rely on interest-bearing conventional bonds.</p>

                <h4 style={{ fontSize: "1.1rem" }}>Are Islamic investments less profitable?</h4>
                <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the S&P 500. By excluding highly leveraged companies and conventional banks (which often crash during financial crises), Halal funds sometimes even outperform the broader market during downturns.</p>
              </div>
            </>
          )}
        </article>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": isAr ? [
          {
            "@type": "Question",
            "name": "كيف يمكنني تقليل فجوة الزكاة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "يمكنك تنويع استثماراتك في العقارات المؤجرة حيث لا تجب الزكاة على أصل العقار بل على الإيجار الصافي فقط."
            }
          },
          {
            "@type": "Question",
            "name": "هل يمكن الاستثمار في صناديق التقاعد التقليدية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "نعم، بشرط اختيار الصناديق المتوافقة مع الشريعة وتجنب السندات الربوية."
            }
          },
          {
            "@type": "Question",
            "name": "هل عوائد الاستثمارات الإسلامية أقل من التقليدية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "تاريخياً، أداؤها متقارب جداً وأحياناً أفضل بسب استبعاد البنوك والشركات ذات الديون العالية."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "How can I reduce the Zakat Gap?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can invest in non-Zakatable assets like rental properties. Zakat is generally paid on the rental income, not the property value itself, lowering the overall obligation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use a regular 401(k) for Halal FIRE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if you use a brokerage link to buy Shariah-compliant mutual funds or ETFs. You must avoid default target-date funds which rely on interest-bearing bonds."
            }
          },
          {
            "@type": "Question",
            "name": "Are Islamic investments less profitable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the broader market, and sometimes outperform during financial crises by excluding highly leveraged companies."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </>
  );
}
