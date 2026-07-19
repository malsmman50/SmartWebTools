// Single source of truth for gold-price constants used across the app.
// The live price always comes from /api/gold; these values are only the
// offline/default fallback and MUST stay in sync everywhere (they used to
// diverge: $80 in the Zakat UI vs $75 in the developer API).
// Reviewed 2026-07: spot gold ≈ $120/gram. Revisit periodically.
export const FALLBACK_GOLD_PRICE_PER_GRAM = 120;

// Nisab threshold in grams of pure gold (the standard the whole site uses).
export const NISAB_GOLD_GRAMS = 85;
