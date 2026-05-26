import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/work',
  '/notes',
  '/notes/notebooks-that-survive-the-semester',
  '/experience',
  '/contact',
  '/lab',
];

test('all routes render and stay within viewport', async ({ page }) => {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
      await expect(page.locator('body')).toContainText('Bhanot');
      await expect(page.locator('main')).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth };
      });
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 2);
    }
  }
});
