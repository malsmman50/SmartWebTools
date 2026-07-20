import { getDictionary } from "@/app/dictionaries";
import IslamicFireCalculatorClient from "@/app/components/IslamicFireCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/islamic-fire`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/islamic-fire`,
        "ar": `https://smartcalctools.xyz/ar/calculators/islamic-fire`,
      },
    },
    title: isAr ? "حاسبة التقاعد المبكر الإسلامي (FIRE)" : "Islamic FIRE Calculator",
    description: isAr 
      ? "احسب رقم الاستقلال المالي والتقاعد المبكر المتوافق مع الشريعة الإسلامية مع احتساب فريضة الزكاة السنوية وفجوة الزكاة."
      : "Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the annual Zakat obligation and the Zakat Gap.",
    openGraph: {
      title: isAr ? "حاسبة التقاعد المبكر الإسلامي (FIRE)" : "Islamic FIRE Calculator",
      description: isAr 
      ? "احسب رقم الاستقلال المالي والتقاعد المبكر المتوافق مع الشريعة الإسلامية مع احتساب فريضة الزكاة السنوية وفجوة الزكاة."
      : "Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the annual Zakat obligation and the Zakat Gap.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "حاسبة التقاعد المبكر الإسلامي (FIRE)" : "Islamic FIRE Calculator",
      description: isAr 
      ? "احسب رقم الاستقلال المالي والتقاعد المبكر المتوافق مع الشريعة الإسلامية مع احتساب فريضة الزكاة السنوية وفجوة الزكاة."
      : "Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the annual Zakat obligation and the Zakat Gap.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function IslamicFireCalculatorPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema
        name={isAr ? "حاسبة التقاعد المبكر الإسلامي (FIRE)" : "Islamic FIRE Calculator"}
        description={isAr ? "احسب رقم الاستقلال المالي والتقاعد المبكر المتوافق مع الشريعة الإسلامية مع احتساب فريضة الزكاة السنوية وفجوة الزكاة." : "Calculate your Financial Independence, Retire Early (FIRE) number while accounting for the annual Zakat obligation and the Zakat Gap."}
        url={`https://smartcalctools.xyz/${lang}/calculators/islamic-fire`}
      />
      <div className="page-header">
        <h1>{dict.fire.title}</h1>
        <p>{dict.fire.subtitle}</p>
      </div>

      <IslamicFireCalculatorClient lang={lang} dict={dict} />
      
      <div style={{ marginTop: "24px" }}>
        <DisclaimerBox type="financial" lang={lang} />
        <DisclaimerBox type="religious" lang={lang} />
      </div>

      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2>الدليل الشامل للتقاعد المبكر الإسلامي (Islamic FIRE)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تعتمد حركة التقاعد المبكر التقليدية (FIRE) على ركيزة بسيطة: الادخار بقوة، والاستثمار في صناديق المؤشرات، والعيش على العائد السنوي السلبي للمحفظة للتقاعد مبكراً. ويعتمد هذا النظام على ما يُعرف بـ <strong>"قاعدة الـ 4%"</strong> (معدل السحب الآمن)، والتي تفترض إمكانية سحب 4% من المحفظة سنوياً دون نفادها أبداً.
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
              للتقاعد بأمان مع الحفاظ على الفريضة، يجب أن يكون "رقم الاستقلال المالي" المستهدف أعلى بكثير. نسمي هذا الفارق بـ <strong>فجوة الزكاة</strong>. من خلال بناء قاعدة رأس مال أكبر، يولد استثمارك عوائد تكفي لتأمين معيشتك ودفع زكاتك السنوية للفقراء بشكل مستدام ومستمر للأبد.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>مستثمر صناديق المؤشرات طويلة الأجل:</strong> تحتاج لـ 60,000$ سنوياً للمعيشة. استثماراتك في صناديق إسلامية (مثل SPUS) بعائد 8%. التضخم 3%. طبقاً لمعيار أيوفي (الزكاة على الموجودات الزكوية فقط)، نسبة الزكاة الفعالة تكون حوالي 0.8%. رقم التقاعد الإسلامي سيكون حوالي 1.4 مليون دولار.</li>
              <li style={{ marginBottom: "8px" }}><strong>المتداول النشط (الأسهم أو العملات الرقمية):</strong> نفس المعطيات السابقة، ولكن بما أنك تتداول بنية البيع والشراء السريع (عروض التجارة)، فالزكاة تُحسب بنسبة 2.5% على إجمالي المحفظة كل عام. رقم التقاعد سيقفز إلى حوالي 2.4 مليون دولار! (هذه الفجوة الضخمة هي فجوة الزكاة).</li>
              <li style={{ marginBottom: "8px" }}><strong>المستثمر العقاري:</strong> لو قررت تحقيق الاستقلال المالي عبر تأجير العقارات. الزكاة تكون على "الدخل الإيجاري" فقط وليس على أصل العقار (بشرط عدم نية المتاجرة بالعقار). هنا رقم التقاعد الإسلامي يتطابق مع التقليدي.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول الاستقلال المالي الإسلامي</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>لماذا يتم استقطاع الزكاة في حاسبة الاستقلال المالي؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>لأن المال المدخر والمستثمر للاستقلال المالي يبلغ النصاب ويحول عليه الحول، فتجب فيه الزكاة. تجاهل الزكاة في التخطيط المالي سيؤدي إلى نفاد محفظتك الاستثمارية قبل وفاتك.</p>

              <h4 style={{ fontSize: "1.1rem" }}>ما معنى معيار أيوفي (0.8%) للزكاة على الأسهم؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>طبقاً لهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI)، إذا كنت تستثمر في الأسهم بنية طويلة الأجل (احتفاظ)، فإنك لا تزكي كامل قيمة السهم 2.5%، بل تزكي فقط الأصول الزكوية للشركة (كالنقد والبضائع)، مما يجعل النسبة الفعالة غالباً أقل من 1%.</p>

              <h4 style={{ fontSize: "1.1rem" }}>كيف يمكنني تقليل فجوة الزكاة؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>يمكنك تنويع استثماراتك في العقارات المؤجرة حيث لا تجب الزكاة على أصل العقار بل على الإيجار الصافي فقط.</p>

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
              The FIRE movement is built on a simple premise: save aggressively, invest in index funds, and live off the passive income so you can retire decades earlier than the traditional age of 65. The backbone of FIRE is the <strong>"4% Rule"</strong> (Safe Withdrawal Rate), which states you can safely withdraw 4% of your portfolio every year without running out of money. 
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              However, conventional FIRE calculators fail Muslims because they ignore two critical Islamic financial realities: <strong>Riba (Interest) is forbidden</strong>, and <strong>Zakat (2.5% wealth tax) is mandatory</strong>.
            </p>

            <h3 style={{ marginTop: "24px" }}>Accounting for the Zakat Obligation in Islamic FIRE</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              In a conventional FIRE plan, if the stock market grows by 7% and inflation is 3%, you have a 4% "real return" to live on. But for a Muslim, wealth that sits in liquid, Zakatable assets (like Shariah-compliant stock portfolios, cash, or gold) is subject to a 2.5% annual Zakat.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              If your real return is 4%, and you pay 2.5% in Zakat, you only have <strong>1.5% left to live on!</strong> If you withdraw 4% for your living expenses anyway, your total outflow becomes 6.5% (4% living + 2.5% Zakat), which means your portfolio is shrinking every year and will eventually run out.
            </p>

            <h3 style={{ marginTop: "24px" }}>The Solution: The Zakat Gap</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              To retire safely while fulfilling your religious obligations, your target "FIRE Number" must be significantly higher than a non-Muslim's FIRE number. We call this difference the <strong>Zakat Gap</strong>. By building a larger capital base, you generate enough returns to comfortably pay for your life AND give massive amounts of charity to the poor every single year, indefinitely.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Long-Term Index Fund Investor:</strong> You need $60,000/year to live. Your Halal ETF (like SPUS) yields 8%. Inflation is 3%. According to AAOIFI standards (Zakat only on Zakatable assets within the fund), the effective Zakat rate is roughly 0.8%. Your Islamic FIRE number is ~$1.4 Million.</li>
              <li style={{ marginBottom: "8px" }}><strong>Active Stock/Crypto Trader:</strong> Same as above, but because you actively trade (goods for trade), Zakat is strictly 2.5% on the entire portfolio value annually. Your FIRE number drastically spikes to ~$2.4 Million! (This massive difference is the Zakat Gap).</li>
              <li style={{ marginBottom: "8px" }}><strong>Real Estate Rental Investor:</strong> If you plan to retire on rental yields, Zakat is only due on the net rental income, not the property's capital value (assuming you hold, not flip). In this specific scenario, your Islamic FIRE number matches the conventional one.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>Why is Zakat subtracted in the FIRE calculator?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Because the wealth accumulated for retirement surpasses the Nisab and is held for over a lunar year, making it Zakatable. Ignoring Zakat in your math means your portfolio will run out prematurely.</p>

              <h4 style={{ fontSize: "1.1rem" }}>What is the AAOIFI standard (0.8%) for Zakat on stocks?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>According to the AAOIFI, if you buy stocks/ETFs to hold long-term (not for active trading), you don't pay 2.5% on the market value. You only pay 2.5% on the company's Zakatable assets (cash, inventory), which effectively brings the rate down to roughly 0.8% of the total portfolio value.</p>

              <h4 style={{ fontSize: "1.1rem" }}>How can I reduce the Zakat Gap?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>You can invest in non-Zakatable assets like rental properties. Zakat is generally paid on the rental income, not the property value itself, lowering the overall obligation.</p>

              <h4 style={{ fontSize: "1.1rem" }}>Can I use a regular 401(k) for Halal FIRE?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Yes, if you use a brokerage link to buy Shariah-compliant mutual funds or ETFs (like SPUS, HLAL, AMJA). You must ensure your money is not sitting in default target-date funds, which heavily rely on interest-bearing conventional bonds.</p>

              <h4 style={{ fontSize: "1.1rem" }}>Are Islamic investments less profitable?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the broader market, and sometimes outperform during financial crises by excluding highly leveraged companies.</p>
            </div>
          </>
        )}
      </article>

      <FAQSchema
        faqData={isAr ? [
          {
            q: "لماذا يتم استقطاع الزكاة في حاسبة الاستقلال المالي؟",
            a: "لأن المال المدخر والمستثمر للاستقلال المالي يبلغ النصاب ويحول عليه الحول، فتجب فيه الزكاة. تجاهل الزكاة في التخطيط المالي سيؤدي إلى نفاد محفظتك الاستثمارية قبل وفاتك."
          },
          {
            q: "ما معنى معيار أيوفي (0.8%) للزكاة على الأسهم؟",
            a: "طبقاً لهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI)، إذا كنت تستثمر في الأسهم بنية طويلة الأجل (احتفاظ)، فإنك لا تزكي كامل قيمة السهم 2.5%، بل تزكي فقط الأصول الزكوية للشركة (كالنقد والبضائع)، مما يجعل النسبة الفعالة غالباً أقل من 1%."
          },
          {
            q: "كيف يمكنني تقليل فجوة الزكاة؟",
            a: "يمكنك تنويع استثماراتك في العقارات المؤجرة حيث لا تجب الزكاة على أصل العقار بل على الإيجار الصافي فقط."
          },
          {
            q: "هل يمكن الاستثمار في صناديق التقاعد التقليدية؟",
            a: "نعم، بشرط اختيار الصناديق المتوافقة مع الشريعة وتجنب السندات الربوية."
          },
          {
            q: "هل عوائد الاستثمارات الإسلامية أقل من التقليدية؟",
            a: "تاريخياً، أداؤها متقارب جداً وأحياناً أفضل بسب استبعاد البنوك والشركات ذات الديون العالية."
          }
        ] : [
          {
            q: "Why is Zakat subtracted in the FIRE calculator?",
            a: "Because the wealth accumulated for retirement surpasses the Nisab and is held for over a lunar year, making it Zakatable. Ignoring Zakat in your math means your portfolio will run out prematurely."
          },
          {
            q: "What is the AAOIFI standard (0.8%) for Zakat on stocks?",
            a: "According to the AAOIFI, if you buy stocks/ETFs to hold long-term (not for active trading), you don't pay 2.5% on the market value. You only pay 2.5% on the company's Zakatable assets (cash, inventory), which effectively brings the rate down to roughly 0.8% of the total portfolio value."
          },
          {
            q: "How can I reduce the Zakat Gap?",
            a: "You can invest in non-Zakatable assets like rental properties. Zakat is generally paid on the rental income, not the property value itself, lowering the overall obligation."
          },
          {
            q: "Can I use a regular 401(k) for Halal FIRE?",
            a: "Yes, if you use a brokerage link to buy Shariah-compliant mutual funds or ETFs. You must avoid default target-date funds which rely on interest-bearing bonds."
          },
          {
            q: "Are Islamic investments less profitable?",
            a: "Not necessarily. Historically, Shariah-compliant index funds perform very similarly to the broader market, and sometimes outperform during financial crises by excluding highly leveraged companies."
          }
        ]}
      />
    </div>
  );
}
