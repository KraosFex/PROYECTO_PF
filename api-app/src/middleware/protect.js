const jwt = require('jsonwebtoken')
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization().split(' ')[1]
  }

  if (!token) return next(new ErrorResponse('No estas autorizado', 401))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return next(new ErrorResponse('No hay usuario con ese id', 401))
    req.user = user
    next()
  } catch (err) {
    return next(new ErrorResponse('Error al validar el token', 500))
  }
}

module.exports = protect
