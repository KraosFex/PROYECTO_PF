const Course = require('../model/modelCurso')
const User = require('../model/modelUser')
const ErrorResponse = require('../utils/errorResponse.js')

const getCursos = async (req, res, next) => {
  try {
    const courses = await Course.find()
    res.send(courses)
    return
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
    console.error(err)
  }
}

const getCursoId = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    res.send(course)
    return
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
    console.error(err)
  }
}

const getCursoName = async (req, res, next) => {
  const $regex = req.params.name
  try {
    const course = await Course.find({ titulo: { $regex, $options: 'i' } })
    if (!course.length) {
      next(new ErrorResponse('Error al crear el curso', 500))
    } else {
      res.send(course)
    }
    return
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
    console.error(err)
  }
}

const createCurso = async (req, res, next) => {
  const { body } = req
  try {
    const course = await new Course(body)
    await course.save()
    res.send(course)
    return
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
    console.error(err)
  }
}

const addFavorite = async (req, res, next) => {
  const { id } = req.params
  const { idCurso, isFavorite } = req.body
  try {
    const user = await User.findByIdAndUpdate(id, {
      $push: {
        courses: {
          course: idCurso,
          isFavorite
        }
      }
    }, { new: true })
    res.send({ info: 'Curso creado exitosamente', user, success: true })
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
  }
}

const removeFavorite = async (req, res, next) => {
  const { id } = req.params
  const { idCursoFavorito } = req.body
  console.log(req.params, idCursoFavorito)
  try {
    const eliminado = await User.findByIdAndUpdate({ _id: id }, {
      $pull: {
        courses: {
          _id: idCursoFavorito
        }
      }
    }, { new: true })
    console.log(eliminado)
    res.send({ info: 'Curso eliminado exitosamente', success: true })
  } catch (err) {
    next(new ErrorResponse('Error al eliminar el curso', 500))
  }
}

module.exports = {
  getCursos,
  getCursoId,
  createCurso,
  getCursoName,
  addFavorite,
  removeFavorite
}
