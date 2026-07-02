import { getDictionary } from "@/app/dictionaries";
import DiscountCalculator from "@/app/components/DiscountCalculator";

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
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{dict.discount.title}</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          {dict.discount.subtitle}
        </p>
      </div>

      <DiscountCalculator lang={lang} dict={dict} />
    </div>
  );
}
