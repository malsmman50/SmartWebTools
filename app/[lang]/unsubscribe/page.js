import UnsubscribeClient from "@/app/components/UnsubscribeClient";

export const metadata = { robots: { index: false, follow: false } };

export default async function UnsubscribePage({ params, searchParams }) {
  const { lang } = await params;
  const sp = await searchParams;
  const token = sp?.token || "";
  const isAr = lang === "ar";

  return (
    <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
      <div className="card" style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 30px" }}>
        <h1 style={{ fontSize: "1.7rem", marginBottom: "16px", color: "var(--primary)" }}>
          {isAr ? "إلغاء الاشتراك في تذكير الزكاة" : "Unsubscribe from Zakat Reminders"}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "28px" }}>
          {isAr
            ? "لإيقاف تذكيرات الزكاة عن بريدك نهائياً، اضغط الزر أدناه."
            : "To permanently stop Zakat reminders to your email, click the button below."}
        </p>
        {token
          ? <UnsubscribeClient token={token} isAr={isAr} />
          : <p style={{ color: "var(--danger, #dc2626)" }}>{isAr ? "رابط غير صالح." : "Invalid link."}</p>}
      </div>
    </div>
  );
}
