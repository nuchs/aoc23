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

let logLevel = INFO_LEVEL

function trace() {
  if (logLevel >= TRACE_LEVEL) {
    console.log('     |', Cyan, ...arguments, Reset)
  }
}

function debug() {
  if (logLevel >= DEBUG_LEVEL) {
    console.log('     |', Green, ...arguments, Reset)
  }
}

function info() {
  if (logLevel >= INFO_LEVEL) {
    console.log('  ', ...arguments)
  }
}

function error() {
  console.log(Bold, Red, '  ', ...arguments, Reset)
}

function separator() {
  console.log(Bold, Blue, '+------------------------------------------+', Reset)
}

function setLevel(level) {
  logLevel = level
}
