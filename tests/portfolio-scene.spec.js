import { test, expect } from '@playwright/test';

const BASE = 'http://127.0.0.1:4321';
const sections = ['top', 'about', 'experience', 'work', 'toolkit', 'contact'];

test('single-page portfolio renders all sections within the viewport', async ({ page }) => {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(BASE, { waitUntil: 'networkidle' });

    await expect(page.locator('body')).toContainText('Bhanot');
    await expect(page.locator('main')).toBeVisible();

    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth };
    });
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);
  }
});

test('selecting a work row opens and closes the project modal', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(BASE, { waitUntil: 'networkidle' });

  await page.locator('.work-row').first().click();
  await expect(page.getByText('Highlights')).toBeVisible();

  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByText('Highlights')).toHaveCount(0);
});
