
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

const overallPosition = async (req, res) => {
  const { id } = req.params
  const limit = parseInt(req.query.limit) || 8
  const page = parseInt(req.query.page) || 1
  try {
    const allUsers = await User.paginate({ estado: true }, { limit, page })
    const sorted = allUsers.sort((a,b) => {
      return (a.courses.map(c => { // cursos
        return c.lesson.filter(l => l.isCompleted === true) //lecciones completas
      }).length + 34)
      -
      (b.courses.map(c => {
        return c.lesson.filter(l => l.isCompleted === true)
      }).length + 34)
    }) // ordenado
    const response = sorted.findIndex(u => u.id === id) //Posicion dentro del arreglo
    res.send(response) // :D
  } catch (err) {
    next(new ErrorResponse('Algo salio mal', 500, false))
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  editUsername,
  overallPosition
}
