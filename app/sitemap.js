import fs from 'fs';
import path from 'path';

/**
 * Sitemap for SmartCalcTools — Islamic finance & worship calculators.
 *
 * Scope rule (see .claude/RULES.md, Bab 1): this site lists ONLY pages a Muslim
 * needs to keep their wealth and worship Sharia-compliant. Developer tools,
 * shopping and general health calculators moved to a separate project.
 *
 * Programmatic SEO is gone for good. 7,420 template-generated pages were the
 * documented cause of the AdSense "Low Value Content" rejection. Every URL here
 * is a hand-built page. Do not reintroduce generated routes.
 */
export default function sitemap() {
  const baseUrl = 'https://smartcalctools.xyz';
  const locales = ['en', 'ar'];

  const routes = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },

    // Zakat & inheritance — the core of the site
    { path: '/calculators/zakat', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/inheritance', changeFrequency: 'monthly', priority: 0.9 },

    // Islamic finance instruments
    { path: '/calculators/murabaha', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/mudarabah', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/sukuk', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/islamic-deposit', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/islamic-fire', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/roi', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/calculators/currency', changeFrequency: 'weekly', priority: 0.8 },

    // Worship timing
    { path: '/tools/qibla-compass', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tools/hijri-converter', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/calculators/health/ramadan-hydration', changeFrequency: 'monthly', priority: 0.7 },

    // Comparisons — framed as explaining the Sharia difference, not as equal options
    { path: '/compare/murabaha-vs-conventional-loan', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/compare/sukuk-vs-bonds', changeFrequency: 'monthly', priority: 0.7 },

    // Public API docs for the zakat / murabaha / sukuk endpoints — in scope,
    // since they serve the same Islamic-finance calculations the site is about.
    { path: '/developers', changeFrequency: 'monthly', priority: 0.6 },

    // Trust pages — these carry the site's E-E-A-T signal
    { path: '/methodology', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.4 },

    { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Blog articles — drafts are never listed. A bot-written article stays
  // draft: true until a human clears it against the seven-point content bar.
  try {
    const dataPath = path.join(process.cwd(), 'lib', 'blog-data.json');
    if (fs.existsSync(dataPath)) {
      const blogPosts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      blogPosts
        .filter((post) => post.draft !== true)
        .forEach((post) => {
          routes.push({
            path: `/blog/${post.slug}`,
            changeFrequency: 'monthly',
            priority: 0.8,
          });
        });
    }
  } catch (err) {
    console.error('Error loading blog data for sitemap:', err);
  }

  const sitemapData = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapData.push({
        url: `${baseUrl}/${locale}${route.path}`,
        // lastModified intentionally omitted: stamping every URL with the build
        // date makes all pages look "always updated", which search engines ignore.
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return sitemapData;
}
