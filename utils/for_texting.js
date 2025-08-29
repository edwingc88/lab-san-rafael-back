const palindrome = (str) => {
  return str.split('').reverse().join('')
}

const average = (arr) => {
  let sum = 0
  arr.forEach(num => { sum += num })
  return sum / arr.length
}

module.exports = { palindrome, average }
