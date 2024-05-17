import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

function part1(input) {
  const schematic = file.parseLines(input, parser)
  return reducer1(schematic)
}

function part2(input) {
  const schematic = file.parseLines(input, parser)
  return reducer2(schematic)
}

function parser(line) {
  let parts = []

  log.trace("Mapping")
  for (let col = 0; col < line.length; col++) {
    if (txt.isDigit(line[col])) {
      let end = findEnd(line, col)
      parts.push({
        value: Number(line.substring(col, end)),
        start: col,
        end: end,
        type: "number"
      })
      col = end - 1
    } else if (isPartSymbol(line[col])) {
      parts.push({
        value: line[col],
        start: col,
        end: col + 1,
        type: "symbol"
      })
    }
  }

  log.trace(line)
  log.trace(parts)

  return parts
}

function findEnd(line, start) {
  let end = start + 1
  while (end < line.length && txt.isDigit(line[end])) {
    end++
  }
  return end
}

function isPartSymbol(char) {
  return !(txt.isDigit(char) || txt.isLetter(char) || char === ' ' || char === '.')
}

function reducer1(schematic) {
  let sum = 0

  for (let row = 0; row < schematic.length; row++) {
    for (const candidate of schematic[row]) {
      if (candidate.type === "number") {
        if (isPartNumber(schematic, row, candidate)) {
          sum += candidate.value
          log.debug("good", candidate)
        } else {
          log.debug("bad", candidate)
        }
      }
    }
  }

  return sum
}

function reducer2(schematic) {
  let sum = 0

  log.trace("Reducing")
  for (let row = 0; row < schematic.length; row++) {
    for (const candidate of schematic[row]) {
      if (isPotentialGear(candidate)) {
        let partNumbers = findPartNumbers(schematic, row, candidate)
        log.trace("Adjacent part numbers:", partNumbers)

        if (partNumbers.length === 2) {
          sum += partNumbers[0].value * partNumbers[1].value
          log.debug("good", candidate)
        } else {
          log.debug("bad", candidate)
        }
      }
    }
  }

  return sum
}

function isPotentialGear(candidate) {
  return candidate.type === "symbol" && candidate.value === "*"
}

function findPartNumbers(schematic, row, candidate) {
  let partNumbers = []

  if (row > 0) {
    addAdjacentNumbers(schematic, row - 1, candidate, partNumbers)
  }

  addAdjacentNumbers(schematic, row, candidate, partNumbers)

  if ((row + 1) < schematic.length) {
    addAdjacentNumbers(schematic, row + 1, candidate, partNumbers)
  }

  return partNumbers
}

function addAdjacentNumbers(schematic, row, candidate, partNumbers) {
  let left = candidate.start - 1
  let right = candidate.end + 1
  log.trace("Search from", left, "to", right, "in row", schematic[row])
  schematic[row]
    .filter(part => part.type === "number")
    .filter(part => part.start < right && part.end > left)
    .filter(part => isPartNumber(schematic, row, part))
    .forEach(part => partNumbers.push(part))
}

function isPartNumber(schematic, row, candidate) {
  let valid = false;

  if (row > 0) {
    valid = valid || symbolAdjacent(schematic[row - 1], candidate)
  }

  valid = valid || symbolAdjacent(schematic[row], candidate)

  if ((row + 1) < schematic.length) {
    valid = valid || symbolAdjacent(schematic[row + 1], candidate)
  }

  return valid
}

function symbolAdjacent(row, candidate) {
  let left = candidate.start - 1
  let right = candidate.end + 1

  for (const part of row) {
    if (part.type === "symbol" && (part.start >= left && part.end <= right)) {
      return true
    }
  }

  return false
}

