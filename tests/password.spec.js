const { test, expect } = require('@playwright/test');

test.describe('Password Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/password-generator');
  });

  test('should generate a strong 20-character password by default', async ({ page }) => {
    await page.click('text=Generate Secure Password');
    const passwordBox = page.locator('.result-box div').first();
    const password = await passwordBox.innerText();
    
    expect(password.length).toBe(20);
    
    const strength = page.locator('span', { hasText: 'Strength:' });
    await expect(strength).toContainText('Strong');
  });

  test('should adjust password length based on slider', async ({ page }) => {
    await page.fill('input[type="range"]', '32');
    await page.click('text=Generate Secure Password');
    
    const passwordBox = page.locator('.result-box div').first();
    const password = await passwordBox.innerText();
    
    expect(password.length).toBe(32);
  });
});
