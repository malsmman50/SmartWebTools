/**
 * مدقّق المحتوى — SmartCalcTools
 *
 *   node scripts/audit-content.mjs            تقرير كامل
 *   node scripts/audit-content.mjs --slug=X   مقال واحد
 *   node scripts/audit-content.mjs --fatal    الخروج بخطأ عند وجود مخالفة قاتلة
 *
 * لماذا هذا الملف موجود:
 *
 * قارئ هذا الموقع يخرج برقم يدفعه زكاةً أو يقسّم به تركة. رقم خاطئ هنا ليس
 * خطأ تحريرياً — هو إفتاء بغير علم. والخطأ الأخطر ليس الفاحش الظاهر، بل
 * التناقض الصامت: مقال يقول النصاب 100 جرام والحاسبة تقول 85، فيصدّق القارئ
 * أيّهما قرأ أولاً.
 *
 * القراءة البشرية لا تلتقط هذا بثقة عبر 53 مقالاً في لغتين. الآلة تلتقطه.
 *
 * فما يُفحص هنا هو ما له إجابة واحدة صحيحة يمكن مقارنتها بمصدر الحقيقة في
 * lib/ — لا جودة الأسلوب ولا طرافة الزاوية؛ تلك تبقى للإنسان. الأداة تُخلي
 * وقت الإنسان لما لا يحسنه غيره.
 *
 * قاعدة حاكمة: لا يُعدَّل رقم في المحتوى ليطابق الحاسبة قبل التأكد من أن
 * الحاسبة هي المصيبة. أحياناً يكون المقال على حق والكود على خطأ.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf-8');

// ── مصدر الحقيقة ─────────────────────────────────────────────────────────
// يُقرأ من lib/goldPrice.js نفسه لا يُعاد كتابته هنا: قيمة منسوخة تصير
// خاطئة يوم يتغير الأصل، ومدقّق يحمل رقماً باطلاً أسوأ من غياب مدقّق.
const goldSrc = read('lib/goldPrice.js');
const NISAB_GOLD = Number(goldSrc.match(/NISAB_GOLD_GRAMS\s*=\s*([\d.]+)/)?.[1]);
const NISAB_SILVER = 595;
const ZAKAT_RATE = 2.5;

if (!NISAB_GOLD) {
  console.error('تعذّر قراءة NISAB_GOLD_GRAMS من lib/goldPrice.js — أُوقف التدقيق.');
  process.exit(2);
}

const posts = JSON.parse(read('lib/blog-data.json'));

// المسارات الحقيقية بعد إعادة التأسيس. رابط خارج هذه القائمة إمّا 404
// أو تحويلة 301 — وكلاهما يُضعف المقال في عين القارئ والزاحف.
const LIVE = new Set([
  '/calculators/zakat', '/calculators/inheritance', '/calculators/murabaha',
  '/calculators/mudarabah', '/calculators/sukuk', '/calculators/islamic-deposit',
  '/calculators/islamic-fire', '/calculators/roi', '/calculators/currency',
  '/tools/qibla-compass', '/tools/hijri-converter',
  '/calculators/health/ramadan-hydration',
  '/blog', '/methodology', '/about', '/contact', '/developers',
  '/compare/sukuk-vs-bonds', '/compare/murabaha-vs-conventional-loan',
]);

const F = 'قاتل', W = 'تحذير', N = 'ملاحظة';
const findings = [];
const flag = (level, slug, rule, detail) => findings.push({ level, slug, rule, detail });

// ── القواعد ──────────────────────────────────────────────────────────────

/**
 * النصاب: أي رقم مقترن بالنصاب ويخالف مصدر الحقيقة.
 *
 * الرقم يُلتقط بكسوره العشرية عمداً. النسخة الأولى كانت `\d{2,4}` مع نافذة
 * `[^.،]` تستبعد النقطة، فكان «87.48 جرام» يمرّ سليماً — والنقطة نفسها هي
 * ما كسر المطابقة. مرّ التناقض في مقالين كاملين وأنا أقرأ تقريراً يقول
 * «صفر خطأ قاتل». فالنافذة الآن تسمح بالنقطة العشرية وحدها: نقطة يتلوها رقم.
 */
