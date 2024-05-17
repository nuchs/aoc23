import fs from 'fs'

export default { readLines, parse, parseLines }

function readLines(file) {
  const content = fs.readFileSync(file, "utf-8").trimEnd()
  return content.split(/\r?\n/)
}

function parse(items, parser) {
  return items.map(line => parser(line)).filter(x => x)
}

function parseLines(file, parser) {
  const lines = readLines(file)
  return parse(lines, parser)
}

