
const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const getUsers = async (req, res, next) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.send({ info: 'No tienes permisos para ver los usuarios' })
  const limit = parseInt(req.query.limit) || 8
  const page = parseInt(req.query.page) || 1
  try {
    const users = await User.paginate({ estado: true }, { limit, page })
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
  const { username } = req.body
  try {
    const user = await User.find({ username: { $regex: username, $options: 'i' } })
    if (!user.length) return next(new ErrorResponse('Error al obtener el usuario', 500, false))
    res.send(user)
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
  }
}

const editUsername = async (req, res, next) => {
  const { id } = req.params
  const { username } = req.body
  try {
    const user = await User.findByIdAndUpdate(id, { username }, { new: true })
    if (!user) return next(new ErrorResponse('Error al obtener el usuario', 500, false))
    res.send(user)
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
  }
}
module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  editUsername
}
