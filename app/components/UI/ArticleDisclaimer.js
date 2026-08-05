import DisclaimerBox from "@/app/components/UI/DisclaimerBox";

/**
 * التنبيه الذي يُذيّل كل مقال.
 *
 * وُضع في مكوّن مستقلّ لا في نصّ المقالات لسببين. الأول أن نصّاً مكرّراً في
 * 45 مدخلاً يتفرّق حتماً: مقال يُضاف بلا تنبيه، وصياغة تُحدَّث في موضع دون
 * بقيّتها — وقد كان 35 من 45 بلا أي تنبيه قبل هذا. والثاني أن نصّاً واحداً
 * مكرّراً في 45 صفحة هو بالضبط ما يقرؤه الزاحف قالباً؛ وضعُه خارج المتن
 * يُبقيه ظاهراً للقارئ دون أن يُحسب من المحتوى.
 *
 * ولا يُطوى ولا يختفي على الجوال: تنبيهٌ يحتاج نقرةً ليُقرأ ليس تنبيهاً.
 */
export default function ArticleDisclaimer({ lang }) {
  const isAr = lang === "ar";

  return (
    <section className="article-disclaimer" aria-label={isAr ? "تنبيه" : "Notice"}>
      <DisclaimerBox type="article" lang={lang} />
      <p className="article-disclaimer__ask">
        {isAr
          ? "وإن أشكل عليك شيء فاسأل قبل أن تعمل — فالسؤال عن المال قبل إخراجه أيسر من تداركه بعده."
          : "If anything is unclear, ask before you act — a question about wealth costs less before it leaves your hands than after."}
      </p>
    </section>
  );
}
