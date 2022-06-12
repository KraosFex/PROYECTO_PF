const Lesson = require('../model/modelLesson')
const { lessonSchema } = require('../utils/validate')
const Curso = require('../model/modelCurso')

const createLesson = async (req, res) => {
  const { lesson } = req.body
  const { error } = lessonSchema.validate(lesson)
  if (error) return res.status(400).send(error.details[0].message)
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const lesson = await Lesson.create(req.body.lesson)
    course.lessons.push(lesson._id)
    await lesson.save()
    res.send({ info: 'Curso creado exitosamente', lesson })
  } catch (err) {
    res.send({ info: 'Error al crear la leccion', err })
    console.log(err)
  }
}

module.exports = {
  createLesson
}
