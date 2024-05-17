import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

function part1(input) {
  const lines = file.readLines(input)
  const calibration1 = file.parse(lines, parser1)
  return reducer(calibration1)
}

function part2(input) {
  const lines = file.readLines(input)
  const calibration2 = file.parse(lines, parser2)
  return reducer(calibration2)
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

      // a bit cheesey but the max overlap between the names of numbers
      // is 1 character so we can just keep the last one when the buffer is
      // reset
      buf = buf[buf.length - 1]
    }
  }

  log.debug(`- ${first + last}  : ${line}`)

  return Number(first + last)
}

function reducer(lines) {
  return lines.reduce((a, b) => a + b, 0)
}


