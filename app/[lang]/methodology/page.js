import { getDictionary } from "@/app/dictionaries";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "المنهجية الشرعية والحسابية" : "Calculation Methodology & Shariah Sources",
    description: isAr
      ? "تعرف على المصادر الشرعية والمنهجية الحسابية المعتمدة في كل حاسبة على SmartCalcTools، بما يشمل معايير AAOIFI والمذاهب الفقهية."
      : "Learn about the Shariah sources and calculation methodology behind every calculator on SmartCalcTools, including AAOIFI standards and Fiqh references.",
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/methodology`,
      languages: {
        en: "https://smartcalctools.xyz/en/methodology",
        ar: "https://smartcalctools.xyz/ar/methodology",
      },
    },
  };
}

export default async function MethodologyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const calculators = [
    {
      id: "zakat",
      titleEn: "Zakat Calculator",
      titleAr: "حاسبة الزكاة",
      path: "/calculators/zakat",
      methodEn: "Zakat is calculated at 2.5% (1/40) of net wealth exceeding the Nisab threshold. Our calculator uses live gold prices (85 grams of 24K gold) to determine the current Nisab value, following the gold standard which is the most widely accepted method.",
      methodAr: "تُحسب الزكاة بنسبة 2.5% (ربع العشر) من صافي الثروة التي تتجاوز حد النصاب. تستخدم حاسبتنا أسعار الذهب الحية (85 غراماً من الذهب عيار 24) لتحديد قيمة النصاب الحالية، وفقاً لمعيار الذهب وهو الأكثر قبولاً.",
      sourcesEn: [
        "Quran: Surah At-Tawbah (9:60) — Categories of Zakat recipients",
        "Hadith: Sahih al-Bukhari, Book of Zakat — Nisab thresholds",
        "AAOIFI Shariah Standard No. 35: Zakat",
        "Fiqh al-Zakat by Dr. Yusuf al-Qaradawi"
      ],
      sourcesAr: [
        "القرآن الكريم: سورة التوبة (9:60) — مصارف الزكاة",
        "الحديث النبوي: صحيح البخاري، كتاب الزكاة — أنصبة الزكاة",
        "معيار هيئة المحاسبة والمراجعة (AAOIFI) رقم 35: الزكاة",
        "فقه الزكاة — د. يوسف القرضاوي"
      ]
    },
    {
      id: "inheritance",
      titleEn: "Islamic Inheritance (Faraid) Calculator",
      titleAr: "حاسبة المواريث الشرعية (الفرائض)",
      path: "/calculators/inheritance",
      methodEn: "Our Faraid calculator implements the Quranic inheritance shares (Fard) as prescribed in Surah An-Nisa (4:11-12, 176). The algorithm follows the classical Sunni methodology of distributing fixed shares first, then distributing the remainder (Asabah) to male heirs. The Awl (proportional reduction) method is applied when shares exceed the estate.",
      methodAr: "تطبّق حاسبة الفرائض الأنصبة القرآنية المحددة في سورة النساء (4:11-12، 176). تتبع الخوارزمية المنهج السني الكلاسيكي بتوزيع الفروض أولاً ثم توزيع الباقي (التعصيب) على الورثة الذكور. يُطبَّق العَوْل (التخفيض النسبي) عندما تتجاوز الأنصبة قيمة التركة.",
      sourcesEn: [
        "Quran: Surah An-Nisa (4:11-12, 176) — Primary inheritance shares",
        "Hadith: Sahih al-Bukhari & Muslim — Rules of Asabah",
        "Al-Sirajiyyah by Imam al-Sajawandi — Classical Faraid reference",
        "AAOIFI Shariah Standard No. 38: Distribution of Estates"
      ],
      sourcesAr: [
        "القرآن الكريم: سورة النساء (4:11-12، 176) — أنصبة الإرث الأساسية",
        "الحديث النبوي: صحيح البخاري ومسلم — أحكام التعصيب",
        "السراجية للإمام السجاوندي — مرجع الفرائض الكلاسيكي",
        "معيار AAOIFI رقم 38: توزيع التركات"
      ]
    },
    {
      id: "murabaha",
      titleEn: "Murabaha Financing Calculator",
      titleAr: "حاسبة التمويل بالمرابحة",
      path: "/calculators/murabaha",
      methodEn: "Murabaha is a cost-plus financing contract where the bank purchases an asset and sells it to the client at a disclosed markup. Our calculator computes the total cost including the agreed profit margin. Unlike conventional loans, the profit rate is fixed at inception and does not compound — the total payable amount is determined upfront.",
      methodAr: "المرابحة هي عقد تمويل بالتكلفة مضافاً إليها هامش ربح معلوم، حيث يقوم البنك بشراء الأصل ثم بيعه للعميل بربح متفق عليه. تحسب حاسبتنا التكلفة الإجمالية شاملة هامش الربح. على عكس القروض التقليدية، يُحدد معدل الربح عند التعاقد ولا يتراكم.",
      sourcesEn: [
        "AAOIFI Shariah Standard No. 8: Murabaha",
        "Islamic Financial Services Board (IFSB) Guidelines",
        "An Introduction to Islamic Finance by Mufti Taqi Usmani"
      ],
      sourcesAr: [
        "معيار AAOIFI رقم 8: المرابحة",
        "إرشادات مجلس الخدمات المالية الإسلامية (IFSB)",
        "مقدمة في التمويل الإسلامي — المفتي محمد تقي العثماني"
      ]
    },
    {
      id: "mudarabah",
      titleEn: "Mudarabah Profit Calculator",
      titleAr: "حاسبة أرباح المضاربة",
      path: "/calculators/mudarabah",
      methodEn: "Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides management expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne solely by the capital provider (unless due to negligence). Our calculator computes expected returns based on the agreed profit-sharing ratio.",
      methodAr: "المضاربة هي شراكة في الأرباح حيث يقدم أحد الأطراف رأس المال (رب المال) والآخر يقدم العمل والخبرة (المضارب). تُقسم الأرباح وفق نسبة متفق عليها مسبقاً، بينما تقع الخسائر على رب المال فقط (ما لم يكن هناك تعدٍ أو تقصير).",
      sourcesEn: [
        "AAOIFI Shariah Standard No. 13: Mudarabah",
        "Quran: Surah Al-Muzammil (73:20) — Reference to trade and profit",
        "Fiqh-us-Sunnah by Sayyid Sabiq — Partnership contracts"
      ],
      sourcesAr: [
        "معيار AAOIFI رقم 13: المضاربة",
        "القرآن الكريم: سورة المزمل (73:20) — الإشارة للتجارة والربح",
        "فقه السنة — السيد سابق — عقود الشراكة"
      ]
    },
    {
      id: "sukuk",
      titleEn: "Sukuk Yield Calculator",
      titleAr: "حاسبة عوائد الصكوك",
      path: "/calculators/sukuk",
      methodEn: "Sukuk are Shariah-compliant investment certificates that represent proportional ownership in an underlying asset. Unlike conventional bonds, Sukuk holders share in the asset's returns rather than receiving interest. Our calculator estimates yields based on the expected profit rate, tenor, and face value.",
      methodAr: "الصكوك هي شهادات استثمار متوافقة مع الشريعة تمثل ملكية نسبية في أصل أساسي. على عكس السندات التقليدية، يشارك حاملو الصكوك في عوائد الأصل بدلاً من تلقي فوائد ربوية.",
      sourcesEn: [
        "AAOIFI Shariah Standard No. 17: Investment Sukuk",
        "Securities Commission Malaysia: Guidelines on Sukuk",
        "Islamic Capital Markets by IFSB"
      ],
      sourcesAr: [
        "معيار AAOIFI رقم 17: صكوك الاستثمار",
        "هيئة الأوراق المالية الماليزية: إرشادات الصكوك",
        "أسواق رأس المال الإسلامية — IFSB"
      ]
    }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", lineHeight: "1.8" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1>{isAr ? "المنهجية الشرعية والحسابية" : "Calculation Methodology & Shariah Sources"}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginTop: "12px", maxWidth: "700px", margin: "12px auto 0" }}>
          {isAr
            ? "الشفافية أولوية قصوى لدينا. نوضح هنا المنهجية والمصادر الشرعية المعتمدة في كل حاسبة لضمان الدقة والثقة."
            : "Transparency is our top priority. Here we detail the methodology and Shariah sources behind each calculator to ensure accuracy and trust."}
        </p>
      </div>

      {/* AAOIFI Compliance Banner */}
      <section className="card" style={{ marginBottom: "32px", background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(124,58,237,0.05))", border: "1px solid rgba(37,99,235,0.15)" }}>
        <h2 style={{ fontSize: "1.2rem" }}>{isAr ? "معايير الامتثال" : "Compliance Standards"}</h2>
        <p style={{ color: "var(--text-muted)" }}>
          {isAr
            ? "تلتزم جميع حاسباتنا المالية بمعايير هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI) ومبادئ مجلس الخدمات المالية الإسلامية (IFSB). الصيغ الحسابية المستخدمة مبنية على المصادر الفقهية المعتمدة أدناه."
            : "All our financial calculators adhere to the standards set by the Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI) and the Islamic Financial Services Board (IFSB). The formulas used are derived from the authoritative Fiqh sources listed below."}
        </p>
      </section>

      {/* Individual Calculator Methodologies */}
      {calculators.map((calc) => (
        <section key={calc.id} id={calc.id} className="card" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            <h2 style={{ fontSize: "1.15rem", margin: 0 }}>{isAr ? calc.titleAr : calc.titleEn}</h2>
            <Link
              href={`/${lang}${calc.path}`}
              className="btn btn-primary"
              style={{ padding: "4px 14px", fontSize: "0.8rem" }}
            >
              {isAr ? "افتح الحاسبة" : "Open Calculator"}
            </Link>
          </div>
          <p style={{ marginBottom: "16px" }}>{isAr ? calc.methodAr : calc.methodEn}</p>
          <div style={{ background: "var(--bg)", borderRadius: "12px", padding: "16px" }}>
            <h3 style={{ fontSize: "0.95rem", marginBottom: "8px", color: "var(--primary)" }}>
              {isAr ? "📚 المصادر والمراجع" : "📚 Sources & References"}
            </h3>
            <ul style={{ paddingInlineStart: "20px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {(isAr ? calc.sourcesAr : calc.sourcesEn).map((src, i) => (
                <li key={i} style={{ marginBottom: "6px" }}>{src}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* General Disclaimer */}
      <section className="card" style={{ textAlign: "center", marginTop: "40px", background: "var(--bg)" }}>
        <h2 style={{ fontSize: "1.1rem" }}>{isAr ? "ملاحظة مهمة" : "Important Notice"}</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          {isAr
            ? "على الرغم من التزامنا بأعلى معايير الدقة، فإن نتائج هذه الحاسبات لا تُغني عن استشارة عالم شريعة مؤهل. نرحب بملاحظاتكم وتصحيحاتكم عبر صفحة التواصل."
            : "While we strive for the highest standards of accuracy, the results from these calculators do not replace consultation with a qualified Islamic scholar. We welcome your feedback and corrections via our contact page."}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="btn btn-primary"
          style={{ marginTop: "12px", display: "inline-block" }}
        >
          {isAr ? "تواصل معنا" : "Contact Us"}
        </Link>
      </section>
    </div>
  );
}
