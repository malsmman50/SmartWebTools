const { test, expect } = require('@playwright/test');

test.describe('Mudarabah Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/mudarabah');
  });

  test('should calculate profit distribution correctly', async ({ page }) => {
    // 50000 capital, 80000 revenue, 20000 expenses = 60000 net profit
    // Investor share 60% = 36000 profit
    // Manager share 40% = 24000 profit
    
    await page.fill('input[type="text"]:has-prefix("$")', '50000'); // First numeric format might not have ID, let's use exact selectors or fill text inputs with values
    
    // Playwright locator for inputs using labels is best, but since labels and inputs are separate, let's find input by surrounding text.
    // Actually, react-number-format uses input type="text"
    const inputs = page.locator('.input[type="text"]');
    
    await inputs.nth(0).fill('50,000'); // Capital
    await inputs.nth(1).fill('80,000'); // Revenue
    await inputs.nth(2).fill('20,000'); // Expenses
    
    // Set slider to 60
    await page.fill('input[type="range"]', '60');

    // Wait for calculations
    const netResult = page.locator('.result-value').nth(0);
    const investorProfit = page.locator('.result-value').nth(1);
    const managerProfit = page.locator('.result-value').nth(2);
    const finalCapital = page.locator('.result-value').nth(3);

    await expect(netResult).toContainText('$60,000');
    await expect(investorProfit).toContainText('$36,000');
    await expect(managerProfit).toContainText('$24,000');
    await expect(finalCapital).toContainText('$86,000');
  });

  test('should cap investor loss to capital (Math.max)', async ({ page }) => {
    // 50000 capital, 10000 revenue, 90000 expenses = -80000 loss
    // Investor bears all loss up to capital
    // Final capital should be Math.max(0, 50000 - 80000) = $0, not -$30,000
    
    const inputs = page.locator('.input[type="text"]');
    await inputs.nth(0).fill('50,000'); // Capital
    await inputs.nth(1).fill('10,000'); // Revenue
    await inputs.nth(2).fill('90,000'); // Expenses
    
    const netResult = page.locator('.result-value').nth(0);
    const finalCapital = page.locator('.result-value').nth(3);

    await expect(netResult).toContainText('$80,000'); // -80,000 is shown as -$80,000 or -80,000
    await expect(finalCapital).toContainText('$0');
  });
});
