import { test, expect } from '@playwright/test';

const BASE = 'http://127.0.0.1:4321';

test('all portfolio sections render with zero horizontal overflow across viewports', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(BASE);
    await expect(page.locator('#hero-title')).toContainText('Harsh Vardhan Bhanot');
    for (const id of ['top', 'community', 'research', 'threads', 'about', 'about-skills', 'contact']) {
      await expect(page.locator('#' + id)).toBeVisible();
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(width + 2);
  }
});

test('interactive conceptual diagrams respond to user actions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE);

  // Deep Research cyclic feedback diagram advances steps
  const deepResearch = page.locator('#entry-014');
  await expect(deepResearch.locator('.diagram-step-pill')).toHaveText('01 · Query');
  await deepResearch.locator('.diagram-action').click();
  await expect(deepResearch.locator('.diagram-step-pill')).toHaveText('02 · Search');

  // Relay routing diagram switches between Cloud and Local
  const relay = page.locator('#entry-001');
  await expect(relay.locator('.diagram-step-pill')).toHaveText('Cloud-first');
  await relay.getByRole('button', { name: 'Local', exact: true }).click();
  await expect(relay.locator('.diagram-step-pill')).toHaveText('Local fallback');

  // TensorTonic matrix decay slider updates the covariance readout
  const tensorTonic = page.locator('#entry-011');
  await expect(tensorTonic.locator('.diagram-slider-label')).toContainText('λ = 0.45');
  await tensorTonic.getByRole('slider', { name: /Covariance decay rate/ }).fill('0.8');
  await expect(tensorTonic.locator('.diagram-slider-label')).toContainText('λ = 0.80');
});

test('project dossiers expand in place, filter cleanly, and support deep links', async ({
  page,
}) => {
  await page.goto(BASE + '/#research');

  // Expand Deep Research notes in place
  const deepResearch = page.locator('#entry-014');
  await deepResearch.locator('.entry-details summary').click();
  await expect(deepResearch.getByRole('heading', { name: 'Problem' })).toBeVisible();
  await deepResearch.locator('.entry-details summary').click();
  await expect(deepResearch.getByRole('heading', { name: 'Problem' })).not.toBeVisible();

  // Filter by AutoML
  await page.getByRole('button', { name: 'AutoML', exact: true }).click();
  await expect(page.locator('#entry-002')).toBeVisible();
  await expect(page.locator('#entry-014')).toHaveCount(0);

  // Deep link to a filtered-out entry resets filter and opens dossier
  await page.goto(BASE + '/#entry-014');
  await expect(page.locator('#entry-014')).toBeVisible();
  await expect(page.locator('#entry-014').getByRole('heading', { name: 'Problem' })).toBeVisible();

  // Deep link to archived entry expands archive and opens entry
  await page.goto(BASE + '/#entry-006');
  const archived = page.locator('#entry-006');
  await expect(archived).toBeInViewport();
  await expect(archived.getByText('Built with')).toBeVisible();

  // Legacy hash redirects cleanly
  await page.goto(BASE + '/#stats');
  await expect(page.locator('#community')).toBeInViewport();
  await page.goto(BASE + '/#toolkit');
  await expect(page.locator('#about-skills')).toBeInViewport();
});

test('light mode is default and dark mode toggle persists across reload', async ({
  page,
}) => {
  await page.goto(BASE);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const toggle = page.getByRole('button', { name: 'Switch to dark theme' });
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
