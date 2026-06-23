"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function MudarabahCalculatorClient() {
  const { lang, dict } = useLanguage();
  const t = dict.mudarabah;

  const [capital, setCapital] = useState(50000);
  const [revenue, setRevenue] = useState(80000);
  const [expenses, setExpenses] = useState(20000);
  const [investorShare, setInvestorShare] = useState(60); 

  const netProfit = revenue - expenses;
  const isLoss = netProfit < 0;
  
  const investorProfit = !isLoss ? netProfit * (investorShare / 100) : 0;
  const managerProfit = !isLoss ? netProfit * ((100 - investorShare) / 100) : 0;

  const investorFinal = !isLoss ? capital + investorProfit : Math.max(0, capital + netProfit);
  
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
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>{lang === "ar" ? "تفاصيل المشروع" : "Project Details"}</h3>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{t.capital}</label>
            <NumericFormat className="input" value={capital} onValueChange={v => setCapital(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label className="label">{lang === "ar" ? "إجمالي إيرادات المشروع ($)" : "Total Project Revenue ($)"}</label>
            <NumericFormat className="input" value={revenue} onValueChange={v => setRevenue(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label className="label">{lang === "ar" ? "إجمالي مصروفات المشروع ($)" : "Total Project Expenses ($)"}</label>
            <NumericFormat className="input" value={expenses} onValueChange={v => setExpenses(v.floatValue || 0)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{lang === "ar" ? "نسبة توزيع الأرباح المتفق عليها" : "Agreed Profit Sharing Ratio"}</h3>
          <div>
            <label className="label">{lang === "ar" ? `نسبة المستثمر (رب المال): ${investorShare}%` : `Investor (Rabb-ul-Mal) Share: ${investorShare}%`}</label>
            <input type="range" min="1" max="99" value={investorShare} onChange={e => setInvestorShare(Number(e.target.value))} style={{ width: "100%" }} />
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {lang === "ar" ? `نسبة المضارب (مدير المشروع): ${100 - investorShare}%` : `Manager (Mudarib) Share: ${100 - investorShare}%`}
            </p>
          </div>
        </div>

        <div>
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{lang === "ar" ? "النتيجة الصافية للمشروع" : "Net Project Result"}</div>
            <div className="result-value" style={{ color: isLoss ? "var(--danger)" : "var(--success)" }}>
              {isLoss ? "-" : "+"}{fmt(Math.abs(netProfit))}
            </div>
          </div>
          
          <div className="grid-2" style={{ marginBottom: "16px" }}>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.partner_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: isLoss ? "var(--text-muted)" : "var(--primary)" }}>{fmt(investorProfit)}</div>
              {isLoss && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "يتحمل كامل الخسارة المالية" : "Bears all financial loss"}</p>}
            </div>
            <div className="result-box" style={{ padding: "16px" }}>
              <div className="result-label">{t.manager_profit}</div>
              <div className="result-value" style={{ fontSize: "1.2rem", color: isLoss ? "var(--text-muted)" : "var(--accent)" }}>{fmt(managerProfit)}</div>
              {isLoss && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "يخسر وقته وجهده فقط" : "Loses their time and effort"}</p>}
            </div>
          </div>

          <div className="card" style={{ padding: "16px", textAlign: "center", background: "var(--bg)" }}>
            <div className="result-label">{lang === "ar" ? "رأس المال المعاد للمستثمر" : "Investor's Final Capital Returned"}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>{fmt(investorFinal)}</div>
            {isLoss && investorFinal === 0 && <p style={{ fontSize: "0.8rem", color: "var(--danger)", marginTop: "4px" }}>{lang === "ar" ? "مسؤولية المستثمر محدودة بحدود رأس المال" : "Investor liability is strictly capped at capital"}</p>}
          </div>

          <div className="card" style={{ marginTop: "16px", padding: "16px", border: "1px solid rgba(245, 158, 11, 0.3)", background: "rgba(245, 158, 11, 0.05)" }}>
            <h4 style={{ color: "var(--warning)", marginBottom: "4px" }}>{t.loss_warning_title}</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5" }}>{t.loss_warning_desc}</p>
          </div>
        </div>
      </div>

      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>الدليل الشامل لشراكة المضاربة في التمويل الإسلامي</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              المضاربة هي عقد شراكة خاصة في التمويل الإسلامي يقدم فيه أحد الطرفين رأس المال بالكامل (ويُسمى رب المال أو المستثمر)، بينما يقدم الطرف الآخر الخبرة والعمل (ويُسمى المضارب أو الشريك العامل). وتُعد المضاربة واحدة من أرقى صيغ التمويل القائم على الملكية وحقوق الملكية، حيث تحول العلاقة بين أطراف المعاملة من علاقة دائن ومدين تقليدية إلى شراكة حقيقية تنهض على تقاسم المخاطر والمكاسب.
            </p>

            <h3 style={{ marginTop: "24px" }}>كيفية عمل المضاربة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              على عكس حسابات الادخار أو القروض التقليدية التي تضمن عائداً ثابتاً بغض النظر عن نجاح أو خسارة المشروع، تعتمد المضاربة بشكل كامل على النتائج الفعلية للاستثمار:
            </p>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>رأس المال:</strong> يقدم المستثمر 100% من السيولة المالية. ولا يساهم الشريك العامل (المضارب) بأي نقد، بل يقتصر دوره على تقديم وقته وجهده وإدارته الفنية للمشروع.</li>
              <li><strong>نسبة توزيع الأرباح:</strong> يتفق الطرفان قبل بدء العمل على نسبة توزيع الأرباح الصافية (مثلاً: 60% للمستثمر، 40% للمضارب). وتطبق هذه النسبة على الأرباح الصافية المحققة فقط، وليس على إجمالي الإيرادات أو رأس المال.</li>
              <li><strong>توزيع الخسائر:</strong> في حال وقوع خسارة مالية (خارجة عن إرادة المضارب ودون تقصير منه)، يتحمل المستثمر 100% من الخسارة المالية من رأس ماله. بينما يخسر المضارب جهده ووقته ولا يطالب بتعويض رأس المال الضائع للطرف الأول.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>المضاربة في الخدمات المصرفية المعاصرة</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              اليوم، تُستخدم المضاربة على نطاق واسع في حسابات الاستثمار والادخار بالمصارف الإسلامية. فعند فتح حساب استثماري بالمضاربة، تكون أنت (العميل) هو المستثمر (رب المال)، والبنك هو المضارب (مدير الاستثمار). يقوم البنك بتجميع أموال المودعين واستثمارها في مشاريع استثمارية حلال (مثل تمويلات المرابحة أو الصكوك). وفي نهاية الحول، يتم احتساب الأرباح الفعلية وتوزيعها على المودعين بناءً على النسب المتفق عليها مسبقاً.
            </p>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول المضاربة</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>هل يمكن ضمان رأس المال في عقد المضاربة؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>لا يجوز شرعاً ضمان رأس المال للمستثمر في عقد المضاربة، لأن ضمان رأس المال يحول العقد تلقائياً إلى قرض ربوي مضمون بالفائدة. يجب أن يكون رأس المال معرضاً للمخاطر لتصح أرباحه. ومع ذلك، تتبع المصارف الإسلامية سياسات حذرة للغاية وتقتطع احتياطيات خاصة للحد من مخاطر الخسارة للمودعين.</p>

              <h4 style={{ fontSize: "1.1rem" }}>ماذا لو ثبت تقصير أو إهمال المضارب (مدير الاستثمار)؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>حكم أن المستثمر يتحمل كامل الخسارة مقيد بكون الخسارة ناتجة عن تقلبات السوق الطبيعية. أما إذا ثبت بالدليل ارتكاب المضارب لخطأ فادح، أو إهمال متعمد، أو مخالفة لشروط التعاقد المحددة، فإنه يصبح ضامناً لرأس المال وملزماً برده بالكامل للمستثمر.</p>
            </div>
          </>
        ) : (
          <>
            <h2>The Complete Guide to Mudarabah (Profit Sharing)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Mudarabah is a specialized partnership in Islamic finance where one party provides the capital (the Rab-ul-Mal or Investor) and the other party provides the expertise and labor (the Mudarib or Working Partner). It is one of the purest forms of Islamic equity financing, fundamentally shifting the dynamic from a lender-borrower relationship to a genuine partnership based on shared risk and reward.
            </p>

            <h3 style={{ marginTop: "24px" }}>How Mudarabah Works</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Unlike a conventional interest-bearing savings account or loan where the return is guaranteed regardless of the business's performance, Mudarabah is entirely dependent on the actual profit generated by the enterprise.
            </p>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>The Capital:</strong> The investor provides 100% of the financial capital. The working partner contributes zero financial capital, only their time, effort, and business acumen.</li>
              <li><strong>Profit Sharing Ratio (PSR):</strong> Before the business begins, both parties must agree on a Profit Sharing Ratio. This ratio applies strictly to the net profit.</li>
              <li><strong>Loss Distribution:</strong> In the event of a financial loss (not caused by negligence), the Investor bears 100% of the financial loss, losing a portion or all of their capital. The Working Partner loses the value of their time and effort.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>Is the principal amount guaranteed in Mudarabah?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>No. Guaranteeing the principal amount would turn the contract into a conventional loan (Riba). In a true Mudarabah, your capital is at risk.</p>

              <h4 style={{ fontSize: "1.1rem" }}>What if the Mudarib (Working Partner) is negligent?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>If it is proven that the Mudarib committed fraud, negligence, or breached the contract terms, the Mudarib becomes liable to refund the capital to the investor.</p>
            </div>
          </>
        )}
      </article>
    </div>
  );
}
