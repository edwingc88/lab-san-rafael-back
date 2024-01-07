// @ts-check
const { test, expect } = require('@playwright/test')

// import { test, expect } from '@playwright/test'

test('Get request Example ', async ({ request }) => {
  const response = await request.get('/clients')
  expect(response.ok()).toBeDefined()
})

/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
})
*/
