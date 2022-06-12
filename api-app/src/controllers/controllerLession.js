const Lesson = require('../model/modelLesson')
const Curso = require('../model/modelCurso')

const createLesson = async (req, res) => {
  const { lesson } = req.body
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create(lesson)
    course.lessons.push(newLesson._id)
    await newLesson.save()
    res.send({ info: 'Curso creado exitosamente', newLesson })
  } catch (err) {
    res.send({ info: 'Error al crear la leccion', err })
    console.log(err)
  }
}

module.exports = {
  createLesson
}
