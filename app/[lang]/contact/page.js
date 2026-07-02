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
          <div style={{ padding: "16px", background: "var(--surface-sunken)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <p style={{ margin: 0, fontWeight: "500", fontSize: "0.95rem" }}>
              {lang === "ar" 
                ? "💡 نفضل التواصل عبر النموذج المرفق لضمان وصول رسالتك للقسم المختص بأسرع وقت، وللحفاظ على مستوى عالٍ من الأمان (Zero-Trust)."
                : "💡 We prefer communication via the attached form to ensure your message reaches the right department quickly and to maintain a high level of security (Zero-Trust)."}
            </p>
          </div>
        </article>
        
        <ContactForm lang={lang} dict={dict} />
      </div>
    </div>
  );
}
