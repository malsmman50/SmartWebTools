import { getDictionary } from "@/app/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr ? "شروط الخدمة | أدوات الحساب الذكية" : "Terms of Service | SmartCalcTools",
    description: isAr 
      ? "شروط وإرشادات استخدام موقع أدوات الحساب الذكية وإخلاء المسؤولية القانونية والشرعية للحاسبات."
      : "Terms and conditions for using SmartCalcTools."
  };
}

export default async function TermsOfServicePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.terms;
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", lineHeight: "1.8" }}>
      <h1>{t.title}</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{isAr ? "آخر تحديث: 1 يوليو 2026" : "Last Updated: July 1, 2026"}</p>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{t.section1_title}</h2>
        <p>{t.section1_desc}</p>
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
        <h2>{isAr ? "الملكية الفكرية" : "Intellectual Property Rights"}</h2>
        <p>
          {isAr
            ? "جميع المحتويات والمقالات والتصميمات والأكواد البرمجية المتوفرة على SmartCalcTools هي ملكية فكرية حصرية للموقع. لا يُسمح بنسخ أو إعادة إنتاج أو توزيع أي من موادنا دون إذن كتابي مسبق. يُسمح بمشاركة الروابط المؤدية إلى حاسباتنا ومقالاتنا على وسائل التواصل الاجتماعي بحرية."
            : "All content, articles, designs, and source codes available on SmartCalcTools are the exclusive intellectual property of the website. Copying, reproducing, or distributing any of our materials without prior written permission is strictly prohibited. Sharing links to our calculators and articles on social media is freely permitted."}
        </p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{isAr ? "تحديد المسؤولية" : "Limitation of Liability"}</h2>
        <p>
          {isAr
            ? "لا يتحمل موقع SmartCalcTools ولا أي من مطوريه أو وكلائه بأي حال من الأحوال المسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية تنشأ عن استخدامك للحاسبات والأدوات الموجودة في الموقع. يتم توفير المعلومات والأدوات 'كما هي' دون أي ضمانات صريحة أو ضمنية."
            : "In no event shall SmartCalcTools, nor its developers or agents, be liable for any direct, indirect, incidental, or consequential damages arising out of your use of the calculators and tools on the website. The information and tools are provided 'as is' without any express or implied warranties."}
        </p>
      </section>

      <section className="card" style={{ marginBottom: "32px" }}>
        <h2>{isAr ? "القانون الحاكم" : "Governing Law"}</h2>
        <p>
          {isAr
            ? "تخضع هذه الشروط وتُفسر وفقاً للقوانين المعمول بها دولياً لحماية الملكية الفكرية وقواعد استخدام الإنترنت، دون إعمال أي مبادئ لتعارض القوانين. استخدامك للموقع يعني موافقتك الخالصة على هذه الشروط."
            : "These terms shall be governed and construed in accordance with internationally recognized intellectual property laws and internet usage rules, without regard to its conflict of law provisions. Your use of the website constitutes your absolute agreement to these terms."}
        </p>
      </section>
    </div>
  );
}
