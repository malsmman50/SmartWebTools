const { test, expect } = require('@playwright/test');

test.describe('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/json-formatter');
  });

  test('should format raw JSON string correctly', async ({ page }) => {
    const rawJson = '{"hello":"world","numbers":[1,2,3]}';
    const formattedJson = '{\n  "hello": "world",\n  "numbers": [\n    1,\n    2,\n    3\n  ]\n}';
    
    await page.fill('textarea', rawJson);
    await page.click('button:has-text("Format")');
    
    const editorValue = await page.inputValue('textarea');
    expect(editorValue).toBe(formattedJson);
  });

  test('should show error for invalid JSON', async ({ page }) => {
    const invalidJson = '{hello: "world"}';
    await page.fill('textarea', invalidJson);
    await page.click('button:has-text("Format")');
    
    const errorMsg = page.locator('div', { hasText: /Invalid JSON/i }).first();
    await expect(errorMsg).toBeVisible();
  });
});
