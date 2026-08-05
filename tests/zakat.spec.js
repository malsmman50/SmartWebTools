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

  /**
   * Filling and asserting are wrapped together and retried as one unit.
   *
   * NumericFormat only accepts a value once React has hydrated the field. Fill
   * before that and the value lands in the DOM, then React mounts and resets it
   * to the initial state — the inputs read correctly for an instant while the
   * result sits at $0. Waiting on networkidle appeared to fix this and did not:
   * it passed on one run and failed on the next, because network idle says
   * nothing about whether React has attached its handlers.
   *
   * Retrying the whole interaction is deterministic where a wait is a guess.
   */
  const fillAndExpect = async (page, values, expected) => {
    const inputs = page.locator('.input[type="text"]');
    await expect(async () => {
      for (const [i, v] of values) await inputs.nth(i).fill(v);
      await expect(page.locator('.result-value').nth(0)).toContainText(expected, { timeout: 1500 });
    }).toPass({ timeout: 15000 });
  };

  test('should calculate correct Zakat for eligible wealth', async ({ page }) => {
    // Total 12,000 · eligible 11,000 · nisab ≈ $7,225 → 11,000 × 2.5% = $275
    await fillAndExpect(page, [
      [0, '10,000'], // cash
      [1, '0'],      // gold
      [2, '0'],      // silver
      [3, '2,000'],  // business
      [4, '1,000'],  // debts
    ], '$275');
  });

  test('should show $0.00 Zakat if wealth is below Nisab', async ({ page }) => {
    // Eligible 5,000 is under the ≈$7,225 nisab, so nothing is due
    await fillAndExpect(page, [
      [0, '5,000'],
      [1, '0'],
      [2, '0'],
      [3, '0'],
      [4, '0'],
    ], '$0.00');
  });
});
