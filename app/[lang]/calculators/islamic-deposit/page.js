import { getDictionary } from "@/app/dictionaries";
import IslamicDepositCalculatorClient from "@/app/components/IslamicDepositCalculatorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.islamic_deposit.title}`,
    description: dict.islamic_deposit.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/islamic-deposit`,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/islamic-deposit",
        "ar": "https://smartcalctools.xyz/ar/calculators/islamic-deposit",
      },
    },
    openGraph: {
      title: `${dict.islamic_deposit.title}`,
      description: dict.islamic_deposit.subtitle,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${dict.islamic_deposit.title}`,
      description: dict.islamic_deposit.subtitle,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function IslamicDepositPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  const isAr = lang === "ar";
  return (
    <>
      <SoftwareSchema
        name={isAr ? "حاسبة الودائع الإسلامية (الوكالة بالاستثمار)" : "Islamic Deposit Calculator (Wakala)"}
        description={isAr ? "أداة دقيقة لحساب الأرباح المتوقعة للودائع الإسلامية (الوكالة بالاستثمار أو المضاربة المقيدة) في البنوك الإسلامية. تتيح لك الأداة معرفة العوائد بناءً على نسبة الربح المتوقعة والفترة الزمنية، سواء كانت شهرية، ربع سنوية، أو سنوية، مع الأخذ بالاعتبار طبيعة توزيع الأرباح في النظام المصرفي الإسلامي والذي يعتمد على الأرباح الفعلية المحققة من الأصول الأساسية، مما يساعدك على التخطيط المالي بشكل دقيق ومطابق للشريعة الإسلامية." : "An accurate financial tool to calculate the expected returns on Islamic deposits (Wakala Bil Istithmar or Restricted Mudarabah) in Islamic banks. This calculator helps you determine your potential profits based on the expected profit rate and tenure (monthly, quarterly, or annually). It considers the nature of profit distribution in the Islamic banking system, which relies on actual profits generated from underlying Sharia-compliant assets. Plan your finances accurately and ethically with our halal deposit calculator."}
        url={`https://smartcalctools.xyz/${lang}/calculators/islamic-deposit`}
        price="0"
      />
      <div className="container" style={{ padding: "40px 20px" }}>
        <div className="page-header" style={{ textAlign: "center" }}>
          <h1>{dict.islamic_deposit.title}</h1>
          <p>{dict.islamic_deposit.subtitle}</p>
        </div>
        <IslamicDepositCalculatorClient dict={dict} lang={lang} />
        
        <div style={{ marginTop: "30px" }}>
          <DisclaimerBox type="religion" lang={lang} />
        </div>
        
        <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
          {isAr ? (
            <>
              <h2>حاسبة الودائع الإسلامية (الوكالة بالاستثمار والمضاربة)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                تعتبر الودائع الاستثمارية في البنوك الإسلامية من أبرز أدوات تنمية المدخرات بطريقة متوافقة مع أحكام ومبادئ الشريعة الإسلامية. تعتمد هذه الودائع في الغالب على صيغتين شرعيتين أساسيتين: الوكالة بالاستثمار، والمضاربة المطلقة أو المقيدة. على عكس الودائع التقليدية التي تعتمد على الفائدة الربوية المضمونة والمحرمة شرعاً، تقوم الودائع الإسلامية على مبدأ المشاركة في الربح والخسارة، أو استثمار الأموال في أنشطة تجارية واستثمارية مباحة شرعاً نيابة عن المودع وتوزيع العوائد بناءً على الأرباح الفعلية المحققة.
              </p>
              <h3 style={{ marginTop: "24px" }}>كيف تعمل الودائع الإسلامية؟</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                في <strong>عقد المضاربة</strong>، يقوم المودع (رب المال) بتقديم رأس المال للبنك (المضارب)، ليقوم الأخير باستثماره في مشاريع مختلفة. يتم الاتفاق مسبقاً على نسبة توزيع الأرباح (مثلاً 70% للمودع و30% للبنك كمدير للعملية). في حال تحقيق ربح، يوزع بحسب النسبة، وفي حال الخسارة (بدون تقصير من البنك)، يتحمل المودع الخسارة المالية ويخسر البنك جهده.
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                في <strong>عقد الوكالة بالاستثمار</strong>، يوكل المودع البنك باستثمار أمواله مقابل أجر محدد أو بدون أجر، مع تحديد نسبة ربح متوقعة. يلتزم البنك بتحقيق هذا الربح الاسترشادي ضمن سياسات إدارة المخاطر، وإذا زاد الربح عن النسبة المتوقعة، قد يحتفظ البنك بالزيادة كحافز أداء.
              </p>
              <h3 style={{ marginTop: "24px" }}>أهمية حاسبة الودائع الإسلامية</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                تساعدك حاسبة الودائع الإسلامية على تقدير العوائد المتوقعة لاستثماراتك بناءً على معدلات الأرباح الاسترشادية التي تعلنها البنوك الإسلامية. بإدخال مبلغ الوديعة، ونسبة الربح السنوي المتوقعة، ومدة الاستثمار بالشهور أو السنوات، وتحديد دورية صرف الأرباح (شهري، ربع سنوي، نصف سنوي، أو في نهاية المدة)، ستقوم الحاسبة بتقدير إجمالي الأرباح ورصيد الحساب النهائي. هذا التقدير يساعدك على اتخاذ قرارات مالية حكيمة، ومقارنة العروض المقدمة من البنوك المختلفة، مع إدراك أن الأرباح في النظام الإسلامي قابلة للتغير بناءً على الأداء الفعلي للأصول.
              </p>

              <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
              <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>حساب وديعة استثمارية سنوية:</strong> أودعت مبلغ 50,000$ في بنك إسلامي، وأعلن البنك أن معدل الربح المتوقع للاستثمار هو 8% سنوياً، ونسبة العميل (حصتك من الربح) هي 60%. بإدخال هذه الأرقام، سيكون إجمالي الربح 4,000$، حصتك منها (الربح الصافي) 2,400$، وحصة البنك 1,600$. إجمالي الرصيد المتوقع نهاية العام: 52,400$.</li>
                <li style={{ marginBottom: "8px" }}><strong>وديعة قصيرة الأجل (6 أشهر):</strong> استثمرت 100,000$ بمعدل ربح متوقع 6%، مع حصة عميل 50%. ولكن مدة الاستثمار 0.5 سنة (6 أشهر). سيكون صافي ربحك 1,500$ فقط.</li>
                <li style={{ marginBottom: "8px" }}><strong>المقارنة بين البنوك الإسلامية:</strong> بعض البنوك تقدم معدل ربح أعلى (مثلاً 10%) ولكن حصة عميل أقل (40%). بنوك أخرى تقدم معدل ربح 7% ولكن حصة العميل 80%. يمكنك استخدام الأداة لمعرفة أي العرضين سيوفر لك ربحاً صافياً أعلى في النهاية.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>تنبيه شرعي ومالي</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                معدل الربح في البنوك الإسلامية هو معدل <strong>"متوقع" (Expected Rate)</strong> وليس معدلاً مضموناً وثابتاً كما في البنوك الربوية. الأرباح الفعلية قد تزيد أو تنقص بناءً على أداء المحفظة الاستثمارية للبنك. هذه الحاسبة تقدم أرقاماً تقديرية بناءً على توقعات البنك لتسهيل اتخاذ قرارك المالي.
              </p>
            </>
          ) : (
            <>
              <h2>Islamic Deposit Calculator (Wakala & Mudarabah)</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
                Investment deposits in Islamic banks represent one of the most prominent ways to grow your savings in compliance with Sharia law. Unlike conventional fixed deposits that guarantee a fixed interest rate (Riba) which is prohibited in Islam, Islamic deposits operate on the principles of profit and loss sharing or fee-based investment mandates. They typically utilize core Sharia-compliant contracts such as Wakala Bil Istithmar (Investment Agency) and Mudarabah (Profit Sharing Partnership). The returns are generated from real, halal economic activities and underlying assets rather than from lending money at interest.
              </p>
              <h3 style={{ marginTop: "24px" }}>How Do Islamic Deposits Work?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                Under a <strong>Mudarabah contract</strong>, the depositor (Rab-ul-Mal) provides capital to the Islamic bank (Mudarib) to invest in Sharia-compliant portfolios. A pre-agreed profit-sharing ratio (PSR) is established (e.g., 80% to the depositor and 20% to the bank). If profits are generated, they are shared according to the PSR. If there is a loss, the depositor bears the financial loss, and the bank loses its effort and time, provided there is no negligence by the bank.
              </p>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                Under a <strong>Wakala contract</strong>, the depositor acts as the principal who appoints the bank as an agent (Wakil) to invest funds in a specific pool of assets to achieve a target expected profit rate. The bank may charge an agency fee. Any profit generated above the expected rate is often kept by the bank as an incentive or performance fee.
              </p>
              <h3 style={{ marginTop: "24px" }}>Why Use the Islamic Deposit Calculator?</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                The Islamic Deposit Calculator is an essential financial planning tool that helps you estimate your potential returns based on the indicative or expected profit rates announced by Islamic financial institutions. By inputting your initial deposit amount, the expected annual profit rate, the investment tenor (in months or years), and the profit payout frequency (monthly, quarterly, semi-annually, or at maturity), the calculator will instantly project your total estimated profit and final balance. This allows you to make informed decisions, compare offerings across different Islamic banks, and align your financial goals with your religious values, while understanding that actual returns may vary based on actual asset performance.
              </p>

              <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
              <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Annual Investment Deposit:</strong> You deposit $50,000 in an Islamic bank. The bank announces an expected investment return rate of 8% annually, with a customer profit-sharing ratio of 60%. Entering these numbers, the gross profit is $4,000. Your net profit is $2,400, and the bank takes $1,600. Total expected balance at year-end: $52,400.</li>
                <li style={{ marginBottom: "8px" }}><strong>Short-term Deposit (6 Months):</strong> You invest $100,000 with a 6% expected rate and a 50% customer share, but the duration is 0.5 years (6 months). Your expected net profit will be $1,500.</li>
                <li style={{ marginBottom: "8px" }}><strong>Comparing Islamic Banks:</strong> Bank A offers a high expected rate (10%) but a low customer share (40%). Bank B offers a lower rate (7%) but a higher customer share (80%). Use this tool to calculate exactly which offer yields a higher net profit for your deposit.</li>
              </ul>

              <h3 style={{ marginTop: "24px" }}>Sharia & Financial Disclaimer</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                In Islamic banking, the profit rate is an <strong>"Expected Rate"</strong> and is never guaranteed or fixed as it is in conventional interest-based (Riba) banking. Actual profits may fluctuate based on the performance of the bank's investment portfolio. This calculator provides estimations based on the bank's projected figures to assist your financial planning.
              </p>
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
            {
              question: "ما الفرق بين معدل الربح وحصة العميل؟",
              answer: "معدل الربح هو العائد الإجمالي الذي حققه استثمار أموالك في السوق. أما حصة العميل فهي النسبة المتفق عليها التي ستحصل أنت عليها من ذلك الربح الإجمالي، والباقي يأخذه البنك كأجر على إدارته للاستثمار."
            },
            {
              question: "هل الأرباح في الودائع الإسلامية مضمونة بنسبة 100%؟",
              answer: "في النظام المصرفي الإسلامي، لا يجوز ضمان رأس المال أو الأرباح في عقود المضاربة أو الوكالة بالاستثمار، حيث يجب أن يتحمل المستثمر مخاطر النشاط التجاري. ومع ذلك، تقوم البنوك الإسلامية بإدارة المخاطر بدقة عالية وتكوين مخصصات احتياطية (مثل احتياطي مخاطر الاستثمار واحتياطي معدل الأرباح) للحفاظ على استقرار العوائد وتقليل احتمالية الخسارة."
            },
            {
              question: "ما الفرق بين الوديعة الإسلامية والوديعة البنكية التقليدية؟",
              answer: "الوديعة التقليدية تعتمد على الفائدة (الربا) حيث يُقرض العميل ماله للبنك مقابل عائد ثابت ومضمون، وهو محرم شرعاً. أما الوديعة الإسلامية فتعتمد على استثمار الأموال في أنشطة اقتصادية حقيقية وحلال، ويتم توزيع الأرباح بناءً على الأداء الفعلي للاستثمارات إما عبر المشاركة في الربح والخسارة (المضاربة) أو عبر وكالة بالاستثمار بأجر."
            },
            {
              question: "كيف يتم تحديد نسبة الربح المتوقعة للوديعة؟",
              answer: "تحدد البنوك الإسلامية نسبة الربح المتوقعة بناءً على الأداء التاريخي لصناديقها الاستثمارية والتوقعات الاقتصادية المستقبلية للأصول المدارة. يتم الإعلان عن هذه النسب كعوائد استرشادية، ويتم حساب العائد الفعلي وتوزيعه في نهاية كل فترة استثمارية متفق عليها."
            }
          ] : [
            {
              question: "What is the difference between Expected Rate and Customer Share?",
              answer: "The Expected Rate is the total ROI generated by the investment in the market. The Customer Share is the pre-agreed percentage of that total profit that you will receive, while the bank takes the rest as a management fee."
            },
            {
              question: "Are returns on Islamic deposits 100% guaranteed?",
              answer: "In the Islamic banking system, neither the principal nor the profits can be strictly guaranteed in Mudarabah or Wakala contracts, as the investor must share the commercial risk. However, Islamic banks employ strict risk management frameworks and maintain provisions (such as Investment Risk Reserve and Profit Equalization Reserve) to stabilize returns and minimize the likelihood of capital loss."
            },
            {
              question: "What is the difference between an Islamic deposit and a conventional fixed deposit?",
              answer: "A conventional fixed deposit is based on a lending-borrowing relationship with a guaranteed fixed interest rate (Riba), which is prohibited in Islam. An Islamic deposit involves investing funds in real, Sharia-compliant economic activities, and returns are generated from actual asset performance, utilizing structures like profit-and-loss sharing (Mudarabah) or agency investment (Wakala)."
            },
            {
              question: "How is the expected profit rate determined for an Islamic deposit?",
              answer: "Islamic banks determine indicative profit rates based on the historical performance of their investment pools and future economic forecasts of the underlying assets. These rates are published as guidelines, while actual returns are calculated and distributed at the end of each agreed-upon investment period."
            }
          ]}
        />
      </div>
    </>
  );
}