function checkNisab(slug, text) {
  const NUM = String.raw`(\d{2,4}(?:\.\d+)?)`;
  const GAP = String.raw`(?:[^.،]|\.(?=\d))`; // النقطة مسموحة فقط داخل رقم
  const re = new RegExp(
    `نصاب${GAP}{0,60}?${NUM}\\s*(?:جرام|جم|غرام)|${NUM}\\s*(?:جرام|جم|غرام)${GAP}{0,30}?نصاب`, 'g');
  const reEn = new RegExp(
    `nisab${GAP}{0,60}?${NUM}\\s*(?:gram|g\\b)|${NUM}\\s*(?:gram|g\\b)${GAP}{0,30}?nisab`, 'gi');
  for (const re_ of [re, reEn]) {
    for (const m of text.matchAll(re_)) {
      const n = Number(m[1] ?? m[2]);
      if (!n) continue;
      if (n !== NISAB_GOLD && n !== NISAB_SILVER) {
        flag(F, slug, 'نصاب مخالف',
          `«${n}» بينما الذهب ${NISAB_GOLD} جم والفضة ${NISAB_SILVER} جم — «${m[0].trim().slice(0, 70)}»`);
      }
    }
  }
  checkNisabConstants(slug, text);
}

/**
 * القاعدة الثانية للنصاب — تعتمد على الثابت لا على القرب.
 *
 * القاعدة الأولى تبحث عن رقم قريب من كلمة «نصاب». وهذا يسقط حين يكون الرقم
 * في خلية جدول: «87.48» في مقال التضخم تبعد 148 حرفاً عن أقرب «نصاب»، ولا
 * نافذة قرب معقولة تصلها دون أن تبتلع نصف الفقرة معها.
 *
 * لكن هذه الأرقام ليست أرقاماً عابرة — كل واحد منها ثابتٌ فقهي لا يُذكر إلا
 * وهو نصاب: 87.48 جم ذهباً هي العشرون مثقالاً، و612.36 جم فضةً هي المائتا
 * درهم بتقدير آخر. فوجود أيٍّ منها في النص يعني أن النص يقرّر نصاباً — وإن
 * لم يقل الكلمة. وإن خالف ما تحسبه الأداة، فالقارئ أمام رقمين متناقضين.
 *
 * وهذا هو الفرق بين القاعدتين: الأولى تسأل «هل قرب هذا الرقم كلمةُ نصاب؟»
 * والثانية تسأل «هل هذا الرقم لا يكون إلا نصاباً؟». الثانية لا تخدعها الصياغة.
 */
const NISAB_VARIANTS = [87.48, 87.4, 87.5, 84, 86, 612.36, 612.4, 612, 640, 700];

function checkNisabConstants(slug, text) {
  for (const v of NISAB_VARIANTS) {
    if (v === NISAB_GOLD || v === NISAB_SILVER) continue;
    const re = new RegExp(String.raw`\b${String(v).replace('.', '\\.')}\s*(?:جرام|جم|غرام|gram|g\b)`, 'gi');
    const hit = text.match(re);
    if (hit) {
      flag(F, slug, 'نصاب مخالف (ثابت معروف)',
        `«${hit[0].trim()}» تقدير نصاب مغاير — الأداة تحسب بـ ${NISAB_GOLD} جم ذهباً و${NISAB_SILVER} جم فضةً`);
    }
  }
}

/**
 * مقدار الزكاة: 2.5% وربع العشر. الخلط بينهما وبين العشر خطأ شائع.
 *
 * النسخة الأولى بحثت عن أي نسبة تليها كلمة «زكاة» خلال 40 حرفاً، فأنذرت
 * على «ارتفع الجنيه 8%… وارتفعت زكاته» و«60% حصة الشريك». عشرة إنذارات
 * من ستة عشر كانت كاذبة، وهي نسبة تكفي لأن يتعلّم القارئ تخطّي القاعدة —
 * فيفوته الخطأ الحقيقي حين يقع.
 *
 * فالقاعدة الآن لا تُطلق إلا حين تكون النسبة هي المقدار الواجب نفسه:
 * صيغة تُخرج/تجب/مقدارها، أو نسبة تلاصق كلمة الزكاة مباشرة.
 */
