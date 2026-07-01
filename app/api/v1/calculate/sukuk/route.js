export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const amount = Number(body.amount) || 0;
    const rate = Number(body.rate) || 0;
    const years = Number(body.years) || 0;
    
    if (amount <= 0 || rate < 0 || years <= 0) {
      return new Response(JSON.stringify({ success: false, error: "amount, rate, and years must be positive numbers" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    
    const annualProfit = amount * (rate / 100);
    const totalProfit = annualProfit * years;
    const maturityValue = amount + totalProfit;
    
    return new Response(JSON.stringify({
      success: true,
      principalAmount: amount,
      annualYieldPercent: rate,
      durationYears: years,
      annualProfitPayout: Number(annualProfit.toFixed(2)),
      totalExpectedProfitPayout: Number(totalProfit.toFixed(2)),
      maturityValue: Number(maturityValue.toFixed(2)),
      currency: "USD",
      note: "Calculated according to Islamic Sukuk yield principles (asset rental/underlying project profit share)."
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
