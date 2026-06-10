---
name: NadlanConnect France bilingual (FR/EN) convention
description: How the FR/EN i18n is structured and the rule that AI-generated output language must follow the UI language.
---

# Bilingual FR/EN convention (artifacts/nadlanconnect-france)

The site is bilingual French/English via a lightweight custom context (no i18n library).

## Pattern for UI strings
- A `LanguageProvider` + `useLang()` hook live in `src/lib/i18n.tsx`. `useLang()` returns `{ lang, setLang, toggle }`. `lang` persists to localStorage key `nc-lang` (default `"fr"`), initialized lazily so there is no first-frame language flash.
- Every page/component holds its copy in a module-scope object `const content = { fr: {...}, en: {...} } as const;` and selects with `const { lang } = useLang(); const t = content[lang];`. Sub-components receive already-translated strings via props — call `useLang()` once per page, not in every child.

**How to apply:** Any new user-facing string (including `aria-label`, `placeholder`, alt text) must be added to BOTH `fr` and `en`; never hardcode a bare French/English string in JSX.

## Rule: AI output language must match the UI language
The simulator and PDF analyzer call the API server (`artifacts/api-server`); the LLM prompts there are written in French and would otherwise return French free-text even when the UI is English.

**Why:** A user on the English UI was getting French AI recommendations/summaries — jarring and a bug.

**How to apply:** The client sends the current `lang` with the request (`/api/simulate`, `/api/simulate-advanced` in the JSON body; `/api/pdf/analyze` as a FormData field). Each route derives `outLang = lang === "en" ? "English" : "French"` and instructs the model that all *textual* JSON fields must be in `outLang` while keeping French regulatory proper nouns (Jeanbrun, LMNP, VEFA, TMI, notaire, etc.) untranslated. Numeric/currency formatting is left identical across languages.
