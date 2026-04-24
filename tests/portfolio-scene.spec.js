import { test, expect } from '@playwright/test';

test('3D scene paints nonblank canvas on desktop and mobile', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.waitForSelector('#portfolio-scene');
    await page.waitForTimeout(600);

    const stats = await page.evaluate(() => {
      const canvas = document.querySelector('#portfolio-scene');
      if (!(canvas instanceof HTMLCanvasElement)) {
        return { width: 0, height: 0, brightPixels: 0, alphaPixels: 0 };
      }

      const sampler = document.createElement('canvas');
      sampler.width = 96;
      sampler.height = 96;
      const context = sampler.getContext('2d', { willReadFrequently: true });
      context.drawImage(canvas, 0, 0, sampler.width, sampler.height);
      const pixels = context.getImageData(0, 0, sampler.width, sampler.height).data;
      let brightPixels = 0;
      let alphaPixels = 0;

      for (let index = 0; index < pixels.length; index += 4) {
        const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
        if (pixels[index + 3] > 0) alphaPixels += 1;
        if (brightness > 40) brightPixels += 1;
      }

      return { width: canvas.width, height: canvas.height, brightPixels, alphaPixels };
    });

    expect(stats.width).toBeGreaterThan(100);
    expect(stats.height).toBeGreaterThan(100);
    expect(stats.alphaPixels).toBeGreaterThan(500);
    expect(stats.brightPixels).toBeGreaterThan(100);
  }
});
