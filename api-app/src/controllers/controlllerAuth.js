
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    await user.save()
    res.status(201).send({ info: 'Usuario creado exitosamente' })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new ErrorResponse('Por favor provea un email y contraseña', 400))
  try {
    const user = await User.findOne({ email })
    if (!user) return next(new ErrorResponse('Credenciales Invalidas', 401))

    const match = await user.matchPassword(password)
    if (!match) return next(new ErrorResponse('Credenciales Invalidas', 401))

    const token = user.generateAuthToken()
    res.send({ info: 'Credenciales correctas', success: true, token, user })
  } catch (err) {
    res.status(500).send({ info: 'Error en credenciales', success: false, error: err.message })
  }
}

const forgotPassword = async (req, res) => { }

const resetPassword = async (req, res) => { }

module.exports = {
  registerUser,
  login,
  forgotPassword,
  resetPassword
}
