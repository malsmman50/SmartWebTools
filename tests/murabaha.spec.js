const { test, expect } = require('@playwright/test');

test.describe('Murabaha Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/murabaha');
  });

  test('should calculate murabaha financing correctly', async ({ page }) => {
    // cost 100,000
    // down payment 20,000
    // margin 15%
    // months 60
    // financed = 80000
    // profit = 80000 * 0.15 = 12000
    // true selling price = 100000 + 12000 = 112000
    // deferred balance = 80000 + 12000 = 92000
    // monthly = 92000 / 60 = 1533.33
    
    const textInputs = page.locator('.input[type="text"]');
    const numberInputs = page.locator('input[type="number"]'); // For margin and months which are native type="number"
    
    await textInputs.nth(0).fill('100,000'); // Cost
    await textInputs.nth(1).fill('20,000');  // Down payment
    await numberInputs.nth(0).fill('15');    // Margin
    await numberInputs.nth(1).fill('60');    // Months
    
    const monthly = page.locator('.result-value').nth(0);
    const trueSellingPrice = page.locator('.result-value').nth(1);
    const deferredBalance = page.locator('.result-value').nth(2);
    const profit = page.locator('.result-value').nth(3);

    await expect(monthly).toContainText('$1,533');
    await expect(trueSellingPrice).toContainText('$112,000');
    await expect(deferredBalance).toContainText('$92,000');
    await expect(profit).toContainText('$12,000');
  });
});
