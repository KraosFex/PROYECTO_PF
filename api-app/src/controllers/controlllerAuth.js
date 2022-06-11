const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/modelUser.js')

const authUser = async (req, res) => {
  //  error de tipado en la ruta!! es post, recuerden q estan enviando datos desde
  //  el frontend al backend
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).send({ info: 'Datos invalidos user o pass not found' })
    const validPass = await bcrypt.compareSync(password, user.password)
    if (!validPass) return res.status(404).send({ info: 'Datos invalidos user o pass not found' })
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1d' })
    res.send({ info: 'Usuario autenticado', token, user })
  } catch (err) {
    res.send({ info: 'Error al autenticar el usuario', err })
    console.log(err)
  }
}

module.exports = {
  authUser
}
