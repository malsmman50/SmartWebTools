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

// معرّفات المقالات المنشورة — يُقاس عليها كل رابط داخلي إلى المدونة.
// المسودّات ليست منشورة، فالرابط إليها 404 في عين الزاحف كالمحذوف تماماً.
const ALL_SLUGS = new Set(posts.filter((p) => p.draft !== true).map((p) => p.slug));

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
  /* الاستثناء مربوطٌ بلفظ التقويم عمداً.
     وسّعتُه أولاً إلى «الفرق بين» و«مقارنة» أينما وردتا في الجوار، فصار
     يُعفي كل جملة يقع قربها لفظ مقارنة — وأثبت اختبار الحقن أنه أعمى:
     التقط خطأً واحداً من خطأين متعمّدين. فالاستثناء الآن صيغة بعينها،
     «الفرق بين الحول الهجري والميلادي» وما يقابلها بالإنجليزية، لا كلمة
     عابرة. استثناءٌ واسع يُسكت القاعدة أشدّ من إنذار كاذب يُزعجها. */
  const NEGATED = new RegExp(
    '(?:وليس|ليس|لا\\s+ب?|بدلاً\\s+من|not|rather\\s+than|instead\\s+of)' +
    '\\s*(?:ال)?(?:تقويم\\s*)?(?:ميلادي|شمسي|solar|gregorian)' +
    '|الفرق\\s+بين\\s+الحول\\s+الهجري\\s+و(?:ال)?ميلادي' +
    '|difference\\s+between\\s+(?:the\\s+)?(?:hijri|lunar)[^.]{0,30}(?:gregorian|solar)', 'i');
  /* «حوّل» فعلٌ و«حول» ظرفٌ، و«الحول» وحده هو المصطلح الفقهي. والصيغة
     الأولى التقطت «حوّل التاريخ الهجري والميلادي» تسع مرات في صفحة المحوّل —
     وهي دعوة لاستعمال الأداة لا خطأ في وصف الحول. فاشتُرطت أداة التعريف،
     واستُثني ما تلاه «التاريخ» صراحةً لأنه موضع الالتباس. */
  const hits = [
    ...text.matchAll(/الحول(?!\s*(?:ال)?تاريخ)[^.،]{0,40}?(?:سنة\s*)?(?:ميلادي|شمسي)/g),
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
  /* «Standard» وحدها كانت تكفي لبدء العدّ، فقرأت القاعدة «AAOIFI standard
     (0.8% ...)» على أنها المعيار رقم صفر. فالرقم الآن يلزمه سياق ترقيم
     صريح — «رقم» أو «No.» — وألّا يكون كسراً عشرياً بعده فاصلة ورقم. */
  const re = /(?:أيوفي|AAOIFI)[^.،\n]{0,40}?(?:رقم|No\.|Standard\s+No\.?)\s*\(?(\d{1,2})(?![.,]\d)/gi;
  for (const m of text.matchAll(re)) {
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

/**
 * الروابط الداخلية: وجهتها، ولغتها، وأن المقال المقصود ما زال موجوداً.
 *
 * النسخة الأولى طابقت `href="/ar/…"` وحدها — أي الروابط النسبية. والمقالات
 * تكتب روابطها مطلقةً بالنطاق الكامل، فكانت القاعدة ترى 14 رابطاً من 245
 * وتسكت عن 231. سكوتٌ يُقرأ في التقرير على أنه سلامة.
 *
 * ولهذا مرّت عشرة روابط تقذف القارئ العربي إلى صفحات إنجليزية دون إنذار
 * واحد، حتى وجدتُها بالفحص اليدوي. القاعدة الآن تقبل الصيغتين.
 *
 * وأُضيف فحصٌ لم يكن: أن يكون المقال المُشار إليه موجوداً فعلاً. فحذف مقال
 * واحد يترك كل رابط إليه 404 — وهو بالضبط ما يقيسه الزاحف على الموقع.
 */
const ORIGIN = /^(?:https?:\/\/(?:www\.)?smartcalctools\.xyz)?/;

function checkLinks(slug, ar, en) {
  for (const [text, lang] of [[ar, 'ar'], [en, 'en']]) {
    for (const m of text.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      // روابط خارجية حقيقية تُترك؛ المعنيّ هنا ما يقع داخل الموقع.
      const path = href.replace(ORIGIN, '');
      if (!path.startsWith('/')) continue;
      const seg = path.match(/^\/(ar|en)(\/[^#?]*)?/);
      if (!seg) {
        flag(W, slug, 'رابط داخلي بلا لغة', `${href} — كل مسار داخلي يبدأ بـ /ar أو /en`);
        continue;
      }
      const [, hrefLang, rawTail = ''] = seg;
      const tail = rawTail.replace(/\/$/, '');

      if (tail.startsWith('/blog/')) {
        const target = tail.slice('/blog/'.length);
        if (!ALL_SLUGS.has(target)) {
          flag(F, slug, 'رابط لمقال محذوف', `${href} — لا مقال بهذا المعرّف، الرابط 404`);
        }
      } else if (tail && !LIVE.has(tail)) {
        flag(F, slug, 'رابط لمسار غير موجود', `${href} — يرد 301 أو 404`);
      }

      if (hrefLang !== lang) {
        flag(W, slug, 'رابط بلغة أخرى', `النسخة ${lang} تشير إلى ${href}`);
      }
    }
  }
}

/**
 * سلامة الوسوم.
 *
 * وُجد في خمسة مقالات فقراتٌ لم تُغلق، وفي واحد `</p>` زائد يغلق ما لم
 * يُفتح. المتصفّح يتسامح مع ذلك فيبدو المقال سليماً على الشاشة — لكن
 * التعقيم عبر sanitize-html يعيد بناء الشجرة، وشجرةٌ مختلّة قد تُسقط
 * فقرةً أو تبتلع ما بعدها. والعطب من النوع الذي لا يظهر إلا في الإنتاج
 * وعلى صفحة بعينها.
 */
function checkMarkup(slug, ar, en) {
  for (const [text, lang] of [[ar, 'العربية'], [en, 'الإنجليزية']]) {
    for (const tag of ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'table', 'strong']) {
      const open = (text.match(new RegExp(`<${tag}\\b[^>]*>`, 'gi')) || []).length;
      const close = (text.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
      if (open !== close) {
        flag(W, slug, 'وسوم غير متوازنة',
          `النسخة ${lang} — <${tag}> ${open} مقابل ${close}؛ التعقيم يعيد بناء الشجرة وقد يُسقط محتوى`);
      }
    }
  }
}

/** بقايا الحداثة الآلية — تلاعب بإشارات التحديث. */
function checkAutomation(slug, post, text) {
  if (post.dateModified) flag(W, slug, 'dateModified', 'حقل الحداثة المزيّف يجب أن يبقى محذوفاً');
  if (/\[(?:تمت مراجعة|Data accuracy)/.test(text)) flag(W, slug, 'حاشية آلية', 'من بقايا freshness bot');
}

/**
 * بنية المقال — البنود القابلة للقياس من العتبة السبعية.
 *
 * كان الفحص يقبل جدولاً في العربية وحدها، ويعدّ ورودَ عبارة «الأسئلة
 * الشائعة» في أيّ اللغتين وفاءً بشرط «أربعة أسئلة» — فيمرّ مقال إنجليزيّه
 * بلا جدول، ومقالٌ فيه سؤال واحد. النسختان صفحتان مستقلّتان يزورهما قارئان
 * مختلفان، ويفهرسهما الزاحف منفصلتين؛ فالعتبة تلزمهما معاً.
 */
// العناوين التي كتب بها المحرّرون قسم الأسئلة فعلاً — لا التي افترضتُها.
// «\bFAQ\b» وحدها لا تطابق «FAQs» بالجمع، فأنذرت القاعدة على مقالٍ قسمُه
// «Common Misconceptions and FAQs» تامّ بأربعة أسئلة. تضييق العنوان يصنع
// إنذاراً كاذباً كما يصنعه تضييق الصيغة.
const FAQ_HEADING = /(الأسئلة الشائعة|أسئلة شائعة|أسئلة متكررة|الأسئلة والأجوبة|frequently asked|common misconceptions|\bFAQs?\b)/i;

/**
 * عدّ الأسئلة — بصيغتيه معاً.
 *
 * النسخة الأولى عدّت ترويسات <h3> وحدها، فأبلغت عن تسعة مقالات «بلا أسئلة
 * شائعة» وفيها أسئلة مكتوبة بصيغة <li><strong>س: …</strong>. وهو إنذار كاذب
 * من أسوأ نوع: يبعث المحرّر ليكتب ما هو مكتوب.
 *
 * والصيغتان تُعدّان، لأن السؤال سؤال. لكن الصيغة الأولى وحدها هي التي تصنع
 * بنية ترويسات يقرؤها الزاحف ويربطها بمخطط FAQPage — فالثانية تُذكر تحذيراً
 * مستقلاً بوصفها فرصةً ضائعة، لا نقصاً في المحتوى.
 */
// المقالات كتبت أسئلتها بثلاث صيغ: ترويسة <h3>، و<strong> داخل فقرة، و<strong>
// داخل عنصر قائمة — بترقيم أو بـ«س:» أو بلا شيء. فالعلامة الجامعة هي علامة
// الاستفهام في آخر النصّ البارز، لا الصيغة التي كُتب بها.
const Q_HEADING = /<h[34][^>]*>[^<]*[؟?]\s*<\/h[34]>/gi;
const Q_INLINE = /<(?:strong|b)>[^<]*[؟?]\s*<\/(?:strong|b)>/gi;

function countQuestions(text) {
  const i = text.search(FAQ_HEADING);
  if (i < 0) return { total: 0, structured: 0 };
  const tail = text.slice(i);
  const structured = (tail.match(Q_HEADING) || []).length;
  const inline = (tail.match(Q_INLINE) || []).length;
  return { total: structured + inline, structured };
}

function checkStructure(slug, post, ar, en) {
  for (const [text, lang] of [[ar, 'العربية'], [en, 'الإنجليزية']]) {
    if (!/<table/i.test(text)) flag(W, slug, 'بلا جدول', `النسخة ${lang} — العتبة تشترط جدولاً أصلياً`);
    const { total, structured } = countQuestions(text);
    if (total === 0) flag(W, slug, 'بلا أسئلة شائعة', `النسخة ${lang} — العتبة تشترط ≥4`);
    else if (total < 4) flag(W, slug, 'أسئلة شائعة ناقصة', `النسخة ${lang} — ${total} من 4`);
    if (total >= 1 && structured === 0) {
      flag(N, slug, 'أسئلة بصيغة غير مهيكلة',
        `النسخة ${lang} — ${total} سؤالاً بصيغة «س:» داخل قائمة؛ ترويسات <h3> تُقرأ كبنية ويربطها الزاحف بـ FAQPage`);
    }
  }
  if (ar.length < 3500) flag(N, slug, 'مقال قصير', `${ar.length} حرفاً — تحقّق من عمق المعالجة`);
  if (!/\d/.test(ar)) flag(W, slug, 'بلا أرقام', 'العتبة تشترط مثالاً عددياً محلولاً');
}

/**
 * صحّة الحساب في الأمثلة المحلولة.
 *
 * المدقّق يتحقّق من النسبة والنصاب، ثم يمرّ على «140,000,000 × 2.5% =
 * 3,500,000» دون أن يجريها. والقارئ الذي يتتبّع المثال بآلته الحاسبة هو
 * أول من سيكتشف الخلل — وحينها يكون قد فقد الثقة في الأداة كلّها.
 *
 * فما دام الرقمان والعملية مكتوبين صراحةً، فالتحقّق منها آليٌّ ورخيص.
 */
function checkArithmetic(slug, text) {
  const num = (s) => Number(String(s).replace(/[,٬\s$]/g, ''));
  const near = (a, b) => Math.abs(a - b) <= Math.max(0.02, Math.abs(b) * 0.005);

  // أ × ب% = ج
  for (const m of text.matchAll(/([\d,]+(?:\.\d+)?)\s*[×x*]\s*([\d.]+)\s*%\s*=\s*\$?([\d,]+(?:\.\d+)?)/gi)) {
    const [a, r, c] = [num(m[1]), Number(m[2]), num(m[3])];
    if (!near(a * r / 100, c)) {
      flag(F, slug, 'خطأ حسابي', `«${m[0].trim()}» — الناتج الصحيح ${(a * r / 100).toLocaleString('en-US')}`);
    }
  }
  // أ ÷ ب = ج
  for (const m of text.matchAll(/([\d,]+(?:\.\d+)?)\s*[÷/]\s*([\d,]+(?:\.\d+)?)\s*=\s*\$?([\d,]+(?:\.\d+)?)/g)) {
    const [a, b, c] = [num(m[1]), num(m[2]), num(m[3])];
    if (b && !near(a / b, c)) {
      flag(F, slug, 'خطأ حسابي', `«${m[0].trim()}» — الناتج الصحيح ${a / b}`);
    }
  }
  // أ + ب + … = ج
  for (const m of text.matchAll(/([\d,]+(?:\.\d+)?(?:\s*\+\s*[\d,]+(?:\.\d+)?){1,6})\s*=\s*\$?([\d,]+(?:\.\d+)?)/g)) {
    const sum = m[1].split('+').reduce((t, x) => t + num(x), 0);
    if (!near(sum, num(m[2]))) {
      flag(F, slug, 'خطأ حسابي', `«${m[0].trim()}» — المجموع الصحيح ${sum.toLocaleString('en-US')}`);
    }
  }
}

/**
 * التشابه بين المقالات — القاعدة التي كان غيابها أفدح من كل ما سبق.
 *
 * سبب رفض AdSense المعلن كان «محتوى منخفض القيمة»، وجوهره التكرار: صفحات
 * تقول الشيء نفسه بألفاظ مبدّلة. وكل قواعد هذا الملف تفحص المقال وحده —
 * فمقالان متطابقان بنسبة 80% يمرّان كلاهما «سليماً تماماً».
 *
 * والقياس هنا على تداخل المتتاليات (shingles): تُجرَّد الوسوم والأرقام
 * وعلامات الترقيم، ثم يُقارَن كل مقال بغيره على متتاليات من خمس كلمات.
 * الأرقام تُجرَّد عمداً لأن التكرار الحقيقي يتخفّى بتبديلها: «زكاة 100 جرام»
 * و«زكاة 200 جرام» نصٌّ واحد وإن اختلف الرقمان — وهو بالضبط ما كانت تفعله
 * صفحات PSEO السبعة آلاف.
 */
const SHINGLE = 5;
const DUP_HIGH = 0.45;  // تطابق يستوجب الدمج أو الحذف
const DUP_WARN = 0.28;  // زاويتان متقاربتان تستحقّان مراجعة

function shingles(html) {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/[\d.,٬%$×÷=+—–\-()«»"'?؟:;،.]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i++) set.add(words.slice(i, i + SHINGLE).join(' '));
  return set;
}

function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (large.has(s)) shared++;
  return shared / small.size; // نسبةً إلى الأصغر: احتواءُ مقالٍ في آخر تكرارٌ أيضاً
}

function checkDuplication(items) {
  for (const lang of ['ar', 'en']) {
    const prints = items.map((p) => ({ slug: p.slug, sh: shingles(lang === 'ar' ? p.contentAr || '' : p.contentEn || '') }));
    for (let i = 0; i < prints.length; i++) {
      for (let j = i + 1; j < prints.length; j++) {
        const r = overlap(prints[i].sh, prints[j].sh);
        if (r < DUP_WARN) continue;
        const pct = (r * 100).toFixed(0);
        const label = lang === 'ar' ? 'العربية' : 'الإنجليزية';
        if (r >= DUP_HIGH) {
          flag(F, prints[i].slug, 'تكرار عالٍ',
            `${pct}% تطابق مع ${prints[j].slug} (${label}) — يُدمج أو يُحذف أحدهما`);
        } else {
          flag(W, prints[i].slug, 'تشابه ملحوظ',
            `${pct}% تطابق مع ${prints[j].slug} (${label}) — تأكّد من تمايز الزاوية`);
        }
      }
    }
  }
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
const ALL = args.includes('--all');
const target = only ? posts.filter((p) => p.slug === only) : posts;

for (const post of target) {
  const ar = post.contentAr || '', en = post.contentEn || '';
  const both = ar + '\n' + en;
  const s = post.slug;
  checkNisab(s, both); checkRate(s, both); checkHawl(s, both);
  checkAuthority(s, both); checkStandards(s, both); checkRiba(s, both);
  checkLinks(s, ar, en); checkAutomation(s, post, both);
  checkStructure(s, post, ar, en); checkArithmetic(s, both); checkMarkup(s, ar, en);
  collectTitle(post);
}

// المقارنة بين المقالات تحتاج المجموعة كاملة — فلا تُجرى عند فحص مقال واحد.
if (!only) checkDuplication(posts);

/**
 * الصفحات الثابتة تُفحص كما تُفحص المقالات.
 *
 * كل قواعد هذا الملف كانت تقرأ blog-data.json وحده، فمرّ في صفحة المنهجية
 * إسنادٌ إلى «معيار أيوفي رقم 38: توزيع التركات» — والمعيار 38 عنوانه
 * «التعاملات المالية عبر الإنترنت». وقاعدة الأرقام موجودة منذ البداية وكانت
 * ستلتقطه في أول تشغيل، لكنها لم تكن تنظر إلى هناك.
 *
 * والصفحات الثابتة أولى بالفحص لا أقلّ: صفحة المنهجية هي التي يُرجع إليها
 * ليُوثَّق ما في المقالات.
 */
function auditStaticPages() {
  const dir = path.join(ROOT, 'app', '[lang]');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(d, e.name);
    return e.isDirectory() ? walk(full) : (e.name.endsWith('.js') ? [full] : []);
  });

  for (const file of walk(dir)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const text = fs.readFileSync(file, 'utf-8');
    checkNisab(rel, text);
    checkRate(rel, text);
    checkHawl(rel, text);
    checkAuthority(rel, text);
    checkStandards(rel, text);
    checkArithmetic(rel, text);
  }
}

if (!only) auditStaticPages();

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
    // الاختصار للقراءة السريعة؛ و--all يعرض كل بند. تقريرٌ يُخفي نصف نتائجه
    // يُجبر قارئه على تخمين ما وراء «و11 غيرها»، وهو أول الطريق إلى تجاهله.
    const shown = ALL ? list : list.slice(0, 6);
    for (const f of shown) console.log(`      ${f.slug}\n        ${f.detail}`);
    if (!ALL && list.length > 6) console.log(`      … و${list.length - 6} غيرها — شغّل --all لعرضها`);
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
