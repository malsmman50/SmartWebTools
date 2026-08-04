import Link from "next/link";
import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr
      ? "حاسبات الزكاة والميراث والتمويل الإسلامي — بسند شرعي"
      : "Zakat, Inheritance & Islamic Finance Calculators — With Sources",
    description: isAr
      ? "احسب زكاتك وميراثك وأقساط مرابحتك، واعرف من أين جاء كل رقم. كل حاسبة تعرض خطوات الحساب والمعيار الشرعي الذي بُنيت عليه."
      : "Calculate your zakat, inheritance shares and murabaha instalments — and see where every number comes from. Each calculator shows its steps and the Sharia standard behind it.",
    alternates: {
      canonical: `https://smartcalctools.xyz/${isAr ? "ar" : "en"}`,
      languages: {
        en: "https://smartcalctools.xyz/en",
        ar: "https://smartcalctools.xyz/ar",
        "x-default": "https://smartcalctools.xyz/en",
      },
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  const localize = (path) => `/${lang}${path}`;

  const t = (ar, en) => (isAr ? ar : en);

  // Grouped by what the visitor came to do, not by which team built the tool.
  const groups = [
    {
      id: "obligations",
      title: t("الزكاة والميراث", "Zakat & Inheritance"),
      note: t(
        "فريضتان لهما مقدار محسوب. الخطأ فيهما ليس خطأ حساب فقط.",
        "Two obligations with an exact amount. Getting them wrong is not merely an arithmetic error."
      ),
      items: [
        { title: dict.calculators.zakat_title, desc: dict.calculators.zakat_desc, href: "/calculators/zakat" },
        { title: dict.calculators.inheritance_title, desc: dict.calculators.inheritance_desc, href: "/calculators/inheritance" },
      ],
    },
    {
      id: "finance",
      title: t("أدوات التمويل الإسلامي", "Islamic Finance Instruments"),
      note: t(
        "عقود لها ضوابط. الحاسبة تبيّن الكلفة الحقيقية، لا الرقم الترويجي.",
        "Contracts with rules. These show the real cost, not the headline figure."
      ),
      items: [
        { title: dict.calculators.murabaha_title, desc: dict.calculators.murabaha_desc, href: "/calculators/murabaha" },
        { title: dict.calculators.mudarabah_title, desc: dict.calculators.mudarabah_desc, href: "/calculators/mudarabah" },
        { title: dict.calculators.sukuk_title, desc: dict.calculators.sukuk_desc, href: "/calculators/sukuk" },
        { title: dict.calculators.islamic_deposit_title, desc: dict.calculators.islamic_deposit_desc, href: "/calculators/islamic-deposit" },
        { title: dict.calculators.fire_title, desc: dict.calculators.fire_desc, href: "/calculators/islamic-fire" },
        { title: dict.calculators.roi_title, desc: dict.calculators.roi_desc, href: "/calculators/roi" },
      ],
    },
    {
      id: "worship",
      title: t("مواقيت وعبادات", "Timing & Worship"),
      note: t(
        "اتجاه وتاريخ. يُرفض المدخل المستحيل بدل تصحيحه بصمت.",
        "Direction and date. An impossible input is refused, never silently corrected."
      ),
      items: [
        { title: dict.utilities.qibla_title, desc: dict.utilities.qibla_desc, href: "/tools/qibla-compass" },
        { title: dict.utilities.hijri_title, desc: dict.utilities.hijri_desc, href: "/tools/hijri-converter" },
        { title: dict.utilities.currency_title, desc: dict.utilities.currency_desc, href: "/calculators/currency" },
        {
          title: t("حاسبة ترطيب رمضان", "Ramadan Hydration"),
          desc: t("وزّع حاجتك من الماء بين الإفطار والسحور.", "Plan your water intake between iftar and suhoor."),
          href: "/calculators/health/ramadan-hydration",
        },
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: isAr ? "SmartCalcTools — حاسبات شرعية بسند" : "SmartCalcTools",
    url: `https://smartcalctools.xyz/${lang}`,
    description: isAr
      ? "حاسبات الزكاة والميراث والتمويل الإسلامي، كل نتيجة مع خطواتها ومعيارها الشرعي."
      : "Zakat, inheritance and Islamic finance calculators — every result with its steps and Sharia standard.",
    publisher: {
      "@type": "Organization",
      name: "SmartCalcTools",
      logo: {
        "@type": "ImageObject",
        url: "https://smartcalctools.xyz/icon-512.png",
      },
    },
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* The thesis: this site's claim is not "fast and free" — it is "you can
          check our work". That is what a rejected-for-thin-content site must prove. */}
      <section className="home-hero">
        <p className="eyebrow">{t("حساب شرعي مُسنَد", "Sharia calculation, sourced")}</p>
        <h1 className="home-hero__title">
          {t("احسب فريضتك، واعرف من أين جاء الرقم.", "Work out what you owe — and see where the number came from.")}
        </h1>
        <p className="home-hero__lede">
          {t(
            "كل حاسبة هنا تعرض خطوات الحساب كاملة، والمعيار الشرعي الذي بُنيت عليه، والمذهب المعتمد عند الاختلاف. لا صندوق أسود.",
            "Every calculator here shows its full working, the Sharia standard it rests on, and which school of thought it follows where jurists differ. No black box."
          )}
        </p>

        <div className="home-hero__actions">
          <Link href={localize("/calculators/zakat")} className="btn btn-primary">
            {t("ابدأ بحاسبة الزكاة", "Start with zakat")}
          </Link>
          <Link href={localize("/methodology")} className="btn btn-outline">
            {t("كيف نحسب", "How we calculate")}
          </Link>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="tool-group">
          <div className="tool-group__head">
            <h2 className="tool-group__title">{group.title}</h2>
            <p className="tool-group__note">{group.note}</p>
          </div>
          <div className="tool-grid">
            {group.items.map((tool) => (
              <Link key={tool.href} href={localize(tool.href)} className="tool-card">
                <h3 className="tool-card__title">{tool.title}</h3>
                <p className="tool-card__desc">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Trust section. Three claims, each one falsifiable by the visitor —
          which is the only kind worth printing. */}
      <section className="trust">
        <h2 className="trust__title">{t("لماذا تثق بهذه الأرقام", "Why these numbers are checkable")}</h2>
        <div className="trust__grid">
          <div className="trust__item">
            <h3>{t("السند مذكور", "The source is named")}</h3>
            <p>
              {t(
                "بجوار كل نتيجة معيارها الشرعي والمذهب المعتمد. إن خالف فقيهٌ ما نعتمده، ذكرنا ذلك بدل إخفائه.",
                "Each result sits beside the standard it follows and the school it applies. Where jurists disagree, we say so rather than hide it."
              )}
            </p>
          </div>
          <div className="trust__item">
            <h3>{t("الخطوات مكشوفة", "The working is shown")}</h3>
            <p>
              {t(
                "تستطيع إعادة الحساب بالورقة والقلم والوصول إلى الرقم نفسه. هذا شرط، لا ميزة إضافية.",
                "You can redo the arithmetic on paper and land on the same figure. That is a requirement here, not a feature."
              )}
            </p>
          </div>
          <div className="trust__item">
            <h3>{t("بياناتك لا تغادر جهازك", "Your data stays with you")}</h3>
            <p>
              {t(
                "الحساب يجري داخل متصفحك. لا نحفظ مبالغك ولا تفاصيل تركتك على أي خادم.",
                "Calculations run inside your browser. We store neither your balances nor your family details on any server."
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
