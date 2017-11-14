const makeResult = (message, result) => {
  return {
    code: 10000,
    message,
    result,
  }
}

module.exports = makeResult