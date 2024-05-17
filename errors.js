export default { from }

function from(value) {
  if (value instanceof Error) {
    return value
  }

  let stringified = "[Unable to stringify error]"
  try {
    stringified = JSON.stringify(value)
  } catch { }

  const error = new Error(`Thrown value: ${stringified}`)
  return error
}

