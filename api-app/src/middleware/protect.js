const jwt = require('jsonwebtoken')
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const protect = async (req, res, next) => {
  const { authorization } = req.headers

  let token

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }

  if (!token) return res.status(401).send({info: 'No estas autorizado', success: false})

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).send({info: 'No estas autorizado', success: false})
    req.user = user
    next()
  } catch (err) {
    res.status(500).send({info: 'Error al validar el token', success: false})
  }
}

module.exports = {
  protect
};
