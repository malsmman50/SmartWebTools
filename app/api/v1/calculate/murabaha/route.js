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
    
    const totalProfit = amount * (rate / 100) * years;
    const totalFinancingAmount = amount + totalProfit;
    const monthlyInstallment = totalFinancingAmount / (years * 12);
    
    return new Response(JSON.stringify({
      success: true,
      principalAmount: amount,
      annualProfitRatePercent: rate,
      financingYears: years,
      totalProfitMarginPaid: Number(totalProfit.toFixed(2)),
      totalFinancingAmount: Number(totalFinancingAmount.toFixed(2)),
      monthlyInstallment: Number(monthlyInstallment.toFixed(2)),
      currency: "USD",
      note: "Calculated according to Islamic Murabaha (Flat rate markup) guidelines."
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
