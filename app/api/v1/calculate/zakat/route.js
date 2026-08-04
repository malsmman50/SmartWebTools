import { FALLBACK_GOLD_PRICE_PER_GRAM, NISAB_GOLD_GRAMS } from "../../../../../lib/goldPrice";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const cash = Number(body.cash) || 0;
    const gold = Number(body.gold) || 0;
    const silver = Number(body.silver) || 0;
    const business = Number(body.business) || 0;
    const debts = Number(body.debts) || 0;
    
    // Gold price resolution, in order: caller-supplied -> live market -> constant.
    //
    // The constant alone is not good enough here. It stood at $120/g while the
    // market was near $130/g, which put the API's nisab at $10,200 against the
    // site's $11,091 — an 8.7% gap. Anyone holding between those two figures was
    // told "zakat is due" by the API and "no zakat is due" by the calculator on
    // the same site. That is a contradiction in a religious ruling, not a
    // rounding difference, so the API now resolves the same price the UI does.
    let goldPrice = Number(body.goldPricePerGram) || 0;
    let priceSource = goldPrice > 0 ? "caller" : null;

    if (!goldPrice) {
      // gold-api.com is the same primary source /api/gold uses. An earlier
      // attempt here called data-asg.goldprice.org directly and silently got
      // "Forbidden" — it rejects requests without a browser User-Agent — so the
      // endpoint kept serving the stale constant while reporting success. Hence
      // goldPriceSource in the response: a fallback that cannot be seen is a
      // fallback nobody fixes.
      try {
        const res = await fetch("https://api.gold-api.com/price/XAU", {
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 },
        });
        const data = await res.json();
        const perOunce = Number(data?.price);
        if (perOunce > 0) {
          goldPrice = perOunce / 31.1035; // troy ounce -> gram
          priceSource = "live";
        }
      } catch {
        // Network failure must not fail the request — fall through to the constant.
      }
    }

    if (!goldPrice) {
      goldPrice = FALLBACK_GOLD_PRICE_PER_GRAM;
      priceSource = "fallback";
    }

    const totalWealth = cash + gold + silver + business;
    const netAssets = totalWealth - debts;
    
    const nisab = goldPrice * NISAB_GOLD_GRAMS;
    const isEligible = netAssets >= nisab;
    const zakatDue = isEligible ? netAssets * 0.025 : 0;
    
    return new Response(JSON.stringify({
      success: true,
      totalWealth,
      netAssets,
      nisabThreshold: Math.round(nisab),
      isEligibleForZakat: isEligible,
      zakatDue: Number(zakatDue.toFixed(2)),
      currency: "USD",
      // Reported so a caller can tell whether the threshold reflects the live
      // market or a stale constant — the answer changes who owes zakat.
      goldPricePerGram: Number(goldPrice.toFixed(2)),
      goldPriceSource: priceSource,
      nisabGoldGrams: NISAB_GOLD_GRAMS,
      note: "Calculated according to AAOIFI Sharia Standard No. 35 (2.5% on net zakatable assets)."
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow cross-origin requests for developer API
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
