const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')
const sendMail = require('../utils/sendEmail.js')
const crypto = require('crypto')
const { google } = require('googleapis')
const { OAuth2 } = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    await user.save()

    const token = user.generateToken()

    const message = `Bienvenido ${user.username}, ya formas parte de la gran familia de CodeLearn!`
    await sendMail({
      to: user.email,
      subject: 'Bienvenida a CodeLearn!',
      text: message
    })

    res.status(201).send({ info: 'Usuario creado exitosamente', success: true, token, user })
  } catch (err) {
    return res.status(500).send({ info: 'Ya existe una cuenta con ese gmail', success: false })
    // next(err);
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new ErrorResponse('Por favor provea un email y contraseña', 400, false))

  try {
    const user = await User.findOne({ email }).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    if (!user) return res.status(401).send({ info: 'Credenciales Invalidas', success: false })// return next(new ErrorResponse('Credenciales Invalidas', 401, false))
    if (!user.estado) return res.status(401).send({ info: 'Usuario baneado permanentemente', success: false })
    if (new Date().toString().slice(4, 24) < user.timeBanned) return res.send({ info: `Usuario baneado hasta ${user.timeBanned}`, success: false, user })
    const match = await user.matchPassword(password)

    if (!match) return res.status(401).send({ info: 'Credenciales Invalidas', success: false })// return next(new ErrorResponse('Credenciales Invalidas', 401, false))

    const token = user.generateToken()

    res.send({ info: 'Credenciales correctas', success: true, token, user })
  } catch (err) {
    return res.status(401).send({ info: 'Credenciales Invalidas', success: false })
    // next(new ErrorResponse('Error en los credenciales', 401, false))
  }
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!email) return next(new ErrorResponse('Por favor provea un email', 400))
    const resetToken = user.generateTokenResetPassword()
    await user.save()

    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`

    const message = `
      Haz solicitado un reseteo de contraseña
      Para resetear la contraseña, haga click en el siguiente enlace:
      ${resetURL}
    `

    try {
      await sendMail({
        to: user.email,
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

const resetPassword = async (req, res, next) => {

  console.log("entre pa")
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
  try {
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
    if (!user) res.status(400).send({info: 'Token invalido', success: false})
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.send({info: "contraseña cambiada", updateUser: user, success: true})
  } catch (err) {
    next(new ErrorResponse('Error al resetear la contraseña', 500, false))
  }
}

const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body

    const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

    const { email_verified, email, name, picture } = verify.payload

    const password = email + process.env.GOOGLE_SECRET

    if (!email_verified) return res.status(400).json({ info: 'Email verification failed.', success: false })

    const user = await User.findOne({ email }).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })

    if (user) {
      const match = await user.matchPassword(password)
      if (!match) return res.status(400).json({ info: 'Password is incorrect.', success: false })
      if (!user.estado) return res.status(401).send({ info: 'Usuario baneado permanentemente', success: false })
      if (new Date().toString().slice(4, 24) < user.timeBanned) return res.send({ info: `Usuario baneado hasta ${user.timeBanned}`, success: false, user })

      const token = user.generateToken()

      res.send({ info: 'Login success!', success: true, token, user })
    } else {
      const newUser = new User({
        username: verify.payload.sub[3] + name, name, email, password, Image: picture
      })

      await newUser.save()

      const token = newUser.generateToken()

      res.send({ info: 'Credenciales correctas', success: true, token, user: newUser })
    }
  } catch (err) {
    return res.status(500).json({ info: err.message, success: false })
  }
}

module.exports = {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  googleLogin
}
