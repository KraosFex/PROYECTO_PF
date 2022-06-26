const Lesson = require('../model/modelLesson')
const Curso = require('../model/modelCurso')
const User = require('../model/modelUser')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create(req.body)
    const curso = await Curso.findByIdAndUpdate(req.params.id, {
      $push: {
        lessons: {
          lesson: newLesson
        }
      }
    })
    curso.lessons[0].isLocked = false
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

const isCompleted = async (req, res) => {
  const id = req.user._id
  const { idLesson, idCourse } = req.body
  try {
    const user = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    const currentCourse = user.courses.filter(c => c.course._id == idCourse)
    const currentLesson = currentCourse[0].course.lessons.filter(l => l._id == idLesson)
    currentLesson.isCompleted = true
    const currentIndex = currentCourse[0].course.lessons.findIndex(l => l._id == idLesson)
    const nextIndex = currentIndex + 1
    if (currentIndex < currentCourse[0].course.lessons.length && currentIndex !== 0) {
      currentCourse[0].course.lessons[nextIndex].isLocked = false
    }

    if (currentIndex === 0 && currentCourse[0].course.lessons.length === 1) {
      currentCourse[0].course.completed = true
    }

    res.send(user)
  } catch (err) {
    res.status(500).send({ info: 'Error al obtener la consulta', err, success: false })
  }
}

module.exports = {
  createLesson,
  getLesson,
  isCompleted
}
