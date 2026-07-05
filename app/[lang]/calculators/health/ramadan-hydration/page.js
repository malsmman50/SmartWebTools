import { getDictionary } from "@/app/dictionaries";
import RamadanHydration from "@/app/components/RamadanHydration";

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const url = `https://smartcalctools.xyz/${params.lang}/calculators/health/ramadan-hydration`;
  
  return {
    title: `${dict.ramadan.title} | SmartCalcTools`,
    description: dict.ramadan.desc,
    openGraph: {
      title: `${dict.ramadan.title} | SmartCalcTools`,
      description: dict.ramadan.desc,
      url: url,
      type: "website",
      images: [
        {
          url: 'https://smartcalctools.xyz/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: dict.ramadan.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.ramadan.title,
      description: dict.ramadan.desc,
      images: ['https://smartcalctools.xyz/twitter-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/health/ramadan-hydration",
        "ar": "https://smartcalctools.xyz/ar/calculators/health/ramadan-hydration",
      },
    },
  };
}

export default async function RamadanHydrationPage({ params }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === "ar";
  const url = `https://smartcalctools.xyz/${params.lang}/calculators/health/ramadan-hydration`;

  // JSON-LD structured data
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": dict.ramadan.title,
    "description": dict.ramadan.desc,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://smartcalctools.xyz/${params.lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Health Calculators",
        "item": `https://smartcalctools.xyz/${params.lang}#health`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.ramadan.title,
        "item": url
      }
    ]
  };

  const faqData = isAr ? [
    { q: "كم كوب ماء أحتاج يومياً في رمضان؟", a: "يعتمد ذلك على وزنك ومستوى نشاطك. بشكل عام، يحتاج الجسم إلى 35 مل لكل كيلوغرام من وزن الجسم." },
    { q: "ما هو أفضل وقت لشرب الماء في رمضان؟", a: "يُفضل تقسيم شرب الماء بحيث يتم تناول كوب كل ساعة من وقت الإفطار حتى السحور لتجنب العطش والتأكد من امتصاص الجسم للماء." }
  ] : [
    { q: "How many cups of water do I need during Ramadan?", a: "It depends on your weight and activity level. Generally, the body needs 35ml per kilogram of body weight." },
    { q: "When is the best time to drink water in Ramadan?", a: "It's best to divide your water intake by drinking one cup every hour from Iftar to Suhoor to ensure maximum absorption and prevent dehydration." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-header text-center" style={{ marginBottom: "2rem" }}>
        <h1 className="title">💧 {dict.ramadan.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.ramadan.desc}
        </p>
      </div>
      
      {/* Disclaimer Block */}
      <div style={{ maxWidth: "900px", margin: "0 auto 24px", background: "rgba(var(--danger-rgb), 0.05)", borderLeft: "4px solid var(--danger)", padding: "16px", borderRadius: "0 8px 8px 0" }}>
        <strong style={{ color: "var(--danger)" }}>⚠️ {isAr ? "تنويه طبي هام:" : "Important Medical Disclaimer:"}</strong>
        <p style={{ margin: "4px 0 0", fontSize: "0.9rem" }}>
          {isAr 
            ? "هذه الحاسبة توفر تقديرات عامة مبنية على المعادلات الصحية القياسية، ولا تعتبر بديلاً عن الاستشارة الطبية. يرجى استشارة الطبيب في حالات الحمل، الأمراض المزمنة، أو الحالات الخاصة." 
            : "This calculator provides general estimates based on standard health formulas and is not a substitute for professional medical advice. Please consult a doctor for pregnancy, chronic conditions, or special health circumstances."}
        </p>
      </div>

      <div className="calc-container" style={{ maxWidth: "900px", margin: "0 auto 3rem" }}>
        <RamadanHydration dict={dict} lang={params.lang} />
      </div>

      {/* SEO Article Wrapper */}
      <article className="card" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2>{isAr ? "كيف تعمل حاسبة ترطيب الجسم في رمضان؟" : "How does the Ramadan Hydration Calculator work?"}</h2>
          <p>{isAr ? "تعتمد الحاسبة على المعادلة العلمية التي تنص على حاجة الجسم لـ 35 مل من الماء لكل كيلوغرام من وزن الجسم يومياً، بالإضافة إلى تعويض السوائل المفقودة بحسب مستوى النشاط البدني. تقوم الحاسبة بتقسيم الكمية الإجمالية على عدد ساعات الإفطار (بين المغرب والفجر) لتعطيك جدولاً ذكياً لشرب الماء." : "The calculator is based on the scientific formula stating that the body needs 35ml of water per kilogram of body weight daily, plus compensating for fluids lost based on physical activity. It then divides the total amount by your non-fasting hours to provide a smart drinking schedule."}</p>
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
