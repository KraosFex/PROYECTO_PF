const Curso = require('../model/modelCurso')
const User = require('../model/modelUser')
const Lesson = require('../model/modelLesson')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id)
    if (!course) return res.send({ info: 'El curso no existe' })
    const newLesson = await Lesson.create(req.body)
    const curso = await Curso.findByIdAndUpdate(req.params.id, {
      $push: { lessons: newLesson }
    })
    if (curso.lessons[0] === newLesson) {
      curso.lessons[0].isLocked = false
    }
    const all = await Curso.find()
    res.send({ info: 'Curso creado exitosamente', all })
  } catch (err) {
    next(new ErrorResponse(err, 500))
  }
}
const getLesson = async (req, res, next) => {
  let id = req.params.id
  try {
    const lesson2 = await Lesson.find({_id: id})
    res.send({info: 'Clase obtenida correctamente', lesson2})
  } catch (err){
    console.log(err)
    next(new ErrorResponse('Error al obtener la clase', 500))
  }
}
const isCompleted = async (req, res) => {
  const {idLesson, idCourse, idUser} = req.body
  try {
    const user = await User.findById(idUser)
    const currentCourse = user.courses.filter(c => c._id == idCourse)
    currentCourse.lessons[idLesson].isCompleted = true
    const currentIndex = currentCourse.lessons.indexOf(idLesson)
    console.log(currentCourse)
    // if (currentIndex < currentCourse.lessons.length) {
    //   const index = currentIndex + 1
    //   currentCourse.lessons[index].isLocked = true
    // }
    // if (currentIndex === currentCourse.lessons.length) {
    //   currentCourse.completed = true
    // }
  } catch (err) {
    res.status(500).send({ info: 'Error al obtener la consulta', err, success: false })
  }
}

module.exports = {
  createLesson,
  getLesson,
  isCompleted
}