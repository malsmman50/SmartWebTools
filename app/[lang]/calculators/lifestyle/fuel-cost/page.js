import { getDictionary } from "@/app/dictionaries";
import FuelCostCalculator from "@/app/components/FuelCostCalculator";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const url = `https://smartcalctools.xyz/${lang}/calculators/lifestyle/fuel-cost`;
  
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
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";
  const url = `https://smartcalctools.xyz/${lang}/calculators/lifestyle/fuel-cost`;

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
        "name": "Lifestyle Calculators",
        "item": `https://smartcalctools.xyz/${lang}#lifestyle`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.fuel.title,
        "item": url
      }
    ]
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={dict.fuel.title}
        description={dict.fuel.desc}
        applicationCategory="TravelApplication"
        url={url}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>الدليل الشامل لحساب تكلفة وقود الرحلات وتوفير الميزانية</h2>
            <p style={{ marginBottom: "20px" }}>
              سواء كنت تخطط لرحلة برية طويلة عبر البلاد أو ترغب فقط في حساب تكلفة تنقلاتك اليومية إلى العمل، فإن أداة حساب تكلفة الوقود الخاصة بنا تمنحك الشفافية الكاملة. في ظل تقلبات أسعار الطاقة العالمية، أصبح من الضروري جداً التخطيط المالي الدقيق لأي رحلة بالسيارة. تتيح لك هذه الأداة ضبط ميزانيتك بسهولة شديدة، واتخاذ قرارات ذكية بشأن استخدام سيارتك مقارنة بوسائل النقل العام مثل القطارات أو الطيران.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>كيفية عمل خوارزمية حساب الوقود</h3>
            <p style={{ marginBottom: "20px" }}>
              تعتمد حاسبتنا على معادلة رياضية بسيطة ولكنها دقيقة جداً. للوصول إلى التكلفة الإجمالية، تقوم الحاسبة بالخطوات التالية:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>إجمالي الاستهلاك:</strong> نقوم بضرب المسافة الكلية (بالكيلومتر أو الميل) في معدل استهلاك السيارة للوقود (مثل لتر لكل 100 كيلومتر)، ثم نقسم الناتج على 100. هذا يعطينا كمية الوقود الكلية المطلوبة للرحلة.</li>
              <li style={{ marginBottom: "10px" }}><strong>التكلفة النهائية:</strong> نضرب كمية الوقود الكلية في سعر اللتر الواحد (أو الجالون) الذي تدخله، لنحصل على التكلفة النقدية الدقيقة للرحلة.</li>
              <li style={{ marginBottom: "10px" }}><strong>تقسيم التكلفة:</strong> في حال كنت تسافر مع أصدقاء أو زملاء، يمكنك إدخال عدد الركاب لتقسيم التكلفة الإجمالية عليهم بالتساوي، مما يضمن العدل في توزيع المصاريف.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>عوامل تؤثر على استهلاك الوقود الفعلي (MPG / L/100km)</h3>
            <p style={{ marginBottom: "20px" }}>
              يجب أن تضع في اعتبارك أن معدل استهلاك الوقود المكتوب في كتيب السيارة هو معدل تقديري في ظروف مثالية. هناك عوامل في العالم الحقيقي تؤثر على هذا الرقم:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>القيادة في المدن مقابل الطرق السريعة:</strong> التوقف المتكرر والازدحام المروري يزيد من الاستهلاك بشكل ملحوظ مقارنة بالقيادة بسرعة ثابتة على الطريق السريع.</li>
              <li><strong>تشغيل مكيف الهواء:</strong> يمكن أن يزيد من استهلاك الوقود بنسبة تتراوح بين 5% إلى 20%، خاصة في الأيام شديدة الحرارة.</li>
              <li><strong>ضغط الإطارات:</strong> القيادة بإطارات غير ممتلئة بالهواء بالقدر الكافي يزيد من مقاومة الدوران (Rolling Resistance)، مما يرفع استهلاك الوقود.</li>
              <li><strong>الحمولة والوزن الزائد:</strong> كل 45 كيلوجراماً إضافياً في السيارة يمكن أن يقلل من كفاءة استهلاك الوقود بنسبة 1-2%.</li>
            </ul>

            <DisclaimerBox type="financial" lang={lang} />
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--primary)" }}>The Ultimate Guide to Calculating Trip Fuel Costs & Budgeting</h2>
            <p style={{ marginBottom: "20px" }}>
              Whether you are planning a massive cross-country road trip, a weekend getaway, or simply calculating your daily commute to work, our Fuel Cost Calculator gives you complete financial transparency. In an era of wildly fluctuating global energy prices, precise budget planning for driving is no longer optional—it is essential. This tool allows you to easily forecast your expenses, enabling you to make smart decisions on whether driving is more economical than taking a train or flying.
            </p>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>The Mechanics of the Fuel Calculation Algorithm</h3>
            <p style={{ marginBottom: "20px" }}>
              Our calculator runs on a precise, universally recognized mathematical formula to determine your exact trip cost:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>Total Fuel Required:</strong> First, we take your total trip distance (in miles or kilometers) and multiply it by your vehicle's fuel efficiency rating (such as L/100km or MPG). This determines the exact volume of fuel your engine will burn during the trip.</li>
              <li style={{ marginBottom: "10px" }}><strong>Total Monetary Cost:</strong> We then multiply the total volume of fuel by the current price of fuel per liter or gallon that you provide, yielding the final cash cost.</li>
              <li style={{ marginBottom: "10px" }}><strong>Cost Splitting:</strong> If you are carpooling or going on a road trip with friends, the calculator seamlessly divides the total cost by the number of passengers, ensuring a fair split for everyone involved.</li>
            </ul>

            <h3 style={{ fontSize: "1.4rem", marginTop: "30px", marginBottom: "15px" }}>Real-World Factors Impacting Your Fuel Economy</h3>
            <p style={{ marginBottom: "20px" }}>
              It is critical to remember that the MPG or L/100km rating provided by your vehicle's manufacturer is tested under perfect laboratory conditions. In the real world, several dynamic factors alter your actual fuel efficiency:
            </p>
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px", listStyleType: "circle" }}>
              <li><strong>City vs. Highway Driving:</strong> Constant stop-and-go traffic drastically increases fuel consumption compared to cruising at a steady, aerodynamic speed on a highway.</li>
              <li><strong>Air Conditioning (A/C):</strong> Running your A/C on maximum during hot summer days can increase fuel consumption by 5% to 20%, as it places a heavy mechanical load on the engine.</li>
              <li><strong>Tire Pressure:</strong> Driving on under-inflated tires increases rolling resistance. Your engine has to work harder to push the car forward, burning more fuel.</li>
              <li><strong>Vehicle Weight & Aerodynamics:</strong> Every extra 100 lbs (45 kg) of weight can reduce fuel economy by 1% to 2%. Similarly, roof racks destroy aerodynamic efficiency, creating drag that eats up fuel.</li>
            </ul>

            <DisclaimerBox type="financial" lang={lang} />
          </>
        )}
      </article>

      <FAQSchema faqs={isAr ? [
        {
          question: "كيف أحسب تكلفة الوقود لرحلتي بدقة؟",
          answer: "تحتاج إلى معرفة مسافة الرحلة، ومعدل استهلاك سيارتك للوقود (لتر لكل 100 كيلومتر أو ميل للجالون)، وسعر اللتر الواحد. تقوم الحاسبة بضرب المسافة في معدل الاستهلاك ثم في السعر لتعطيك التكلفة الإجمالية."
        },
        {
          question: "ما هو معدل استهلاك الوقود الطبيعي للسيارة؟",
          answer: "يختلف ذلك حسب نوع ومحرك السيارة. السيارات الاقتصادية تستهلك بين 5 إلى 7 لتر لكل 100 كم، بينما السيارات الأكبر أو سيارات الدفع الرباعي قد تستهلك بين 10 إلى 15 لتر لكل 100 كم."
        },
        {
          question: "كيف يمكنني توفير استهلاك الوقود أثناء السفر؟",
          answer: "يمكنك توفير الوقود عن طريق القيادة بسرعة ثابتة معتدلة (حوالي 90-100 كم/ساعة)، والتأكد من ضغط الإطارات المناسب، وتجنب التسارع المفاجئ، وتقليل استخدام مكيف الهواء إن أمكن."
        }
      ] : [
        {
          question: "How do I accurately calculate my trip's fuel cost?",
          answer: "You need to know the trip distance, your car's fuel efficiency (L/100km or MPG), and the price per unit of fuel. The calculator determines the total fuel volume needed and multiplies it by the price to give the total cost."
        },
        {
          question: "What is a normal fuel consumption rate for a car?",
          answer: "It varies heavily by car type and engine size. Economy compact cars typically consume between 5 to 7 liters per 100km (35-45 MPG), while larger SUVs or trucks may consume between 10 to 15 liters per 100km (15-23 MPG)."
        },
        {
          question: "How can I improve my fuel efficiency and save money?",
          answer: "You can save fuel by cruising at a steady, moderate speed (around 55-65 mph), ensuring tires are properly inflated, avoiding aggressive acceleration and hard braking, and reducing unnecessary weight or aerodynamic drag (like roof boxes)."
        }
      ]} />
    </div>
  );
}
