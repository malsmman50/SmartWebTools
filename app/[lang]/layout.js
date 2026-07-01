import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Script from "next/script";
import AdBanner from "@/app/components/AdBanner";
import { getDictionary } from "@/app/dictionaries";
import PwaInstallPrompt from "@/app/components/PwaInstallPrompt";
import CookieBanner from "@/app/components/CookieBanner";
import SmartFooter from "@/app/components/SmartFooter";

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
      description: isAr ? "مجموعة من الأدوات الخاصة بالتمويل الإسلامي والمطورين. حساب الزكاة والمواريث، وتحويل العملات والمزيد بخصوصية تامة." : "A complete suite of Halal finance calculators and developer tools. Compute Zakat, Inheritance, format JSON, and decode JWT safely offline.",
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
        {/* Resource Hints: Pre-warm connections to critical third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
        <Script 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2077857887750518" 
          crossOrigin="anonymous" 
          strategy="lazyOnload" 
        />
        {/* Google Consent Mode v2 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Unconditionally set default state
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });

              // Update based on saved preference
              var consent = localStorage.getItem('cookie_consent');
              if (consent === 'accepted') {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted'
                });
              }
            `
          }}
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
          <div className="page-wrapper">
            <aside className="side-ad">
              <AdBanner dataAdSlot="LEFT_SIDE_SLOT" dataAdFormat="vertical" />
            </aside>
            <main className="main-content">
              {children}
              <AdBanner dataAdSlot="5257110382" />
            </main>
            <aside className="side-ad">
              <AdBanner dataAdSlot="RIGHT_SIDE_SLOT" dataAdFormat="vertical" />
            </aside>
          </div>
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
                <Link href={`/${lang}/methodology`} style={{ color: "var(--text-muted)" }}>
                  {dict.common.nav_methodology}
                </Link>
                <Link href={`/${lang}/developers`} style={{ color: "var(--text-muted)" }}>
                  {isAr ? "المطورين (API)" : "Developers (API)"}
                </Link>
                <Link href={`/${lang}/compare/murabaha-vs-conventional-loan`} style={{ color: "var(--text-muted)" }}>
                  {isAr ? "المرابحة ضد القرض" : "Murabaha vs Loan"}
                </Link>
                <Link href={`/${lang}/compare/sukuk-vs-bonds`} style={{ color: "var(--text-muted)" }}>
                  {isAr ? "الصكوك ضد السندات" : "Sukuk vs Bonds"}
                </Link>
              </div>
              
              <SmartFooter dict={dict} />

              <p>{dict.common.footer_copyright}</p>
            </div>
          </footer>
          <PwaInstallPrompt lang={lang} />
          <CookieBanner lang={lang} />
      </body>
    </html>
  );
}
