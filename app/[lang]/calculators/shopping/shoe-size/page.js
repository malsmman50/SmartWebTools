import { getDictionary } from "@/app/dictionaries";
import ShoeSizeConverter from "@/app/components/ShoeSizeConverter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import SoftwareSchema from "@/app/components/SEO/SoftwareSchema";
import FAQSchema from "@/app/components/SEO/FAQSchema";
import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  
  return {
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/calculators/shopping/shoe-size`,
      languages: {
        "en": `https://smartcalctools.xyz/en/calculators/shopping/shoe-size`,
        "ar": `https://smartcalctools.xyz/ar/calculators/shopping/shoe-size`,
      },
    },
    title: isAr ? "محول مقاسات الأحذية العالمي | SmartCalcTools" : "Global Shoe Size Converter | SmartCalcTools",
    description: isAr ? "حول مقاسات الأحذية بين الأوروبي والأمريكي والبريطاني." : "Convert shoe sizes instantly between US, UK, EU, and CM.",
  };
}

export default async function ShoeSizePage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);
  
  // Read PSEO links
  const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
  let pseoLinks = [];
  try {
    const fileContent = fs.readFileSync(pseoPath, "utf-8");
    pseoLinks = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading PSEO shoe sizes:", error);
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <SoftwareSchema
        name={dict.everyday?.shoe_size_title || "Global Shoe Size Converter"}
        description={dict.everyday?.shoe_size_desc || "Convert shoe sizes instantly between US, UK, EU, and CM."}
        url={`https://smartcalctools.xyz/${lang}/calculators/shopping/shoe-size`}
      />
      <FAQSchema
        faqData={isAr ? [
          {
            q: "كيف أقيس قدمي في المنزل بدقة؟",
            a: "ضع ورقة بيضاء مقابل الحائط وقف عليها، ثم ضع علامة عند أطول إصبع. قِس المسافة بالسنتيمتر في نهاية اليوم."
          },
          {
            q: "هل يجب أن تلامس أصابعي مقدمة الحذاء؟",
            a: "إطلاقاً. يجب أن تترك مسافة تعادل عرض إبهام اليد (حوالي 1 سم) بين أطول إصبع ومقدمة الحذاء."
          }
        ] : [
          {
            q: "How do I accurately measure my own foot at home?",
            a: "Stand on a piece of paper with your heel against a wall. Mark the tip of your longest toe and measure in centimeters at the end of the day."
          },
          {
            q: "Should my toes touch the end of the shoe?",
            a: "No. There should be roughly a thumb's width of space between your longest toe and the front interior of the shoe."
          }
        ]}
      />
      <h1 style={{ textAlign: "center", marginBottom: "16px", color: "var(--primary)" }}>
        {dict.everyday?.shoe_size_title || "Global Shoe Size Converter"}
      </h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto" }}>
        {dict.everyday?.shoe_size_desc || "Convert shoe sizes instantly between US, UK, EU, and CM."}
      </p>

      <ShoeSizeConverter isAr={isAr} dict={dict} />

      <div style={{ marginTop: "32px", marginBottom: "16px" }}>
        <DisclaimerBox type="health" lang={lang} />
      </div>

      {/* Massive AdSense SEO Content - Below the Fold */}
      <article className="card guide-article blog-content">
        {isAr ? (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>الدليل الشامل لتحويل مقاسات الأحذية العالمية: القياس الدقيق للقدم</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              شراء الأحذية دولياً أو عبر الإنترنت يمكن أن يكون تجربة محبطة للغاية بسبب معايير القياس المتضاربة والتي تعود لقرون مضت. المقاس الأمريكي 9 ليس مقياساً عالمياً، وشراء الأحذية من الأسواق الأوروبية أو الآسيوية غالباً ما يبدو كالتخمين. تم تصميم "محول مقاسات الأحذية الشامل" لسد الفجوة الهائلة بين الأنظمة الأمريكية والبريطانية والأوروبية والآسيوية بدقة علمية.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>منهجية القياس: تاريخ أنظمة الأحذية</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              لا تعتمد مقاسات الأحذية على أرقام عشوائية، بل هي متجذرة في أنظمة قياس تاريخية تطورت بشكل مستقل:
            </p>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>نظام حبة الشعير (Barleycorn) في أمريكا وبريطانيا:</strong> يعود هذا النظام للعصور الوسطى، حيث تساوي حبة الشعير ثلث بوصة (8.46 ملم). المقاسات تزيد بمقدار حبة شعير واحدة لكل نمرة. وبسبب اختلاف نقاط البداية، فالمقاس الأمريكي 9 يساوي رياضياً المقاس البريطاني 8.</li>
              <li style={{ marginBottom: "8px" }}><strong>نظام نقطة باريس (Paris Point) في أوروبا:</strong> تم اعتماده في فرنسا، والنقطة الواحدة تساوي ثلثي السنتيمتر (6.67 ملم). لأن 6.67 ملم لا تتوافق رياضياً مع 8.46 ملم، يستحيل وجود تحويل مباشر بأرقام صحيحة، ولهذا يتحول المقاس الأمريكي 9 إلى المقاس الأوروبي المعقد 42.5.</li>
              <li style={{ marginBottom: "8px" }}><strong>نظام موندوبوينت (Mondopoint) الآسيوي والعسكري:</strong> هو النظام العلمي الوحيد والمعتمد عسكرياً (NATO)، حيث يقيس طول القدم وعرضها الفعلي بالمليمترات (مثال: 280/110). نحن نستخدم هذا المبدأ داخلياً لتحقيق أقصى درجات الدقة في حاسبتنا.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>سيناريوهات الاستخدام العملية</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>شراء الأحذية الرياضية مقابل الكلاسيكية:</strong> الأحذية الرياضية تتطلب مساحة إضافية لتمدد القدم أثناء الركض (عادة نصف مقاس أكبر). بينما الأحذية الكلاسيكية الإيطالية غالباً ما تكون أضيق وتتطلب مقاساً دقيقاً أو أصغر بنصف درجة.</li>
              <li style={{ marginBottom: "8px" }}><strong>توفير المال بشراء مقاسات الأطفال:</strong> يمكن للنساء ذوات الأقدام الصغيرة (مثال: مقاس أمريكي 7.5) شراء نفس تصميم الحذاء الرياضي من قسم "الأولاد" (مقاس 6) بتكلفة أقل بكثير.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>الأسئلة الشائعة (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>كيف أقيس قدمي في المنزل بدقة؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>ضع ورقة بيضاء مقابل الحائط على أرضية صلبة. قف عليها بحيث يلامس كعبك الحائط، ثم ضع علامة عند أطول إصبع (قد لا يكون الإبهام للجميع). قِس المسافة بالسنتيمتر في نهاية اليوم عندما تكون القدم في أكبر حجم طبيعي لها.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>لماذا تختلف المقاسات بين الماركات التجارية المختلفة لنفس الرقم؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>تستخدم كل شركة تصنيع نموذجاً خشبياً أو رقمياً ثلاثي الأبعاد يُعرف باسم (Last) لبناء الحذاء. الأنظمة العالمية تقيس الطول الثنائي الأبعاد فقط وتتجاهل العرض، وارتفاع التقوس، وحجم صندوق أصابع القدم الخاص بكل علامة تجارية.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>هل يجب أن تلامس أصابعي مقدمة الحذاء؟</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>إطلاقاً. للحفاظ على صحة القدمين ومنع انغراز الأظافر، يجب أن تترك مسافة تعادل عرض إبهام اليد (حوالي 1 سم) بين أطول إصبع ومقدمة الحذاء عند الوقوف.</p>
            </div>
            
            <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>تنويه طبي حول مقاسات الأحذية</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              التحويلات المقدمة في هذه الأداة تعتمد على الخوارزميات الرياضية والمعايير الصناعية التقريبية. يختلف القياس باختلاف الماركة، ونوعية النسيج المصنوع منه الحذاء، وشكل القوس الطبيعي للقدم. نوصي دائماً بقراءة دليل المقاسات الخاص بالعلامة التجارية وتجربة الأحذية فعلياً متى ما أمكن.
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Comprehensive Shoe Size Converter: The International Foot Measurement Guide</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Shopping for footwear internationally can be an incredibly frustrating experience due to conflicting, centuries-old sizing standards. A US Men's 9 is not a universal metric, and buying shoes from European or Asian markets often feels like a guessing game. This Comprehensive Shoe Size Converter is engineered to bridge the massive gap between US, UK, European (EU), and Asian sizing systems by leveraging historical footwear algorithms alongside modern manufacturing standards.
            </p>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>The Science and Methodology of Global Shoe Sizing</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              Shoe sizing is rooted in distinct historical measurement systems that have evolved independently:
            </p>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>The Barleycorn System (US & UK Origins):</strong> Originating in medieval England, a "barleycorn" is exactly 1/3 of an inch (8.46 millimeters). A US Men's size 9 is mathematically equivalent to a UK size 8.</li>
              <li style={{ marginBottom: "8px" }}><strong>The Paris Point System (Europe):</strong> Adopted by the French shoemaking industry, the Paris Point equals 2/3 of a centimeter (6.67 millimeters). Because 6.67 mm does not align cleanly with 8.46 mm, a direct integer-based conversion is mathematically impossible.</li>
              <li style={{ marginBottom: "8px" }}><strong>The Mondopoint System (Asia & Military Standard):</strong> The only scientifically rational standard, Mondopoint measures the foot's exact anatomical length and width in raw millimeters (e.g., 280/110). Our conversion tool translates your sizes into raw millimeters first to ensure maximum accuracy.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Practical Sizing Scenarios for Global Shoppers</h3>
            <ul style={{ color: "var(--text-muted)", marginBottom: "16px", paddingInlineStart: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong>Athletic Sneakers vs. Formal Dress Shoes:</strong> Running shoes require extra internal volume for the foot to swell and splay upon high-impact strikes (often requiring you to size up 0.5 sizes). European dress shoes are notoriously narrower and longer.</li>
              <li style={{ marginBottom: "8px" }}><strong>The "Youth Hack" for Savings:</strong> Adult women with smaller feet can often shop in the "Youth" section to save money. Mathematically, a US Women's size 7.5 precisely converts to a Youth (Boys) Size 6.</li>
            </ul>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem" }}>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>How do I accurately measure my own foot at home?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Tape a blank piece of paper against a flat wall on a hard floor. Stand normally on the paper with your heel firmly touching the wall. Mark the tip of your absolute longest toe. Measure the straight-line distance in centimeters at the end of the day when feet are naturally swollen.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Why do different brands fit differently even at the same size?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Every footwear manufacturer uses a proprietary 3D physical model of a foot called a "last" to shape their shoes. International sizing systems only measure two-dimensional total length, completely ignoring volumetric differences.</p>

              <h4 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>Should my toes touch the end of the shoe?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>Absolutely not. For optimal foot health, there should be roughly a thumb's width (about 3/8 to 1/2 inch) of space between your longest toe and the front interior of the shoe when standing up.</p>
            </div>

            <h3 style={{ marginTop: "32px", fontSize: "1.5rem", color: "var(--accent)" }}>Footwear Sizing Medical Disclaimer</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
              <em>Disclaimer: The shoe size conversions and algorithms provided by this tool are approximate and mathematically derived from standard international charts. Sizing varies violently by manufacturer, country of origin, and individual foot morphology. This tool should serve as a strong baseline estimate. Always consult the specific brand's official sizing guide.</em>
            </p>
          </>
        )}
      </article>


      {/* PSEO Internal Links */}
      {pseoLinks.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "1.4rem" }}>
            {isAr ? "تحويلات شائعة (الأكثر بحثاً)" : "Popular Conversions"}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {pseoLinks.map((link) => (
              <Link 
                key={link.slug} 
                href={`/${lang}/calculators/shopping/shoe-size/${link.slug}`}
                className="btn btn-secondary"
                style={{ fontSize: "0.9rem" }}
              >
                {isAr 
                  ? `تحويل مقاس ${link.fromSize} ${link.from} إلى ${link.to} (${link.gender === "men" ? "رجال" : "نساء"})`
                  : `Convert Size ${link.fromSize} ${link.from} to ${link.to} (${link.gender === "men" ? "Men" : "Women"})`}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
