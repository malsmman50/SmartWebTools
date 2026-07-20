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
    religious: {
      ar: "تنبيه شرعي: تم تصميم هذه الحاسبة لتقديم تقديرات عامة مبنية على الفتاوى الشائعة. نظراً لاختلاف المذاهب الفقهية والتفاصيل الفردية، ننصح دائماً باستشارة أهل العلم الموثوقين لحالتك الخاصة.",
      en: "Religious Disclaimer: This calculator is designed to provide general estimates based on common fatwas. Given the differences in Islamic jurisprudence schools and individual circumstances, we strongly advise consulting a qualified scholar for your specific situation."
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
