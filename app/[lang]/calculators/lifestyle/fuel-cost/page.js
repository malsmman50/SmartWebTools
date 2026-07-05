import { getDictionary } from "@/app/dictionaries";
import FuelCostCalculator from "@/app/components/FuelCostCalculator";

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  const url = `https://smartcalctools.xyz/${params.lang}/calculators/lifestyle/fuel-cost`;
  
  return {
    title: `${dict.fuel.title} | SmartCalcTools`,
    description: dict.fuel.desc,
    openGraph: {
      title: `${dict.fuel.title} | SmartCalcTools`,
      description: dict.fuel.desc,
      url: url,
      type: "website",
      images: [
        {
          url: 'https://smartcalctools.xyz/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: dict.fuel.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.fuel.title,
      description: dict.fuel.desc,
      images: ['https://smartcalctools.xyz/twitter-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        "en": "https://smartcalctools.xyz/en/calculators/lifestyle/fuel-cost",
        "ar": "https://smartcalctools.xyz/ar/calculators/lifestyle/fuel-cost",
      },
    },
  };
}

export default async function FuelCostPage({ params }) {
  const dict = await getDictionary(params.lang);
  const isAr = params.lang === "ar";
  const url = `https://smartcalctools.xyz/${params.lang}/calculators/lifestyle/fuel-cost`;

  // JSON-LD structured data
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": dict.fuel.title,
    "description": dict.fuel.desc,
    "applicationCategory": "TravelApplication",
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
        "name": "Lifestyle Calculators",
        "item": `https://smartcalctools.xyz/${params.lang}#lifestyle`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.fuel.title,
        "item": url
      }
    ]
  };

  const faqData = isAr ? [
    { q: "كيف أحسب تكلفة الوقود لرحلتي بدقة؟", a: "تحتاج إلى معرفة مسافة الرحلة، ومعدل استهلاك سيارتك للوقود (لتر لكل 100 كيلومتر)، وسعر اللتر الواحد. تقوم الحاسبة بضرب المسافة في معدل الاستهلاك ثم في السعر لتعطيك التكلفة الإجمالية." },
    { q: "ما هو معدل استهلاك الوقود الطبيعي للسيارة؟", a: "يختلف ذلك حسب نوع ومحرك السيارة. السيارات الاقتصادية تستهلك بين 5 إلى 7 لتر لكل 100 كم، بينما السيارات الأكبر أو سيارات الدفع الرباعي قد تستهلك بين 10 إلى 15 لتر لكل 100 كم." }
  ] : [
    { q: "How do I accurately calculate my trip's fuel cost?", a: "You need to know the trip distance, your car's fuel efficiency (L/100km), and the price per liter. The calculator multiplies the distance by the efficiency and then by the price to give the total cost." },
    { q: "What is a normal fuel consumption rate for a car?", a: "It varies by car type. Economy cars typically consume between 5 to 7 liters per 100km, while larger SUVs may consume between 10 to 15 liters per 100km." }
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
        <h1 className="title">🚗 {dict.fuel.title}</h1>
        <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {dict.fuel.desc}
        </p>
      </div>
      
      <div className="calc-container" style={{ maxWidth: "900px", margin: "0 auto 3rem" }}>
        <FuelCostCalculator dict={dict} />
      </div>

      {/* SEO Article Wrapper */}
      <article className="card" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2>{isAr ? "دليل التخطيط الذكي لتكاليف السفر والوقود" : "Smart Planning Guide for Travel and Fuel Costs"}</h2>
          <p>{isAr ? "سواء كنت تخطط لرحلة برية طويلة أو ترغب في حساب تكلفة تنقلاتك اليومية، فإن أداة حساب تكلفة الوقود تمنحك الشفافية الكاملة. يمكنك ضبط ميزانيتك بسهولة ومقارنة تكلفة استخدام سيارتك مقابل وسائل النقل الأخرى." : "Whether planning a long road trip or just calculating your daily commute, the fuel cost tool gives you complete transparency. Easily budget your trips and compare the cost of driving versus other transportation methods."}</p>
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
