const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'app', '[lang]');

const templates = [
  {
    tool: 'calculators/murabaha',
    slugRegex: '/^murabaha-for-(\\d+)-usd-over-(\\d+)-years$/',
    metaTitleAr: '`حاسبة المرابحة لتمويل ${p1} دولار على ${p2} سنوات`',
    metaTitleEn: '`Murabaha Calculator for ${p1} USD over ${p2} years`',
    metaDescAr: '`احسب أقساط وأرباح تمويل المرابحة الإسلامي لمبلغ ${p1} دولار على فترة ${p2} سنوات بدقة.`',
    metaDescEn: '`Calculate Islamic Murabaha financing for ${p1} USD over ${p2} years.`',
    clientComponent: 'MurabahaCalculatorClient',
    paramsMapping: 'initialValues = { principal: p1, years: p2 };',
    jsonFile: 'pseo-murabaha.json',
    slugMap: '`murabaha-for-${c.amount}-usd-over-${c.years}-years`'
  },
  {
    tool: 'calculators/mudarabah',
    slugRegex: '/^mudarabah-profit-for-(\\d+)-usd-at-(\\d+)-percent$/',
    metaTitleAr: '`حاسبة أرباح المضاربة لمبلغ ${p1} دولار بعائد ${p2}%`',
    metaTitleEn: '`Mudarabah Profit Calculator for ${p1} USD at ${p2}% ROI`',
    metaDescAr: '`احسب توزيع أرباح المضاربة الإسلامية لمبلغ ${p1} دولار بعائد متوقع ${p2}%.`',
    metaDescEn: '`Calculate Mudarabah profit sharing for a ${p1} USD capital with ${p2}% expected ROI.`',
    clientComponent: 'MudarabahCalculatorClient',
    paramsMapping: 'initialValues = { capital: p1, expectedRoi: p2 };',
    jsonFile: 'pseo-mudarabah.json',
    slugMap: '`mudarabah-profit-for-${c.amount}-usd-at-${c.roi}-percent`'
  },
  {
    tool: 'calculators/islamic-deposit',
    slugRegex: '/^islamic-deposit-for-(\\d+)-usd-over-(\\d+)-months$/',
    metaTitleAr: '`حاسبة الوديعة الإسلامية لمبلغ ${p1} دولار لمدة ${p2} شهراً`',
    metaTitleEn: '`Islamic Deposit Calculator for ${p1} USD over ${p2} months`',
    metaDescAr: '`احسب أرباح الوديعة الاستثمارية الإسلامية لمبلغ ${p1} دولار على فترة ${p2} شهراً.`',
    metaDescEn: '`Calculate returns on an Islamic Bank Deposit of ${p1} USD over a period of ${p2} months.`',
    clientComponent: 'IslamicDepositCalculatorClient',
    paramsMapping: 'initialValues = { depositAmount: p1, durationMonths: p2 };',
    jsonFile: 'pseo-islamic-deposit.json',
    slugMap: '`islamic-deposit-for-${c.amount}-usd-over-${c.months}-months`'
  },
  {
    tool: 'calculators/sukuk',
    slugRegex: '/^sukuk-yield-for-(\\d+)-usd-at-(\\d+)-percent-over-(\\d+)-years$/',
    metaTitleAr: '`حاسبة عوائد الصكوك لمبلغ ${p1} دولار بعائد ${p2}% لمدة ${p3} سنوات`',
    metaTitleEn: '`Sukuk Yield Calculator for ${p1} USD at ${p2}% over ${p3} years`',
    metaDescAr: '`احسب العوائد الدورية للصكوك الإسلامية لاستثمار ${p1} دولار بعائد ${p2}% لمدة ${p3} سنوات.`',
    metaDescEn: '`Calculate periodic returns on Islamic Sukuk for an investment of ${p1} USD at ${p2}% over ${p3} years.`',
    clientComponent: 'SukukCalculatorClient',
    paramsMapping: 'initialValues = { sukukAmount: p1, expectedYield: p2, maturityYears: p3 };',
    jsonFile: 'pseo-sukuk.json',
    slugMap: '`sukuk-yield-for-${c.amount}-usd-at-${c.rate}-percent-over-${c.years}-years`'
  },
  {
    tool: 'calculators/roi',
    slugRegex: '/^roi-for-(\\d+)-usd-with-(\\d+)-usd-profit$/',
    metaTitleAr: '`حاسبة العائد على الاستثمار لمبلغ ${p1} دولار مع ربح ${p2} دولار`',
    metaTitleEn: '`ROI Calculator for ${p1} USD investment with ${p2} USD profit`',
    metaDescAr: '`احسب النسبة المئوية للعائد على الاستثمار (ROI) لاستثمار ${p1} دولار بربح ${p2} دولار.`',
    metaDescEn: '`Calculate the Return on Investment (ROI) percentage for a ${p1} USD investment yielding ${p2} USD profit.`',
    clientComponent: 'RoiCalculatorClient',
    paramsMapping: 'initialValues = { investment: p1, returnAmt: p2 };',
    jsonFile: 'pseo-roi.json',
    slugMap: '`roi-for-${c.amount}-usd-with-${c.returnAmt}-usd-profit`'
  },
  {
    tool: 'tools/data-converter',
    slugRegex: '/^convert-([a-z]+)-to-([a-z]+)$/',
    metaTitleAr: '`محول من صيغة ${p1.toUpperCase()} إلى ${p2.toUpperCase()}`',
    metaTitleEn: '`Convert ${p1.toUpperCase()} to ${p2.toUpperCase()} Online`',
    metaDescAr: '`أداة مجانية وسريعة لتحويل البيانات من صيغة ${p1.toUpperCase()} إلى ${p2.toUpperCase()} بأمان تام داخل المتصفح.`',
    metaDescEn: '`Free online tool to instantly convert ${p1.toUpperCase()} format to ${p2.toUpperCase()} securely in your browser.`',
    clientComponent: 'DataConverterClient',
    paramsMapping: 'initialValues = { fromFormat: p1, toFormat: p2 };',
    jsonFile: 'pseo-data-converter.json',
    slugMap: '`convert-${c.from}-to-${c.to}`'
  },
  {
    tool: 'tools/password-generator',
    slugRegex: '/^generate-(\\d+)-character-secure-password$/',
    metaTitleAr: '`توليد كلمة مرور قوية وآمنة بطول ${p1} حرفاً`',
    metaTitleEn: '`Generate ${p1} Character Secure Password`',
    metaDescAr: '`قم بتوليد كلمة مرور عشوائية وقوية جداً تتكون من ${p1} حرفاً لحماية حساباتك.`',
    metaDescEn: '`Generate a highly secure, random, and strong password of ${p1} characters instantly.`',
    clientComponent: 'PasswordGeneratorClient',
    paramsMapping: 'initialValues = { length: p1 };',
    jsonFile: 'pseo-password.json',
    slugMap: '`generate-${c.length}-character-secure-password`'
  },
  {
    tool: 'tools/qibla-compass',
    slugRegex: '/^qibla-direction-from-([a-z-]+)$/',
    metaTitleAr: '`اتجاه القبلة الدقيق من مدينة ${p1.replace(/-/g, " ")}`',
    metaTitleEn: '`Accurate Qibla Direction from ${p1.replace(/-/g, " ")}`',
    metaDescAr: '`حدد اتجاه القبلة للصلاة بدقة عالية من مدينة ${p1.replace(/-/g, " ")} باستخدام البوصلة الذكية.`',
    metaDescEn: '`Find the exact Qibla direction for prayer from ${p1.replace(/-/g, " ")} using our smart compass.`',
    clientComponent: 'QiblaCompassClient',
    paramsMapping: 'initialValues = { city: p1 };',
    jsonFile: 'pseo-qibla.json',
    slugMap: '`qibla-direction-from-${c.city}`'
  },
  {
    tool: 'tools/cron-generator',
    slugRegex: '/^([a-z0-9-]+)$/',
    metaTitleAr: '`توليد كود Cron لـ ${p1.replace(/-/g, " ")}`',
    metaTitleEn: '`Cron Expression Generator for ${p1.replace(/-/g, " ")}`',
    metaDescAr: '`احصل على تعبير Cron الدقيق لجدولة المهام: ${p1.replace(/-/g, " ")}.`',
    metaDescEn: '`Generate the exact Cron expression to schedule tasks for: ${p1.replace(/-/g, " ")}.`',
    clientComponent: 'CronGeneratorClient',
    paramsMapping: 'initialValues = { preset: p1 };',
    jsonFile: 'pseo-cron.json',
    slugMap: '`${c.slug}`'
  }
];

templates.forEach(t => {
  const toolDir = path.join(rootDir, t.tool, '[slug]');
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  const p1 = "p1", p2 = "p2", p3 = "p3";
  const content = `import { getDictionary } from "@/app/dictionaries";
import ${t.clientComponent} from "@/app/components/${t.clientComponent}";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "${t.jsonFile}");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: ${t.slugMap},
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(${t.slugRegex});
  if (!match) {
    return { title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? ${t.metaTitleAr} : ${t.metaTitleEn};
  const description = isAr ? ${t.metaDescAr} : ${t.metaDescEn};

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function DynamicPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(${t.slugRegex});
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    ${t.paramsMapping}
  }

  return (
    <>
      <${t.clientComponent} lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(toolDir, 'page.js'), content);
  console.log(`Created dynamic route for ${t.tool}`);
});
