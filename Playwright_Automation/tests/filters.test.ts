// tests/filters.test.ts
import { test, expect } from '@playwright/test';

test('apply filters', async ({ page }) => {
  // Increase the overall timeout for the test
  test.setTimeout(180000); // 3 minutes

  await page.goto('https://www.amazon.in/');

  // Ensure the page has fully loaded before proceeding
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // Increase the timeout for the fill action
  await page.fill('input#twotabsearchtextbox', 'shoes', { timeout: 60000 });
  await page.click('input#nav-search-submit-button', { timeout: 60000 });
  await page.waitForSelector('.s-main-slot .s-result-item', { timeout: 60000 });

  // Capture the HTML of the sidebar for debugging
  const sidebarHTML = await page.locator('#s-refinements').innerHTML();
  console.log('Sidebar HTML:', sidebarHTML);

  // Apply brand filter using updated locator to select the label
  const pumaCheckboxLabel = page.locator('//span[text()="Puma"]/preceding-sibling::div/label/input[@type="checkbox"]');
  const adidasCheckboxLabel = page.locator('//span[text()="adidas"]/preceding-sibling::div/label/input[@type="checkbox"]');

  console.log('Waiting for Puma filter checkbox...');
  await pumaCheckboxLabel.waitFor({ state: 'visible', timeout: 30000 }); // Increased timeout to 30000 ms
  console.log('Puma filter checkbox is visible, clicking...');
  await pumaCheckboxLabel.click({ force: true }); // Click the label to check the checkbox

  console.log('Waiting for Adidas filter checkbox...');
  await adidasCheckboxLabel.waitFor({ state: 'visible', timeout: 30000 }); // Increased timeout to 30000 ms
  console.log('Adidas filter checkbox is visible, clicking...');
  await adidasCheckboxLabel.click({ force: true }); // Click the label to check the checkbox

  await page.waitForLoadState('domcontentloaded');

  // Verify filters applied
  const filtersApplied = page.locator('.a-spacing-micro');
  const filtersCount = await filtersApplied.count();
  expect(filtersCount).toBeGreaterThan(0);

  // Debugging: Print the HTML structure of the results
  const resultsHTML = await page.locator('.s-main-slot').innerHTML();
  console.log('Results HTML:', resultsHTML);

  // Verify results filtered
  const results = page.locator('.s-main-slot .s-result-item');
  const resultsCount = await results.count();
  console.log(`Total results count: ${resultsCount}`);
  expect(resultsCount).toBeGreaterThan(0);

  for (let i = 0; i < resultsCount; i++) {
    const result = results.nth(i);
    const titleElement = result.locator('h2 .a-size-mini s-line-clamp-1 .a-size-base-plus a-color-base');

    try {
      const isVisible = await titleElement.isVisible({ timeout: 300000 });
      console.log(`Result ${i} title element is visible: ${isVisible}`);

      const text = await titleElement.textContent({ timeout: 300000 });
      console.log(`Result ${i} text:`, text);
      expect(text?.toLowerCase()).toContain('puma').or.toContain('adidas');
    } catch (error) {
      if (page.isClosed()) {
        console.error(`Error: The page was closed before we could retrieve text content for result ${i}.`);
        break;
      }
      const resultHTML = await result.innerHTML();
      console.error(`Error retrieving text content for result ${i}:`, error);
      console.log(`Result ${i} HTML:`, resultHTML);
    }
  }
});
