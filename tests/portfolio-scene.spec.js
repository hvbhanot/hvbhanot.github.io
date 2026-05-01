import { test, expect } from '@playwright/test';

test('3D hero scene paints, animates, and stays framed on desktop and mobile', async ({ page }) => {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.waitForSelector('canvas#portfolio-scene');
    await page.waitForTimeout(600);

    const readCanvasStats = async () =>
      page.evaluate(() => {
        const canvas = document.querySelector('canvas#portfolio-scene');
        if (!(canvas instanceof HTMLCanvasElement)) {
          return { width: 0, height: 0, brightPixels: 0, alphaPixels: 0, hash: 0, bounds: null };
        }

        const sampler = document.createElement('canvas');
        sampler.width = 96;
        sampler.height = 96;
        const context = sampler.getContext('2d', { willReadFrequently: true });
        context.drawImage(canvas, 0, 0, sampler.width, sampler.height);
        const pixels = context.getImageData(0, 0, sampler.width, sampler.height).data;
        let brightPixels = 0;
        let alphaPixels = 0;
        let hash = 0;

        for (let index = 0; index < pixels.length; index += 4) {
          const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
          if (pixels[index + 3] > 0) alphaPixels += 1;
          if (brightness > 40) brightPixels += 1;
          hash = (hash + brightness * ((index / 4) % 97)) % 1000000007;
        }

        const rect = canvas.getBoundingClientRect();
        return {
          width: canvas.width,
          height: canvas.height,
          brightPixels,
          alphaPixels,
          hash,
          bounds: {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
          },
        };
      });

    const first = await readCanvasStats();
    const canvasBox = await page.locator('canvas#portfolio-scene').boundingBox();
    await page.mouse.move(canvasBox.x + canvasBox.width * 0.62, canvasBox.y + canvasBox.height * 0.38);
    await page.waitForTimeout(700);
    const second = await readCanvasStats();

    expect(first.width).toBeGreaterThan(100);
    expect(first.height).toBeGreaterThan(100);
    expect(first.alphaPixels).toBeGreaterThan(500);
    expect(first.brightPixels).toBeGreaterThan(100);
    expect(second.hash).not.toBe(first.hash);
    expect(second.bounds.width).toBeGreaterThan(viewport.width < 600 ? 300 : 500);
    expect(second.bounds.height).toBeGreaterThan(300);
    expect(second.bounds.left).toBeGreaterThanOrEqual(-2);
    expect(second.bounds.right).toBeLessThanOrEqual(viewport.width + 2);

    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.max(280, Math.floor(viewport.height * 0.62));
    for (let y = 0; y <= scrollHeight; y += step) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(90);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);

    const layout = await page.evaluate(() => {
      const root = document.documentElement;
      const heroTitle = document.querySelector('h1')?.getBoundingClientRect();
      const projects = document.querySelector('#projects')?.getBoundingClientRect();

      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        titleHeight: heroTitle?.height ?? 0,
        projectsTop: projects?.top ?? 0,
      };
    });

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 2);
    expect(layout.titleHeight).toBeGreaterThan(80);
    expect(layout.projectsTop).toBeGreaterThan(0);

    await page.screenshot({
      path: `test-results/portfolio-${viewport.name}.png`,
      fullPage: true,
    });
  }
});