function checkRate(slug, text) {
  // «بنسبة» وحدها لا تكفي: تُستعمل لحصص الشركاء ونسب الملكية بقدر ما
  // تُستعمل للمقدار الواجب، فاشتُرط أن تلاصقها كلمة الزكاة. وكذلك
  // «زكاته 8%» في سياق «ارتفعت زكاته 8%» — لذلك يلزم فعل كون أو تقدير.
  const PATTERNS = [
    /(?:تُخرج|تخرج|يُخرج|تجب\s+فيه|مقدارها)\s*(\d+(?:\.\d+)?)\s*%/g,
    // النافذة 25 حرفاً تسمح بـ«زكاة الذهب بنسبة 4%» وتمنع التقاط حصة
    // شريك ذُكرت في جملة أخرى من الفقرة نفسها.
    /زكا\S*[^.،؛]{0,25}?\s(?:بنسبة|قدرها|مقدارها)\s*(\d+(?:\.\d+)?)\s*%/g,
    /(?:الزكاة|زكاته|زكاتها)\s+(?:هي|هو|تساوي)\s*(\d+(?:\.\d+)?)\s*%/g,
    /zakat\s+(?:is|of|at|rate\s+of)\s*(\d+(?:\.\d+)?)\s*%/gi,
    /(\d+(?:\.\d+)?)\s*%\s*(?:zakat\b|of\s+the\s+total\s+eligible)/gi,
  ];
  const seen = new Set();
  for (const re of PATTERNS) {
    for (const m of text.matchAll(re)) {
      const v = Number(m[1]);
      // 10 و5 و7.5 صحيحة في الزروع، و0.8 في الأسهم طويلة الأجل وفق أيوفي،
      // و2.577 تصحيح الحول الميلادي.
      if ([ZAKAT_RATE, 10, 5, 7.5, 0.8, 2.577, 20, 2].includes(v)) continue;
      if (seen.has(v)) continue;
      seen.add(v);
      flag(W, slug, 'نسبة زكاة غير معتادة',
        `«${v}%» — تحقّق من سياقها: «${m[0].trim().slice(0, 60)}»`);
    }
  }
  if (/ربع\s*العشر/.test(text) && !/2\.5\s*%/.test(text)) {
    flag(N, slug, 'ربع العشر بلا نسبته', 'اذكر 2.5% بجانبها ليفهمها من لا يعرف المصطلح');
  }
}

/**
 * الحول قمري. وصفه بالشمسي يزيح تاريخ الوجوب ~11 يوماً.
 *
 * النفي يجب أن يُستثنى: أول تشغيل لهذه القاعدة أنذر على جملة
 * «لماذا يُحسب الحول بالتقويم الهجري وليس الميلادي؟» — وهي تُعلّم القاعدة
 * الصحيحة لا تخالفها. مدقّق يصيح على الصواب يُدرَّب القارئ على تجاهله،
 * فيفوته الخطأ الحقيقي حين يقع.
 */
function checkHawl(slug, text) {
  const NEGATED = /(?:وليس|ليس|لا\s+ب?|بدلاً\s+من|not|rather\s+than|instead\s+of)\s*(?:ال)?(?:تقويم\s*)?(?:ميلادي|شمسي|solar|gregorian)/i;
  const hits = [
    ...text.matchAll(/(?:حول|الحول)[^.،]{0,40}?(?:سنة\s*)?(?:ميلادي|شمسي)/g),
    ...text.matchAll(/hawl[^.]{0,40}?(?:solar|gregorian)\s*year/gi),
  ];
  for (const m of hits) {
    // افحص جوار المطابقة: النفي قد يسبقها أو يليها.
    const around = text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60);
    if (NEGATED.test(around)) continue;
    flag(F, slug, 'الحول موصوف بالشمسي', `الحول سنة قمرية — «${m[0].trim().slice(0, 60)}»`);
  }
}

