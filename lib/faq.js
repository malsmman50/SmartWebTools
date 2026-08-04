/**
 * استخراج أسئلة المقال وأجوبتها من نصّه — لبثّ مخطط FAQPage.
 *
 * الأسئلة تُكتب في المقالات ترويسات <h3> أو <h4> تنتهي بعلامة استفهام، ضمن
 * قسمٍ ترويسته «الأسئلة الشائعة» أو ما يرادفها. وهذا الملف يقرأ ما هو مكتوب
 * فعلاً لا ما يُفترض أنه مكتوب — وهي الغلطة التي تكرّرت في المدقّق ثلاث مرات.
 *
 * ملاحظة صادقة عن الفائدة: قصرت جوجل نتائجَ FAQ الغنية منذ أغسطس 2023 على
 * مواقع حكومية وصحّية معروفة، فلا يُتوقّع من هذا المخطط أن يُظهر الأسئلة في
 * صفحة النتائج. وإنما يبقى وصفاً صحيحاً لبنية الصفحة يفهمه الزاحف، وهو
 * السبب الوحيد لوجوده هنا — لا وعدٌ بترتيبٍ أفضل.
 */

const SECTION = /<h[234][^>]*>[^<]*(الأسئلة الشائعة|أسئلة شائعة|أسئلة متكررة|الأسئلة والأجوبة|Frequently Asked|Common Misconceptions|FAQs?)[^<]*<\/h[234]>/i;

const stripTags = (s) =>
  s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();

// «س1:» و«ج:» و«Q4:» علاماتُ ترقيمٍ تحريرية تُقرأ في الصفحة، ولا معنى لها
// داخل المخطط: هناك يحمل الحقلُ نفسُه دلالةَ السؤال والجواب، فتصير البادئة
// ضجيجاً في بيانٍ يُفترض أنه نظيف.
const stripMarker = (s) =>
  s.replace(/^(?:[سجQAqa]\s*\d*\s*[:.\-–]\s*|\d+\s*[.)]\s*)/, '').trim();

/**
 * @param {string} html نصّ المقال
 * @returns {{question: string, answer: string}[]} أزواج السؤال والجواب
 */
export function extractFaq(html) {
  if (!html) return [];
  const head = html.match(SECTION);
  if (!head) return [];

  const start = head.index + head[0].length;
  const rest = html.slice(start);
  // القسم ينتهي عند أول ترويسة رئيسية بعده — كخاتمة المقال.
  const cut = rest.search(/<h2/);
  const body = cut < 0 ? rest : rest.slice(0, cut);

  const marks = [...body.matchAll(/<h([34])[^>]*>([^<]*[؟?])\s*<\/h\1>/g)];
  const pairs = [];

  marks.forEach((m, i) => {
    const from = m.index + m[0].length;
    const to = i + 1 < marks.length ? marks[i + 1].index : body.length;
    const question = stripMarker(stripTags(m[2]));
    const answer = stripMarker(stripTags(body.slice(from, to)));
    // سؤالٌ بلا جواب لا يُبثّ: مخطط ناقص أسوأ من غيابه.
    if (question && answer) pairs.push({ question, answer });
  });

  return pairs;
}
