"use client";

import { createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

const LanguageContext = createContext(null);

export default function LanguageProvider({ children, lang, dict }) {
  const router = useRouter();
  const pathname = usePathname();

  const localizePath = (path) => {
    if (!path) return "/";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;

    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    if (cleanPath.startsWith("/en") || cleanPath.startsWith("/ar")) {
      return cleanPath;
    }

    return `/${lang}${cleanPath}`;
  };

  const switchLanguage = (newLang) => {
    if (newLang === lang) return;

    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }

    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  const isRtl = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, dict, localizePath, switchLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
