import en from "./en.json";
import zh from "./zh.json";

const translations = { en, zh } as const;

export type Locale = keyof typeof translations;

/**
 * Get a nested translation value by dot-separated key.
 * Example: t('en', 'nav.home') → "Home"
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Fallback to key if not found
    }
  }
  return typeof value === "string" ? value : key;
}

/**
 * Get the current locale from the URL pathname.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split("/");
  if (segment === "zh") return "zh";
  return "en";
}

/** Localized path map for ZH pages with different slugs */
const zhSlugMap: Record<string, string> = {
  "/global-market-navigation": "/zh/global-market-strategy",
  "/immigration": "/zh/immigration-advisory",
  "/criminal": "/zh/criminal-defence",
  "/estate-investment": "/zh/real-estate-investment-protection",
  "/contact": "/zh/contact-us",
  "/programme": "/zh/programme",
  "/company-formation": "/zh/company-formation",
};

const enSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(zhSlugMap).map(([en, zh]) => [zh, en]),
);

/**
 * Get the localized alternate URL considering different ZH slugs.
 */
export function getAlternateUrl(
  pathname: string,
  currentLocale: Locale,
): string {
  if (currentLocale === "en") {
    return zhSlugMap[pathname] || `/zh${pathname}`;
  }
  // Strip /zh prefix for lookup
  return enSlugMap[pathname] || pathname.replace(/^\/zh/, "") || "/";
}
