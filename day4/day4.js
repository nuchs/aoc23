import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

function part1(input) {
  const records = file.parseLines(input, parser)
  return reducer(records)
}

function part2(input) {
  const records = file.parseLines(input, parser)
  return reducer(records)
}

function parser(line) {
  return 0
}

function reducer(records) {
  return 0
}



