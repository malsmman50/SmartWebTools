import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Script from "next/script";
import AdBanner from "@/app/components/AdBanner";
import { getDictionary } from "@/app/dictionaries";
import PwaInstallPrompt from "@/app/components/PwaInstallPrompt";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isAr = lang === "ar";

  return {
    metadataBase: new URL("https://smartcalctools.xyz"),
    title: {
      default: isAr ? "أدوات الحساب الذكية — حاسبات مالية إسلامية وأدوات مطورين آمنة" : "SmartCalcTools — Halal Financial Calculators & Secure Developer Tools",
      template: isAr ? "%s | أدوات الحساب الذكية" : "%s | SmartCalcTools",
    },
    description: isAr 
      ? "أدوات مجانية، آمنة، وتعمل بالكامل في متصفحك. استكشف حاسبة الزكاة، حاسبة التمويل بالمرابحة، التقاعد الإسلامي، منسق JSON، ومفكك JWT آمن."
      : "100% free, private, and client-side tools. Explore our Zakat Calculator, Murabaha Financing Calculator, Islamic FIRE tool, JSON Formatter, and secure WebGPU ChatPDF.",
    keywords: isAr
      ? ["حاسبات التمويل الإسلامي", "حاسبة الزكاة", "حاسبة المرابحة", "حاسبة المضاربة", "أدوات الاستثمار الحلال", "منسق JSON", "مفكك JWT دون اتصال", "البحث في PDF محليا", "أدوات مطورين مجانية"]
      : ["Islamic finance calculators", "Zakat calculator", "Murabaha calculator", "Mudarabah profit calculator", "Halal investment tools", "JSON formatter", "JWT decoder offline", "client-side ChatPDF", "free developer tools"],
    openGraph: {
      title: isAr ? "أدوات الحساب الذكية — حاسبات مالية إسلامية وأدوات مطورين آمنة" : "SmartCalcTools — Halal Financial Calculators & Secure Developer Tools",
      description: isAr 
        ? "أدوات مجانية وتعمل دون اتصال للمطورين وحاسبات مالية متوافقة مع الشريعة الإسلامية. آمنة وخاصة."
        : "Free, offline-first developer tools and Sharia-compliant financial calculators. Private and secure.",
      siteName: "SmartCalcTools",
      type: "website",
      locale: isAr ? "ar_AR" : "en_US",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: isAr ? "أدوات الحساب الذكية" : "SmartCalcTools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? "أدوات الحساب الذكية — التمويل الإسلامي وأدوات المطورين" : "SmartCalcTools — Halal Finance & Pro Dev Tools",
      description: isAr
        ? "استكشف حاسبة الزكاة، حاسبة التقاعد الإسلامي، وأدوات المطورين فائقة الأمان دون اتصال بالإنترنت."
        : "Explore our Zakat Calculator, Islamic FIRE tool, and ultra-secure offline developer utilities.",
      images: ["/twitter-image.png"],
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isAr = lang === "ar";

  return (
    <html lang={lang} dir={isAr ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d1117" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2077857887750518" 
          crossOrigin="anonymous" 
          strategy="beforeInteractive" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
          <Navbar lang={lang} dict={dict} />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>
            <AdBanner dataAdSlot="3706969387" />
            {children}
            <AdBanner dataAdSlot="5257110382" />
          </main>
          <footer className="footer">
            <div className="container">
              <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                <Link href={`/${lang}/about`} style={{ color: "var(--text-muted)" }}>
                  {dict.common.nav_about_us}
                </Link>
                <Link href={`/${lang}/privacy-policy`} style={{ color: "var(--text-muted)" }}>
                  {dict.common.nav_privacy}
                </Link>
                <Link href={`/${lang}/terms-of-service`} style={{ color: "var(--text-muted)" }}>
                  {dict.common.nav_terms}
                </Link>
                <Link href={`/${lang}/contact`} style={{ color: "var(--text-muted)" }}>
                  {dict.common.nav_contact}
                </Link>
              </div>
              
              <div className="footer-disclaimer" style={{ maxWidth: "800px", margin: "0 auto 20px", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", textAlign: "center" }}>
                <strong>{dict.common.footer_disclaimer_title}</strong> {dict.common.footer_disclaimer_text}
              </div>

              <p>{dict.common.footer_copyright}</p>
            </div>
          </footer>
          <PwaInstallPrompt lang={lang} />
      </body>
    </html>
  );
}
