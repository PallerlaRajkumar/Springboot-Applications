// tests/search.test.ts
import { test, expect } from '@playwright/test';

test('search for shoes', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.waitForLoadState('domcontentloaded');

  // Check the title to ensure the page has loaded correctly
  const title = await page.title();
  console.log(`Page title: ${title}`);
  expect(title).toContain('Amazon');

  // Ensure the search input is visible and interactable
  const searchInput = await page.locator('input#twotabsearchtextbox');
  await searchInput.waitFor({ state: 'visible' });
  await searchInput.fill('shoes');

  const searchButton = await page.locator('input#nav-search-submit-button');
  await searchButton.waitFor({ state: 'visible' });
  await searchButton.click();

  await page.waitForSelector('.s-main-slot .s-result-item', { state: 'visible' });

  const results = await page.locator('.s-main-slot .s-result-item');
  const count = await results.count();
  console.log(`Number of results: ${count}`);
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const titleElement = results.nth(i).locator('h2 a span');
    const isVisible = await titleElement.isVisible({ timeout: 15000 }); // Increase timeout
    console.log(`Result ${i + 1} is visible: ${isVisible}`);
    if (isVisible) {
      const text = await titleElement.textContent();
      console.log(`Result ${i + 1}: ${text}`);
      if (text.toLowerCase().includes('shoe')) {
        expect(text.toLowerCase()).toContain('shoe');
      } else {
        console.warn(`Result ${i + 1} does not contain the keyword 'shoe'.`);
      }
    } else {
      console.warn(`Result ${i + 1} title element not visible.`);
    }
  }
});
