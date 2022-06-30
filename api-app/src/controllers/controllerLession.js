const Lesson = require("../model/modelLesson");
const Curso = require("../model/modelCurso");
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id);
    if (!course) return res.send({ info: "El curso no existe" });
    const newLesson = await Lesson.create(req.body);
    const updateCurso = await Curso.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          lessons: {
            lesson: newLesson,
          },
        },
      },
      { new: true }
    ).populate({ path: "lessons.lesson", ref: "Lesson" });

    if (updateCurso.lessons[0].lesson.isLocked === true) {
      const firstLessonId = updateCurso.lessons[0].lesson._id.toString();
      const updateLesson = await Lesson.findByIdAndUpdate(
        firstLessonId,
        {
          $set: {
            isLocked: false,
          },
        },
        { new: true }
      );
      console.log(updateLesson);
    }

    res.send({ info: "Curso creado exitosamente", updateCurso });
  } catch (err) {
    next(new ErrorResponse(err, 500));
  }
};

const getLesson = async (req, res, next) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id);

    res.send({ info: "Clase obtenida correctamente", lesson, success: true });
  } catch (err) {
    res
      .status(500)
      .send({ info: "Error al obtener la clase", err, success: false });
  }
};

const isCompleted = async (req, res) => {
  const id = req.user._id
  const { idLesson, idCourse } = req.body

  try {
    const user = await User.findById(id)

    const currentCourse = user.courses.filter(c => c.course._id == idCourse)
    console.log(currentCourse[0].lessons)
    const currentLesson = currentCourse[0].lessons.filter(l => l.lesson == idLesson)

    currentLesson[0].isCompleted = true

    const currentIndex = currentCourse[0].lessons.findIndex(l => l.lesson._id == idLesson)
    const nextIndex = currentIndex + 1

    if (currentCourse[0].lessons[nextIndex]) {
      currentCourse[0].lessons[nextIndex].isLocked = false
      user.markModified('courses')
      user.markModified('lessons')
      await user.save()
    }

    const lessonInFalse = currentCourse[0].lessons.filter(l => l.isCompleted === false)

    if (lessonInFalse.length) {
      currentCourse[0].completed = false
      user.markModified('courses')
      user.markModified('lessons')
      await user.save()
    }

    if (!lessonInFalse.length) {
      currentCourse[0].completed = true
      user.markModified('courses')
      user.markModified('lessons')
      await user.save()
    }

    user.markModified('courses')
    user.markModified('lessons')
    await user.save()

    const updateUser = await User.findById(id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })

    res.send({ info: 'lesson completada', success: true, updateUser, nextLessonId: currentCourse[0].lessons[nextIndex].lesson.toString() })
  } catch (err) {
    res
      .status(500)
      .send({ info: 'Error al obtener la consulta', err, success: false })
  }
}

module.exports = {
  createLesson,
  getLesson,
  isCompleted,
};
