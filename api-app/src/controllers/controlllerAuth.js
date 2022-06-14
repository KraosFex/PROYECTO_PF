
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')
const sendMail = require('../utils/sendEmail.js')

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
  if (!email || !password) return next(new ErrorResponse('Por favor provea un email y contraseña', 400, false))
  try {
    const user = await User.findOne({ email })
    if (!user) return next(new ErrorResponse('Credenciales Invalidas', 401, false))

    const match = await user.matchPassword(password)
    if (!match) return next(new ErrorResponse('Credenciales Invalidas', 401, false))

    const token = user.generateToken()
    res.send({ info: 'Credenciales correctas', success: true, token, user })
  } catch (err) {
    next(new ErrorResponse('Error en los credenciales', 401, false))
  }
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!email) return next(new ErrorResponse('Por favor provea un email', 400))
    const resetToken = user.generateTokenResetPassword()
    await user.save()

    const resetURL = `http://localhost:${process.env.PORT}/passwordreset/${resetToken}`

    const message = `
      <h1>HAz solicitado un reseteo de contraseña</h1>
      <p>Para resetear la contraseña, haga click en el siguiente enlace:</p>
      <a href="${resetURL}" clicktracking=off>${resetURL}</a>
    `
    try {
      await sendMail({
        email: user.email,
        subject: 'Reseteo de contraseña',
        text: message
      })

      res.send({ info: 'Se ha enviado un email con instrucciones para resetear la contraseña', success: true })
    } catch (err) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()
      return next(new ErrorResponse('Error al enviar el email', 500, false))
    }
  } catch (err) {
    next(new ErrorResponse('Error al enviar el correo', 500, false))
  }
}

const resetPassword = async (req, res) => { }

module.exports = {
  registerUser,
  login,
  forgotPassword,
  resetPassword
}
