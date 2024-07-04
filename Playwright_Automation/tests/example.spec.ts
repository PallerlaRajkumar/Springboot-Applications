import { test, expect } from '@playwright/test';

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function runSleep() {
  await sleep(5000); 
}

test.beforeEach(async ({ page }) => {
  // Maximize the browser window
  await page.setViewportSize({
    width: 1725,
    height: 1115
  });
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await runSleep();  // Wait after navigating to the page

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  await runSleep();  // Wait after checking the title
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await runSleep();  // Wait after navigating to the page

  // Wait for the "Get started" link to be visible and clickable, and then click it
  const getStartedLink = page.getByRole('link', { name: 'Get started' });
  await expect(getStartedLink).toBeVisible();
  await getStartedLink.click();
  await runSleep();  // Wait after clicking the link

  // Expects page to have a heading with the name of Installation.
  const installationHeading = page.getByRole('heading', { name: 'Installation' });
  await expect(installationHeading).toBeVisible();
  await runSleep();  // Wait after checking the heading visibility
});
