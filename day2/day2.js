import file from '../file.js'
import txt from '../txt.js'
import log from '../log.js'

export default { part1, part2 }

const tokenTypes = {
  EOF: "EOF",
  GAME: "GAME",
  COLON: ":",
  NUMBER: "INT",
  COLOUR: "COLOUR",
  COMMA: ",",
  SEMICOLON: ";",
}

function part1(input) {
  const records = file.parseLines(input, parser)
  return reducer1(records, { MaxRed: 12, MaxBlue: 14, MaxGreen: 13 })
}

function reducer1(records, limits) {
  return records.filter(r => checkLimits(r, limits)).reduce((a, r) => a + r.Game, 0)
}

function checkLimits(game, limits) {
  let result = game.MinRed <= limits.MaxRed &&
    game.MinBlue <= limits.MaxBlue &&
    game.MinGreen <= limits.MaxGreen
  return result
}

function part2(input) {
  const records = file.parseLines(input, parser)
  return reducer2(records)
}

function reducer2(records) {
  return records.reduce((a, r) => a + (r.MinRed * r.MinBlue * r.MinGreen), 0)
}

function parser(line) {
  log.debug(line)

  const lex = new Lexer(line)
  let tok = lex.nextToken()
  let record = {
    Game: NaN,
    MinRed: 0,
    MinBlue: 0,
    MinGreen: 0
  }

  while (tok.type !== tokenTypes.EOF) {

    if (tok.type === tokenTypes.GAME) {
      const idTok = lex.nextToken()
      if (idTok.type !== tokenTypes.NUMBER) {
        throw new Error(`Expected a number, got ${idTok.type} instead`)
      }
      record.Game = Number(idTok.literal)
    } else if (tok.type === tokenTypes.NUMBER) {
      const colourTok = lex.nextToken()
      if (colourTok.type !== tokenTypes.COLOUR) {
        throw new Error(`Expected a colour, got ${colourTok.type} instead`)
      }
      const amount = Number(tok.literal)
      update(record, colourTok.literal, amount)
    }

    tok = lex.nextToken()
  }

  log.debug(record)

  return record
}

function update(record, colour, amount) {
  switch (colour) {
    case "red":
      if (amount > record.MinRed) {
        record.MinRed = amount
      }
      break
    case "blue":
      if (amount > record.MinBlue) {
        record.MinBlue = amount
      }
      break
    case "green":
      if (amount > record.MinGreen) {
        record.MinGreen = amount
      }
      break
  }
}

class Lexer {
  constructor(line) {
    this.input = line
    this.position = 0
    this.readPosition = 0
    this.ch = ''

    this.readChar()
  }

  nextToken() {
    this.skipWhitespace()
    let tok = {}

    switch (this.ch) {
      case ':':
        tok.type = tokenTypes.COLON
        tok.literal = this.ch
        break
      case ',':
        tok.type = tokenTypes.COMMA
        tok.literal = this.ch
        break
      case ';':
        tok.type = tokenTypes.SEMICOLON
        tok.literal = this.ch
        break
      case -1:
        tok.type = tokenTypes.EOF
        break
      default:
        if (txt.isDigit(this.ch)) {
          tok.type = tokenTypes.NUMBER
          tok.literal = this.readNumber()
        } else if (txt.isLetter(this.ch)) {
          tok.literal = this.readString()
          tok.type = tok.literal === "game" ? tokenTypes.GAME : tokenTypes.COLOUR
        } else {
          throw new Error(`Invalid character: ${this.ch}`)
        }
        break
    }

    this.readChar()
    log.trace(`Token: {type: ${tok.type},\tliteral: ${tok.literal}}`)
    return tok
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = -1
    } else {
      this.ch = this.input[this.readPosition]
    }
    this.position = this.readPosition
    this.readPosition += 1
  }

  skipWhitespace() {
    while (this.ch === ' ' || this.ch === '\t') {
      this.readChar()
    }
  }

  readNumber() {
    let position = this.position
    while (txt.isDigit(this.ch)) {
      this.readChar()
    }
    return this.input.substring(position, this.position)
  }

  readString() {
    let position = this.position
    while (txt.isLetter(this.ch)) {
      this.readChar()
    }
    return this.input.substring(position, this.position).toLowerCase()
  }
}



