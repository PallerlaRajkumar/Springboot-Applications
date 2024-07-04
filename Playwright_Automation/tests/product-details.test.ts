// tests/product-details.test.ts
import { test, expect } from '@playwright/test';

test('validate product details and add to cart', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.fill('input#twotabsearchtextbox', 'shoes');
  await page.click('input#nav-search-submit-button');
  await page.waitForSelector('.s-main-slot .s-result-item');

  const firstProduct = await page.locator('.s-main-slot .s-result-item').first();
  await firstProduct.click();

  // Validate product details
  const productTitle = await page.locator('span#productTitle');
  await productTitle.waitFor({ state: 'visible', timeout: 3000 });
  expect(await productTitle.textContent()).toBeTruthy();

  // Add to cart
  const addToCartButton = await page.locator('input#add-to-cart-button');
  await addToCartButton.waitFor({ state: 'visible', timeout: 3000 });
  await addToCartButton.click();

  // Capture page state for debugging
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('Body HTML after adding to cart:', bodyHTML);

  // Wait for confirmation text
  const confirmationLocator = page.locator('div#huc-v2-order-row-confirm-text > h1');
  try {
    await confirmationLocator.waitFor({ state: 'visible', timeout: 30000 });
  } catch (error) {
    console.error('Confirmation text did not appear within timeout');
    throw error; // Rethrow the error after logging
  }

  const confirmationText = await confirmationLocator.textContent();
  expect(confirmationText).toContain('Added to Cart');
});
