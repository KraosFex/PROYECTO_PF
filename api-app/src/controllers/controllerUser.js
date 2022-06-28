const User = require('../model/modelUser.js')
const ErrorResponse = require('../utils/errorResponse.js')

const getUsers = async (req, res, next) => {
  const { isAdmin } = req.user
  if (!isAdmin) {
    return res.send({
      info: 'No tienes permisos para ver los usuarios',
      success: false
    })
  }
  const options = {
    populate: [{ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } }],
    limit: parseInt(req.query.limit) || 8,
    page: parseInt(req.query.page) || 1
  }
  try {
    const users = await User.paginate({ estado: true }, options)
    res.send({
      info: 'Todos lo usuarios enviados',
      users,
      success: true
    })
  } catch (err) {
    res
      .status(500)
      .send({ info: 'Error al realizar la peticion', success: false })
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    if (!user) { return next(new ErrorResponse('Error al obtener el usuario', 500, false)) }
    res.send(user)
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
    console.log(err)
  }
}

const getUsersByName = async (req, res, next) => {
  const { username } = req.query
  try {
    const user = await User.find({
      username: { $regex: username, $options: 'i' }
    }).populate({ path: 'courses.course', ref: 'Course' }).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    if (!user.length) { return next(new ErrorResponse('Error al obtener el usuario', 500, false)) }
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
    if (!user) { return next(new ErrorResponse('Error al obtener el usuario', 500, false)) }
    res.send(user)
  } catch (err) {
    next(new ErrorResponse('Error al obtener el usuario', 500, false))
  }
}

const editImage = async (req, res, next) => {

  const  id  = req.user._id
  const { url } = req.body

  try {
    const user = await User.findByIdAndUpdate(id, { Image: url }, { new: true })

    if (!user) { return res.status(404).send({info: "usuario no encontrado", success: false}) }
    const updateUser = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    res.send({info: "imagen de perfil actualizado", success: true, updateUser})
  } catch (err) {
    res.status(500).send({info: "Algo salio mal", success: false, err})
  }
}

const overallPosition = async (req, res) => {
  const { id } = req.params
  try {
    const allUsers = await User.find()
    const sorted = allUsers.filter(element => element.courses.length > 0)
      .slice(0, 5).sort((a, b) => {
      return (
        a.courses?.map((c) => {
          // cursos
          return c.lesson?.filter((l) => l.isCompleted === true) // lecciones completas
        }).length +
        34 -
        (b.courses?.map((c) => {
          return c.lesson?.filter((l) => l.isCompleted === true)
        }).length +
          34)
      )
    })

    const response = sorted.findIndex((u) => u.id === id) // Posicion dentro del arreglo
    res.send({ info: 'Proceso completado con exito', response, success: true }) // 😄
  } catch (err) {
    res.status(500).send({ info: 'Algo salio mal', success: false })
  }
}

const topFive = async (req, res) => {
  try {
    const allUsers = await User.find()
    const sorted = allUsers.filter(element => element.courses.length > 0)
      .slice(0, 5).sort((a, b) => {
      return (
        a.courses?.map((c) => {
          // cursos
          return c.lesson?.filter((l) => l.isCompleted === true) // lecciones completas
        }).length +
        34 -
        (b.courses?.map((c) => {
          return c.lesson?.filter((l) => l.isCompleted === true)
        }).length +
          34)
      )
    })
    res.send({ info: 'Proceso completado con exito', sorted, success: true }) // 😄
  } catch (err) {
    res.status(500).send({ info: 'Algo salio mal', success: false })
  }
}

const editIsAdmin = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) {
    return res
      .status(401)
      .send({
        info: 'No tienes permisos para acceder a esta ruta',
        success: false
      })
  }
  try {
    const { id, change } = req.body
    await User.findByIdAndUpdate(id, {
      isAdmin: change
    })
    res.send({ info: 'Estado isAdmin cambiado', success: true })
  } catch {
    res.status(500).send({ info: 'Algo salio mal', success: false })
  }
}

const deleteUser = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) {
    return res
      .status(401)
      .send({
        info: 'No tienes permisos para acceder a esta ruta',
        success: false
      })
  }
  try {
    const { id } = req.body
    const userDB = await User.findById(id)
    if (!userDB) {
      return res
        .status(404)
        .send({ info: 'Usuario no encontrado', success: false })
    }
    await User.findByIdAndDelete(id)
    res.send({ info: 'Usuario eliminado', success: true })
  } catch {
    res.status(500).send({ info: 'Algo salio mal', success: false })
  }
}

const banUsers = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.status(401).send({ info: 'No tienes permisos para acceder a esta ruta', success: false })
  try {
    const { id, fecha } = req.body
    await User.findByIdAndUpdate(id, {
      timeBanned: fecha
    }, { new: true })
    res.send({ info: 'Usuario baneado', success: true })
  } catch {
    res.status(500).send({ info: 'Error al intentar banear al usuario', success: false })
  }
}

const permaBanUsers = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.status(401).send({ info: 'No tienes permisos para acceder a esta ruta', success: false })
  try {
    const { id } = req.body
    await User.findByIdAndUpdate(id, {
      estado: false
    })
    res.send({ info: 'Usuario baneado permanentemente', success: true })
  } catch {
    res.status(500).send({ info: 'Error al intentar banear al usuario', success: false })
  }
}

const isPremium = async (req, res) => {
  const id = req.user._id
  try {
    const user = await User.findByIdAndUpdate(id, { isPremium: true })
    res.send({ info: 'Felicidades ahora eres Premium', updateUser: user, success: true })
  } catch {
    res.status(500).send({ info: 'Error al realizar esta accion', success: false })
  }
}


module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  editUsername,
  overallPosition,
  topFive,
  editIsAdmin,
  deleteUser,
  banUsers,
  permaBanUsers,
  isPremium,
  editImage

}
