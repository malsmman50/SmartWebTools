/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://partner.googleadservices.com https://*.adtrafficquality.google https://adservice.google.com https://www.googletagservices.com https://fundingchoicesmessages.google.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
    img-src 'self' blob: data: https://pagead2.googlesyndication.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google;
    connect-src 'self' ws: wss: blob: https://data-asg.goldprice.org https://huggingface.co https://*.huggingface.co https://*.hf.co https://cdn.jsdelivr.net https://*.googlesyndication.com https://*.adtrafficquality.google https://*.google.com https://*.doubleclick.net https://fundingchoicesmessages.google.com;
    frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.google.com https://fundingchoicesmessages.google.com https://*.adtrafficquality.google;
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = {
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
        // Only apply SharedArrayBuffer isolation to the ChatPDF tool
        source: '/:lang/tools/chatpdf',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
