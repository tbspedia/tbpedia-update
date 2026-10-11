import { SupportedLanguage, SUPPORTED_LANGUAGES } from "./types";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import nl from "./locales/nl.json";
import sv from "./locales/sv.json";
import ko from "./locales/ko.json";
import zhTW from "./locales/zh-TW.json";
import zhCN from "./locales/zh-CN.json";
import vi from "./locales/vi.json";
import id from "./locales/id.json";
import th from "./locales/th.json";
import bo from "./locales/bo.json";

export const catalogs: Record<SupportedLanguage, Record<string, string>> = {
  en, ja, fr, es, de, nl, sv, ko, "zh-TW": zhTW, "zh-CN": zhCN, vi, id, th, bo,
};
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English", ja: "日本語", fr: "Français", es: "Español", de: "Deutsch", nl: "Nederlands",
  sv: "Svenska", ko: "한국어", "zh-TW": "繁體中文", "zh-CN": "简体中文",
  vi: "Tiếng Việt", id: "Bahasa Indonesia", th: "ไทย", bo: "བོད་སྐད་",
};

export function resolveLanguage(language?: string): SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage) ? language as SupportedLanguage : "en";
}

/** Interpolate after translation so paths, IDs and release content stay intact. */
export function translate(language: string | undefined, key: string, values: readonly unknown[] = []): string {
  const template = catalogs[resolveLanguage(language)][key] ?? en[key as keyof typeof en] ?? key;
  return template.replace(/\{(\d+)\}/g, (token, index: string) => String(values[Number(index)] ?? token));
}

const escapePattern = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const diagnosticTemplates = Object.keys(en).filter(key => /\{\d+\}/.test(key))
  .sort((a, b) => b.replace(/\{\d+\}/g, "").length - a.replace(/\{\d+\}/g, "").length)
  .map(key => ({ key, pattern: new RegExp("^" + key.split(/\{\d+\}/).map(escapePattern).join("([\\s\\S]*?)") + "$") }));

/** Translate known validation/backend diagnostics; never expose arbitrary upstream English. */
export function localizedError(language: string | undefined, error: unknown): string {
  const text = error instanceof Error ? error.message : "Unknown error";
  if (Object.prototype.hasOwnProperty.call(en, text)) return translate(language, text);
  for (const { key, pattern } of diagnosticTemplates) {
    const match = pattern.exec(text);
    if (match) return translate(language, key, match.slice(1));
  }
  // Keep technical detail in the console, while providing a localized retry instruction.
  console.error("Tbpedia diagnostic", error);
  return resolveLanguage(language) === "en" ? text : translate(language, "An unexpected error occurred. Please retry.");
}
