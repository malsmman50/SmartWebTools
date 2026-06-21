export default function sitemap() {
  const baseUrl = 'https://smartcalctools.xyz';
  const pages = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/calculators/zakat`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/murabaha`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/mudarabah`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/calculators/roi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tools/json-formatter`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/password-generator`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/cron-generator`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/prompt-generator`, changeFrequency: 'monthly', priority: 0.7 },
  ];
  return pages.map(p => ({ ...p, lastModified: new Date() }));
}
