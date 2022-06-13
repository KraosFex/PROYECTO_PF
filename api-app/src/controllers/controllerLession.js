const Lesson = require('../model/modelLesson')
const Curso = require('../model/modelCurso')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  const { lesson } = req.body
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create(lesson)
    course.lessons.push(newLesson._id)
    await newLesson.save()
    res.send({ info: 'Curso creado exitosamente', newLesson })
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500))
  }
}

module.exports = {
  createLesson
}
