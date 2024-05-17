const INFO_LEVEL = 1
const DEBUG_LEVEL = 2
const TRACE_LEVEL = 3

export default {
  info,
  debug,
  trace,
  error,
  separator,
  setLevel,
  INFO_LEVEL,
  DEBUG_LEVEL,
  TRACE_LEVEL
}

const Reset = '\x1b[0m'
const Bold = '\x1b[1m'
const Red = '\x1b[31m'
const Blue = '\x1b[34m'
const Cyan = '\x1b[36m'
const Green = '\x1b[32m'
const Ident = '     |'

let logLevel = INFO_LEVEL


function trace(...args) {
  if (logLevel >= TRACE_LEVEL) {
    console.log(`${Ident}${Cyan}`, ...formatArgs(Cyan, args), Reset)
  }
}

function debug(...args) {
  if (logLevel >= DEBUG_LEVEL) {
    console.log(`${Ident}${Green}`, ...formatArgs(Green, args), Reset)
  }
}

function info(...args) {
  if (logLevel >= INFO_LEVEL) {
    console.log('  ', ...args)
  }
}

function error(...args) {
  console.log(`${Bold}${Red}`, '  ', ...args, Reset)
}

function separator() {
  console.log(`${Bold}${Blue}`, '+------------------------------------------+', Reset)
}

function setLevel(level) {
  logLevel = level
}

function formatArgs(colour, args) {
  let formatted = []

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "string") {
      formatted.push(args[i])
    } else if (typeof args[i] === "number") {
      formatted.push(args[i].toString())
    } else {
      const stringified = JSON.stringify(args[i], null, 2).split('\n')
      for (let j = 0; j < stringified.length; j++) {
        let msg = `${colour}${stringified[j]}${Reset}`
        if (j < stringified.length - 1) {
          msg = `${msg}\n${Ident}`
        }
        formatted.push(msg)
      }
    }
  }

  return formatted
}
