"use client";

import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function ZakatCalculator() {
  const { lang, dict } = useLanguage();
  const t = dict.zakat;

  const [cash, setCash] = useState(5000);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [debts, setDebts] = useState(0);
  const [nisab, setNisab] = useState(0);
  
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [isManualNisab, setIsManualNisab] = useState(false);

  useEffect(() => {
    const fetchNisab = async () => {
      try {
        const res = await fetch("/api/gold", {
          headers: { "Accept": "application/json" },
          signal: AbortSignal.timeout(4000)
        });
        if (!res.ok) throw new Error("API Response not OK");
        const data = await res.json();
        
        if (!data.pricePerOunce) {
          throw new Error("Missing pricePerOunce in response");
        }

        const goldPricePerOz = data.pricePerOunce;
        const goldPricePerGram = goldPricePerOz / 31.1035;
        const nisabGold = goldPricePerGram * 85; 
        setNisab(Math.round(nisabGold));
        setApiStatus("success");
      } catch (err) {
        console.warn("Failed to fetch Nisab:", err);
        setApiStatus("error");
        setIsManualNisab(true);
      }
    };
    fetchNisab();
  }, []);

  const totalWealth = cash + gold + silver + business;
  const eligibleWealth = totalWealth - debts;
  const isEligible = eligibleWealth >= nisab;
  const zakatDue = isEligible ? eligibleWealth * 0.025 : 0;

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
          <h3 style={{ marginBottom: "16px" }}>{t.assets_title}</h3>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-cash" className="label">{t.cash_label}</label>
            <NumericFormat id="zakat-cash" className="input" value={cash} onValueChange={v => setCash(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-gold" className="label">{t.gold_label}</label>
            <NumericFormat id="zakat-gold" className="input" value={gold} onValueChange={v => setGold(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="zakat-silver" className="label">{t.silver_label}</label>
            <NumericFormat id="zakat-silver" className="input" value={silver} onValueChange={v => setSilver(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="zakat-business" className="label">{t.business_label}</label>
            <NumericFormat id="zakat-business" className="input" value={business} onValueChange={v => setBusiness(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{t.liabilities_title}</h3>
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="zakat-debts" className="label">{t.debts_label}</label>
            <NumericFormat id="zakat-debts" className="input" value={debts} onValueChange={v => setDebts(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
          </div>

          <h3 style={{ marginBottom: "16px" }}>{t.threshold_title}</h3>
          <div style={{ padding: "16px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            {apiStatus === "loading" && <p style={{ color: "var(--text-muted)" }}>{t.fetching_nisab}</p>}
            
            {apiStatus === "success" && !isManualNisab && (
              <div>
                <p style={{ color: "var(--success)", marginBottom: "8px", fontWeight: 600 }}>{t.live_nisab_loaded} {fmt(nisab)}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px" }}>{t.nisab_description}</p>
                <button onClick={() => setIsManualNisab(true)} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "4px 8px" }}>{t.manual_nisab_btn}</button>
              </div>
            )}

            {(apiStatus === "error" || isManualNisab) && (
              <div>
                {apiStatus === "error" && (
                  <p style={{ color: "var(--danger)", fontSize: "0.9rem", marginBottom: "12px" }}>{t.api_failed}</p>
                )}
                <label htmlFor="zakat-manual-nisab" className="label">{t.manual_nisab_label}</label>
                <NumericFormat id="zakat-manual-nisab" className="input" value={nisab} onValueChange={v => setNisab(v.floatValue || 0)} isAllowed={(v) => v.floatValue === undefined || (v.floatValue >= 0 && v.floatValue <= 1e12)} thousandSeparator={true} prefix="$" />
                {apiStatus === "success" && (
                  <button onClick={() => setIsManualNisab(false)} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "4px 8px", marginTop: "12px" }}>{t.use_live_nisab_btn}</button>
                )}
              </div>
            )}
          </div>
        </div>

        <div aria-live="polite">
          <div className="result-box" style={{ marginBottom: "16px" }}>
            <div className="result-label">{t.zakat_due}</div>
            <div className="result-value" style={{ color: isEligible ? "var(--success)" : "var(--text-muted)" }}>
              {isEligible ? fmt(zakatDue) : "$0.00"}
            </div>
            {isEligible ? (
              <p style={{ color: "var(--success)", marginTop: "8px", fontSize: "0.9rem" }}>{t.status_eligible}</p>
            ) : (
              <p style={{ color: "var(--danger)", marginTop: "8px", fontSize: "0.9rem" }}>{t.status_not_eligible}</p>
            )}
          </div>
          <div className="grid-2">
            <div className="result-box">
              <div className="result-label">{t.total_wealth}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--text)" }}>{fmt(totalWealth)}</div>
            </div>
            <div className="result-box">
              <div className="result-label">{t.net_assets}</div>
              <div className="result-value" style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{fmt(eligibleWealth)}</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: "16px", padding: "20px" }}>
            <h4 style={{ marginBottom: "12px" }}>{t.notes_title}</h4>
            <ul style={{ paddingLeft: lang === "ar" ? "0" : "20px", paddingRight: lang === "ar" ? "20px" : "0", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "6px" }}>{t.note1}</li>
              <li style={{ marginBottom: "6px" }}>{t.note2}</li>
              <li style={{ marginBottom: "6px" }}>{t.note3}</li>
              <li style={{ marginBottom: "6px" }}>{t.note4}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Content Expansion (800+ words) */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>الدليل الشامل لحساب الزكاة عبر الإنترنت</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              الزكاة هي الركن الثالث من أركان الإسلام الخمسة، وهي عبادة مالية تطهر وتزكي أموال المسلمين. وبخلاف الضرائب التقليدية، فإن الزكاة لها بعد روحي واجتماعي يضمن التوزيع العادل للثروة في المجتمع. تم تصميم حاسبة الزكاة المجانية والآمنة هذه لمساعدتك على تحديد مقدار الزكاة الواجبة عليك بدقة وسرية تامة دون إرسال بياناتك لأي خادم.
            </p>

            <h3 style={{ marginTop: "24px" }}>1. فهم حد النصاب الشرعي</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              قبل حساب مقدار زكاتك، يجب أولاً تحديد ما إذا كانت أموالك قد بلغت الحد الأدنى الذي تجب فيه الزكاة، وهو ما يُعرف بـ <strong>النصاب</strong>. وقد حدد نبينا محمد صلى الله عليه وسلم النصاب بما يعادل 85 غراماً من الذهب الخالص أو 595 غراماً من الفضة الخالصة.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              ونظراً لتقلب أسعار العملات الورقية باستمرار، تحاول حاسبتنا تلقائياً جلب أسعار الذهب العالمية الفورية لتحديد قيمة النصاب بدقة. وإذا تعذر الاتصال بالإنترنت، يمكنك إدخال قيمة الذهب يدوياً (حاصل ضرب 85 جراماً بسعر غرام الذهب عيار 24 في بلدك). ولا تجب عليك الزكاة إلا إذا بلغت أموالك النصاب أو تجاوزته وحال عليها الحول (سنة قمرية كاملة، حوالي 354 يوماً).
            </p>

            <h3 style={{ marginTop: "24px" }}>2. ما هي الأموال والأصول الخاضعة للزكاة؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              لا تجب الزكاة في كل ما تملك؛ فمسكنك الشخصي، وسيارتك الخاصة، وأثاث بيتك لا زكاة فيها. أما الأموال التي تجب فيها الزكاة فهي النامية أو القابلة للنماء، ومنها:
            </p>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>السيولة النقدية والمدخرات:</strong> الأموال المودعة في الحسابات البنكية، أو النقد الموجود في المنزل أو المحافظ الرقمية.</li>
              <li><strong>الذهب والفضة:</strong> السبائك، العملات الذهبية، والمجوهرات المعدة للادخار أو المتاجرة (أما الحلي المعد للزينة ففيه خلاف بين الفقهاء).</li>
              <li><strong>البضائع التجارية:</strong> السلع والمنتجات التي تم شراؤها بنية إعادة بيعها لتحقيق ربح.</li>
              <li><strong>الأسهم والاستثمارات:</strong> إذا كانت للمضاربة فتزكى بكامل قيمتها السوقية، أما إذا كانت للاستثمار طويل الأجل فتزكى الأصول الزكوية للشركة فقط.</li>
              <li><strong>العملات الرقمية:</strong> يرى معظم الفقهاء المعاصرين وجوب الزكاة فيها باعتبارها أموالاً ذات قيمة مالية.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>3. خصم الالتزامات والديون</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              يتميز الإسلام بالعدل والرحمة؛ لذا يُسمح لك بخصم الديون العاجلة والالتزامات المستحقة فوراً قبل احتساب الوعاء الزكوي. ويشمل ذلك الفواتير المستحقة حالياً، وإيجار الشهر القادم، والقروض الشخصية قصيرة الأجل المستحقة. أما القروض طويلة الأجل (مثل الأقساط المستقبلية لتمويل عقاري بالمرابحة يمتد لسنوات) فلا تُخصم بالكامل، وإنما يُخصم فقط القسط المستحق للعام الحالي لكي لا تسقط الزكاة عن الأثرياء بغير وجه حق.
            </p>

            <h3 style={{ marginTop: "24px" }}>4. نسبة الزكاة (2.5%)</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              بمجرد جمع الأصول الزكوية وخصم الالتزامات المستحقة، ستحصل على صافي أموالك الخاضعة للزكاة. فإذا كان هذا المبلغ مساوياً للنصاب أو أكبر منه، فإنك تضربه بنسبة 2.5% (أو 0.025) لاستخراج مقدار الزكاة الواجبة، وهي تعادل تماماً (ربع العشر) من مجموع صافي أموالك.
            </p>

            <h3 style={{ marginTop: "24px" }}>لماذا تستخدم حاسبتنا المحلية (Client-Side)؟</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              سرية بياناتك المالية أمر بالغ الأهمية. ترسل العديد من المواقع أرقامك المالية لخوادمها لتقوم بالعملية الحسابية. أما حاسبة SmartCalcTools فتقوم بجميع العمليات الرياضية محلياً داخل جهازك 100%. لا نجمع، ولا نتتبع، ولا نطلع على بياناتك على الإطلاق، مما يجعلها الخيار الأكثر أماناً وموثوقية لحساب فريضتك.
            </p>

            <h3 style={{ marginTop: "24px" }}>الأسئلة الشائعة حول الزكاة</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>هل تجب الزكاة في أموال التقاعد والادخار طويل الأجل؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>إذا كان بإمكانك سحب هذه الأموال والتصرف فيها اليوم (حتى لو ترتبت عليها غرامة)، فتجب الزكاة على المبلغ الصافي القابل للسحب. أما إن كانت مجمدة قانونياً ولا يمكن الوصول إليها إلا عند سن معينة، فلا تجب زكاتها إلا عند قبضها.</p>

              <h4 style={{ fontSize: "1.1rem" }}>هل أعتمد نصاب الذهب أم نصاب الفضة؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>تاريخياً كان النصابان متساويين، أما اليوم فالنصاب الفضي أرخص بكثير. وينصح بعض العلماء باستخدام نصاب الفضة لأنه أحظ للفقراء (حيث تجب الزكاة على عدد أكبر من الناس). ومع ذلك، فإن نصاب الذهب صحيح ومستقر ومعتمد لدى معظم الهيئات الفقهية المعاصرة.</p>

              <h4 style={{ fontSize: "1.1rem" }}>متى تجب الزكاة؟</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>تجب الزكاة فوراً عند مرور حول هجري كامل (354 يوماً) من اليوم الذي بلغت فيه أموالك النصاب لأول مرة. ويفضل الكثير من المسلمين إخراجها في شهر رمضان طمعاً في مضاعفة الأجر والثواب.</p>
            </div>
          </>
        ) : (
          <>
            <h2>The Complete Guide to Calculating Zakat Online</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              Zakat is one of the Five Pillars of Islam, representing a mandatory charitable contribution that purifies a Muslim's wealth. Unlike a conventional tax, Zakat is deeply spiritual and ensures the equitable distribution of wealth within society. This free online Zakat calculator is designed to help you determine your exact obligation accurately and privately.
            </p>

            <h3 style={{ marginTop: "24px" }}>1. Understanding the Nisab Threshold</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Before calculating how much you owe, you must determine if you meet the minimum threshold of wealth known as <strong>Nisab</strong>. The Nisab was established by the Prophet Muhammad (PBUH) as the equivalent of 85 grams of pure gold or 595 grams of pure silver.
            </p>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Because the value of fiat currencies fluctuates constantly, our calculator attempts to fetch live global market prices for gold to establish an accurate Nisab. If the live feed is unavailable, you can manually input the value of 85 grams of gold in your local currency. You only owe Zakat if your total net wealth has equaled or exceeded this Nisab amount for one full lunar year (Hawl).
            </p>

            <h3 style={{ marginTop: "24px" }}>2. What Assets are Zakatable?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Not everything you own is subject to Zakat. For instance, the house you live in, the car you drive, and your personal furniture are exempt. The assets that are subject to Zakat include:
            </p>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", marginTop: "8px" }}>
              <li><strong>Cash & Savings:</strong> Money in your bank accounts, physical cash at home, or digital wallets.</li>
              <li><strong>Gold & Silver:</strong> Jewelry, coins, or bullion. (Note: The ruling on jewelry worn daily varies by madhab).</li>
              <li><strong>Business Inventory:</strong> Goods purchased with the express intention of reselling them for profit.</li>
              <li><strong>Stocks & Shares:</strong> If held for trading, the full market value is Zakatable. If held for long-term dividends, Zakat is paid on the company's Zakatable assets.</li>
              <li><strong>Cryptocurrency:</strong> Most modern scholars consider cryptocurrencies to be Zakatable wealth.</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>3. Deducting Liabilities</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Islam aims for fairness. You are allowed to deduct immediate, pressing debts before calculating your Zakat. This includes utility debts due immediately, the upcoming month's rent, or a short-term personal loan that is currently due. However, long-term debts that are not due immediately (like the future installments of a 20-year Murabaha home financing) should not be deducted in full, as doing so would unjustly exempt wealthy individuals from giving Zakat.
            </p>

            <h3 style={{ marginTop: "24px" }}>4. The 2.5% Rate</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Once you have summed up your Zakatable assets and subtracted your immediate liabilities, you arrive at your Net Zakatable Wealth. If this number is greater than the Nisab, you multiply it by 2.5% (or 0.025). This is the standard rate for cash, business inventory, and precious metals. Interestingly, 2.5% is equivalent to 1/40th of your wealth.
            </p>

            <h3 style={{ marginTop: "24px" }}>Why Use Our Client-Side Calculator?</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              Financial privacy is critical. Many online calculators send your inputted numbers to a remote server for processing. Our SmartCalcTools Zakat Calculator is 100% client-side. The mathematical operations happen entirely within your web browser. We do not store, track, or intercept your personal financial data, making this the most secure way to calculate your religious obligations.
            </p>

            <h3 style={{ marginTop: "24px" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.1rem" }}>Do I pay Zakat on my 401(k) or Retirement Funds?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>If you have full access and control over the funds (meaning you could withdraw them today, even with a penalty), most scholars state you must pay Zakat on the net withdrawable amount. If you have no access until a certain age, Zakat is only due once you receive the funds.</p>

              <h4 style={{ fontSize: "1.1rem" }}>Should I use the Gold or Silver Nisab?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Historically, the value of 85g of gold and 595g of silver were relatively equal. Today, silver is much cheaper. Many scholars recommend using the silver Nisab because it is lower, which means more people will pay Zakat, resulting in more money distributed to the poor. However, the gold Nisab is also entirely valid and preferred by many contemporary fiqh councils.</p>

              <h4 style={{ fontSize: "1.1rem" }}>When is Zakat due?</h4>
              <p style={{ color: "var(--text-muted)", marginTop: "4px", marginBottom: "16px" }}>Zakat is due immediately upon the completion of a Hawl (one lunar year, roughly 354 days) from the date your wealth first reached the Nisab threshold. Many Muslims choose to pay during Ramadan due to the multiplied spiritual rewards.</p>
            </div>
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
            "name": "هل تجب الزكاة في أموال التقاعد والادخار طويل الأجل؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "إذا كان بإمكانك سحب هذه الأموال والتصرف فيها اليوم، فتجوز وتجب الزكاة على المبلغ الصافي القابل للسحب. أما إن كانت مجمدة، فلا تجب زكاتها إلا عند قبضها."
            }
          },
          {
            "@type": "Question",
            "name": "هل أعتمد نصاب الذهب أم نصاب الفضة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ينصح بعض العلماء باستخدام نصاب الفضة لأنه أرخص ويصب في مصلحة الفقراء. ومع ذلك، فإن نصاب الذهب صحيح تماماً ومستقر وهو المعتمد كخيار افتراضي في حاسبتنا."
            }
          },
          {
            "@type": "Question",
            "name": "متى تجب الزكاة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "تجب الزكاة فوراً عند مرور حول هجري كامل (سنة قمرية) من اليوم الذي بلغت فيه أموالك النصاب لأول مرة."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Do I pay Zakat on my 401(k) or Retirement Funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you have full access and control over the funds, you must pay Zakat on the net withdrawable amount. If you have no access, Zakat is only due once you receive the funds."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use the Gold or Silver Nisab?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many scholars recommend using the silver Nisab because it is lower, meaning more money goes to the poor. However, the gold Nisab is also entirely valid."
            }
          },
          {
            "@type": "Question",
            "name": "When is Zakat due?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zakat is due immediately upon the completion of a Hawl (one lunar year) from the date your wealth first reached the Nisab threshold."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
