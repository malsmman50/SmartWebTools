/** @type {import('next').NextConfig} */

// Google TLDs relevant to the global and Arab-world ad markets.
const googleTlds = [
  'com', 'com.sa', 'ae', 'com.eg', 'dz', 'ma', 'jo', 'com.kw', 'com.om',
  'com.qa', 'com.bh', 'com.lb', 'iq', 'com.ly', 'tn', 'ps', 'com.ye'
];

// Both root domains and wildcard subdomains — CSP matches strictly.
const googleDomains = googleTlds.map(tld => `https://google.${tld} https://*.google.${tld}`).join(' ');

// CSP no longer allows huggingface.co / cdn.jsdelivr.net / blob: workers:
// those existed for ChatPDF, Monaco and the transformers model, all of which
// moved out with the developer tools. Narrower policy = smaller attack surface.
const getCspHeader = (frameAncestors) => `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://partner.googleadservices.com https://*.adtrafficquality.google https://adservice.google.com https://www.googletagservices.com https://fundingchoicesmessages.google.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    img-src 'self' blob: data: https://pagead2.googlesyndication.com ${googleDomains} https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google https://www.googletagmanager.com https://www.google-analytics.com https://i.ytimg.com;
    connect-src 'self' https://data-asg.goldprice.org https://*.googlesyndication.com https://*.adtrafficquality.google ${googleDomains} https://*.doubleclick.net https://fundingchoicesmessages.google.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com;
    frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com ${googleDomains} https://fundingchoicesmessages.google.com https://*.adtrafficquality.google https://www.youtube-nocookie.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors ${frameAncestors};
    upgrade-insecure-requests;
`;

const cspHeaderMain = getCspHeader("'none'");
const cspHeaderEmbed = getCspHeader("https: http:");

// Calculators whose generated [slug] children were deleted. Each child URL
// folds back into its parent so no crawler hits a 404.
const pseoCalculatorParents = [
  'zakat', 'currency', 'murabaha', 'mudarabah',
  'sukuk', 'islamic-deposit', 'roi',
];

// Worship tools with the same history.
const pseoToolParents = ['qibla-compass', 'hijri-converter'];

// Tools and calculators that left the site entirely (scope rule, RULES.md Bab 1).
// They currently land on the homepage. When the developer-tools subdomain goes
// live, repoint these at it — that is the only line that needs to change.
const removedTools = [
  'json-formatter', 'jwt-decoder', 'cron-generator', 'regex-tester',
  'data-converter', 'password-generator', 'prompt-generator',
  'image-compressor', 'chatpdf',
];

// Blog posts removed by the same scope rule that removed the tools above.
// Each one taught a developer topic and linked only to tools that no longer
// live here; their text moved to devtools-site/lib/blog-data.json rather than
// being discarded. Repoint these at the developer subdomain when it is live.
const removedBlogPosts = [
  'optimizing-llm-prompts-prompt-generator',
  'webgpu-client-side-ai-offline-pdf-chat',
  'offline-data-unit-conversion-secure',
  'digital-amanah-secure-passwords',
  'cron-expressions-easy-generator-schedules',
  'regex-testing-guide-writing-debugging-regular-expressions',
  'decoding-jwt-safely-understanding-token-structure',
  'mastering-json-web-apis-formatting-validation-debugging',
];

const removedCalculatorPaths = [
  'shopping/shoe-size', 'shopping/discount', 'shopping/customs-duty',
  'lifestyle/split-bill', 'lifestyle/fuel-cost',
  'health/body-calculator', 'health/pregnancy',
];

const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },

  async redirects() {
    return [
      // --- Generated calculator pages -> their parent calculator ---
      ...pseoCalculatorParents.map((tool) => ({
        source: `/:lang(ar|en)/calculators/${tool}/:slug`,
        destination: `/:lang/calculators/${tool}`,
        statusCode: 301,
      })),

      // --- Generated tool pages -> their parent tool ---
      ...pseoToolParents.map((tool) => ({
        source: `/:lang(ar|en)/tools/${tool}/:slug`,
        destination: `/:lang/tools/${tool}`,
        statusCode: 301,
      })),

      // --- Generated tool-promo articles -> the real blog ---
      {
        source: '/:lang(ar|en)/articles/:slug',
        destination: '/:lang/blog',
        statusCode: 301,
      },

      // --- Blog posts that left with the tools they were written for ---
      // This one taught prompt engineering and linked only to the JSON
      // formatter and the prompt generator. Both moved to the developer
      // subdomain; the article had nowhere left to point on an Islamic
      // finance site, so it goes to the blog index rather than a 404.
      ...removedBlogPosts.map((slug) => ({
        source: `/:lang(ar|en)/blog/${slug}`,
        destination: '/:lang/blog',
        statusCode: 301,
      })),

      // --- Out-of-scope tools (and any generated children) -> homepage ---
      ...removedTools.flatMap((tool) => [
        { source: `/:lang(ar|en)/tools/${tool}`, destination: '/:lang', statusCode: 301 },
        { source: `/:lang(ar|en)/tools/${tool}/:slug`, destination: '/:lang', statusCode: 301 },
      ]),

      // --- Out-of-scope calculators -> homepage ---
      ...removedCalculatorPaths.flatMap((p) => [
        { source: `/:lang(ar|en)/calculators/${p}`, destination: '/:lang', statusCode: 301 },
        { source: `/:lang(ar|en)/calculators/${p}/:slug`, destination: '/:lang', statusCode: 301 },
      ]),

      // --- Emptied section indexes ---
      { source: '/:lang(ar|en)/calculators/shopping', destination: '/:lang', statusCode: 301 },
      { source: '/:lang(ar|en)/calculators/lifestyle', destination: '/:lang', statusCode: 301 },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeaderMain.replace(/\n/g, '') },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/:lang/embed/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeaderEmbed.replace(/\n/g, '') },
        ],
      },
    ];
  },
};

export default nextConfig;
