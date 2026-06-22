export default function sitemap() {
  const baseUrl = 'https://smartcalctools.xyz';
  const pages = [
    // Homepage
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    // Islamic Finance Calculators
    { url: `${baseUrl}/calculators/zakat`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/murabaha`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/mudarabah`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/roi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/islamic-fire`, changeFrequency: 'monthly', priority: 0.9 },
    // Developer Tools
    { url: `${baseUrl}/tools/json-formatter`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/password-generator`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/cron-generator`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/prompt-generator`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/jwt-decoder`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/chatpdf`, changeFrequency: 'monthly', priority: 0.8 },
    // Static Pages
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms-of-service`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.4 },
  ];
  return pages.map(p => ({ ...p, lastModified: new Date() }));
}
