const Lesson = require('../model/modelLesson')
const Curso = require('../model/modelCurso')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  const { titulo, descripcion, num } = req.body
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create({ titulo, descripcion, num })
    await Curso.findByIdAndUpdate(req.params.id, {
      $push: { lessons: newLesson }
    })
    res.send({ info: 'Curso creado exitosamente', newLesson })
  } catch (err) {
    next(new ErrorResponse(err, 500))
  }
}

const getLesson = async (req, res, next) => {
  const { id } = req.params
  try {
    const lesson = await Lesson.findById(id)

    res.send({ info: 'Clase obtenida correctamente', lesson })
  } catch (err) {
    next(new ErrorResponse('Error al obtener la clase', 500))
  }
}

module.exports = {
  createLesson,
  getLesson
}
