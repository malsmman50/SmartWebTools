"use client";

import { useState } from "react";

export default function InheritanceCalculatorClient({ lang, dict, ...props }) {
  
  const t = dict.inheritance;

  const [estateValue, setEstateValue] = useState("");
  
  // Primary Heirs
  const [spouseType, setSpouseType] = useState("none"); // 'none', 'husband', 'wife'
  const [wivesCount, setWivesCount] = useState(1);
  
  const [sonsCount, setSonsCount] = useState(0);
  const [daughtersCount, setDaughtersCount] = useState(0);
  
  const [fatherAlive, setFatherAlive] = useState(false);
  const [motherAlive, setMotherAlive] = useState(false);

  const [results, setResults] = useState(null);

  const calculateInheritance = () => {
    const value = parseFloat(estateValue);
    if (isNaN(value) || value <= 0) {
      alert(lang === "ar" ? "يرجى إدخال قيمة صحيحة للتركة." : "Please enter a valid estate value.");
      return;
    }

    let shares = [];
    let remainingFraction = 1.0;
    const hasChildren = sonsCount > 0 || daughtersCount > 0;

    // 1. Spouse Share
    if (spouseType === "husband") {
      const share = hasChildren ? (1 / 4) : (1 / 2);
      shares.push({ 
        name: lang === "ar" ? "الزوج" : "Husband", 
        fraction: share, 
        amount: value * share 
      });
      remainingFraction -= share;
    } else if (spouseType === "wife") {
      const share = hasChildren ? (1 / 8) : (1 / 4);
      shares.push({ 
        name: lang === "ar" ? `الزوجة / الزوجات (${wivesCount})` : `Wife / Wives (${wivesCount})`, 
        fraction: share, 
        amount: value * share, 
        perPerson: (value * share) / wivesCount 
      });
      remainingFraction -= share;
    }

    // 2. Parents Share
    if (motherAlive) {
      const share = hasChildren ? (1 / 6) : (1 / 3);
      shares.push({ 
        name: lang === "ar" ? "الأم" : "Mother", 
        fraction: share, 
        amount: value * share 
      });
      remainingFraction -= share;
    }

    let fatherShare = 0;
    if (fatherAlive) {
      if (hasChildren) {
        fatherShare = (1 / 6); 
      } else {
        fatherShare = remainingFraction; 
      }
      shares.push({ 
        name: lang === "ar" ? "الأب" : "Father", 
        fraction: fatherShare, 
        amount: value * fatherShare 
      });
      remainingFraction -= fatherShare;
    }

    // 3. Children Share (Ta'seeb)
    if (hasChildren) {
      if (sonsCount > 0) {
        const totalParts = (sonsCount * 2) + daughtersCount;
        const partValue = (remainingFraction * value) / totalParts;
        
        if (sonsCount > 0) {
          shares.push({ 
            name: lang === "ar" ? `الأبناء (${sonsCount})` : `Sons (${sonsCount})`, 
            amount: partValue * 2 * sonsCount, 
            perPerson: partValue * 2 
          });
        }
        if (daughtersCount > 0) {
          shares.push({ 
            name: lang === "ar" ? `البنات (${daughtersCount})` : `Daughters (${daughtersCount})`, 
            amount: partValue * daughtersCount, 
            perPerson: partValue 
          });
        }
        remainingFraction = 0;
      } else if (daughtersCount > 0) {
        let daughterFraction = 0;
        if (daughtersCount === 1) daughterFraction = 1 / 2;
        else daughterFraction = 2 / 3;
        
        if (daughterFraction > remainingFraction) daughterFraction = remainingFraction;
        
        shares.push({ 
          name: lang === "ar" ? `البنات (${daughtersCount})` : `Daughters (${daughtersCount})`, 
          fraction: daughterFraction, 
          amount: value * daughterFraction, 
          perPerson: (value * daughterFraction) / daughtersCount 
        });
        remainingFraction -= daughterFraction;
        
        if (fatherAlive && remainingFraction > 0) {
          const fatherIndex = shares.findIndex(s => s.name === (lang === "ar" ? "الأب" : "Father"));
          if (fatherIndex > -1) {
            shares[fatherIndex].fraction += remainingFraction;
            shares[fatherIndex].amount += value * remainingFraction;
            remainingFraction = 0;
          }
        }
      }
    }

    setResults({
      total: value,
      shares: shares,
      unallocated: remainingFraction > 0.001 ? remainingFraction * value : 0
    });
  };

  const fmt = (n) => {
    return new Intl.NumberFormat("en-US").format(Math.floor(n)) + " $";
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "40px auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", textAlign: "center" }}>{t.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "24px" }}>
          {t.subtitle}
        </p>

        <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.9rem", lineHeight: "1.5" }}>
          {lang === "ar" ? (
            <>
              <strong>إخلاء مسؤولية فقهي هام:</strong> هذه الحاسبة هي أداة تعليمية مبسطة مقتصرة على الورثة الأساسيين (الزوجين، الأبناء، الأبوين). إن علم الفرائض والمواريث علم دقيق ومتشعب ويحتوي على أحكام الحجب والرد والعول والإخوة والمناسخات. لا يجب الاعتماد على هذه الحاسبة لتقسيم تركة حقيقية بشكل نهائي، بل يتعين عليك دائماً مراجعة المحاكم الشرعية الرسمية أو دار الإفتاء المعتمدة في بلدك.
            </>
          ) : (
            <>
              <strong>Important Fiqh Disclaimer:</strong> This calculator is a simplified educational tool limited to primary heirs (spouses, children, parents). The science of Mawarith is highly complex and includes rules of exclusion (Hajb), Awl, and siblings. Do not rely on this calculator for actual estate division. Always consult official Sharia courts or a certified Mufti in your country.
            </>
          )}
        </div>

        <div className="grid-2" style={{ gap: "24px", marginBottom: "32px" }}>
          <div>
            <label htmlFor="estateValue" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{t.estate}</label>
            <input 
              id="estateValue"
              type="number" 
              value={estateValue}
              onChange={(e) => setEstateValue(e.target.value)}
              min="0"
              max="1000000000000"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.2rem" }}
              placeholder={lang === "ar" ? "مثال: 100000" : "e.g. 100000"}
            />
          </div>

          <div>
            <label htmlFor="spouseType" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{lang === "ar" ? "حالة الزوج/الزوجة (للمتوفى):" : "Spouse Status (of the deceased):"}</label>
            <select 
              id="spouseType"
              value={spouseType}
              onChange={(e) => setSpouseType(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
            >
              <option value="none">{lang === "ar" ? "لا يوجد (أو متوفى قبله)" : "None (or passed away)"}</option>
              <option value="wife">{lang === "ar" ? "ترك زوجة (أو زوجات)" : "Leaves Wife (or Wives)"}</option>
              <option value="husband">{lang === "ar" ? "تركت زوجاً" : "Leaves a Husband"}</option>
            </select>
          </div>

          {spouseType === "wife" && (
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="wivesCount" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{lang === "ar" ? "عدد الزوجات:" : "Number of Wives:"}</label>
              <input 
                id="wivesCount"
                type="number" 
                value={wivesCount}
                onChange={(e) => setWivesCount(Math.max(1, Math.min(4, parseInt(e.target.value) || 1)))}
                min="1" max="4"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
              />
            </div>
          )}

          <div>
            <label htmlFor="sonsCount" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{t.sons}</label>
            <input 
              id="sonsCount"
              type="number" 
              value={sonsCount}
              onChange={(e) => setSonsCount(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
              min="0"
              max="100"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
            />
          </div>

          <div>
            <label htmlFor="daughtersCount" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{t.daughters}</label>
            <input 
              id="daughtersCount"
              type="number" 
              value={daughtersCount}
              onChange={(e) => setDaughtersCount(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
              min="0"
              max="100"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-sunken)", color: "var(--text)", fontSize: "1.1rem" }}
            />
          </div>

          <div>
            <label htmlFor="fatherAlive" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "16px", background: "var(--surface-sunken)", border: "1px solid var(--border)", borderRadius: "8px" }}>
              <input 
                id="fatherAlive"
                type="checkbox" 
                checked={fatherAlive}
                onChange={(e) => setFatherAlive(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
              />
              <span style={{ fontWeight: "bold" }}>{lang === "ar" ? "الأب على قيد الحياة" : "Father is alive"}</span>
            </label>
          </div>

          <div>
            <label htmlFor="motherAlive" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "16px", background: "var(--surface-sunken)", border: "1px solid var(--border)", borderRadius: "8px" }}>
              <input 
                id="motherAlive"
                type="checkbox" 
                checked={motherAlive}
                onChange={(e) => setMotherAlive(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
              />
              <span style={{ fontWeight: "bold" }}>{lang === "ar" ? "الأم على قيد الحياة" : "Mother is alive"}</span>
            </label>
          </div>
        </div>

        <button 
          onClick={calculateInheritance}
          style={{ width: "100%", padding: "16px", borderRadius: "8px", background: "var(--primary)", color: "white", border: "none", fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer" }}
        >
          {t.btn}
        </button>

        {results && (
          <div style={{ marginTop: "32px" }} aria-live="polite">
            <h3 style={{ marginBottom: "16px", fontSize: "1.3rem", borderBottom: "2px solid var(--border)", paddingBottom: "8px" }}>
              {t.summary}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {results.shares.map((share, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--primary)" }}>{share.name}</div>
                    {share.fraction && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{lang === "ar" ? "الفرض الشرعي: " : "Legal Share: "}{Math.round(share.fraction * 100)}%</div>}
                  </div>
                  <div style={{ textAlign: lang === "ar" ? "left" : "right" }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{fmt(share.amount)}</div>
                    {share.perPerson && share.amount !== share.perPerson && (
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{lang === "ar" ? "نصيب الفرد: " : "Per Person: "}{fmt(share.perPerson)}</div>
                    )}
                  </div>
                </div>
              ))}
              
              {results.unallocated > 0 && (
                <div style={{ padding: "16px", background: "rgba(234, 179, 8, 0.1)", color: "#ca8a04", borderRadius: "8px", border: "1px dashed #ca8a04", marginTop: "8px" }}>
                  <strong>{lang === "ar" ? "التركة المتبقية:" : "Remaining Estate:"}</strong> {fmt(results.unallocated)} {lang === "ar" ? "(توزع على باقي العصبة والأقارب استناداً لأحكام الفقه المتقدمة غير المغطاة في هذه الحاسبة المبسطة)." : "(To be distributed to extended relatives 'Asaba' based on advanced Fiqh rulings not covered by this simplified calculator)."}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Expansion */}
      <article className="card" style={{ marginTop: "40px", lineHeight: "1.8" }}>
        {lang === "ar" ? (
          <>
            <h2>حاسبة المواريث الشرعية (تبسيط وتقريب)</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              حاسبة المواريث الذكية مصممة لتزويدك بتوزيع أولي تقريبي للتركة بين الورثة الأساسيين من الدرجة الأولى (الزوجين، الأبناء، والبنات، والأبوين) وفقاً لأحكام الشريعة الإسلامية الثابتة في القرآن الكريم. تعمل الأداة بشكل كامل داخل متصفحك للحفاظ على سرية الأرقام المالية المدخلة.
            </p>

            <h3 style={{ marginTop: "24px" }}>أمثلة واستخدامات شائعة (Use Cases & Examples)</h3>
            <ul style={{ paddingRight: "20px", paddingLeft: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>وفاة رجل وترك زوجة وأبناء:</strong> لنفترض أن رجلاً توفي وترك تركة بقيمة 100,000 دولار، ولديه زوجة واحدة، وولدين، وبنت واحدة، والأبوان متوفيان. عند الإدخال: تحصل الزوجة على الثمن (1/8) لوجود الفرع الوارث، والباقي يوزع للذكر مثل حظ الأنثيين (للولدين ضعف البنت).</li>
              <li style={{ marginBottom: "8px" }}><strong>وفاة امرأة وترك زوج وأبوين بدون أبناء:</strong> تركت الزوجة 50,000 دولار. يحصل الزوج على النصف (1/2)، والأم على الثلث (1/3)، والأب يحصل على الباقي تعصيباً.</li>
              <li style={{ marginBottom: "8px" }}><strong>الحجب:</strong> تلاحظ في الحاسبة أن نصيب الزوج أو الزوجة يتغير فوراً بمجرد إضافة أبناء (ينقص من النصف للربع، أو من الربع للثمن) وهو ما يُسمى في علم الفرائض بـ "حجب النقصان".</li>
              <li style={{ marginBottom: "8px" }}><strong>التعلم والتفقه:</strong> يمكن لطلاب العلم الشرعي استخدام الأداة لتأكيد صحة حلولهم للمسائل الفرضية الأساسية المبسطة.</li>
            </ul>

            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>تنبيه فقهي وقانوني</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              علم الفرائض هو من أعقد العلوم الشرعية. هذه الحاسبة تقتصر على "أصحاب الفروض والعصبات" من الدرجة الأولى فقط. لا تشمل الأداة: الأجداد والجدات، الإخوة والأخوات، ذوي الأرحام، مسألة العول، مسألة الرد، الجد مع الإخوة، والمناسخات. لذا <strong>لا تعتمد على هذه الحاسبة لتقسيم ميراث حقيقي</strong>، بل هي لغرض الاستئناس المعرفي. يجب إحالة أي تركة حقيقية إلى المحكمة الشرعية المتخصصة.
            </p>
          </>
        ) : (
          <>
            <h2>Islamic Inheritance (Mawarith) Calculator</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
              The smart Islamic Inheritance Calculator is designed to provide you with an approximate preliminary distribution of an estate among first-degree primary heirs (spouses, sons, daughters, and parents) in accordance with the fixed rulings of Islamic Sharia (Quran). The tool runs entirely within your browser to maintain the absolute confidentiality of the financial figures entered.
            </p>

            <h3 style={{ marginTop: "24px" }}>Examples & Use Cases</h3>
            <ul style={{ paddingLeft: "20px", paddingRight: "0", color: "var(--text-muted)", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Deceased Husband leaving a Wife and Children:</strong> Suppose a man dies leaving a $100,000 estate, one wife, two sons, and one daughter (parents are deceased). The wife receives 1/8th due to the presence of children, and the remainder is distributed so that the male receives the share of two females.</li>
              <li style={{ marginBottom: "8px" }}><strong>Deceased Wife leaving a Husband and Parents (No Children):</strong> A woman leaves $50,000. The husband gets 1/2, the mother gets 1/3, and the father gets the remainder as an 'Asib (agnate).</li>
              <li style={{ marginBottom: "8px" }}><strong>Partial Exclusion (Hajb Nuqsan):</strong> You will notice the spouse's share instantly drops (from 1/2 to 1/4, or from 1/4 to 1/8) the moment you add children to the equation.</li>
              <li style={{ marginBottom: "8px" }}><strong>Educational Purposes:</strong> Islamic studies students can use this tool to quickly verify their manual calculations for basic inheritance test questions.</li>
            </ul>

            <h3 style={{ marginTop: "24px", color: "var(--danger)" }}>Legal & Fiqh Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
              The science of Islamic inheritance (Fara'id) is highly complex. This calculator is strictly limited to first-degree "Ashab al-Furud" (quota-heirs) and 'Asabat (residuaries). It DOES NOT cover: Grandparents, Siblings, Distant kindred (Dhawu al-Arham), Awl (proportional reduction), Radd (return), or complex multi-generational deaths (Munasakhat). <strong>Never rely on this tool to divide an actual estate.</strong> Real estates must be referred to specialized Sharia courts or authorized Muftis.
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
            "name": "هل يمكنني تقسيم التركة نهائياً باستخدام هذه الحاسبة؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "لا، هذه الحاسبة تعليمية ومبسطة للورثة من الدرجة الأولى. لتقسيم التركة الفعلي يجب مراجعة المحاكم الشرعية."
            }
          },
          {
            "@type": "Question",
            "name": "لماذا لا توجد خانة للإخوة والأخوات؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "توريث الإخوة والأخوات يتأثر بالحجب (حيث يحجبهم الأب أو الابن الذكر)، وله قواعد معقدة جداً تم استبعادها من هذه النسخة المبسطة تجنباً للأخطاء."
            }
          }
        ] : [
          {
            "@type": "Question",
            "name": "Can I use this calculator to finally divide an actual estate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, this is an educational tool limited to first-degree heirs. Actual estate division must be conducted by official Sharia courts."
            }
          },
          {
            "@type": "Question",
            "name": "Why are there no inputs for brothers and sisters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The inheritance of siblings is subject to complex exclusion rules (e.g., they are excluded by the father or son). These advanced rules are omitted here to prevent incorrect assumptions."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
