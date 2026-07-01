export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const cash = Number(body.cash) || 0;
    const gold = Number(body.gold) || 0;
    const silver = Number(body.silver) || 0;
    const business = Number(body.business) || 0;
    const debts = Number(body.debts) || 0;
    
    // Optional gold price input, defaults to $75/gram if not provided
    const goldPrice = Number(body.goldPricePerGram) || 75;
    
    const totalWealth = cash + gold + silver + business;
    const netAssets = totalWealth - debts;
    
    const nisab = goldPrice * 85;
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
      note: "Calculated according to AAOIFI Sharia standards (2.5% on net zakatable assets)."
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
