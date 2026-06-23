import { getDictionary } from "@/app/dictionaries";
import RegexTesterClient from "@/app/components/RegexTesterClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.regex.title} | SmartCalcTools`,
    description: dict.regex.subtitle,
    alternates: {
      canonical: `https://smartcalctools.xyz/${lang}/tools/regex-tester`,
      languages: {
        "en": "https://smartcalctools.xyz/en/tools/regex-tester",
        "ar": "https://smartcalctools.xyz/ar/tools/regex-tester",
      },
    },
  };
}

export default async function RegexTesterPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <div className="py-10 px-4">
      <RegexTesterClient dict={dict} lang={lang} />
    </div>
  );
}
