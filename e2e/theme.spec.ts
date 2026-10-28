import { expect, test } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('flips data-theme and persists across reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');

    // No explicit choice yet: no data-theme attribute set.
    await expect(html).not.toHaveAttribute('data-theme', 'light');
    await expect(html).not.toHaveAttribute('data-theme', 'dark');

    await page.getByRole('button', { name: 'Cambia tema chiaro/scuro' }).click();
    const themeAfterFirstClick = await html.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(themeAfterFirstClick);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', themeAfterFirstClick!);

    await page.getByRole('button', { name: 'Cambia tema chiaro/scuro' }).click();
    const themeAfterSecondClick = await html.getAttribute('data-theme');
    expect(themeAfterSecondClick).not.toBe(themeAfterFirstClick);
  });
});
