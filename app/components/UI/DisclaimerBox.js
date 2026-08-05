import React from 'react';

export default function DisclaimerBox({ type, lang }) {
  const isAr = lang === 'ar';
  
  const disclaimers = {
    medical: {
      ar: "إخلاء مسؤولية طبي: هذه الأداة توفر معلومات تقديرية عامة ولا تعتبر بديلاً عن الاستشارة الطبية المتخصصة. يرجى مراجعة طبيبك قبل اتخاذ أي قرارات صحية.",
      en: "Medical Disclaimer: This tool provides general estimates and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider."
    },
    financial: {
      ar: "إخلاء مسؤولية مالي: النتائج المستخرجة من هذه الحاسبة هي لأغراض تعليمية وتقريبية فقط، ولا تشكل نصيحة مالية أو استثمارية معتمدة. قد تختلف الأرقام الفعلية بناءً على الرسوم الإضافية وظروف السوق.",
      en: "Financial Disclaimer: The results provided by this calculator are for educational and informational purposes only and do not constitute financial or investment advice. Actual figures may vary based on market conditions and additional fees."
    },
    /* أُعيدت صياغته لأن النصّ السابق كان يقول «ننصح باستشارة أهل العلم» —
       وهي نصيحة تُقرأ كخيار. والمقصود أن الرقم ليس فتوى أصلاً: هو حسابٌ
       لقاعدة عامة، والقاعدة تُنزَّل على الحالة بعلم لا بآلة. فالصياغة الآن
       تقرّر حدّ الأداة أولاً، ثم تُبيّن متى يصير السؤال لازماً لا مستحبّاً. */
    religious: {
      ar: "هذه النتيجة ليست فتوى. الحاسبة تُطبّق قاعدة عامة على الأرقام التي أدخلتَها، ولا تعرف تفصيل حالك ولا المذهب الذي تُقلّده ولا ما قد يخصّها من استثناء. فاتّخذها تقديراً تستعين به وتفهم به منهج الحساب — ثم اسأل أهل العلم قبل أن تُخرج مالاً أو تقسم تركة أو تُلزم نفسك بعقد. وكلّما كان المبلغ كبيراً أو الحال مشتبهاً، كان السؤال ألزم.",
      en: "This result is not a fatwa. The calculator applies a general rule to the figures you entered; it does not know the particulars of your situation, the school of law you follow, or any exception that may bear on it. Take it as an estimate that shows you the method — then put your case to a qualified scholar before you pay out wealth, divide an estate, or bind yourself to a contract. The larger the sum or the less clear-cut the situation, the more necessary that question becomes."
    },

    /* نصّ المقالات منفصل عن نصّ الحاسبات: المقال يشرح خلافاً ويرجّح، وقد
       يقرأ القارئ ترجيحاً ويحسبه إجماعاً. فالتنبيه هنا يذكر الخلاف صراحةً. */
    article: {
      ar: "هذا المقال بيانٌ للمسألة ومنهج حسابها، وليس فتوى. وما يُذكر فيه من ترجيح هو قول أهل العلم الذي جرى عليه العمل في هذه الأداة، وقد يخالفه غيره من المذاهب المعتبرة. ولا يُغني ذلك عن سؤال عالمٍ يعرف تفصيل حالك قبل العمل، ولا سيّما في المال والميراث والعقود.",
      en: "This article explains the question and the method of calculating it; it is not a fatwa. Where it favours one position, that is the scholarly view this tool is built on, and other recognised schools may hold otherwise. It does not substitute for asking a scholar who knows the particulars of your situation before you act — least of all in matters of wealth, inheritance and contracts."
    },
    /* القبلة لا يناسبها التنبيه المالي — لا مال يُخرج ولا عقد يُبرم — لكنها
       أحوج ما تكون إلى تنبيه من نوعها: أن الزاوية حسابٌ لا وحي، وأن المطلوب
       من البعيد الجهةُ لا عينُ الكعبة. وترك الصفحة بلا تنبيه أوهم أن الرقم
       قطعيّ، فيقلق من انحرف عنه درجتين وهو غير مطالَب بذلك أصلاً. */
    qibla: {
      ar: "الزاوية المعروضة حسابٌ فلكي دقيق، لكنها ليست شرطاً في صحّة صلاتك. فالمطلوب ممّن بعُد عن مكة استقبالُ جهة الكعبة لا إصابةُ عينها، والانحراف اليسير معفوٌّ عنه باتفاق. وقد يزيد خطأ بوصلة هاتفك على عشرين درجة لقربها من معدن أو لحاجتها إلى معايرة، فتحقّق بأكثر من وسيلة إن استطعت. ومن اجتهد وتحرّى ثم تبيّن له الخطأ فصلاته صحيحة ولا إعادة عليه، وإنما يصحّح فيما يستقبل.",
      en: "The angle shown is a precise astronomical calculation, but it is not a condition for your prayer's validity. What is required of someone far from Mecca is facing the direction of the Kaaba, not striking its exact point, and a slight deviation is excused by agreement. Your phone's compass can be off by more than twenty degrees near metal or when it needs calibration, so verify by more than one means where you can. Whoever made a genuine effort and later learned he was mistaken has prayed validly and repeats nothing; he simply corrects going forward."
    },

    calendar: {
      ar: "ملاحظة حول التحويل: يعتمد هذا المحول على نظام أم القرى الحسابي الرسمي للتقويم الهجري. الرؤية الفعلية للهلال قد تختلف يوماً واحداً بين الدول والمناسبات (مثل بداية رمضان أو عيد الفطر) بحسب إعلان الجهات الرسمية المحلية.",
      en: "Note on this conversion: This converter uses the official Umm al-Qura astronomical calendar system. Actual moon-sighting announcements may vary by one day between countries for events like the start of Ramadan or Eid, depending on local official authorities."
    }
  };

  const currentDisclaimer = disclaimers[type] || disclaimers.financial;
  const isNote = type === 'calendar';
  const icon = isNote ? 'ℹ️' : '⚠️';
  const label = isNote
    ? (isAr ? "ملاحظة" : "Note")
    : (isAr ? "إخلاء مسؤولية" : "Disclaimer");
  const accentColor = isNote ? '#0d6efd' : '#ffc107';

  return (
    <div style={{
      marginTop: '24px',
      padding: '16px',
      backgroundColor: isNote ? 'rgba(13, 110, 253, 0.08)' : 'rgba(255, 193, 7, 0.1)',
      borderLeft: isAr ? 'none' : `4px solid ${accentColor}`,
      borderRight: isAr ? `4px solid ${accentColor}` : 'none',
      borderRadius: '4px',
      color: 'var(--text-color, #333)'
    }}>
      <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', color: isNote ? '#0d6efd' : '#b38600' }}>
        <span>{icon}</span> {label}
      </h4>
      <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6' }}>
        {isAr ? currentDisclaimer.ar : currentDisclaimer.en}
      </p>
    </div>
  );
}
