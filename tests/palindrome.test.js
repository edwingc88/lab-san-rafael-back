const { palindrome } = require('../utils/for_texting')

test('palindrome function', () => {
  const result = palindrome('hello')
  expect(result).toBe('olleh')
})
