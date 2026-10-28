import { expect, test } from '@playwright/test';

test.describe('Header scroll behavior', () => {
  test('shrinks into a floating pill after scrolling down', async ({ page }) => {
    // Tall viewport-independent content to scroll through regardless of how
    // much the homepage renders.
    await page.goto('/');
    const header = page.locator('.site-header__inner');

    await expect(page.locator('body')).not.toHaveClass(/scrolled/);
    const heightAtTop = await header.evaluate((el) => getComputedStyle(el).height);

    await page.mouse.wheel(0, 800);
    await expect(page.locator('body')).toHaveClass(/scrolled/);

    // toHaveCSS polls (default 5s) instead of reading once, so this waits
    // out the header's own 0.25s CSS transition instead of racing it.
    await expect(header).not.toHaveCSS('height', heightAtTop);
    const radiusScrolled = await header.evaluate((el) => getComputedStyle(el).borderRadius);
    // Pill shape: a large radius relative to the (now shorter) bar height.
    expect(parseFloat(radiusScrolled)).toBeGreaterThan(20);
  });
});
