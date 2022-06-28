const Lesson = require('../model/modelLesson')
const Curso = require('../model/modelCurso')
const User = require('../model/modelUser')
const ErrorResponse = require('../utils/errorResponse.js')

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id);
    if (!course) return res.send({ info: "El curso no existe" });
    const newLesson = await Lesson.create(req.body);
    const updateCourse = await Curso.findByIdAndUpdate(req.params.id, {
      $push: { lessons: newLesson },
    });
    updateCourse.lessons[0].lesson.isLocked = false;
    await Curso.save();
    res.send({ info: "Curso creado exitosamente", newLesson });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

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
    const user = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    const currentCourse = user.courses.filter(c => c.course._id == idCourse)
    const currentLesson = currentCourse[0].course.lessons.filter(l => l.lesson._id == idLesson)
    console.log("currentLesson", currentLesson)
    currentLesson[0].lesson.set('isCompleted', true)
    await user.save()

    const currentIndex = currentCourse[0].course.lessons.findIndex(l => l.lesson._id == idLesson)
    const nextIndex = currentIndex + 1

    if (currentCourse[0].course.lessons[nextIndex]) {
      currentCourse[0].course.lessons[nextIndex].lesson.set('isLocked', false)
      await user.save()
    }

    const lessonInFalse = currentCourse[0].course.lessons.filter(l => l.lesson.isCompleted === false)

    if (lessonInFalse.length) {
      currentCourse[0].course.set('completed', false)
      await user.save()
    }
    if (!lessonInFalse.length) {
      currentCourse[0].course.set('completed', true)
      await user.save()
    }

    const updateUser = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })

    res.send({info: "clase completada", updateUser, success: true, nextLessonId: currentCourse[0].course.lessons[nextIndex].lesson._id  })
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
