import { test, expect } from '@playwright/test';

const routes = ['/', '/about', '/research', '/projects', '/experience', '/contact'];

test('portfolio routes render and the hero visual stays framed', async ({ page }) => {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
      await expect(page.locator('body')).toContainText('Harsh');
      await expect(page.locator('main')).toBeVisible();
    }

    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const visual = page.locator('.hero-orb');
    await expect(visual).toBeVisible();

    const layout = await page.evaluate(() => {
      const root = document.documentElement;
      const hero = document.querySelector('.hero-orb')?.getBoundingClientRect();
      const header = document.querySelector('header')?.getBoundingClientRect();

      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        hero: hero ? { left: hero.left, right: hero.right, width: hero.width, height: hero.height } : null,
        headerHeight: header?.height ?? 0,
      };
    });

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 2);
    expect(layout.hero?.width).toBeGreaterThan(80);
    expect(layout.hero?.height).toBeGreaterThan(80);
    expect(layout.hero?.left).toBeGreaterThanOrEqual(-2);
    expect(layout.hero?.right).toBeLessThanOrEqual(viewport.width + 2);
    expect(layout.headerHeight).toBeGreaterThan(0);

    await page.screenshot({
      path: `test-results/portfolio-${viewport.name}.png`,
      fullPage: true,
    });
  }
});
