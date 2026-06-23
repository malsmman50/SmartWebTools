import { getDictionary } from "@/app/dictionaries";
import RegexTesterClient from "@/app/components/RegexTesterClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.regex.title}`,
    description: dict.regex.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/regex-tester`,
      languages: {
        "en": "https://smartcalctools.xyz/en/tools/regex-tester",
        "ar": "https://smartcalctools.xyz/ar/tools/regex-tester",
      },
    },
    openGraph: {
      title: `${dict.regex.title}`,
      description: dict.regex.subtitle,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${dict.regex.title}`,
      description: dict.regex.subtitle,
      images: ["/twitter-image.png"]
    }
  };
}

export default async function RegexTesterPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return <RegexTesterClient dict={dict} lang={lang} />;
}
