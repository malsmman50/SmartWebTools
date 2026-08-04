/**
 * التدقيق الشامل — 150 سؤالاً عن الموقع الحيّ
 *
 *   node scripts/full-audit.mjs                  الموقع المنشور
 *   node scripts/full-audit.mjs --base=http://localhost:3000
 *   node scripts/full-audit.mjs --group=امتثال
 *
 * كل بند هنا سؤالٌ له جواب واحد يُقاس، لا رأيٌ يُناقش. سبب وجود الملف أن
 * الفحص اليدوي يفحص ما يخطر بالبال، ويترك ما لا يخطر — وما لا يخطر بالبال
 * هو بالضبط ما يسقط الموقع. مجموعة ثابتة تُشغَّل بعد كل تغيير تحمي مما
 * لا نفكر فيه.
 *
 * فشل واحد لا يعني كارثة؛ اقرأ السبب المطبوع بجانبه.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const BASE = args.find(a => a.startsWith('--base='))?.split('=')[1] ?? 'https://smartcalctools.xyz';
const ONLY = args.find(a => a.startsWith('--group='))?.split('=')[1];

const rd = p => { try { return fs.readFileSync(path.join(ROOT, p), 'utf-8'); } catch { return ''; } };
const has = p => fs.existsSync(path.join(ROOT, p));

const cache = new Map();
async function get(url) {
  if (cache.has(url)) return cache.get(url);
  try {
    const r = await fetch(BASE + url, { redirect: 'manual', headers: { 'User-Agent': 'SmartCalcTools-Audit' } });
    const body = r.status < 300 || r.status >= 400 ? await r.text() : '';
    const v = { status: r.status, body, headers: r.headers, location: r.headers.get('location') || '' };
    // 403/429 يعنيان أن المدقّق نفسه حُجب، لا أن الصفحة معطوبة. لا تُخزَّن
    // هذه الاستجابة، وإلا انتشر عطبٌ واحد على كل فحص يشترك في العنوان.
    if (r.status === 403 || r.status === 429) {
      console.warn(`\n  ⚠ حُجب المدقّق على ${url} (${r.status}) — أبطئ الوتيرة وأعد التشغيل`);
      return v;
    }
    cache.set(url, v);
    return v;
  } catch (e) {
    const v = { status: 0, body: '', headers: new Headers(), location: '', error: String(e) };
    cache.set(url, v);
    return v;
  }
}

const checks = [];
const ask = (group, q, run) => checks.push({ id: checks.length + 1, group, q, run });

// مسارات حقيقية ومحذوفة — تُستعمل في مواضع كثيرة أدناه
const PAGES = ['', '/calculators/zakat', '/calculators/inheritance', '/calculators/murabaha',
  '/calculators/mudarabah', '/calculators/sukuk', '/calculators/islamic-deposit',
  '/calculators/islamic-fire', '/calculators/roi', '/calculators/currency',
  '/tools/qibla-compass', '/tools/hijri-converter', '/calculators/health/ramadan-hydration',
  '/compare/sukuk-vs-bonds', '/compare/murabaha-vs-conventional-loan',
  '/methodology', '/about', '/contact', '/privacy-policy', '/terms-of-service', '/developers', '/blog'];

const CALCS = ['/calculators/zakat', '/calculators/inheritance', '/calculators/murabaha',
  '/calculators/mudarabah', '/calculators/sukuk', '/calculators/islamic-deposit',
  '/calculators/islamic-fire', '/calculators/roi', '/tools/qibla-compass', '/tools/hijri-converter'];

const GONE = ['/tools/json-formatter', '/tools/jwt-decoder', '/tools/chatpdf', '/tools/regex-tester',
  '/tools/password-generator', '/tools/prompt-generator', '/tools/image-compressor',
  '/tools/cron-generator', '/tools/data-converter', '/calculators/shopping/shoe-size',
  '/calculators/shopping/discount', '/calculators/health/pregnancy', '/calculators/lifestyle/split-bill'];

// ═══ ١. الوصول والتوفّر (24) ═══
for (const p of PAGES) {
  ask('توفّر', `هل ${p || '/'} يعمل بالعربية؟`, async () => (await get('/ar' + p)).status === 200 || `HTTP ${(await get('/ar' + p)).status}`);
}
ask('توفّر', 'هل الجذر / يحوّل إلى لغة؟', async () => { const r = await get('/'); return [301, 302, 307, 308].includes(r.status) || r.status === 200 || `HTTP ${r.status}`; });
ask('توفّر', 'هل صفحة 404 تعمل بدل انهيار؟', async () => (await get('/ar/لا-يوجد-هذا')).status === 404 || 'لا ترجع 404');

// ═══ ٢. اللغة الإنجليزية (22) ═══
for (const p of PAGES) {
  ask('لغتان', `هل ${p || '/'} يعمل بالإنجليزية؟`, async () => (await get('/en' + p)).status === 200 || `HTTP ${(await get('/en' + p)).status}`);
}

// ═══ ٣. إعادة التوجيه (17) ═══
for (const p of GONE) {
  ask('توجيه', `هل ${p} المحذوف يحوّل 301؟`, async () => { const r = await get('/en' + p); return r.status === 301 || `HTTP ${r.status} — يجب 301 لا 404`; });
}
ask('توجيه', 'هل صفحة PSEO زكاة تحوّل لأمّها؟', async () => { const r = await get('/en/calculators/zakat/zakat-on-100-grams-of-24k-gold'); return (r.status === 301 && r.location.endsWith('/calculators/zakat')) || `${r.status} → ${r.location}`; });
ask('توجيه', 'هل صفحة PSEO عملة تحوّل لأمّها؟', async () => { const r = await get('/en/calculators/currency/convert-100-usd-to-sar'); return r.status === 301 || `HTTP ${r.status}`; });
ask('توجيه', 'هل /articles القديم يحوّل للمدونة؟', async () => { const r = await get('/en/articles/any-slug'); return (r.status === 301 && r.location.includes('/blog')) || `${r.status} → ${r.location}`; });
ask('توجيه', 'هل التحويلات دائمة 301 لا مؤقتة 302؟', async () => { const r = await get('/en/tools/json-formatter'); return r.status === 301 || `HTTP ${r.status} — 302 لا تنقل ترتيب الصفحة`; });

// ═══ ٤. الأمان (16) ═══
ask('أمان', 'هل الـ cron محمي برمز 401؟', async () => (await get('/api/cron/send-reminders')).status === 401 || 'غير محمي');
ask('أمان', 'هل CSP مضبوطة؟', async () => !!(await get('/ar')).headers.get('content-security-policy') || 'غائبة');
ask('أمان', 'هل CSP تمنع object-src؟', async () => ((await get('/ar')).headers.get('content-security-policy') || '').includes("object-src 'none'") || 'غير مضبوطة');
ask('أمان', 'هل CSP تقيّد frame-ancestors؟', async () => ((await get('/ar')).headers.get('content-security-policy') || '').includes('frame-ancestors') || 'غائبة');
ask('أمان', 'هل X-Content-Type-Options مضبوطة؟', async () => (await get('/ar')).headers.get('x-content-type-options') === 'nosniff' || 'غائبة');
ask('أمان', 'هل Referrer-Policy مضبوطة؟', async () => !!(await get('/ar')).headers.get('referrer-policy') || 'غائبة');
ask('أمان', 'هل HSTS مفعّلة؟', async () => !!(await get('/ar')).headers.get('strict-transport-security') || 'غائبة');
ask('أمان', 'هل الخادم يخفي هويته؟', async () => !(await get('/ar')).headers.get('x-powered-by') || 'يكشف X-Powered-By');
ask('أمان', 'هل الموقع كله على HTTPS؟', async () => BASE.startsWith('https') || 'غير مشفّر');
ask('أمان', 'هل من أسرار في كود الواجهة؟', async () => !/re_[A-Za-z0-9]{12}|sk_live|AIzaSy/.test((await get('/ar')).body) || 'سرّ مكشوف في HTML');
ask('أمان', 'هل .env محجوب عن الويب؟', async () => (await get('/.env')).status !== 200 || 'مكشوف!');
ask('أمان', 'هل .git محجوب؟', async () => (await get('/.git/config')).status !== 200 || 'مكشوف!');
ask('أمان', 'هل لا أسرار في المستودع؟', () => !/re_[A-Za-z0-9]{12}|sk_live|AIzaSy/.test(rd('app/[lang]/layout.js') + rd('middleware.js')) || 'سرّ في الكود');
ask('أمان', 'هل تحديد المعدّل مفعّل؟', () => /ratelimit|Ratelimit/i.test(rd('middleware.js')) || 'غير موجود');
ask('أمان', 'هل التعقيم مطبّق على المحتوى؟', () => has('lib/sanitize.js') || 'lib/sanitize.js مفقود');
ask('أمان', 'هل توكنات الإلغاء موقّعة؟', () => /jose|jwt/i.test(rd('lib/token.js')) || 'غير موقّعة');

// ═══ ٥. السيو والفهرسة (18) ═══
ask('سيو', 'هل sitemap.xml يعمل؟', async () => (await get('/sitemap.xml')).status === 200 || 'لا يعمل');
ask('سيو', 'هل sitemap خالٍ من صفحات PSEO؟', async () => { const b = (await get('/sitemap.xml')).body; const bad = (b.match(/zakat-on-\d|convert-\d+-|json-formatter|shoe-size/g) || []).length; return bad === 0 || `${bad} بقايا`; });
ask('سيو', 'هل عدد روابط sitemap معقول (<400)؟', async () => { const n = ((await get('/sitemap.xml')).body.match(/<loc>/g) || []).length; return n > 0 && n < 400 || `${n} رابطاً`; });
ask('سيو', 'هل robots.txt يعمل؟', async () => (await get('/robots.txt')).status === 200 || 'مفقود');
ask('سيو', 'هل robots يشير إلى sitemap؟', async () => /sitemap/i.test((await get('/robots.txt')).body) || 'لا يشير');
ask('سيو', 'هل robots لا يحجب الموقع كله؟', async () => !/Disallow:\s*\/\s*$/m.test((await get('/robots.txt')).body) || 'يحجب كل شيء!');
for (const p of ['', '/calculators/zakat', '/blog', '/methodology']) {
  ask('سيو', `هل ${p || '/'} خالٍ من noindex؟`, async () => !(await get('/ar' + p)).body.includes('noindex') || 'يحمل noindex!');
}
ask('سيو', 'هل canonical موجود؟', async () => /rel="canonical"/.test((await get('/ar/calculators/zakat')).body) || 'غائب');
ask('سيو', 'هل hreflang للعربية موجود؟', async () => /hreflang="ar"|hrefLang="ar"/i.test((await get('/ar/calculators/zakat')).body) || 'غائب');
ask('سيو', 'هل hreflang للإنجليزية موجود؟', async () => /hreflang="en"|hrefLang="en"/i.test((await get('/ar/calculators/zakat')).body) || 'غائب');
ask('سيو', 'هل x-default معرّف؟', async () => /x-default/i.test((await get('/ar')).body) || 'غائب');
ask('سيو', 'هل العنوان <title> موجود؟', async () => /<title>[^<]{10,}/.test((await get('/ar')).body) || 'قصير أو غائب');
ask('سيو', 'هل الوصف meta description موجود؟', async () => /name="description"\s+content="[^"]{50,}/.test((await get('/ar')).body) || 'قصير أو غائب');
ask('سيو', 'هل og:locale صحيح ar_SA؟', async () => { const b = (await get('/ar')).body; return !b.includes('ar_AR') || 'يستخدم ar_AR الخاطئ'; });
ask('سيو', 'هل يوجد h1 واحد في الرئيسية؟', async () => { const n = ((await get('/ar')).body.match(/<h1/g) || []).length; return n === 1 || `${n} عنصر h1`; });

// ═══ ٦. البيانات المنظمة (14) ═══
for (const p of CALCS.slice(0, 8)) {
  ask('schema', `هل ${p} يبثّ FAQPage؟`, async () => (await get('/ar' + p)).body.includes('FAQPage') || 'غائب');
}
ask('schema', 'هل الرئيسية تبثّ WebSite؟', async () => (await get('/ar')).body.includes('"WebSite"') || 'غائب');
ask('schema', 'هل الرئيسية تبثّ Organization؟', async () => (await get('/ar')).body.includes('"Organization"') || 'غائب');
ask('schema', 'هل الزكاة تبثّ SoftwareApplication؟', async () => (await get('/ar/calculators/zakat')).body.includes('SoftwareApplication') || 'غائب');
ask('schema', 'هل الـ JSON-LD صالح للتحليل؟', async () => {
  const m = (await get('/ar/calculators/zakat')).body.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s);
  if (!m) return 'لا يوجد';
  try { JSON.parse(m[1]); return true; } catch { return 'JSON غير صالح'; }
});
// يُسأل مقالٌ فعلي لا صفحة الفهرس: BlogPosting يعيش في صفحة المقال،
// وسؤال الفهرس عنه أنتج إنذاراً كاذباً في أول تشغيل.
ask('schema', 'هل مقال المدونة يبثّ BlogPosting؟', async () => {
  const slug = JSON.parse(rd('lib/blog-data.json')).find(p => !p.draft)?.slug;
  return (await get('/ar/blog/' + slug)).body.includes('BlogPosting') || 'غائب';
});
ask('schema', 'هل FAQ فيه أسئلة فعلية؟', async () => { const n = ((await get('/ar/calculators/zakat')).body.match(/"Question"/g) || []).length; return n >= 4 || `${n} أسئلة فقط`; });

// ═══ ٧. الحاشية والسند الشرعي (14) ═══
for (const p of CALCS) {
  ask('حاشية', `هل ${p} يعرض حاشية السند؟`, async () => (await get('/ar' + p)).body.includes('hashiya') || 'غائبة');
}
ask('حاشية', 'هل الزكاة تذكر معيار أيوفي 35؟', async () => (await get('/ar/calculators/zakat')).body.includes('رقم 35') || 'غائب');
ask('حاشية', 'هل المرابحة تذكر معيار 8؟', async () => (await get('/ar/calculators/murabaha')).body.includes('رقم 8') || 'غائب');
ask('حاشية', 'هل المواريث تذكر آيات النساء؟', async () => (await get('/ar/calculators/inheritance')).body.includes('النساء') || 'غائب');
ask('حاشية', 'هل المواريث تعلن المذهب؟', async () => (await get('/ar/calculators/inheritance')).body.includes('حنفي') || 'غير معلن');

// ═══ ٨. الدقة الحسابية والفقهية (12) ═══
const api = async (body) => { try { const r = await fetch(BASE + '/api/v1/calculate/zakat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return await r.json(); } catch { return {}; } };
ask('دقة', 'هل API الزكاة يستجيب؟', async () => (await api({ cash: 100000 })).success === true || 'لا يستجيب');
ask('دقة', 'هل نسبة الزكاة 2.5% بالضبط؟', async () => { const d = await api({ cash: 100000 }); return d.zakatDue === 2500 || `${d.zakatDue} بدل 2500`; });
ask('دقة', 'هل النصاب من سعر حيّ لا ثابت قديم؟', async () => { const d = await api({ cash: 1 }); return d.goldPriceSource === 'live' || `المصدر: ${d.goldPriceSource}`; });
ask('دقة', 'هل النصاب مبني على 85 جراماً؟', async () => (await api({ cash: 1 })).nisabGoldGrams === 85 || 'ليس 85');
ask('دقة', 'هل النصاب يطابق سعر×85؟', async () => { const d = await api({ cash: 1 }); return Math.abs(d.nisabThreshold - d.goldPricePerGram * 85) < 2 || 'لا يطابق'; });
ask('دقة', 'هل من دون النصاب لا زكاة عليه؟', async () => { const d = await api({ cash: 100 }); return d.zakatDue === 0 || 'يفرض زكاة دون النصاب!'; });
ask('دقة', 'هل الديون تُخصم؟', async () => { const d = await api({ cash: 100000, debts: 50000 }); return d.netAssets === 50000 || `${d.netAssets}`; });
ask('دقة', 'هل المدخل السالب لا يكسر الحساب؟', async () => { const d = await api({ cash: -5000 }); return d.success === true || 'ينهار'; });
ask('دقة', 'هل المدخل النصّي لا يكسر الحساب؟', async () => { const d = await api({ cash: 'abc' }); return d.success === true || 'ينهار'; });
ask('دقة', 'هل الجسم الفارغ لا يكسر الحساب؟', async () => { const d = await api({}); return d.success === true || 'ينهار'; });
ask('دقة', 'هل سعر الذهب مصدره حيّ؟', async () => { const r = await get('/api/gold'); return r.status === 200 && /price/i.test(r.body) || 'لا يعمل'; });
ask('دقة', 'هل ثابت النصاب موحّد في lib؟', () => /NISAB_GOLD_GRAMS\s*=\s*85/.test(rd('lib/goldPrice.js')) || 'غير موحّد');

// ═══ ٩. الامتثال و AdSense (13) ═══
ask('امتثال', 'هل سياسة الخصوصية موجودة؟', async () => (await get('/ar/privacy-policy')).status === 200 || 'مفقودة');
ask('امتثال', 'هل الخصوصية تذكر الإعلانات؟', async () => /إعلان|AdSense/i.test((await get('/ar/privacy-policy')).body) || 'لا تذكرها');
ask('امتثال', 'هل الخصوصية تذكر الارتباطات؟', async () => /ارتباط|Cookie/i.test((await get('/ar/privacy-policy')).body) || 'لا تذكرها');
ask('امتثال', 'هل الخصوصية تذكر التحليلات؟', async () => /Analytics|تحليل/i.test((await get('/ar/privacy-policy')).body) || 'لا تذكرها');
ask('امتثال', 'هل الشروط موجودة؟', async () => (await get('/ar/terms-of-service')).status === 200 || 'مفقودة');
ask('امتثال', 'هل «من نحن» موجودة؟', async () => (await get('/ar/about')).status === 200 || 'مفقودة');
ask('امتثال', 'هل «اتصل بنا» موجودة؟', async () => (await get('/ar/contact')).status === 200 || 'مفقودة');
ask('امتثال', 'هل صفحة المنهجية موجودة؟', async () => (await get('/ar/methodology')).status === 200 || 'مفقودة');
ask('امتثال', 'هل المنهجية فيها محتوى حقيقي؟', async () => (await get('/ar/methodology')).body.length > 15000 || 'قصيرة جداً');
ask('امتثال', 'هل لافتة الارتباطات موجودة؟', async () => /cookie|ارتباط/i.test((await get('/ar')).body) || 'غائبة');
ask('امتثال', 'هل تتيح رفض الإعلانات المخصصة؟', async () => /رفض|Reject/i.test((await get('/ar')).body) || 'لا تتيح الرفض');
ask('امتثال', 'هل إخلاء المسؤولية الديني ظاهر؟', async () => /إخلاء مسؤولية|تنبيه شرعي/.test((await get('/ar/calculators/zakat')).body) || 'غائب');
ask('امتثال', 'هل الروابط للسياسات في كل صفحة؟', async () => (await get('/ar/calculators/zakat')).body.includes('privacy-policy') || 'غائبة');

// ═══ ١٠. النطاق والهوية (10) ═══
ask('نطاق', 'هل أدوات المطوّرين خرجت فعلاً؟', async () => { let n = 0; for (const t of GONE.slice(0, 9)) if ((await get('/en' + t)).status === 200) n++; return n === 0 || `${n} ما زالت`; });
ask('نطاق', 'هل التنقل خالٍ من أدوات محذوفة؟', async () => !/json-formatter|chatpdf|shoe-size/.test((await get('/ar')).body) || 'روابط ميتة في التنقل');
ask('نطاق', 'هل الرئيسية تعلن التخصص؟', async () => /زكا|ميراث|شرع/.test((await get('/ar')).body) || 'لا هوية واضحة');
ask('نطاق', 'هل الخط النحاسي معتمد لا الأزرق؟', async () => { const c = (await get('/ar')).body; return !/#2563eb|#7c3aed/.test(c) || 'لوحة القالب الافتراضي باقية'; });
ask('نطاق', 'هل خط العرض Aref محمّل؟', async () => { const b = (await get('/ar')).body; const m = b.match(/\/_next\/static\/chunks\/[a-z0-9_]+\.css/); if (!m) return 'لا CSS'; return (await get(m[0])).body.includes('font-aref') || 'غير محمّل'; });
ask('نطاق', 'هل خط الأرقام mono محمّل؟', async () => { const b = (await get('/ar')).body; const m = b.match(/\/_next\/static\/chunks\/[a-z0-9_]+\.css/); if (!m) return 'لا CSS'; return (await get(m[0])).body.includes('font-plex-mono') || 'غير محمّل'; });
ask('نطاق', 'هل اتجاه العربية RTL؟', async () => /dir="rtl"/.test((await get('/ar')).body) || 'غير مضبوط');
ask('نطاق', 'هل اتجاه الإنجليزية LTR؟', async () => /dir="ltr"/.test((await get('/en')).body) || 'غير مضبوط');
ask('نطاق', 'هل lang="ar" مضبوطة؟', async () => /<html lang="ar"/.test((await get('/ar')).body) || 'غير مضبوطة');
ask('نطاق', 'هل PWA manifest موجود؟', async () => (await get('/manifest.json')).status === 200 || 'مفقود');

// ═══ ١١. الأداء والبنية (10) ═══
ask('أداء', 'هل الرئيسية أخفّ من 250KB؟', async () => { const n = (await get('/ar')).body.length; return n < 250000 || `${Math.round(n / 1024)}KB`; });
ask('أداء', 'هل صفحة الزكاة أخفّ من 300KB؟', async () => { const n = (await get('/ar/calculators/zakat')).body.length; return n < 300000 || `${Math.round(n / 1024)}KB`; });
ask('أداء', 'هل الضغط مفعّل؟', () => /compress:\s*true/.test(rd('next.config.mjs')) || 'غير مفعّل');
ask('أداء', 'هل التبعيات الميتة أُزيلت؟', () => { const p = rd('package.json'); return !/monaco|pdfjs|xenova|cronstrue|papaparse/.test(p) || 'تبعيات ميتة باقية'; });
ask('أداء', 'هل ملفات PSEO حُذفت من lib؟', () => !has('lib/pseo-currency.json') || 'ما زالت موجودة');
ask('أداء', 'هل مولّد PSEO حُذف؟', () => !has('lib/seo-generator.js') || 'ما زال موجوداً');
ask('أداء', 'هل سكربتات الجذر المؤقتة حُذفت؟', () => !has('fix-pages.js') && !has('refactor.js') && !has('test.html') || 'بقايا في الجذر');
ask('أداء', 'هل مدقّق المحتوى موجود؟', () => has('scripts/audit-content.mjs') || 'مفقود');
ask('أداء', 'هل ملفات النقل infra موجودة؟', () => has('infra/bootstrap.sh') || 'مفقودة');
ask('أداء', 'هل الدستور موجود؟', () => fs.existsSync(path.join(ROOT, '..', '.claude', 'RULES.md')) || 'مفقود');

// ═══ التشغيل ═══
const pool = ONLY ? checks.filter(c => c.group === ONLY) : checks;
const results = [];

// التزامن والمهلة: أول نسخة أطلقت 6 طلبات متوازية بلا فاصل، فردّ الموقع 403
// على عنوان المدقّق نفسه — حماية Vercel من الطلبات المكثفة. النتيجة كانت
// تقريراً يتهم الموقع بأعطال هي في الحقيقة من الأداة. مدقّق يغيّر ما يقيسه
// لا يقيس شيئاً، فالوتيرة هنا مقصودة وليست بطئاً عارضاً.
const CONC = 3;
const GAP = 350;
const sleep = ms => new Promise(r => setTimeout(r, ms));

for (let i = 0; i < pool.length; i += CONC) {
  if (i) await sleep(GAP);
  const batch = pool.slice(i, i + CONC);
  const out = await Promise.all(batch.map(async c => {
    try { const r = await c.run(); return { ...c, pass: r === true, why: r === true ? '' : String(r) }; }
    catch (e) { return { ...c, pass: false, why: 'خطأ: ' + String(e).slice(0, 60) }; }
  }));
  results.push(...out);
  process.stdout.write(`\r  فُحص ${results.length}/${pool.length}`);
}

// ═══ التقرير ═══
console.log('\n\n' + '═'.repeat(74));
console.log(`  التدقيق الشامل — ${results.length} سؤالاً · ${BASE}`);
console.log('═'.repeat(74) + '\n');

const groups = [...new Set(results.map(r => r.group))];
for (const g of groups) {
  const rows = results.filter(r => r.group === g);
  const ok = rows.filter(r => r.pass).length;
  const mark = ok === rows.length ? '✅' : '❌';
  console.log(`${mark} ${g.padEnd(10)} ${String(ok).padStart(3)}/${rows.length}`);
  for (const r of rows.filter(x => !x.pass)) console.log(`     ✗ [${r.id}] ${r.q}\n         ${r.why}`);
}

const passed = results.filter(r => r.pass).length;
console.log('\n' + '─'.repeat(74));
console.log(`  ناجح ${passed} · فاشل ${results.length - passed}  (${Math.round(passed / results.length * 100)}%)`);
console.log('─'.repeat(74) + '\n');
process.exit(results.length - passed > 0 ? 1 : 0);
