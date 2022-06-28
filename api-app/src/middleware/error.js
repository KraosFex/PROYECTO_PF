const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (err.code === 11000) {
    const message = 'Campo duplicado, ya existe un registro con ese valor'
    error = new ErrorResponse(message, 400, false)
  }

  if (err.name === 'CastError') {
    const message = 'Campo invalido'
    error = new ErrorResponse(message, 400, false)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400, false)
  }

  res.status(error.statusCode || 500).send({
    info: error.message || 'Server Error', sucess: false
  })
}

module.exports = errorHandler
