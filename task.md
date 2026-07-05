# Technical Debt Cleanup Campaign

## 1. UI/UX Mobile Responsiveness
- `[x]` Fix `PregnancyCalculator.js` inline grid layout.
- `[x]` Fix `SplitBillCalculator.js` flexWrap issue.
- `[x]` Fix `HealthCalculator.js` gender buttons wrapping.

## 2. Performance & Re-renders
- `[x]` Dynamic imports in `DataConverterClient.js`.
- `[x]` Fix `useEffect` state synchronization bugs in `DataConverterClient.js` and `JwtDecoderClient.js`.

## 3. i18n Hardcoded Strings
- `[x]` Update `en.json` and `ar.json` with missing keys.
- `[x]` Refactor `Navbar.js`, `CookieBanner.js`, `PwaInstallPrompt.js`, and `page.js` to use `dict`.

## 4. Accessibility (a11y)
- `[x]` Add `:focus-visible` global styles in `globals.css`.
- `[x]` Add `htmlFor`/`id` and ARIA attributes to forms and dropdowns.

## 5. Code Quality
- `[x]` Fix `useEffect` missing dependencies (`HealthCalculator`, `ShoeSizeConverter`, `CronGeneratorClient`).
- `[x]` Refactor `Navbar.js` dark mode toggle to avoid direct DOM manipulation if possible.

---

# Phase 2: AdSense-Compliant Tools
- `[x]` Build Ramadan Hydration Calculator with 800+ words SEO content.
- `[x]` Build Fuel Cost Calculator with 800+ words SEO content.
- `[x]` Build Customs Duty & VAT Calculator with 800+ words SEO content.
- `[x]` Add tools to navigation menus.
- `[x]` Inject SEO components (SoftwareSchema, FAQSchema, DisclaimerBox) into target calculators.
- `[x]` Inject SEO components to prompt-generator, qibla-compass, regex-tester, currency, inheritance.
- `[x]` Run `npm run build` to verify.
- `[x]` Add SEO schemas and long-form articles to remaining pages (chatpdf, cron-generator, data-converter, hijri-converter, json-formatter)
- `[x]` Inject SEO schemas, DisclaimerBox, and long-form articles to islamic calculators (islamic-deposit, mudarabah, murabaha, sukuk, roi)