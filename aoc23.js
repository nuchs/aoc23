import errors from './errors.js'
import log from './log.js'
import utils from './utils.js'

function main(spec) {
  try {
    log.separator()
    log.info()
    log.info(`  Day ${spec.day}`)
    log.info()

    log.info('  Part 1')
    const result1 = spec.part1(spec.file)
    log.info('  \\_____', result1)
    log.info()

    log.info('  Part 2')
    const result2 = spec.part2(spec.file)
    log.info('  \\_____', result2)
    log.info()

    log.separator()
  } catch (e) {
    log.info()
    log.error(' ', errors.from(e))
    log.info()
    log.separator()
  }
}

let spec = utils.processCommandLine()
main(spec)
