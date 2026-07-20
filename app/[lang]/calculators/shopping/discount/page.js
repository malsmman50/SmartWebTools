import { getDictionary } from "@/app/dictionaries";
import DiscountCalculator from "@/app/components/DiscountCalculator";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const title = isAr ? "حاسبة الخصم والضريبة الذكية | حساب التخفيضات أونلاين" : "Smart Discount & VAT Calculator | Price after Tax";
  const description = isAr 
    ? "احسب السعر النهائي فوراً بعد إضافة الخصومات، الكوبونات الإضافية، وضريبة القيمة المضافة (VAT) قبل الشراء للتسوق بذكاء." 
    : "Calculate final prices, total savings, and VAT instantly before you pay. Perfect for shopping discounts and coupons.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/shopping/discount`,
      languages: {
        'en': 'https://smartcalctools.xyz/en/calculators/shopping/discount',
        'ar': 'https://smartcalctools.xyz/ar/calculators/shopping/discount',
      },
    },
    openGraph: { title, description, url: `https://smartcalctools.xyz/${lang}/calculators/shopping/discount` }
  };
}

export default async function DiscountPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <SoftwareSchema
        name={isAr ? "حاسبة الخصم والضريبة الذكية" : "Smart Discount & VAT Calculator"}
        description={isAr ? "احسب السعر النهائي فوراً بعد إضافة الخصومات، الكوبونات الإضافية، وضريبة القيمة المضافة (VAT) قبل الشراء للتسوق بذكاء." : "Calculate final prices, total savings, and VAT instantly before you pay. Perfect for shopping discounts and coupons."}
        url={`https://smartcalctools.xyz/${lang}/calculators/shopping/discount`}
      />
      <FAQSchema
        faqData={isAr ? [
          {
            q: "هل أداة الحساب مجانية تماماً؟",
            a: "نعم، جميع الحسابات تتم محلياً في متصفحك مجاناً وبدون حاجة للاتصال بالإنترنت."
          },
          {
            q: "هل تجمعون الخصم الإضافي مع الخصم الأساسي؟",
            a: "لا، هذا خطأ رياضي. يتم خصم النسبة الأساسية أولاً، ثم تُطبق نسبة الكوبون الإضافي على السعر المتبقي."
          }
        ] : [
          {
            q: "Is this calculator completely free and secure?",
            a: "Yes. All mathematical processing happens locally inside your browser (Client-Side)."
          },
          {
            q: "Why don't you just add the two discount percentages together?",
            a: "Retail math strictly applies sequential discounting. Our calculator handles this sequencing automatically."
          }
        ]}
      />
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "var(--primary)" }}>{dict.discount.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.discount.subtitle}
        </p>
      </div>

      {/* Interactive Tool - Above the Fold */}
      <DiscountCalculator lang={lang} dict={dict} />

      <div style={{ marginTop: "32px", marginBottom: "16px" }}>
        <DisclaimerBox type="financial" lang={lang} />
      </div>

      {/* Massive AdSense SEO Content - Below the Fold */}
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>الدليل الشامل لحساب الخصومات التجارية والضرائب المضافة</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              سواء كنت تتسوق خلال مواسم التخفيضات الكبرى مثل "الجمعة البيضاء" أو تتصفح المتاجر الإلكترونية، فإن معرفة السعر النهائي الدقيق قبل الدفع يعد مهارة مالية ضرورية. أداة "حاسبة الخصم والضريبة" مصممة خصيصاً لمساعدتك على فك شفرة العروض التجارية المعقدة وتجنب فخ التسويق الوهمي.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>كيفية عمل خوارزمية الخصم وتكديس الكوبونات</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              تعتمد المتاجر أحياناً على تقديم خصم أساسي (مثلاً 50%) ثم تقدم كود خصم إضافي (مثلاً 10%). الخطأ الشائع هنا هو جمع الخصمين معاً لتوقع خصم بنسبة 60%، وهذا رياضياً وتجارياً غير صحيح. يتم حساب "الخصم الإضافي" من السعر الجديد المُخفّض وليس السعر الأصلي.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              <strong>المعادلة الرياضية للخصم المركب (Compound Discount):</strong><br/>
              السعر النهائي = السعر الأصلي × (1 - الخصم الأول) × (1 - الخصم الثاني)
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>تأثير ضريبة القيمة المضافة (VAT)</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              في العديد من الدول العربية والأوروبية، تفرض الحكومات ضريبة القيمة المضافة (VAT) بنسب تتراوح بين 5% إلى 15%. يتم احتساب هذه الضريبة دائماً كخطوة أخيرة <strong>بعد تطبيق كافة الخصومات</strong>. 
              تقوم حاسبتنا الذكية تلقائياً بتطبيق الضريبة في مرحلتها الصحيحة لتمنحك إجمالي المبلغ المطلوب دفعه عند نقطة البيع (POS).
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>حالات استخدام الأداة (Use Cases)</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>التسوق الإلكتروني (E-commerce):</strong> التأكد من صحة تطبيق أكواد الخصم الخاصة بالمؤثرين.</li>
              <li style={{ marginBottom: "8px" }}><strong>التجار وأصحاب المتاجر (Merchants):</strong> تسعير المنتجات لتحديد هامش الربح بعد الإعلان عن التخفيضات الموسمية.</li>
              <li style={{ marginBottom: "8px" }}><strong>حساب الجمارك السريع:</strong> إضافة نسب الضرائب الجمركية كنسبة مئوية موجبة على قيمة السلعة المستوردة.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل أداة الحساب مجانية تماماً؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>نعم، جميع الحسابات تتم محلياً في متصفحك مجاناً وبدون حاجة للاتصال بالإنترنت بعد تحميل الصفحة لضمان خصوصية بياناتك.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل تجمعون الخصم الإضافي مع الخصم الأساسي؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>لا، هذا خطأ رياضي. يتم خصم النسبة الأساسية أولاً، ثم تُطبق نسبة الكوبون الإضافي على السعر المتبقي لضمان دقة الفاتورة بنسبة 100%.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>لماذا السعر يختلف أحياناً عن عربة التسوق؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>أحياناً تقوم بعض المتاجر بإضافة رسوم شحن خفية أو رسوم خدمة لم يتم تضمينها في نسبة الخصم. حاسبتنا تعطيك ثمن السلعة الفعلي وتوفيرك الحقيقي.</p>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>The Comprehensive Guide to Shopping Discounts and VAT Calculation</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Whether you are hunting for Black Friday deals or managing an online shopping cart, knowing your exact final price before checkout is an essential financial skill. The Smart Discount & VAT Calculator is specifically engineered to help you decode complex retail offers, stack coupons correctly, and avoid marketing traps.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>The Mathematics of Coupon Stacking</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Retailers often advertise a "50% off storewide" sale, and then provide an "extra 10% off" promo code at checkout. A common misconception is adding these together for a 60% total discount. Mathematically, the additional coupon applies to the newly reduced subtotal, not the original MSRP.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              <strong>The Compound Discount Formula:</strong><br/>
              Final Price = Original Price × (1 - Primary Discount) × (1 - Extra Coupon)
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Understanding Value-Added Tax (VAT)</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              In many countries, governments mandate a Value-Added Tax (VAT) or General Sales Tax (GST) ranging from 5% to over 20%. Crucially, VAT is calculated <strong>after all discounts are applied</strong>. Our algorithmic calculator automatically ensures that the tax multiplier is applied at the correct final stage, giving you the exact out-of-pocket cost you will see at the Point of Sale (POS).
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Common Use Cases for this Tool</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Smart E-commerce Shopping:</strong> Verifying that influencer promo codes and loyalty discounts are calculated honestly by the merchant's checkout system.</li>
              <li style={{ marginBottom: "8px" }}><strong>Retail Management & Pricing:</strong> Store owners use this tool to calculate their final profit margins when setting up seasonal clearance events.</li>
              <li style={{ marginBottom: "8px" }}><strong>Corporate Purchasing:</strong> Quickly estimating final invoice amounts for B2B transactions involving wholesale trade discounts and local taxes.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Is this calculator completely free and secure?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Yes. All mathematical processing happens locally inside your browser (Client-Side). We do not track your input data or send your product prices to any server, ensuring absolute privacy.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why don't you just add the two discount percentages together?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Retail math strictly applies sequential discounting. Subtracting 50% and then an extra 20% results in a total saving of 60%, not 70%. Our calculator handles this sequencing automatically to prevent over-estimating your savings.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why is my final store receipt slightly different?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Some e-commerce platforms charge hidden processing fees or dynamic shipping costs that are immune to discount codes. This tool calculates the pure cost of the item itself.</p>
            </div>
          </>
        )}
      </article>

    </div>
  );
}

