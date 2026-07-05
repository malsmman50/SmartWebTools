import { getDictionary } from "@/app/dictionaries";
import CustomsDutyCalculator from "@/app/components/CustomsDutyCalculator";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const url = `https://smartcalctools.xyz/${lang}/calculators/shopping/customs-duty`;
  
  return {
    title: `${dict.customs.title} | SmartCalcTools`,
    description: dict.customs.desc,
    openGraph: {
      title: `${dict.customs.title} | SmartCalcTools`,
      description: dict.customs.desc,
      url: url,
      type: "website",
      images: [
        {
          url: 'https://smartcalctools.xyz/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: dict.customs.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.customs.title,
      description: dict.customs.desc,
      images: ['https://smartcalctools.xyz/twitter-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/shopping/customs-duty",
        "ar": "https://smartcalctools.xyz/ar/calculators/shopping/customs-duty",
      },
    },
  };
}

export default async function CustomsDutyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  const url = `https://smartcalctools.xyz/${lang}/calculators/shopping/customs-duty`;

  // JSON-LD structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://smartcalctools.xyz/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shopping Calculators",
        "item": `https://smartcalctools.xyz/${lang}#shopping`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.customs.title,
        "item": url
      }
    ]
  };

  const faqData = isAr ? [
    { q: "كيف يتم حساب القيمة الإجمالية للجمارك (CIF)؟", a: "تُحسب قيمة الـ CIF عن طريق جمع قيمة المنتج الأصلي مع تكلفة الشحن وأي تأمين إن وجد. على هذا الإجمالي يتم فرض نسبة الرسوم الجمركية." },
    { q: "هل تُفرض ضريبة القيمة المضافة (VAT) على الشحن أيضاً؟", a: "نعم، ضريبة القيمة المضافة تُحسب على إجمالي قيمة المنتج + الشحن + الرسوم الجمركية المضافة." }
  ] : [
    { q: "How is the CIF value calculated for customs?", a: "The CIF value is calculated by adding the item's original cost, the shipping cost, and insurance. The customs duty percentage is then applied to this total." },
    { q: "Is VAT applied to the shipping cost as well?", a: "Yes, VAT is calculated on the total landed cost, which includes the item value, shipping cost, and the applied customs duty." }
  ];

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema
        name={dict.customs.title}
        description={dict.customs.desc}
        url={url}
      />
      <FAQSchema faqData={faqData} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-header text-center" style={{ marginBottom: "2rem" }}>
        <h1 className="title">📦 {dict.customs.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.customs.desc}
        </p>
      </div>
      
      {/* Disclaimer Block */}
      <div style={{ maxWidth: "900px", margin: "0 auto 24px" }}>
        <DisclaimerBox type="financial" lang={lang} />
      </div>

      <div className="calc-container" style={{ maxWidth: "900px", margin: "0 auto 3rem" }}>
        <CustomsDutyCalculator dict={dict} />
      </div>

      {/* SEO Article Wrapper */}
      <article className="card" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2>{isAr ? "دليل حساب الرسوم الجمركية والضرائب" : "Guide to Calculating Customs Duty and VAT"}</h2>
          <p>{isAr ? "يواجه الكثير من المتسوقين عبر الإنترنت والمستوردين عقبة تقدير التكلفة النهائية للشحنات. تعتمد هذه الأداة على معادلة (القيمة + الشحن = CIF)، ثم تطبق نسبة الرسوم الجمركية، يليها تطبيق ضريبة القيمة المضافة للحصول على التكلفة الإجمالية الواصلة (Landed Cost)." : "Many online shoppers and importers face the challenge of estimating the final cost of shipments. This tool uses the standard (Value + Shipping = CIF) formula, applies the duty rate, and then compounds the VAT to give you the precise Landed Cost."}</p>
        </section>

        <section>
          <h3>{isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            {faqData.map((faq, index) => (
              <div key={index} style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                <h4 style={{ margin: "0 0 8px", color: "var(--text)" }}>{faq.q}</h4>
                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.95rem" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
