const { test, expect } = require('@playwright/test');

test.describe('Password Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/password-generator');
  });

  test('should generate a strong 20-character password by default', async ({ page }) => {
    await page.click('text=Generate Secure Password');
    const passwordBox = page.locator('.result-box div').first();
    // textContent, not innerText: soft line-wrapping of long passwords
    // injects \n into innerText and inflates the length.
    const password = (await passwordBox.textContent()).trim();

    expect(password.length).toBe(20);
    
    const strength = page.locator('span', { hasText: 'Strength:' });
    await expect(strength).toContainText('Strong');
  });

  test('should adjust password length based on slider', async ({ page }) => {
    // page.fill does not drive React-controlled range inputs; go through the
    // native value setter and fire the events React listens for.
    await page.locator('input[type="range"]').evaluate((el) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, '32');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.click('text=Generate Secure Password');
    
    const passwordBox = page.locator('.result-box div').first();
    const password = (await passwordBox.textContent()).trim();

    expect(password.length).toBe(32);
  });
});
