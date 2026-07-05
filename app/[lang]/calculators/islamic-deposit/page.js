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
      <div className="container">
        <IslamicDepositCalculatorClient dict={dict} lang={lang} />
        
        <article className="card" style={{ marginTop: "20px", lineHeight: "1.8", padding: "20px" }}>
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
            </>
          )}
        </article>

        <FAQSchema
          faqs={isAr ? [
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
        
        <div style={{ marginTop: "30px" }}>
          <DisclaimerBox type="religion" lang={lang} />
        </div>
      </div>
    </>
  );
}
