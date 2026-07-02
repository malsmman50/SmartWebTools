import { getDictionary } from "@/app/dictionaries";
import HealthCalculator from "@/app/components/HealthCalculator";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  
  return {
    title: isAr ? "حاسبة الجسم الشاملة (BMI و السعرات) | SmartCalcTools" : "Comprehensive Body Calculator (BMI & TDEE) | SmartCalcTools",
    description: isAr ? "احسب مؤشر كتلة الجسم (BMI)، معدل الأيض (BMR)، احتياج السعرات (TDEE)، والوزن المثالي دفعة واحدة وبخصوصية تامة." : "Calculate your BMI, BMR, TDEE, and Ideal Weight all at once with 100% privacy.",
  };
}

export default async function BodyCalculatorPage({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const dict = await getDictionary(lang);

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "16px", color: "var(--primary)" }}>
        {dict.health?.body_calc_title || "Comprehensive Body Calculator"}
      </h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px auto" }}>
        {dict.health?.body_calc_desc || "Calculate your BMI, BMR, TDEE, and Ideal Weight all at once."}
      </p>

      <HealthCalculator dict={dict} isAr={isAr} />

      <div className="card" style={{ marginTop: "60px", padding: "32px", lineHeight: "1.8" }}>
        <h2>{isAr ? "ما هي المؤشرات الصحية التي نحسبها؟" : "What Health Metrics Are We Calculating?"}</h2>
        
        <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <div>
            <h3>{dict.health?.bmi_title || "Body Mass Index (BMI)"}</h3>
            <p style={{ color: "var(--text-muted)" }}>
              {isAr 
                ? "مؤشر كتلة الجسم هو مقياس للدهون في الجسم يعتمد على الطول والوزن ويطبق على البالغين من الرجال والنساء."
                : "Body Mass Index is a measure of body fat based on height and weight that applies to adult men and women."}
            </p>
          </div>
          <div>
            <h3>{dict.health?.bmr_title || "Basal Metabolic Rate (BMR)"}</h3>
            <p style={{ color: "var(--text-muted)" }}>
              {isAr 
                ? "معدل الأيض الأساسي هو عدد السعرات الحرارية التي يحتاجها جسمك للقيام بالوظائف الأساسية (مثل التنفس وضخ الدم) أثناء الراحة التامة. نستخدم معادلة (Mifflin-St Jeor) الحديثة والدقيقة."
                : "BMR is the number of calories required to keep your body functioning at rest. We use the modern and highly accurate Mifflin-St Jeor equation."}
            </p>
          </div>
          <div>
            <h3>{dict.health?.tdee_title || "Total Daily Energy Expenditure (TDEE)"}</h3>
            <p style={{ color: "var(--text-muted)" }}>
              {isAr 
                ? "احتياج السعرات اليومي هو تقدير لعدد السعرات الحرارية التي تحرقها يومياً، ويتم حسابه بضرب BMR في مستوى نشاطك البدني. للحفاظ على وزنك، تناول هذا العدد؛ لفقدان الوزن، قلل منه؛ ولزيادة الوزن، زد عليه."
                : "TDEE is an estimation of how many calories you burn per day when exercise is taken into account. Eat this amount to maintain weight, less to lose, or more to gain."}
            </p>
          </div>
          <div>
            <h3>{dict.health?.ideal_weight_title || "Ideal Weight Range"}</h3>
            <p style={{ color: "var(--text-muted)" }}>
              {isAr 
                ? "نطاق الوزن المثالي هو النطاق الذي يعتبر فيه وزنك طبيعياً بناءً على طولك ومؤشر كتلة الجسم الصحي (بين 18.5 و 24.9)."
                : "The ideal weight range indicates the span of weights considered normal and healthy for your height based on the World Health Organization's BMI standards (18.5 - 24.9)."}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "40px", padding: "20px", background: "var(--bg)", borderRadius: "8px", borderLeft: "4px solid var(--primary)" }}>
          <strong>{isAr ? "💡 ملاحظة هامة: " : "💡 Important Note: "}</strong>
          {isAr 
            ? "هذه الحاسبة مصممة للبالغين وتوفر معلومات إرشادية عامة. الرياضيون الذين يمتلكون كتلة عضلية كبيرة قد يحصلون على مؤشر BMI مرتفع (سمنة) رغم أن نسبة الدهون لديهم منخفضة جداً. يُفضل دائماً استشارة أخصائي التغذية للحصول على خطة مخصصة."
            : "This calculator provides general guidance for adults. Highly muscular athletes may get a high BMI (Obese) even if their body fat percentage is very low. Always consult a nutritionist for a personalized plan."}
        </div>
      </div>
    </div>
  );
}