/**
 * ادعاء اعتماد أو إفتاء بلا جهة. أشد ضرراً من رفض AdSense.
 *
 * المهم هو الفاعل، لا الكلمة. «تأكد أن الصندوق معتمد من هيئة شرعية» نصيحةٌ
 * للقارئ عن طرف ثالث، و«حاسبتنا معتمدة شرعياً» ادعاءٌ عن أنفسنا. أول تشغيل
 * خلط بينهما وأنذر على الأولى. فالقاعدة الآن تشترط أن يكون المدّعى عليه
 * الموقعَ أو أداتَه.
 */
function checkAuthority(slug, text) {
  const SELF = /(?:حاسبت|أدات|موقع|خدمت)(?:نا|ن)|هذه\s+(?:الحاسبة|الأداة)|our\s+(?:calculator|tool|site)/i;
  const claims = [
    [/معتمد[ةٌ]?\s*(?:شرعياً|من\s*هيئة)/g, 'ادعاء اعتماد شرعي', true],
    [/(?:فتوانا|نفتي|نُفتي)/g, 'الموقع ينقل الأحكام ولا يفتي', false],
    [/sharia[- ]certified|religiously\s+approved/gi, 'ادعاء اعتماد شرعي', true],
  ];
  for (const [re, why, needsSelf] of claims) {
    for (const m of text.matchAll(re)) {
      if (needsSelf) {
        const before = text.slice(Math.max(0, m.index - 90), m.index);
        if (!SELF.test(before)) continue; // الحديث عن طرف ثالث — مقبول
      }
      flag(F, slug, 'ادعاء سلطة', `${why} — «${m[0]}»`);
    }
  }
}

