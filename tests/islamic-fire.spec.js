const { test, expect } = require('@playwright/test');

test.describe('Islamic FIRE Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculators/islamic-fire');
  });

  test('should subtract exactly 0.8% for long-term ETF Zakat strategy', async ({ page }) => {
    // Annual Expenses: 60,000
    // Expected Return: 8%
    // Inflation: 3%
    // Zakat: Long-Term Index Funds (~0.8%)
    // Real Return = 5%
    // Islamic SWR = 5% - 0.8% = 4.2% (0.042)
    // Fire Number = 60000 / 0.042 = 1,428,571.42
    
    const textInputs = page.locator('.input[type="text"]');
    const numberInputs = page.locator('input[type="number"]');
    
    await textInputs.nth(0).fill('60,000');
    await numberInputs.nth(0).fill('8.0');
    await numberInputs.nth(1).fill('3.0');
    await page.selectOption('select', 'long-term');
    
    const fireNumber = page.locator('.result-value').nth(0);
    await expect(fireNumber).toContainText('$1,428,571');
  });

  test('should subtract exactly 2.5% for active trading Zakat strategy', async ({ page }) => {
    // Annual Expenses: 60,000
    // Expected Return: 8%
    // Inflation: 3%
    // Zakat: Active Trading (2.5%)
    // Real Return = 5%
    // Islamic SWR = 5% - 2.5% = 2.5% (0.025)
    // Fire Number = 60000 / 0.025 = 2,400,000.00
    
    const textInputs = page.locator('.input[type="text"]');
    const numberInputs = page.locator('input[type="number"]');
    
    await textInputs.nth(0).fill('60,000');
    await numberInputs.nth(0).fill('8.0');
    await numberInputs.nth(1).fill('3.0');
    await page.selectOption('select', 'active');
    
    const fireNumber = page.locator('.result-value').nth(0);
    await expect(fireNumber).toContainText('$2,400,000');
  });
});
