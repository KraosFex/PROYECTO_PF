
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const getUsers = async (req, res, next) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.send({ info: 'No tienes permisos para ver los usuarios' })
  try {
    const users = await User.find({ estado: true })
    res.send(users)
  } catch (err) {
    next(new ErrorResponse('Error al enviar el correo', 500, false))
    console.log(err)
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) return next(new ErrorResponse('Error al obtener el usuario', 500, false))
    res.send(user)
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
    console.log(err)
  }
}

const getUsersByName = async (req, res, next) => {
  try {
    const user = await User.find({ name: { $regex: req.query, $options: 'i' } })
    if (!user.length) return next(new ErrorResponse('Error al obtener el usuario', 500, false))
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
  }
}
module.exports = {
  getUsers,
  getUserById,
  getUsersByName
}
