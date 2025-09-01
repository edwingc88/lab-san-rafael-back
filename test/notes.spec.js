import { test, expect } from '@playwright/test'

test('get name lab', async ({ request }) => {
  const response = await request.get('/labs')
  expect(response.ok()).toBeDefined()
  expect(response.status()).toStrictEqual(201)
})
