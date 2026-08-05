/**
 * Sharia and computational basis for each calculator — the content of the
 * hashiya (margin) that sits beside every result.
 *
 * One source of truth. A figure that appears both here and in a calculator
 * must be imported, never retyped: the site previously shipped $80 in the UI
 * and $75 in the API for the same gold price, and two answers to one question
 * costs more credibility than a missing feature.
 *
 * Honesty rule (.claude/RULES.md, Bab 2): a standard number is written here
 * only where it is known. Where the basis is a computation rather than a
 * ruling — qibla, hijri — it says so plainly instead of borrowing fiqh
 * authority it does not have. Do not add a standard number you have not
 * verified; an invented citation looks documented and is worse than none.
 */

import { NISAB_GOLD_GRAMS } from './goldPrice';

export const SOURCES = {
  zakat: {
    ar: {
      rows: [
        ['المعيار', 'معيار أيوفي الشرعي رقم 35 (الزكاة)'],
        ['النصاب', `${NISAB_GOLD_GRAMS} جراماً من الذهب الخالص (عيار 24)`],
        ['تقديره', '20 مثقالاً × 4.25 جم — وعليه فتاوى اللجنة الدائمة. والفضة 200 درهم × 2.975 = 595 جم.'],
        ['المقدار', '2.5% — ربع العشر'],
        ['الحول', 'سنة قمرية لا شمسية. الفرق نحو 11 يوماً، ويغيّر تاريخ الوجوب.'],
      ],
      note: 'نصاب الفضة (595 جراماً) يُخرج مبلغاً أقل غالباً، فيكون أنفع للفقراء. من أراد الأخذ به فليقارن الناتجين.',
    },
    en: {
      rows: [
        ['Standard', 'AAOIFI Sharia Standard No. 35 (Zakah)'],
        ['Derivation', '20 mithqal × 4.25g, the figure the Permanent Committee uses. Silver: 200 dirhams × 2.975g = 595g.'],
        ['Nisab', `${NISAB_GOLD_GRAMS} grams of pure gold (24k)`],
        ['Rate', '2.5% — a quarter of a tenth'],
        ['Hawl', 'A lunar year, not a solar one. The ~11-day difference moves the due date.'],
      ],
      note: 'The silver nisab (595g) usually gives a lower threshold, which favours recipients. Compare both if you follow that view.',
    },
  },

  inheritance: {
    ar: {
      rows: [
        ['الأصل', 'آيات المواريث: النساء 11 و12 و176'],
        ['المذهب', 'حنفي في مسألة الجد مع الإخوة — الجد يحجبهم'],
        ['المخالف', 'مالك والشافعي وأحمد: الإخوة يقاسمون الجدّ، وله الأحظّ من المقاسمة أو الثلث أو السدس'],
        ['العمريتان', 'قضاء عمر بن الخطاب، وعليه عثمان وزيد بن ثابت ومالك والشافعي وأصحاب الرأي'],
        ['يشمل', 'العول والردّ والعمريتين والحجب والتعصيب مع الغير'],
        ['الاختبارات', '23 حالة مرجعية معروفة الإجابة، كلها تمر'],
      ],
      note: 'مسألة الجد مع الإخوة لم يرد فيها نصّ من كتاب ولا سنة، ولذلك اختلف فيها الصحابة فمن بعدهم. وهذه الأداة تجري على القول الحنفي، فمن قلّد مالكاً أو الشافعي أو أحمد فنصيبه هنا مخالف لمذهبه — وهذا حقه أن يعلمه قبل أن يقسم. ولم تُعرض هذه الحالات على مختص بعد؛ والتركة الفعلية تحتاج مفتياً يعرف تفصيلها.',
    },
    en: {
      rows: [
        ['Basis', "Qur'an, Surah an-Nisa 4:11, 4:12 and 4:176"],
        ['School', 'Hanafi on grandfather-with-brothers — the grandfather excludes them'],
        ['The other view', 'Malik, al-Shafi\'i and Ahmad: brothers share with the grandfather, who takes the better of muqasama, one third, or one sixth'],
        ['\'Umariyyah', "'Umar ibn al-Khattab's ruling, followed by 'Uthman, Zayd ibn Thabit, Malik, al-Shafi'i and the Hanafis"],
        ['Covers', "'Awl, radd, the two 'Umariyyah cases, exclusion, and residuary shares"],
        ['Tests', '23 reference cases with known answers, all passing'],
      ],
      note: 'No text in the Qur\'an or Sunna settles the grandfather-with-brothers question, which is why the Companions and those after them differed over it. This tool follows the Hanafi position, so anyone following Malik, al-Shafi\'i or Ahmad will find their share stated differently here than in their own school — you are entitled to know that before dividing anything. These cases have not yet been reviewed by a scholar; a real estate needs a qualified mufti who knows its particulars.',
    },
  },

  murabaha: {
    ar: {
      rows: [
        ['المعيار', 'معيار أيوفي الشرعي رقم 8 (المرابحة للآمر بالشراء)'],
        ['الشرط', 'تملُّك البنك للسلعة وقبضها قبل بيعها عليك'],
        ['الربح', 'هامش معلوم متفق عليه، يُثبت عند العقد ولا يتغير بتأخر السداد'],
      ],
      note: 'الفرق الجوهري عن القرض بفائدة: هنا بيع سلعة مملوكة بثمن مؤجل معلوم، والزيادة لا تتضاعف بالتأخير. إن زاد المبلغ كلما تأخرت، فهو ربا مهما سُمّي.',
    },
    en: {
      rows: [
        ['Standard', 'AAOIFI Sharia Standard No. 8 (Murabahah to the Purchase Orderer)'],
        ['Condition', 'The bank must own and take possession of the asset before selling it to you'],
        ['Profit', 'A known, agreed markup — fixed at contract, not increased by late payment'],
      ],
      note: 'The decisive difference from an interest loan: this is the sale of an owned asset at a known deferred price, and the amount does not compound if you are late. If the balance grows with delay, it is riba whatever it is called.',
    },
  },

  mudarabah: {
    ar: {
      rows: [
        ['المعيار', 'معيار أيوفي الشرعي رقم 13 (المضاربة)'],
        ['الطرفان', 'ربّ المال يقدّم المال، والمضارب يقدّم العمل'],
        ['الربح', 'بنسبة شائعة متفق عليها مسبقاً — لا مبلغ ثابت مضمون'],
        ['الخسارة', 'على ربّ المال وحده، إلا بتعدٍّ أو تقصير من المضارب'],
      ],
      note: 'اشتراط مبلغ ربح ثابت مضمون يُخرج العقد عن المضاربة إلى الربا. النسبة تكون من الربح المتحقق، لا من رأس المال.',
    },
    en: {
      rows: [
        ['Standard', 'AAOIFI Sharia Standard No. 13 (Mudarabah)'],
        ['Parties', 'The rabb al-mal provides capital; the mudarib provides the work'],
        ['Profit', 'A pre-agreed proportional share — never a fixed guaranteed sum'],
        ['Loss', 'Borne by the capital provider alone, absent negligence or breach'],
      ],
      note: 'Stipulating a fixed guaranteed return turns this from mudarabah into riba. The share must be of realised profit, not of the capital.',
    },
  },

  sukuk: {
    ar: {
      rows: [
        ['المعيار', 'معيار أيوفي الشرعي رقم 17 (صكوك الاستثمار)'],
        ['الحقيقة', 'حصة شائعة في ملكية أصل أو منفعة — لا دَين على المُصدِر'],
        ['العائد', 'من غلّة الأصل، ويتأثر بأدائه'],
      ],
      note: 'هذا هو الفارق عن السند: حامل السند دائن يستحق فائدة مضمونة، وحامل الصك شريك يملك حصة ويتحمل تبعتها. صكٌّ يضمن رأس المال والعائد يفقد وصفه الشرعي.',
    },
    en: {
      rows: [
        ['Standard', 'AAOIFI Sharia Standard No. 17 (Investment Sukuk)'],
        ['Nature', 'An undivided ownership share in an asset or usufruct — not a debt owed by the issuer'],
        ['Return', 'Derived from the asset\'s yield, and varies with its performance'],
      ],
      note: 'That is the difference from a bond: a bondholder is a creditor owed guaranteed interest; a sukuk holder owns a share and carries its risk. A sukuk that guarantees both capital and return loses its Sharia character.',
    },
  },

  'islamic-deposit': {
    ar: {
      rows: [
        ['الأساس', 'وديعة استثمارية على أساس المضاربة أو الوكالة بالاستثمار'],
        ['العائد', 'متوقّع لا مضمون — يتغيّر بنتيجة الاستثمار الفعلية'],
      ],
      note: 'الأرقام هنا تقديرية مبنية على معدل متوقع تدخله أنت. أي بنك يضمن لك نسبة ثابتة على الوديعة فهو يقدّم فائدة، لا عائد مضاربة. اسأل عن صيغة العقد لا عن اسمه.',
    },
    en: {
      rows: [
        ['Basis', 'Investment deposit structured as mudarabah or investment wakalah'],
        ['Return', 'Expected, not guaranteed — it moves with actual investment results'],
      ],
      note: 'These figures are projections from a rate you supply. Any bank guaranteeing you a fixed percentage on a deposit is paying interest, not a mudarabah return. Ask about the contract structure, not its name.',
    },
  },

  'islamic-fire': {
    ar: {
      rows: [
        ['الغرض', 'تقدير رأس المال اللازم للاستقلال المالي'],
        ['القيد الشرعي', 'الأدوات المفترضة خالية من الربا: أسهم مُصفّاة، صكوك، عقار، تجارة'],
        ['الزكاة', 'الأصول النامية تجب فيها الزكاة سنوياً — احسبها ضمن نفقاتك'],
      ],
      note: 'أكثر حاسبات الاستقلال المالي تفترض عائداً من أدوات ربوية. الرقم هنا لا يفترض ذلك. وهو تقدير رياضي لا وعد — العائد الفعلي يتغيّر، والأجل بيد الله.',
    },
    en: {
      rows: [
        ['Purpose', 'Estimating the capital needed for financial independence'],
        ['Sharia constraint', 'Instruments assumed riba-free: screened equities, sukuk, property, trade'],
        ['Zakat', 'Growing assets are zakatable each year — budget for it as an outflow'],
      ],
      note: 'Most FIRE calculators assume returns from interest-bearing instruments. This one does not. It is an arithmetic projection, not a promise — real returns vary, and lifespan is not ours to schedule.',
    },
  },

  roi: {
    ar: {
      rows: [
        ['الأساس', 'حساب رياضي بحت: (العائد − التكلفة) ÷ التكلفة'],
        ['القيد الشرعي', 'صحة النتيجة لا تعني حِلّ الاستثمار — الحكم على مصدر الربح'],
      ],
      note: 'هذه الأداة تقيس النسبة ولا تحكم على المصدر. ربح من نشاط محرّم يظل محرّماً مهما حسُنت نسبته.',
    },
    en: {
      rows: [
        ['Basis', 'Pure arithmetic: (return − cost) ÷ cost'],
        ['Sharia constraint', 'A correct percentage says nothing about permissibility — that depends on the source of the profit'],
      ],
      note: 'This measures the ratio; it does not judge the source. Profit from an impermissible activity stays impermissible however good the percentage looks.',
    },
  },

  qibla: {
    ar: {
      rows: [
        ['الطريقة', 'أقصر مسار على سطح الأرض (دائرة عظمى) نحو الكعبة'],
        ['الإحداثيات', 'الكعبة: 21.4225° شمالاً، 39.8262° شرقاً'],
        ['الأساس', 'حساب فلكي، لا خلاف فقهي في المسألة نفسها'],
      ],
      note: 'بوصلة الهاتف تتأثر بالمعادن والأجهزة الكهربائية وتحتاج معايرة. عند الشك، اعتمد الزاوية المحسوبة مع علامة أرضية معروفة الاتجاه بدل البوصلة وحدها.',
    },
    en: {
      rows: [
        ['Method', 'Great-circle bearing — the shortest path over the earth to the Kaaba'],
        ['Coordinates', 'Kaaba: 21.4225° N, 39.8262° E'],
        ['Basis', 'An astronomical computation; the question itself is not disputed among jurists'],
      ],
      note: 'Phone compasses drift near metal and electronics and need calibration. When in doubt, use the computed bearing against a landmark you know the direction of, rather than the compass alone.',
    },
  },

  hijri: {
    ar: {
      rows: [
        ['الطريقة', 'التقويم الهجري الحسابي (الجدولي)'],
        ['التحقق', 'مُختبر على المدى 1400–1500 هجرية'],
        ['المدخل المستحيل', 'يُرفض برسالة تبيّن طول الشهر — لا يُصحَّح صامتاً'],
      ],
      note: 'بدايات الشهور عند كثير من البلدان تُحدَّد بالرؤية البصرية، وقد تختلف عن الحساب بيوم. لمواقيت الصيام والعيد اعتمد إعلان الجهة الشرعية في بلدك، لا هذه الأداة.',
    },
    en: {
      rows: [
        ['Method', 'Tabular (arithmetic) Hijri calendar'],
        ['Verified', 'Tested across 1400–1500 AH'],
        ['Impossible input', 'Refused with a message showing the month length — never silently corrected'],
      ],
      note: 'Many countries fix month starts by moon sighting, which can differ from the arithmetic date by a day. For fasting and Eid, follow your local authority\'s announcement, not this tool.',
    },
  },
};

export function getSource(key, lang) {
  const entry = SOURCES[key];
  if (!entry) return null;
  return entry[lang === 'ar' ? 'ar' : 'en'];
}
