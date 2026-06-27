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
    { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
  ];

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

  // Inject PSEO Hijri Routes
  try {
    const hijriPath = path.join(process.cwd(), "lib", "pseo-hijri.json");
    if (fs.existsSync(hijriPath)) {
      const hData = JSON.parse(fs.readFileSync(hijriPath, "utf-8"));
      hData.forEach(c => {
        routes.push({ path: `/tools/hijri-converter/convert-${c.day}-${c.month}-${c.year}`, changeFrequency: 'monthly', priority: 0.6 });
      });
    }
  } catch(e) {}

  // Inject PSEO Currency Routes
  try {
    const currPath = path.join(process.cwd(), "lib", "pseo-currency.json");
    if (fs.existsSync(currPath)) {
      const cData = JSON.parse(fs.readFileSync(currPath, "utf-8"));
      cData.forEach(c => {
        routes.push({ path: `/calculators/currency/convert-${c.amount}-${c.from}-to-${c.to}`, changeFrequency: 'daily', priority: 0.6 });
      });
    }
  } catch(e) {}

  // Inject PSEO Zakat Routes
  try {
    const zakatPath = path.join(process.cwd(), "lib", "pseo-zakat.json");
    if (fs.existsSync(zakatPath)) {
      const zData = JSON.parse(fs.readFileSync(zakatPath, "utf-8"));
      zData.forEach(c => {
        routes.push({ path: `/calculators/zakat/zakat-on-${c.grams}-grams-of-${c.karat}-gold`, changeFrequency: 'monthly', priority: 0.6 });
      });
    }
  } catch(e) {}

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
