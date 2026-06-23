import { getDictionary } from "@/app/dictionaries";
import ContactForm from "@/app/components/ContactForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "اتصل بنا | أدوات الحساب الذكية" : "Contact Us | SmartCalcTools",
    description: isAr 
      ? "تواصل معنا للإبلاغ عن أي مشاكل أو اقتراح أدوات وحاسبات جديدة في موقع أدوات الحساب الذكية."
      : "Get in touch with the SmartCalcTools team. Send us feedback, business inquiries, or calculator feature requests."
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.contact;

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>
      <div className="grid-2">
        <article className="card" style={{ lineHeight: "1.8" }}>
          <h2 style={{ marginBottom: "16px" }}>{t.get_in_touch}</h2>
          <p style={{ marginBottom: "24px", color: "var(--text-muted)" }}>
            {t.desc}
          </p>
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "4px" }}>{t.email}</h4>
            <a href="mailto:support@smartcalctools.xyz" style={{ fontWeight: "600" }}>support@smartcalctools.xyz</a>
          </div>
          <div>
            <h4 style={{ marginBottom: "4px" }}>{t.business}</h4>
            <a href="mailto:business@smartcalctools.xyz" style={{ fontWeight: "600" }}>business@smartcalctools.xyz</a>
          </div>
        </article>
        
        <ContactForm />
      </div>
    </div>
  );
}
