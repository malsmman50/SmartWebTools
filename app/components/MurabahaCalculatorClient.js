"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";

export default function MurabahaCalculatorClient({ lang, dict, initialValues, ...props }) {
  
  const t = dict.murabaha;

  const [cost, setCost] = useState(initialValues?.principal ? parseFloat(initialValues.principal) : 100000);
  const [markupPercent, setMarkupPercent] = useState(15);
  const [months, setMonths] = useState(initialValues?.years ? parseInt(initialValues.years) * 12 : 60);
  const [downPayment, setDownPayment] = useState(0);

  const numCost = Number(cost) || 0;
  const numDownPayment = Number(downPayment) || 0;
  const numMarkup = Number(markupPercent) || 0;
  const numMonths = Number(months) || 0;

  const financedAmount = Math.max(0, numCost - numDownPayment);
  const profitAmount = financedAmount > 0 ? financedAmount * (Math.max(0, numMarkup) / 100) : 0;
  const totalDeferredBalance = financedAmount + profitAmount;
  const trueSellingPrice = numCost + profitAmount;
  const monthlyInstallment = numMonths > 0 && totalDeferredBalance > 0 ? totalDeferredBalance / numMonths : 0;

  const fmt = (n) => {
    if (lang === "ar") {
      return `${n.toLocaleString("en-US")} $`;
    }
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div style={{ marginTop: "12px" }}>
          <Link href={`/${lang}/methodology#murabaha`} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: "600", fontSize: "0.9rem" }}>
            {lang === "ar" ? "📖 اقرأ المنهجية الشرعية ومصادر الحساب لهذه الحاسبة" : "📖 Read Shariah methodology & sources for this calculator"}
          </Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.asset_cost}</label>
            <NumericFormat className="input" value={cost} onValueChange={v => setCost(v.floatValue === undefined ? '' : v.floatValue)} allowNegative={false} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.down_payment}</label>
            <NumericFormat className="input" value={downPayment} onValueChange={v => setDownPayment(v.floatValue === undefined ? '' : v.floatValue)} allowNegative={false} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.profit_margin}</label>
            <input type="number" min="0" step="0.1" className="input" value={markupPercent} onChange={e => setMarkupPercent(e.target.value)} />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>{t.markup_note}</p>
          </div>
          <div>
            <label className="label">{t.term}</label>
            <input type="number" min="1" step="1" className="input" value={months} onChange={e => setMonths(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.installment}</div>
            <div className="result-value" style={{ color: "var(--primary)" }}>{fmt(monthlyInstallment)}</div>
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">{t.selling_price}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(trueSellingPrice)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">{t.deferred_balance}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(totalDeferredBalance)}</div>
            </div>
          </div>
          <div className="result-box" style={{ marginTop: "16px" }}>
            <div className="result-label">{t.fixed_profit}</div>
            <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--success)" }}>{fmt(profitAmount)}</div>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>الدليل الشامل للتمويل الإسلامي بالمرابحة</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              تمويل المرابحة هو أحد أكثر صيغ التمويل الإسلامي شيوعاً واستخداماً حول العالم لشراء العقارات، المركبات، والآلات التجارية دون الوقوع في شبهة المعاملات الربوية وفائدة القروض التقليدية. فبينما يرتكز القرض التقليدي على إقراض المال مقابل فائدة متراكمة بمرور الزمن، ترتكز المرابحة على قيام الممول بشراء السلعة وتملكها ثم إعادة بيعها لك بهامش ربح متفق عليه ومحدد سلفاً، لتقوم أنت بدفع قيمتها على أقساط مؤجلة.
            </p>

            <h3 style={{ marginTop: "24px" }}>خطوات عملية المرابحة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              تتسم عملية التمويل بالمرابحة بالشفافية الكاملة وتعتمد على أصل ملموس وحقيقي:
            </p>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>تحديد الأصل:</strong> يقوم العميل باختيار العقار أو السيارة التي يود شرائها من البائع مباشرة.</li>
              <li><strong>شراء البنك للأصل:</strong> يقوم البنك الإسلامي بشراء الأصل بشكل مباشر من البائع وتملك حيازته شرعاً وقانوناً.</li>
              <li><strong>البيع للعميل:</strong> يبيع البنك الأصل للعميل بسعر التكلفة الأصلية مضافاً إليه هامش ربح محدد وواضح متفق عليه.</li>
              <li><strong>الأقساط الثابتة:</strong> يقوم العميل بسداد إجمالي المبلغ (التكلفة + الأرباح) على أقساط شهرية متساوية على مدى فترة متفق عليها.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>الفرق بين المرابحة والقروض العقارية التقليدية</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              يكمن الاختلاف الجوهري في طبيعة العقد القانونية والشرعية؛ فالتمويل العقاري التقليدي هو عقد إقراض للمال بفائدة مركبة متراكمة، وتكون فيه السلعة مجرد رهن. وإذا تأخرت في السداد، تتراكم الفوائد العقابية وتتضاعف ديونك. أما المرابحة فهي عقد بيع تجاري، وتكون أرباح البنك فيه ثابتة ومحددة منذ اليوم الأول ولا يجوز قانوناً ولا شرعاً زيادتها أو احتساب فائدة مركبة على التأخير (قد تفرض البنوك غرامة للتبرع بها للجمعيات الخيرية للحد من المماطلة ولكن لا تدخل ضمن أرباح البنك).
            </p>

            <h3 style={{ marginTop: "24px" }}>حساب هامش ربح المرابحة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              على عكس القروض التقليدية التي تحتسب فائدتها على الرصيد المتناقص وتتراكم، يُحتسب ربح المرابحة كنسبة مسطحة وثابتة تضاف إلى أصل التمويل في البداية. تتيح لك حاسبة المرابحة الخاصة بنا إدخال تكلفة الأصل، وقيمة الدفعة الأولى، وهامش الربح السنوي المتفق عليه لتظهر لك فوراً قيمة القسط الشهري الثابت وإجمالي الأرباح المستحقة للممول.
            </p>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول المرابحة</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>هل هامش ربح المرابحة يماثل الفائدة الربوية؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>لا. حتى وإن استعانت البنوك الإسلامية بمؤشرات الفائدة العالمية (مثل LIBOR أو SOFR) لتسعير أرباحها لكي تظل منافسة في السوق، فإن الطبيعة التعاقدية هي عقد بيع وتجارة وليس قرض نقدي. والربح الناتج عن التجارة حلال بنص القرآن، بينما الربح الناتج عن إقراض المال (الربا) محرم.</p>

              <h4 style={{ fontSize: "1.1rem" }}>ماذا يحدث في حال رغبتي في السداد المبكر لعقد المرابحة؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>نظراً لأن أرباح المرابحة مضافة بالكامل إلى إجمالي الدين منذ البداية، يعتمد السداد المبكر على مبدأ فقهي يُعرف بـ (الإبراء أو ضع وتعجل). تقوم معظم البنوك الإسلامية طواعية بخصم الأرباح غير المكتسبة للسنوات المتبقية وإبراء العميل منها، رغم عدم إلزام العقد بذلك قانونياً مسبقاً.</p>

              <h4 style={{ fontSize: "1.1rem" }}>هل يمكن استخدام المرابحة للحصول على قروض نقدية شخصية؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>لا. تتطلب المرابحة سلعة حقيقية وملموسة (عقار، سيارة، بضائع). ولا يجوز استخدامها للحصول على سيولة نقدية مباشرة دون أصل حقيقي لأنها بذلك تصبح حيلة لتوليد فائدة ربوية على المال. وتستخدم المصارف الإسلامية صيغاً أخرى مثل التورق للسيولة النقدية وفق ضوابط محددة.</p>
            </div>
          </>
        ) : (
          <>
            <h2>The Complete Guide to Murabaha (Islamic Financing)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Murabaha is one of the most common modes of Islamic financing used globally to purchase homes, vehicles, and business equipment without resorting to interest-based (Riba) loans. In a conventional loan, a bank lends you money and charges compounding interest over time. In a Murabaha transaction, the financier purchases the actual asset and sells it to you at a pre-agreed profit margin. You then pay for the asset in fixed monthly installments.
            </p>

            <h3 style={{ marginTop: "24px" }}>How Murabaha Works</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The process of Murabaha is entirely transparent and based on a tangible asset. Here are the typical steps:
            </p>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>Asset Identification:</strong> You identify the property or vehicle you wish to buy.</li>
              <li><strong>Purchase by Bank:</strong> The Islamic bank purchases the asset directly from the seller and takes ownership.</li>
              <li><strong>Sale to Customer:</strong> The bank sells the asset to you at the original cost plus a transparent, mutually agreed profit margin.</li>
              <li><strong>Fixed Installments:</strong> You pay the total price (Cost + Profit) over a set period (e.g., 5 years) in equal monthly installments.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Murabaha vs. Conventional Mortgage</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The key difference lies in the nature of the contract. A conventional mortgage is a money-lending contract where the asset is just collateral. If you default or miss payments, the bank charges penalty interest, compounding your debt. A Murabaha is a trading contract. The profit is fixed on day one. If you delay a payment, the bank cannot charge you additional profit or interest.
            </p>

            <h3 style={{ marginTop: "24px" }}>Calculating the Profit Margin</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Unlike a conventional APR that compounds over the remaining balance, the profit margin in a Murabaha contract is often calculated upfront as a flat rate against the financed amount. Our Murabaha calculator allows you to input the cost of the asset, your down payment, and the agreed profit margin to instantly see your fixed monthly installment and the exact profit the financier will earn.
            </p>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>Is the Murabaha profit margin the same as interest?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>No. While Islamic banks often benchmark their profit rates against market interest rates to remain competitive, the underlying mechanism is a sale, not a loan. Profit from trade is Halal, whereas profit from lending money (Riba) is Haram.</p>

              <h4 style={{ fontSize: "1.1rem" }}>What happens if I want to pay off a Murabaha early?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Since the profit was fixed and added to the total debt upfront, early settlement relies on a concept called <i>Ibra'</i> (rebate). Most Islamic banks will voluntarily grant a rebate on the unearned profit for the remaining years.</p>

              <h4 style={{ fontSize: "1.1rem" }}>Can Murabaha be used for personal cash loans?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>No. Murabaha requires a tangible asset (like a house, car, or commodities). It cannot be used to simply generate cash liquidity.</p>
            </div>
          </>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": lang === "ar" ? [
          {
            "@type": "Question",
            "name": "هل هامش ربح المرابحة يماثل الفائدة الربوية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا. حتى وإن استعانت البنوك بالمؤشرات العالمية، فإن العقد هو بيع تجارة حلال وليس قرض نقدي يولد ربا."
            }
          },
          {
            "@type": "Question",
            "name": "ماذا يحدث في حال رغبتي في السداد المبكر لعقد المرابحة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "يعتمد السداد المبكر على مبدأ الإبراء (الخصم الاختياري للربح المتبقي) والذي تقره معظم المصارف الإسلامية."
            }
          },
          {
            "@type": "Question",
            "name": "هل يمكن استخدام المرابحة للحصول على قروض نقدية شخصية؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا. تشترط المرابحة وجود أصول ملموسة للبيع والشراء، ولا يمكن تقديم النقد المباشر بها."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Is the Murabaha profit margin the same as interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. While banks benchmark rates to remain competitive, the underlying mechanism is a sale, not a loan. Profit from trade is Halal, whereas profit from lending money is Haram."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I want to pay off a Murabaha early?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early settlement relies on a concept called Ibra' (rebate). Most Islamic banks will voluntarily grant a rebate on the unearned profit for the remaining years."
            }
          },
          {
            "@type": "Question",
            "name": "Can Murabaha be used for personal cash loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Murabaha requires a tangible asset (like a house, car, or commodities). It cannot be used to simply generate cash liquidity."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
