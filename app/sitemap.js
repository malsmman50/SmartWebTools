import { getAllSeoArticles } from '@/lib/seo-generator';
import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = 'https://smartcalctools.xyz';
  const locales = ['en', 'ar'];
  
  const routes = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/calculators/zakat', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/murabaha', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/mudarabah', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/roi', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/islamic-fire', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tools/json-formatter', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/password-generator', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/cron-generator', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/prompt-generator', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/tools/jwt-decoder', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/chatpdf', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/methodology', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
    { path: '/calculators/shopping/shoe-size', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/shopping/discount', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/calculators/lifestyle/split-bill', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/calculators/health/body-calculator', changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Inject Curated PSEO (High Intent)
  try {
    const pseoPath = path.join(process.cwd(), "lib", "pseo-shoe-size.json");
    if (fs.existsSync(pseoPath)) {
      const data = JSON.parse(fs.readFileSync(pseoPath, "utf-8"));
      data.forEach(c => {
        routes.push({ path: `/calculators/shopping/shoe-size/${c.slug}`, changeFrequency: 'monthly', priority: 0.8 });
      });
    }
  } catch(e) {
    console.error("Error loading shoe size PSEO config", e);
  }

  // Dynamically inject Programmatic SEO routes
  const pSeoArticles = getAllSeoArticles();
  pSeoArticles.forEach(article => {
    routes.push({
      path: `/articles/${article.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8
    });
  });

  // Dynamically inject Blog routes
  try {
    const dataPath = path.join(process.cwd(), "lib", "blog-data.json");
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      const blogPosts = JSON.parse(fileContent);
      blogPosts.forEach(post => {
        routes.push({
          path: `/blog/${post.slug}`,
          changeFrequency: 'weekly',
          priority: 0.8
        });
      });
    }
  } catch (err) {
    console.error("Error loading blog data for sitemap:", err);
  }

  // Array of PSEO definitions
  const pseoConfigs = [
    { file: 'pseo-hijri.json', pathFn: c => `/tools/hijri-converter/convert-${c.day}-${c.month}-${c.year}`, freq: 'monthly' },
    { file: 'pseo-currency.json', pathFn: c => `/calculators/currency/convert-${c.amount}-${c.from}-to-${c.to}`, freq: 'daily' },
    { file: 'pseo-zakat.json', pathFn: c => `/calculators/zakat/zakat-on-${c.grams}-grams-of-${c.karat}-gold`, freq: 'monthly' },
    { file: 'pseo-murabaha.json', pathFn: c => `/calculators/murabaha/murabaha-for-${c.amount}-usd-over-${c.years}-years`, freq: 'monthly' },
    { file: 'pseo-mudarabah.json', pathFn: c => `/calculators/mudarabah/mudarabah-profit-for-${c.amount}-usd-at-${c.roi}-percent`, freq: 'monthly' },
    { file: 'pseo-islamic-deposit.json', pathFn: c => `/calculators/islamic-deposit/islamic-deposit-for-${c.amount}-usd-over-${c.months}-months`, freq: 'monthly' },
    { file: 'pseo-sukuk.json', pathFn: c => `/calculators/sukuk/sukuk-yield-for-${c.amount}-usd-at-${c.rate}-percent-over-${c.years}-years`, freq: 'monthly' },
    { file: 'pseo-roi.json', pathFn: c => `/calculators/roi/roi-for-${c.amount}-usd-with-${c.returnAmt}-usd-profit`, freq: 'monthly' },
    { file: 'pseo-data-converter.json', pathFn: c => `/tools/data-converter/convert-${c.from}-to-${c.to}`, freq: 'monthly' },
    { file: 'pseo-password.json', pathFn: c => `/tools/password-generator/generate-${c.length}-character-secure-password`, freq: 'monthly' },
    { file: 'pseo-qibla.json', pathFn: c => `/tools/qibla-compass/qibla-direction-from-${c.city}`, freq: 'monthly' },
    { file: 'pseo-cron.json', pathFn: c => `/tools/cron-generator/${c.slug}`, freq: 'monthly' }
  ];

  /* 
  DISABLED: PSEO Doorway Pages are temporarily disabled to prevent Google AdSense "Low Value Content" rejection.
  pseoConfigs.forEach(config => {
    try {
      const dataPath = path.join(process.cwd(), "lib", config.file);
      if (fs.existsSync(dataPath)) {
        const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        data.forEach(c => {
          routes.push({ path: config.pathFn(c), changeFrequency: config.freq, priority: 0.6 });
        });
      }
    } catch(e) {
      console.error(`Error loading PSEO config ${config.file}:`, e);
    }
  });
  */

  const sitemapData = [];
  
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapData.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return sitemapData;
}
