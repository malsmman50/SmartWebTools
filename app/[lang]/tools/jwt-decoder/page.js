import { getDictionary } from "@/app/dictionaries";
import JwtDecoderClient from "@/app/components/JwtDecoderClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/jwt-decoder`,
      languages: {
        "en": `https://smartcalctools.xyz/en/tools/jwt-decoder`,
        "ar": `https://smartcalctools.xyz/ar/tools/jwt-decoder`,
      },
    },
    title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
    description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
    openGraph: {
      title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
      description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: isAr ? "مفكك وفاحص رموز JWT آمن دون اتصال" : "Secure Offline JWT Decoder",
      description: isAr 
      ? "قم بفك وتدقيق ومراجعة أكواد الـ JSON Web Tokens (JWT) بأمان تام محلياً وبخصوصية مطلقة داخل متصفحك."
      : "Decode and inspect JSON Web Tokens (JWT) entirely offline and securely in your browser.",
      images: ["/twitter-image.png"]
    }
  };
}

export default async function JwtDecoderPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  const t = dict.jwt;
  
  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "1400px" }}>
      <div className="page-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        
        <div style={{ marginTop: "20px", padding: "16px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", borderRadius: "var(--radius-sm)", color: "#b45309", textAlign: isAr ? "right" : "left", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem" }}>⚠️</span>
          <div>
            <strong style={{ display: "block", marginBottom: "4px" }}>
              {isAr ? "تنبيه أمني هام" : "Security Warning"}
            </strong>
            {isAr 
              ? "تقوم هذه الأداة بفك ترميز Base64Url فقط. هي لا تتحقق من التوقيع الرقمي (Signature) للرمز. فك تشفير البيانات لا يضمن صحتها أو عدم العبث بها. يجب دائماً التحقق من صحة التوقيع رقمياً على الخوادم الخاصة بك."
              : "This tool performs Base64Url decode only. It does NOT verify the cryptographic signature of the token. A decoded payload does not guarantee the token is authentic or untampered. Always perform signature verification on your backend server."}
          </div>
        </div>
      </div>

      <JwtDecoderClient lang={lang} dict={dict} />

      {/* Massive AdSense SEO Content - Below the Fold */}
      <div style={{ paddingBottom: "60px" }}>
        <article className="card" style={{ marginTop: "20px", padding: "40px", lineHeight: "1.8", borderTop: "4px solid var(--primary)" }}>
          {isAr ? (
            <>
              <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>الدليل الشامل لفهم وتفكيك رموز JWT</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                تعتبر رموز JSON Web Tokens (JWT) معياراً مفتوحاً (RFC 7519) لتبادل المعلومات بشكل آمن بين الأطراف ككائن JSON. تُستخدم هذه الرموز بكثافة في عمليات المصادقة (Authentication) وتخويل الصلاحيات (Authorization) في تطبيقات الويب الحديثة، خاصة في معمارية الخدمات المصغرة (Microservices) وواجهات برمجة التطبيقات (APIs). أداة تفكيك JWT مصممة لمساعدة المطورين على قراءة وفحص محتوى هذه الرموز بسرعة وبأمان تام.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>المنهجية التقنية: كيف يعمل فك التشفير؟</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                يتكون رمز JWT القياسي من ثلاثة أجزاء مفصولة بنقاط (<code>.</code>): <strong>الرأس (Header)</strong>، <strong>الحمولة (Payload)</strong>، و<strong>التوقيع (Signature)</strong>.
              </p>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>الرأس (Header):</strong> يحتوي عادةً على نوع الرمز وخوارزمية التوقيع المستخدمة (مثل HMAC SHA256 أو RSA).</li>
                <li style={{ marginBottom: "8px" }}><strong>الحمولة (Payload):</strong> تحتوي على المطالبات (Claims) وهي البيانات الفعلية التي يتم نقلها، مثل هوية المستخدم وتاريخ انتهاء الصلاحية.</li>
                <li style={{ marginBottom: "8px" }}><strong>التوقيع (Signature):</strong> يتم إنشاؤه عبر تشفير الرأس والحمولة باستخدام مفتاح سري لضمان عدم تلاعب أي طرف ثالث بالبيانات.</li>
              </ul>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                أداتنا تستخدم خوارزميات Base64Url لفك تشفير الرأس والحمولة وتحويلها إلى كائنات JSON قابلة للقراءة البشرية. <strong>ملاحظة هامة:</strong> فك التشفير هنا لا يعادل التحقق من صحة التوقيع الكريبتوغرافي؛ فهذه الأداة تعرض البيانات المخفية فقط ولكن لا تؤكد موثوقيتها بدون المفتاح السري الخاص بالخادم.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>سياسة الخصوصية (Zero-Trust Privacy)</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                تحتوي رموز JWT غالباً على بيانات حساسة جداً مثل عناوين البريد الإلكتروني للمستخدمين، أرقام الجلسات (Session IDs)، وصلاحيات الإدارة المرتفعة. فك تشفير هذه الرموز في مواقع إنترنت خارجية ترسل البيانات إلى خوادمها يُعد ثغرة أمنية خطيرة. 
                أداة SmartCalcTools تعمل بمبدأ (Zero-Trust) حيث يتم فك التشفير <strong>محلياً بنسبة 100% داخل ذاكرة المتصفح (Client-Side)</strong>. لن يتم إرسال أو تخزين أي رمز تقوم بلصقه هنا إلى أي خادم أو قاعدة بيانات إطلاقاً.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>حالات الاستخدام الشائعة للمطورين</h3>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>فحص توقيت الانتهاء:</strong> التحقق من حقل <code>exp</code> (Expiration Time) لمعرفة ما إذا كان الرمز قد انتهت صلاحيته ولماذا تفشل عمليات تسجيل الدخول.</li>
                <li style={{ marginBottom: "8px" }}><strong>تدقيق صلاحيات المستخدم (Roles):</strong> التأكد من أن مزود الهوية (مثل Auth0 أو Firebase) قد أدرج الصلاحيات الصحيحة داخل حمولة الرمز قبل إرساله للـ API.</li>
                <li style={{ marginBottom: "8px" }}><strong>التأكد من التنسيق:</strong> اكتشاف المشاكل التنسيقية الناتجة عن أخطاء النسخ واللصق، خاصة عند انتقال الرموز عبر أنظمة الـ Headers في بروتوكول HTTP.</li>
              </ul>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>ما هو حقل `exp` وكيف يتم حسابه؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>حقل <code>exp</code> يشير إلى وقت انتهاء الصلاحية. يُكتب بتنسيق (Unix Epoch Time) وهو عدد الثواني التي مرت منذ الأول من يناير 1970. أداتنا تقوم بتحويل هذا الرقم تلقائياً إلى توقيتك المحلي ليسهل قراءته.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل فك التشفير يعني أن الرمز آمن أو صالح؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>لا. فك تشفير الـ Base64 هو مجرد ترجمة للنص ليصبح مقروءاً. لكي تعتبر الرمز "صالحاً" يجب على الخادم التحقق من التوقيع الرقمي في الجزء الثالث من الرمز باستخدام المفتاح السري الذي لا يملكه سوى الخادم.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>لماذا يبدو الرمز الخاص بي كنص مشفر وغير مفهوم؟</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>لأن رموز JWT يتم ترميزها بصيغة Base64Url لكي تكون مضغوطة وتنتقل بسهولة وآمان عبر روابط URL وترويسات HTTP بدون التسبب في أخطاء برمجية أو تداخل مع أحرف الويب الخاصة.</p>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>The Complete Guide to Understanding and Decoding JWTs</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. These tokens are heavily utilized for Authentication and Authorization in modern web architectures, especially within Microservices and stateless APIs. Our JWT Decoder tool is engineered to help developers instantly read and audit the contents of these tokens securely.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Technical Methodology: How Decoding Works</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                A standard JWT consists of three parts separated by dots (<code>.</code>): the <strong>Header</strong>, the <strong>Payload</strong>, and the <strong>Signature</strong>.
              </p>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Header:</strong> Typically consists of two parts: the type of the token (JWT) and the signing algorithm being used (e.g., HMAC SHA256 or RSA).</li>
                <li style={{ marginBottom: "8px" }}><strong>Payload:</strong> Contains the claims. Claims are statements about an entity (typically, the user) and additional data (e.g., email, expiration time).</li>
                <li style={{ marginBottom: "8px" }}><strong>Signature:</strong> Created by taking the encoded header, the encoded payload, a secret, and the algorithm specified in the header to ensure the data wasn't tampered with along the way.</li>
              </ul>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                Our tool uses Base64Url decoding algorithms to translate the Header and Payload back into human-readable JSON objects. <strong>Important Note:</strong> Decoding a JWT is not the same as verifying its cryptographic signature. This tool reveals the hidden data but cannot confirm its authenticity without the backend server's secret key.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Zero-Trust Privacy Policy</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
                JWTs frequently contain highly sensitive user claims, such as email addresses, session IDs, and elevated administrative privileges. Pasting these tokens into a remote server for decoding is a major security vulnerability. 
                SmartCalcTools operates on a strict Zero-Trust principle. Decoding happens <strong>100% locally within your browser's memory (Client-Side)</strong>. The tokens you paste here are never transmitted, logged, or stored on any server or database.
              </p>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Common Developer Use Cases</h3>
              <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
                <li style={{ marginBottom: "8px" }}><strong>Inspecting Expiration Times:</strong> Checking the <code>exp</code> claim to determine if a token has expired, which is critical when debugging sudden 401 Unauthorized errors in frontend apps.</li>
                <li style={{ marginBottom: "8px" }}><strong>Auditing User Roles:</strong> Verifying that an identity provider (like Auth0 or Firebase) has successfully injected the correct roles and permissions into the token's payload before sending it to the backend API.</li>
                <li style={{ marginBottom: "8px" }}><strong>Formatting Verification:</strong> Catching truncation or formatting issues caused by improper copy-pasting or malformed HTTP Authorization headers.</li>
              </ul>

              <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>What is the `exp` claim and how is it formatted?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>The <code>exp</code> (Expiration Time) claim identifies the time on or after which the JWT must not be accepted for processing. It is written in Unix Epoch Time (the number of seconds since Jan 1, 1970). Our tool automatically converts this timestamp into your local, human-readable timezone.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Does decoding a JWT mean it is secure or valid?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>No. Base64Url decoding simply translates the text so you can read it. To consider a token "valid," a backend server must mathematically verify the digital signature using the secret key it holds. Decoding merely shows you what the token claims to be.</p>

                <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why does my JWT look like gibberish before decoding?</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>JWTs are encoded using Base64Url to ensure they are compact, URL-safe, and HTTP-header safe. This encoding prevents complex JSON characters (like quotes and brackets) from breaking web protocols during transmission.</p>
              </div>
            </>
          )}
        </article>

        {/* JSON-LD Structured Data for AdSense SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": isAr ? [
            {
              "@type": "Question",
              "name": "ما هو حقل `exp` وكيف يتم حسابه؟",
              "acceptedAnswer": { "@type": "Answer", "text": "حقل exp يشير إلى وقت انتهاء الصلاحية ويُكتب بتنسيق (Unix Epoch Time). أداتنا تقوم بتحويل هذا الرقم تلقائياً إلى توقيتك المحلي." }
            },
            {
              "@type": "Question",
              "name": "هل فك التشفير يعني أن الرمز آمن أو صالح؟",
              "acceptedAnswer": { "@type": "Answer", "text": "لا. لكي تعتبر الرمز صالحاً يجب التحقق من التوقيع الرقمي باستخدام المفتاح السري الموجود فقط على الخادم." }
            }
          ] : [
            {
              "@type": "Question",
              "name": "What is the `exp` claim and how is it formatted?",
              "acceptedAnswer": { "@type": "Answer", "text": "The exp claim identifies the expiration time in Unix Epoch Time. Our tool automatically converts this into your local timezone." }
            },
            {
              "@type": "Question",
              "name": "Does decoding a JWT mean it is secure or valid?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. To consider a token valid, a backend server must verify the digital signature using a secret key." }
            }
          ]
        }).replace(/</g, '\\u003c')}} />
      </div>
    </div>
  );
}

