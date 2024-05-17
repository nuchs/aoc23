import day1 from './day1/day1.js'
import day2 from './day2/day2.js'
import day3 from './day3/day3.js'
import day4 from './day4/day4.js'
import log from './log.js'
import fs from 'fs'
import process from 'process'

export default { processCommandLine }

const days = [
  day1,
  day2,
  day3,
  day4
]

function processCommandLine() {
  let day = NaN
  let file = undefined

  for (let i = 2; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case '--debug':
        log.setLevel(log.DEBUG_LEVEL)
        break

      case '--trace':
        log.setLevel(log.TRACE_LEVEL)
        break

      case '--file':
      case '-f':
        i++
        if (i >= process.argv.length) {
          log.error("File must be specified")
          usage()
          process.exit(1)
        }
        file = process.argv[i]
        if (!fs.existsSync(file)) {
          log.error("File does not exist")
          usage()
          process.exit(1)
        }
        break

      case '--day':
      case '-d':
        i++
        if (i >= process.argv.length) {
          log.error("Day must be specified")
          usage()
          process.exit(1)
        }
        day = process.argv[i]
        if (isNaN(day) || day < 1 || day > days.length) {
          log.error("Day must be a number between 1 & 25")
          usage()
          process.exit(1)
        }
        break

      case '--help':
      case '-h':
        usage()
        process.exit(0)
    }
  }

  return createSpec(day, file)
}

function createSpec(day, file) {
  if (isNaN(day)) {
    log.error("Day must be specified")
    usage()
    process.exit(1)
  }

  return {
    day: day,
    file: file ?? `./day${day}/input.txt`,
    part1: days[day - 1].part1,
    part2: days[day - 1].part2
  }
}

function usage() {
  log.info()
  log.info('  Usage: node aoc23.js [options]')
  log.info()
  log.info('  Options:')
  log.info('    --file, -f  Input file (default: ./<day>/input.txt)')
  log.info('    --day,  -d  Day number')
  log.info('    --help, -h  Show this help')
  log.info('    --debug,    Enable debug output')
  log.info('    --trace,    Enable trace output')
  log.info()
}


