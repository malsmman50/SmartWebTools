const { test, expect } = require('@playwright/test');

test.describe('Zakat Calculator', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept API call to mock Gold price so Nisab is consistent for the test
    await page.route('/api/gold', async route => {
      const json = { pricePerOunce: 2643.80 }; // 85g gold ≈ $7225
      await route.fulfill({ json });
    });
    await page.goto('/calculators/zakat');
  });

  test('should calculate correct Zakat for eligible wealth', async ({ page }) => {
    const inputs = page.locator('.input[type="text"]');
    await inputs.nth(0).fill('10,000'); // Cash
    await inputs.nth(1).fill('0');      // Gold
    await inputs.nth(2).fill('0');      // Silver
    await inputs.nth(3).fill('2,000');  // Business
    await inputs.nth(4).fill('1,000');  // Debts
    
    // Total Wealth = 12000
    // Eligible Wealth = 11000
    // Nisab ≈ $7225 -> Eligible
    // Zakat Due = 11000 * 0.025 = $275.00
    
    const zakatDue = page.locator('.result-value').nth(0);
    await expect(zakatDue).toContainText('$275.00');
  });

  test('should show $0.00 Zakat if wealth is below Nisab', async ({ page }) => {
    const inputs = page.locator('.input[type="text"]');
    await inputs.nth(0).fill('5,000'); // Cash
    await inputs.nth(1).fill('0');      // Gold
    await inputs.nth(2).fill('0');      // Silver
    await inputs.nth(3).fill('0');      // Business
    await inputs.nth(4).fill('0');      // Debts
    
    // Eligible Wealth = 5000
    // Nisab ≈ $7225 -> Not Eligible
    // Zakat Due = $0.00
    
    const zakatDue = page.locator('.result-value').nth(0);
    await expect(zakatDue).toContainText('$0.00');
  });
});
