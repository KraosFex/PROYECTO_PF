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
    newLesson.lessons[0].isLocked = false
    res.send({ info: 'Curso creado exitosamente', newLesson })
  } catch (err) {
    next(new ErrorResponse(err, 500))
  }
}

const getLesson = async (req, res, next) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id)

    res.send({ info: "Clase obtenida correctamente", lesson, success: true });
  } catch (err) {
    res.status(500).send({ info: "Error al obtener la clase", err, success: false });
  }
}

const isCompleted = async (req, res) => {
  const id = req.user._id
  const { idLesson, idCourse } = req.body

  try {
    console.log("aca")
    const user = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    console.log("aca 1")
    const currentCourse = user.courses.filter(c => c.course._id == idCourse)
      console.log("aca 2", idLesson)
    const currentLesson = currentCourse[0].course.lessons.filter(l => l.lesson._id == idLesson)
    console.log("aca 3", currentLesson[0].lesson)
    currentLesson[0].lesson.set("isCompleted", true)

    console.log("aca 4")
    const currentIndex = currentCourse[0].course.lessons.findIndex(l => l.lesson._id == idLesson)
    console.log("aca 5")
    const nextIndex = currentIndex + 1;
    console.log("aca 6")
    if (currentCourse[0].course.lessons[nextIndex].length) {
      currentCourse[0].course.lessons[nextIndex].lesson.set("isLocked", false)
      console.log("aca 7")
    }
  console.log("aca 8")
  console.loG()
    for(const lesson of currentCourse.lessons){
      console.log("aca 9")
      if(lesson.lesson.isCompleted === false) {
        currentCourse[0].course.set("completed", false)
        await user.save();
        const updateUser = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } });
        res.send({info: "curso completado", success: true, updateUser, nextLessonId: currentCourse[0].course.lessons[nextIndex]._id})
      }
    }
    console.log("aca afuera 1")
      currentCourse[0].course.set("completed", true)
      await user.save();
      const updateUser = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } });
      res.send({info: "curso completado", success: true, updateUser, nextLessonId: currentCourse[0].course.lessons[nextIndex]._id})


  } catch (err) {
    res
      .status(500)
      .send({ info: 'Error al obtener la consulta', err, success: false })
  }
}

module.exports = {
  createLesson,
  getLesson,
  isCompleted
}
