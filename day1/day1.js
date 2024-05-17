import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

const part1 = (input) => solve(input, parser1)
const part2 = (input) => solve(input, parser2)

function solve(input, parser) {
  const lines = file.readLines(input)
  const calibrationValues = file.parse(lines, parser)
  return reducer(calibrationValues)
}

function parser1(line) {
  let first = NaN
  let last = NaN
  for (const letter of line) {
    if (letter >= '0' && letter <= '9') {
      if (isNaN(first)) {
        first = letter
        last = first
      } else {
        last = letter
      }
    }
  }

  return Number(first + last)
}

function parser2(line) {
  let first = NaN
  let last = NaN
  let buf = ''

  for (const character of line) {
    let candidate = character

    buf += character
    if (txt.containsNumberWord(buf)) {
      const nw = txt.extractNumberWord(buf)
      // Since there are no digits in the name of a number we can safely overwrite
      // the candidate.
      candidate = txt.ToDigit(nw)
    }

    log.trace(`- (${first}/${last}): ${character}/${buf}\t\t${candidate}`)
    if (txt.isDigit(candidate)) {
      if (isNaN(first)) {
        first = candidate
        last = first
      } else {
        last = candidate
      }

      // In the input data some of the digit names can overlap e.g. oneight
      // should parse as a one followed by an eight. This means we can't just
      // toss the buffer after we successfully parse a number.
      //
      // It's a bit cheesey but since the max overlap between the names of
      // numbers is one character, we can just keep the last character when the
      // buffer is reset and it handles this situation.
      buf = buf[buf.length - 1]
    }
  }

  log.debug(`- ${first + last}  : ${line}`)

  return Number(first + last)
}

function reducer(values) {
  // This just sums the values
  return values.reduce((a, b) => a + b, 0)
}


