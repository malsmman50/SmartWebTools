import { getDictionary } from "@/app/dictionaries";
import PasswordGeneratorClient from "@/app/components/PasswordGeneratorClient";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/password-generator`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/password-generator`,
        "ar": `https://smartcalctools.xyz/ar/tools/password-generator`,
      },
    },
    title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
    description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
    openGraph: {
      title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
      description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مولد كلمة المرور المعقدة والآمنة محلياً" : "Secure Password Generator",
      description: isAr 
      ? "أنشئ كلمات مرور عشوائية معقدة ومحمية تشفيرياً بالكامل في متصفحك دون إرسال أي بيانات أو الاتصال بالخادم."
      : "Generate cryptographically secure random passwords in your browser entirely offline and securely.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function PasswordGeneratorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  const t = dict.password;
  
  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema 
        name={isAr ? "مولد كلمات المرور" : "Password Generator"}
        description={isAr ? "مولد كلمات مرور قوية وآمنة مجاناً" : "Strong and secure random password generator"}
        applicationCategory="UtilityApplication"
        url={`https://smartcalctools.xyz/${lang}/tools/password-generator`}
      />

      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <PasswordGeneratorClient lang={lang} dict={dict} />

      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>الدليل الشامل لتوليد وحماية كلمات المرور</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              في عصر تتزايد فيه الهجمات السيبرانية واختراقات البيانات (Data Breaches)، لم يعد استخدام كلمات المرور البسيطة أو المكررة خياراً آمناً. أداة "مولد كلمات المرور المعقدة" مصممة لتوليد سلاسل نصية عشوائية قوية للغاية يصعب على أي حاسوب فك تشفيرها باستخدام هجمات القوة الغاشمة (Brute Force Attacks) أو هجمات القاموس.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>لماذا نستخدم مولد كلمة المرور العشوائية؟</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              يميل البشر بطبيعتهم لاختيار كلمات مرور سهلة التذكر، مثل الكلمات الشائعة في القاموس أو تواريخ الميلاد. تستخدم المخترقون برامج آلية سريعة لتخمين هذه الأنماط.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              تعتمد أداتنا على واجهة التشفير المضمنة في المتصفح (<code>window.crypto</code>) لتوليد رموز عشوائية تماماً ومستحيلة التخمين، مما يضمن أماناً فائقاً لحساباتك.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>المنهجية التقنية: العشوائية المشفرة</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              العديد من أدوات توليد كلمات المرور القديمة تعتمد على دالة <code>Math.random()</code> الموجودة في لغات البرمجة القياسية. هذه الدالة تُعرف بأنها (Pseudo-Random) وتعتبر غير آمنة تشفيرياً لأنه يمكن التنبؤ بنمط العشوائية الخاص بها.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              أداتنا تستخدم واجهة <strong>Web Crypto API</strong> الحديثة والمدمجة في المتصفحات (تحديداً دالة <code>window.crypto.getRandomValues()</code>). هذا النظام يعتمد على مصادر إنتروبيا (Entropy) عالية جداً مأخوذة من نظام التشغيل الخاص بك لضمان عشوائية حقيقية رياضياً (CSPRNG) لا يمكن لأي مخترق التنبؤ بها.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>سياسة الخصوصية الصارمة (Zero-Trust)</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              توليد كلمات المرور عبر مواقع الإنترنت يمثل خطراً إذا تم إرسال كلمة المرور إلى الخادم (Server-side Generation) لأنه قد يتم حفظها في سجلات الشبكة. لذلك، قمنا ببناء هذه الأداة لتعمل <strong>محلياً بنسبة 100% داخل ذاكرة المتصفح الخاص بك (Client-Side)</strong>. 
              بمجرد تحميل الصفحة، يمكنك قطع الاتصال بالإنترنت تماماً وستستمر الأداة في العمل بشكل مثالي. لا يتم إرسال، أو تتبع، أو تخزين أي كلمة مرور تولدها هنا.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>استخدامات الأداة في بيئة العمل التقنية</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>إدارة الخوادم:</strong> إنشاء كلمات مرور معقدة لحسابات الجذور (Root/Admin) في خوادم Linux وقواعد البيانات.</li>
              <li style={{ marginBottom: "8px" }}><strong>تأمين الشبكات:</strong> توليد مفاتيح تشفير (WPA3/WPA2) قوية وعشوائية لشبكات الـ Wi-Fi المؤسسية لمنع اختراقات القوة الغاشمة.</li>
              <li style={{ marginBottom: "8px" }}><strong>ملفات البيئة (.env):</strong> بناء سلاسل نصية عشوائية بطول 64 حرفاً لاستخدامها كـ (Secret Keys) لتوقيع رموز الـ JWT وتأمين جلسات المستخدمين في تطبيقات الويب.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>ما الذي يجعل كلمة المرور قوية رياضياً؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>تُقاس قوة كلمة المرور بمدى الإنتروبيا (Entropy) الخاص بها، والذي يعتمد على عاملين: الطول وتنوع الأحرف (حروف كبيرة، صغيرة، أرقام، رموز). كلمة مرور من 16 حرفاً عشوائياً تحتاج إلى تريليونات السنين لفك تشفيرها بالحواسيب الحالية.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل من الآمن توليد كلمة مرور لمدير قاعدة البيانات هنا؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>نعم وبكل تأكيد. نظراً لأن الأداة تعتمد على واجهة التشفير الخاصة بمتصفحك ولا ترسل أي بيانات عبر الشبكة، فإن كلمة المرور الخاصة بك لا تُرى إلا من قبلك.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>لماذا لا ينبغي أن أبتكر كلمة مرور معقدة بنفسي؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>العقل البشري يميل للأنماط (Patterns) والتسلسلات القابلة للتنبؤ. القراصنة يستخدمون قواميس ضخمة وخوارزميات تحليل تعرف كيف يدمج البشر التواريخ، الأسماء، والأرقام الشائعة، مما يجعل الكلمات المبتكرة بشرياً سهلة الاختراق مقارنة بالعشوائية الحقيقية.</p>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>The Comprehensive Guide to Cryptographically Secure Password Generation</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              In an era dominated by automated cyberattacks and massive data breaches, relying on simple or reused passwords is no longer a viable security option. Our Secure Password Generator tool is explicitly designed to output highly randomized strings that are virtually impervious to dictionary attacks and brute-force cracking techniques.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Why Use a Cryptographic Password Generator?</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Humans are prone to selecting easily guessable passwords, such as keyboard walks, common dictionary words, or personal dates. Hackers use automated tools to exploit these predictable patterns.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Our tool leverages the browser's built-in cryptographic API (<code>window.crypto</code>) to generate completely random and unpredictable passwords locally, ensuring absolute security.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Technical Methodology: Cryptographic Randomness</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Many legacy password generation scripts rely on the standard <code>Math.random()</code> function. In computer science, this is known as a Pseudo-Random Number Generator (PRNG) and is notoriously predictable and cryptographically unsafe.
            </p>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Our tool instead leverages the modern <strong>Web Crypto API</strong> natively built into modern browsers (specifically <code>window.crypto.getRandomValues()</code>). This guarantees Cryptographically Secure Pseudo-Random Number Generation (CSPRNG), pulling high-quality entropy from your underlying operating system to ensure true mathematical randomness.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Zero-Trust Privacy Architecture</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Generating passwords via a remote server introduces a massive vulnerability, as the generated plaintext string could be intercepted over the network or logged in a database. 
              Our platform enforces a strict Zero-Trust policy: the entire generation algorithm executes <strong>100% locally within your browser's RAM (Client-Side)</strong>. You can even disconnect from the internet after the page loads and the tool will continue to function perfectly. No data leaves your machine.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Common Use Cases for IT Professionals</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Infrastructure Security:</strong> Provisioning robust master passwords for root database instances (PostgreSQL, MySQL) and Linux server SSH keys.</li>
              <li style={{ marginBottom: "8px" }}><strong>Environment Secrets:</strong> Generating long, high-entropy 64+ character strings to use as JWT signing secrets or API backend salts in <code>.env</code> files.</li>
              <li style={{ marginBottom: "8px" }}><strong>Wi-Fi Network Hardening:</strong> Creating random WPA2/WPA3 enterprise keys that are immune to offline dictionary cracking.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>What makes a password mathematically secure?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Password strength is measured in Entropy. High entropy requires both length and a diverse character pool (uppercase, lowercase, numbers, and symbols). A 16-character truly random password would take modern supercomputers trillions of years to guess.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Is it safe to use this tool for my master database password?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Yes, absolutely. Because the randomness is generated by your local browser and never transmitted over any network, you are the only entity that will ever see the resulting string.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why shouldn't I just create a complex password myself?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>The human brain inherently relies on patterns, logic, and memorable sequences. Attackers use sophisticated algorithms and massive dictionaries that know exactly how humans substitute letters for numbers or append dates, making human-generated passwords much easier to crack.</p>
            </div>
          </>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": isAr ? [
          {
            "@type": "Question",
            "name": "ما الذي يجعل كلمة المرور قوية رياضياً؟",
            "acceptedAnswer": { "@type": "Answer", "text": "تُقاس قوة كلمة المرور بمدى الإنتروبيا والذي يعتمد على عاملين: الطول وتنوع الأحرف. كلمة مرور طويلة وعشوائية تحتاج لزمن هائل لفكها." }
          },
          {
            "@type": "Question",
            "name": "هل من الآمن توليد كلمة مرور لمدير قاعدة البيانات هنا؟",
            "acceptedAnswer": { "@type": "Answer", "text": "نعم، لأن الأداة تعتمد على واجهة التشفير الخاصة بمتصفحك ولا ترسل أي بيانات عبر الشبكة إطلاقاً." }
          }
        ] : [
          {
            "@type": "Question",
            "name": "What makes a password mathematically secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Password strength is measured in Entropy, which requires both length and a diverse character pool." }
          },
          {
            "@type": "Question",
            "name": "Is it safe to use this tool for my master database password?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Because the randomness is generated locally and never transmitted over any network." }
          }
        ]
      }).replace(/</g, '\\u003c')}} />

      <FAQSchema faqs={isAr ? [
        { question: "هل يتم حفظ كلمات المرور؟", answer: "لا، يتم توليد كلمات المرور عشوائياً في متصفحك ولا يتم حفظها أو إرسالها لأي خادم." }
      ] : [
        { question: "Are the passwords saved?", answer: "No, passwords are generated randomly in your browser and are not saved or sent to any server." }
      ]} />
    </div>
  );
}

