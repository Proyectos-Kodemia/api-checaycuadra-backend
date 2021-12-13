const logErrors = (error, request, response, next) => {
  console.error(error)
  next(error)
}

const errorHandler = (error, request, response, next) => {
  console.log('Middleware errores', response)

  response.status(500).json({
    message: error.message,
    stack: error.stac
  })
}

module.exports = { logErrors, errorHandler }
