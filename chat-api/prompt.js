import { systemPromptEn } from "./prompt-en.js";
import { systemPromptZh } from "./prompt-zh.js";

export function getSystemPrompt(locale) {
  return locale === "zh" ? systemPromptZh : systemPromptEn;
}
