import { getDictionary } from "@/app/dictionaries";
import CurrencyConverterClient from "@/app/components/CurrencyConverterClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/currency`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/currency`,
        "ar": `https://smartcalctools.xyz/ar/calculators/currency`,
      },
    },
    title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
    description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
    openGraph: {
      title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
      description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter",
      description: isAr 
      ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة."
      : "Convert global currencies instantly with live market exchange rates supporting over 150 currencies.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function CurrencyConverterPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  const faqs = isAr ? [
    {
      question: "هل يتم تحديث أسعار الصرف بشكل مباشر؟",
      answer: "نعم، نعتمد على واجهات برمجة تطبيقات (APIs) مالية موثوقة لتحديث أسعار الصرف بشكل دوري لضمان حصولك على أدق وأحدث الأسعار المتاحة في السوق المالي."
    },
    {
      question: "كم عدد العملات التي تدعمها هذه الحاسبة؟",
      answer: "تدعم حاسبة تحويل العملات الخاصة بنا أكثر من 150 عملة عالمية ورقمية، بما في ذلك الدولار الأمريكي، اليورو، الجنيه الإسترليني، الريال السعودي، والدرهم الإماراتي."
    },
    {
      question: "هل هذه الأداة مجانية للاستخدام؟",
      answer: "نعم، أداة تحويل العملات مجانية تماماً للاستخدام ولا تتطلب أي تسجيل أو رسوم مخفية."
    },
    {
      question: "هل يمكنني الاعتماد على هذه الأسعار للتداول التجاري؟",
      answer: "الأسعار المقدمة هي أسعار السوق المتوسطة (Mid-market rates) وتُستخدم كمرجع تقريبي. البنوك وشركات الصرافة قد تضيف هوامش ربح ورسوم تحويل، لذا يجب دائماً مراجعة مزود الخدمة المالي الخاص بك قبل إجراء أي عمليات تداول فعلية."
    }
  ] : [
    {
      question: "Are the exchange rates updated in real-time?",
      answer: "Yes, we utilize reliable financial APIs to fetch periodically updated exchange rates, ensuring you get highly accurate and recent market data."
    },
    {
      question: "How many currencies does this calculator support?",
      answer: "Our currency converter supports over 150 global fiat and digital currencies, including USD, EUR, GBP, SAR, AED, and many more."
    },
    {
      question: "Is this currency converter free to use?",
      answer: "Absolutely. The tool is 100% free to use with no hidden fees or registration required."
    },
    {
      question: "Can I use these rates for commercial trading?",
      answer: "The rates provided are mid-market rates intended for informational and reference purposes. Banks and exchange bureaus typically apply their own margins and fees. Always consult your financial provider before executing real trades."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <CurrencyConverterClient lang={lang} dict={dict} />
      
      <SoftwareSchema 
        name={isAr ? "محول أسعار العملات المباشر" : "Live Currency Converter"}
        description={isAr ? "حول العملات العالمية فورياً وبأسعار الصرف المحدثة يومياً مع دعم أكثر من 150 عملة." : "Convert global currencies instantly with live market exchange rates."}
        applicationCategory="FinanceApplication"
        url={`https://smartcalctools.xyz/${lang}/calculators/currency`}
      />
      <FAQSchema faqs={faqs} />
      
      <article className="prose lg:prose-xl mx-auto mt-12 dark:prose-invert">
        {isAr ? (
          <>
            <h2>الدليل الشامل لاستخدام محول أسعار العملات المباشر</h2>
            <p>
              في عالمنا الاقتصادي المترابط، أصبحت متابعة أسعار صرف العملات ضرورة يومية، سواء كنت مستثمراً، مسافراً، أو صاحب عمل يتعامل مع أسواق دولية. يوفر لك <strong>محول أسعار العملات المباشر</strong> أداة قوية وسريعة لمعرفة قيمة أموالك بدقة عالية وبشكل لحظي.
            </p>
            <h3>كيفية عمل محول العملات</h3>
            <p>
              يقوم محول العملات الخاص بنا بالاتصال المباشر بقواعد البيانات المالية العالمية لاسترداد أحدث أسعار الصرف المعتمدة (Mid-market rates). كل ما عليك فعله هو إدخال المبلغ، اختيار عملة الأساس، ثم اختيار العملة المستهدفة التي ترغب في التحويل إليها، وستظهر النتيجة فوراً على شاشتك.
            </p>
            <h3>لماذا تختار محول العملات الخاص بنا؟</h3>
            <ul>
              <li><strong>الدقة والموثوقية:</strong> يتم تحديث بياناتنا باستمرار لتجنب التفاوت الكبير الذي يحدث في الأسواق المتقلبة.</li>
              <li><strong>شمولية العملات:</strong> نحن ندعم أكثر من 150 عملة من مختلف أنحاء العالم لتغطية كافة احتياجاتك المالية.</li>
              <li><strong>واجهة بسيطة:</strong> تصميم خالي من التعقيدات والإعلانات المزعجة، يضمن لك الوصول إلى المعلومة التي تريدها في ثوانٍ معدودة.</li>
            </ul>
            <p>
              تذكر دائماً أن الأسواق المالية تتسم بالتغير السريع، والأسعار المعروضة هنا هي أسعار تأشيرية قد تختلف قليلاً عن الأسعار التي تقدمها البنوك المحلية بسبب العمولات وهوامش الربح.
            </p>
            <DisclaimerBox type="financial" lang={lang} />
          </>
        ) : (
          <>
            <h2>Your Comprehensive Guide to the Live Currency Converter</h2>
            <p>
              In today's globally connected economy, tracking currency exchange rates is a daily necessity—whether you are an investor, a frequent traveler, or a business owner dealing in international trade. Our <strong>Live Currency Converter</strong> provides a robust, lightning-fast tool to determine the exact value of your money in real-time.
            </p>
            <h3>How the Currency Converter Works</h3>
            <p>
              Our converter establishes a direct connection with global financial databases to retrieve the latest, highly accurate mid-market exchange rates. Simply input your desired amount, select your base currency, and choose the target currency you wish to convert to. The precise converted amount will be displayed instantly on your screen.
            </p>
            <h3>Why Choose Our Converter?</h3>
            <ul>
              <li><strong>Accuracy and Reliability:</strong> Our data feeds are continuously updated to minimize discrepancies in volatile markets.</li>
              <li><strong>Comprehensive Coverage:</strong> We support an extensive list of over 150 global currencies to meet all your financial calculation needs.</li>
              <li><strong>User-Friendly Interface:</strong> A clean, intuitive design free from clutter ensures you get your financial data in seconds.</li>
            </ul>
            <p>
              Always keep in mind that financial markets fluctuate rapidly. The rates displayed are indicative mid-market rates and may differ slightly from the rates offered by your local bank or exchange bureau due to applied margins and commissions.
            </p>
            <DisclaimerBox type="financial" lang={lang} />
          </>
        )}
      </article>
    </div>
  );
}
