export default { isDigit, isNumberWord, ToDigit, extractNumberWord, containsNumberWord }

const one = 'one'
const two = 'two'
const three = 'three'
const four = 'four'
const five = 'five'
const six = 'six'
const seven = 'seven'
const eight = 'eight'
const nine = 'nine'
const digits = [one, two, three, four, five, six, seven, eight, nine]

function isDigit(char) {
  return char >= '0' && char <= '9'
}

function isNumberWord(word) {
  return word === one ||
    word === two ||
    word === three ||
    word === four ||
    word === five ||
    word === six ||
    word === seven ||
    word === eight ||
    word === nine
}

function containsNumberWord(candidate) {
  return candidate.includes(one) ||
    candidate.includes(two) ||
    candidate.includes(three) ||
    candidate.includes(four) ||
    candidate.includes(five) ||
    candidate.includes(six) ||
    candidate.includes(seven) ||
    candidate.includes(eight) ||
    candidate.includes(nine)
}

function ToDigit(word) {
  switch (word) {
    case one:
      return '1'
    case two:
      return '2'
    case three:
      return '3'
    case four:
      return '4'
    case five:
      return '5'
    case six:
      return '6'
    case seven:
      return '7'
    case eight:
      return '8'
    case nine:
      return '9'
  }
}

function extractNumberWord(word) {
  for (const digit of digits) {
    if (word.includes(digit)) {
      return digit
    }
  }
}
