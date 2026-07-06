/** @type {import('next').NextConfig} */

// Define all relevant Google TLDs for the global and Arab world markets
const googleTlds = [
  'com', 'com.sa', 'ae', 'com.eg', 'dz', 'ma', 'jo', 'com.kw', 'com.om',
  'com.qa', 'com.bh', 'com.lb', 'iq', 'com.ly', 'tn', 'ps', 'com.ye'
];

// Generate both root domains and wildcard subdomains to comply with CSP strict matching
const googleDomains = googleTlds.map(tld => `https://google.${tld} https://*.google.${tld}`).join(' ');

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://partner.googleadservices.com https://*.adtrafficquality.google https://adservice.google.com https://www.googletagservices.com https://fundingchoicesmessages.google.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
    img-src 'self' blob: data: https://pagead2.googlesyndication.com ${googleDomains} https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google https://www.googletagmanager.com https://www.google-analytics.com;
    connect-src 'self' ws: wss: blob: https://data-asg.goldprice.org https://huggingface.co https://*.huggingface.co https://*.hf.co https://cdn.jsdelivr.net https://*.googlesyndication.com https://*.adtrafficquality.google ${googleDomains} https://*.doubleclick.net https://fundingchoicesmessages.google.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com;
    frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com ${googleDomains} https://fundingchoicesmessages.google.com https://*.adtrafficquality.google;
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
      {
        source: '/:lang/tools/chatpdf',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
    ];
  },
};

export default nextConfig;
