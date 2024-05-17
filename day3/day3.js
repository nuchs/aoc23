import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

function part1(input) {
  const lines = file.readLines(input)
  return reducer(lines)
}

function part2(input) {
  const lines = file.readLines(input)
  return reducer(lines)
}

function reducer(schematic) {
  let sum = 0

  for (let row = 0; row < schematic.length; row++) {
    for (let col = 0; col < schematic[row].length; col++) {
      if (txt.isDigit(schematic[row][col])) {
        let start = col
        col++
        while (col < schematic[row].length && txt.isDigit(schematic[row][col])) {
          col++
        }
        let candidate = schematic[row].substring(start, col)

        if (isPartNumber(schematic, row, start, col)) {
          sum += Number(candidate)
          log.debug("good", candidate)
        } else {
          log.debug("bad ", candidate)
        }
      }
    }
  }

  return sum
}

function isPartNumber(schematic, row, start, end) {
  let valid = false;

  if (row > 0) {
    valid = valid || symbolInRange(schematic[row - 1], start, end)
  }

  valid = valid || symbolInRange(schematic[row], start, end)

  if ((row + 1) < schematic.length) {
    valid = valid || symbolInRange(schematic[row + 1], start, end)
  }

  return valid
}

function symbolInRange(row, start, end) {
  let left = (start - 1) >= 0 ? start - 1 : 0
  let right = (end + 1) <= row.length ? end + 1 : row.length

  for (let cell = left; cell < right; cell++) {
    if (isPartSymbol(row[cell])) {
      return true
    }
  }

  return false
}

function isPartSymbol(char) {
  return !(txt.isDigit(char) || txt.isLetter(char) || char === ' ' || char === '.')
}