/** إسناد إلى معيار برقم — يوثَّق للمراجعة البشرية لا يُصحَّح آلياً. */
const KNOWN_AAOIFI = { 8: 'المرابحة', 12: 'الشركة', 13: 'المضاربة', 17: 'الصكوك', 21: 'الأوراق المالية', 35: 'الزكاة' };
function checkStandards(slug, text) {
  for (const m of text.matchAll(/(?:أيوفي|AAOIFI)[^.،\n]{0,40}?(?:رقم|No\.?|Standard)\s*\(?(\d{1,2})/gi)) {
    const n = Number(m[1]);
    if (!KNOWN_AAOIFI[n]) {
      flag(W, slug, 'رقم معيار غير مؤكّد',
        `أيوفي رقم ${n} — تحقّق منه أو احذف الرقم؛ إسناد خاطئ يبدو موثّقاً وهو ليس كذلك`);
    }
  }
}

/** الربا: تقديمه خياراً بدل التحذير منه. */
function checkRiba(slug, text) {
  if (/(?:احسب|استخدم)[^.،]{0,30}?(?:الفائدة\s*(?:المركبة|البنكية)|القرض\s*الربوي)/.test(text)) {
    flag(F, slug, 'حساب ربا', 'شرح الربا للتحذير مسموح، وتقديمه كأداة تُحسب ممنوع');
  }
}

/** الروابط الداخلية ولغتها. */
function checkLinks(slug, ar, en) {
  for (const [text, lang] of [[ar, 'ar'], [en, 'en']]) {
    for (const m of text.matchAll(/href="(\/(ar|en)([^"#?]*))"/g)) {
      const [, full, hrefLang, tail] = m;
      const clean = tail.replace(/\/$/, '');
      if (clean && !LIVE.has(clean) && !clean.startsWith('/blog/')) {
        flag(F, slug, 'رابط لمسار غير موجود', `${full} — يرد 301 أو 404`);
      }
      if (hrefLang !== lang) {
        flag(W, slug, 'رابط بلغة أخرى', `النسخة ${lang} تشير إلى ${full}`);
      }
    }
  }
}

/** بقايا الحداثة الآلية — تلاعب بإشارات التحديث. */
function checkAutomation(slug, post, text) {
  if (post.dateModified) flag(W, slug, 'dateModified', 'حقل الحداثة المزيّف يجب أن يبقى محذوفاً');
  if (/\[(?:تمت مراجعة|Data accuracy)/.test(text)) flag(W, slug, 'حاشية آلية', 'من بقايا freshness bot');
}

/** بنية المقال — البنود القابلة للقياس من العتبة السبعية. */
function checkStructure(slug, post, ar, en) {
  if (!/<table/i.test(ar)) flag(W, slug, 'بلا جدول', 'العتبة تشترط جدولاً أصلياً');
  if (!/(الأسئلة الشائعة|أسئلة شائعة|FAQ)/i.test(ar + en)) flag(W, slug, 'بلا أسئلة شائعة', 'العتبة تشترط ≥4');
  if (ar.length < 3500) flag(N, slug, 'مقال قصير', `${ar.length} حرفاً — تحقّق من عمق المعالجة`);
  if (!/\d/.test(ar)) flag(W, slug, 'بلا أرقام', 'العتبة تشترط مثالاً عددياً محلولاً');
}

/** العنوان القالبي — «guide» في 24 من 53 هي ما يقرؤه الزاحف كمزرعة محتوى. */
const titleWords = new Map();
function collectTitle(post) {
  for (const w of (post.titleEn || '').toLowerCase().match(/[a-z]{4,}/g) || []) {
    titleWords.set(w, (titleWords.get(w) || 0) + 1);
  }
}

// ── التشغيل ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--slug='))?.split('=')[1];
const target = only ? posts.filter((p) => p.slug === only) : posts;

for (const post of target) {
  const ar = post.contentAr || '', en = post.contentEn || '';
  const both = ar + '\n' + en;
  const s = post.slug;
  checkNisab(s, both); checkRate(s, both); checkHawl(s, both);
  checkAuthority(s, both); checkStandards(s, both); checkRiba(s, both);
  checkLinks(s, ar, en); checkAutomation(s, post, both);
  checkStructure(s, post, ar, en);
  collectTitle(post);
}

// ── التقرير ──────────────────────────────────────────────────────────────
const by = (lvl) => findings.filter((f) => f.level === lvl);
const affected = new Set(findings.map((f) => f.slug));

console.log(`\n${'═'.repeat(72)}`);
console.log(`  تدقيق المحتوى — ${target.length} مقالاً · النصاب المرجعي ${NISAB_GOLD} جم`);
console.log(`${'═'.repeat(72)}\n`);

for (const [lvl, label] of [[F, '🔴 قاتل — يمنع النشر'], [W, '🟡 تحذير — يُعالَج قبل الطلب'], [N, '🔵 ملاحظة']]) {
  const items = by(lvl);
  if (!items.length) continue;
  console.log(`${label}  (${items.length})`);
  const grouped = {};
  for (const f of items) (grouped[f.rule] ||= []).push(f);
  for (const [rule, list] of Object.entries(grouped)) {
    console.log(`\n  ▸ ${rule} — ${list.length}`);
    for (const f of list.slice(0, 6)) console.log(`      ${f.slug}\n        ${f.detail}`);
    if (list.length > 6) console.log(`      … و${list.length - 6} غيرها`);
  }
  console.log('');
}

const repeated = [...titleWords.entries()].filter(([, n]) => n >= posts.length * 0.2).sort((a, b) => b[1] - a[1]);
if (repeated.length) {
  console.log('🔵 أنماط العناوين المتكررة (إشارة قالبية للزاحف)');
  for (const [w, n] of repeated.slice(0, 6)) {
    console.log(`      ${w}: ${n} من ${posts.length}  (${Math.round((n / posts.length) * 100)}%)`);
  }
  console.log('');
}

console.log('─'.repeat(72));
console.log(`  قاتل ${by(F).length} · تحذير ${by(W).length} · ملاحظة ${by(N).length}`);
console.log(`  مقالات سليمة تماماً: ${posts.length - affected.size} من ${posts.length}`);
console.log('─'.repeat(72) + '\n');

if (args.includes('--fatal') && by(F).length) process.exit(1);
