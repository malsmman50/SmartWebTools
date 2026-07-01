import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "سياسة الخصوصية | أدوات الحساب الذكية" : "Privacy Policy | SmartCalcTools",
    description: isAr 
      ? "سياسة الخصوصية الخاصة بموقع أدوات الحساب الذكية. نحن نضمن عدم جمع أو حفظ أي بيانات خاصة بك بفضل معالجتنا المحلية بالكامل."
      : "Our privacy policy detailing how SmartCalcTools protects your data using 100% client-side Zero Trust architecture."
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.privacy;
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", lineHeight: "1.8" }}>
      <h1>{t.title}</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{isAr ? "آخر تحديث: 1 يوليو 2026" : "Last Updated: July 1, 2026"}</p>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section1_title}</h2>
        <p>{t.section1_desc1}</p>
        <p style={{ marginTop: "12px" }}>{t.section1_desc2}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section2_title}</h2>
        <p>{t.section2_desc1}</p>
        <p style={{ marginTop: "12px" }}>{t.section2_desc2}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section3_title}</h2>
        <p>{t.section3_desc}</p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{isAr ? "الإعلانات وملفات تعريف الارتباط (Cookies)" : "Advertising and Cookies"}</h2>
        <p style={{ marginBottom: "12px" }}>
          {isAr 
            ? "العمليات الحسابية ومعالجة الملفات تتم 100% داخل جهازك بخصوصية تامة ولا نرى أي بيانات مدخلة. ومع ذلك، لكي نتمكن من إبقاء الموقع مجانياً، نحن نستخدم خدمة Google AdSense لعرض الإعلانات."
            : "Your calculations and file processing occur 100% locally on your device with complete privacy. However, to keep this site free, we use Google AdSense to display advertisements."}
        </p>
        <p style={{ marginBottom: "12px" }}>
          {isAr
            ? "تستخدم شبكة Google وشركاؤها الخارجيون ملفات تعريف الارتباط (Cookies) لعرض الإعلانات بناءً على زياراتك السابقة لموقعنا أو لمواقع أخرى على الإنترنت. يتيح استخدام ملفات تعريف الارتباط الإعلانية لشركة Google وشركائها عرض إعلانات لك بناءً على اهتماماتك."
            : "Google and its third-party partners use cookies to serve ads based on your prior visits to our site or other websites on the internet. The use of advertising cookies enables Google and its partners to serve ads based on your interests."}
        </p>
        <ul style={{ paddingInlineStart: "20px", marginBottom: "12px" }}>
          <li>
            {isAr 
              ? "يمكنك إلغاء الاشتراك في الإعلانات المخصصة عن طريق زيارة " 
              : "You can opt out of personalized advertising by visiting "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              {isAr ? "إعدادات الإعلانات من جوجل" : "Google Ads Settings"}
            </a>.
          </li>
          <li style={{ marginTop: "8px" }}>
            {isAr
              ? "كما يمكنك إلغاء الاشتراك في استخدام بعض موفري الخدمات الخارجيين لملفات تعريف الارتباط للإعلانات المخصصة عن طريق زيارة موقع "
              : "Alternatively, you can opt out of some third-party vendor's use of cookies for personalized advertising by visiting "}
            <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
          </li>
        </ul>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{isAr ? "حقوق حماية البيانات بموجب اللائحة العامة لحماية البيانات (GDPR)" : "GDPR Data Protection Rights"}</h2>
        <p style={{ marginBottom: "12px" }}>
          {isAr 
            ? "نود التأكد من أنك على دراية تامة بجميع حقوق حماية البيانات الخاصة بك. يحق لكل مستخدم ما يلي:"
            : "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:"}
        </p>
        <ul style={{ paddingInlineStart: "20px", marginBottom: "12px" }}>
          <li><strong>{isAr ? "الحق في الوصول:" : "The right to access:"}</strong> {isAr ? "يحق لك طلب نسخ من بياناتك الشخصية (رغم أننا لا نجمع أياً منها في حاسباتنا)." : "You have the right to request copies of your personal data (though we collect none in our calculators)."}</li>
          <li style={{ marginTop: "8px" }}><strong>{isAr ? "الحق في التصحيح:" : "The right to rectification:"}</strong> {isAr ? "يحق لك أن تطلب منا تصحيح أي معلومات تعتقد أنها غير دقيقة." : "You have the right to request that we correct any information you believe is inaccurate."}</li>
          <li style={{ marginTop: "8px" }}><strong>{isAr ? "الحق في المسح:" : "The right to erasure:"}</strong> {isAr ? "يحق لك أن تطلب منا مسح بياناتك الشخصية في ظل ظروف معينة." : "You have the right to request that we erase your personal data, under certain conditions."}</li>
          <li style={{ marginTop: "8px" }}><strong>{isAr ? "الحق في تقييد المعالجة:" : "The right to restrict processing:"}</strong> {isAr ? "يحق لك أن تطلب منا تقييد معالجة بياناتك الشخصية." : "You have the right to request that we restrict the processing of your personal data."}</li>
        </ul>
        <p>
          {isAr 
            ? "نحن نستخدم Google Consent Mode v2 لضمان احترام تفضيلاتك في استخدام ملفات تعريف الارتباط."
            : "We utilize Google Consent Mode v2 to ensure your cookie preferences are respected."}
        </p>
      </section>
      
      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{isAr ? "مراقب البيانات والاتصال بنا" : "Data Controller & Contact Us"}</h2>
        <p>
          {isAr 
            ? "جهة التحكم في البيانات المسؤولة عن هذا الموقع هي إدارة SmartCalcTools. إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، فلا تتردد في الاتصال بنا عبر نموذج الاتصال في صفحة 'اتصل بنا'."
            : "The Data Controller responsible for this website is the administration of SmartCalcTools. If you have any questions about this Privacy Policy, please contact us via the contact form on our 'Contact Us' page."}
        </p>
      </section>
    </div>
  );
}
