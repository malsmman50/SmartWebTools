import { getDictionary } from "@/app/dictionaries";
import PasswordGeneratorClient from "@/app/components/PasswordGeneratorClient";
import fs from "fs";
import path from "path";

// 1. generateStaticParams
export async function generateStaticParams() {
  try {
    const dataPath = path.join(process.cwd(), "lib", "pseo-password.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const combinations = JSON.parse(fileContent);
    return combinations.map((c) => ({
      slug: `generate-${c.length}-character-secure-password`,
    }));
  } catch (err) {
    return [];
  }
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const isAr = lang === "ar";

  const match = slug.match(/^generate-(\d+)-character-secure-password$/);
  if (!match) {
    return { title: "SmartCalcTools Tool" };
  }

  const [_, p1, p2, p3] = match;

  const title = isAr ? `توليد كلمة مرور قوية وآمنة بطول ${p1} حرفاً` : `Generate ${p1} Character Secure Password`;
  const description = isAr ? `قم بتوليد كلمة مرور عشوائية وقوية جداً تتكون من ${p1} حرفاً لحماية حساباتك.` : `Generate a highly secure, random, and strong password of ${p1} characters instantly.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description }
  };
}

// 3. Page Component
export default async function DynamicPSEOPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const match = slug.match(/^generate-(\d+)-character-secure-password$/);
  let initialValues = null;

  if (match) {
    const [_, p1, p2, p3] = match;
    initialValues = { length: p1 };
  }

  return (
    <>
      <PasswordGeneratorClient lang={lang} dict={dict} initialValues={initialValues} />
    </>
  );
}
