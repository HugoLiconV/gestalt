import { expect, test } from '@playwright/test';

test('ButtonSocial dark mode visual regression check', async ({ page }) => {
  await page.goto('/visual-test/ButtonSocial-dark');
  const locator = page.locator('[data-test-id="visual-test"]');
  await expect(locator).toHaveScreenshot('ButtonSocial-dark.png');
});
