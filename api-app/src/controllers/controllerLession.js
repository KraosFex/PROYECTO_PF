const Lesson = require("../model/modelLesson");
const Curso = require("../model/modelCurso");
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const createLesson = async (req, res, next) => {
  try {
    const course = await Curso.findById(req.params.id);
    if (!course) return res.send({ info: "El curso no existe" });
    const newLesson = await Lesson.create(req.body);
    const curso = await Curso.findByIdAndUpdate(req.params.id, {
      $push: { lessons: newLesson },
    });
    console.log("soy el curso " + course)
    if (curso.lessons[0]._id === newLesson._id) {
      curso.lessons[0].isLocked = false;
    }
    res.send({ info: "Curso creado exitosamente", newLesson });
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
    res.status(500).send({ info: "Error al obtener la clase", err, success: false });
  }
};

const isCompleted = async (req, res) => {
  const id = req.user._id;
  const idLesson = req.body;
  const idCourse = req.body;
  try {
    const user = await User.findById(id);
    const currentCourse = user.courses.filter((c) => c._id == idCourse);
    currentCourse.lessons[idLesson].isCompleted = true;
    const currentIndex = currentCourse.lessons.indexOf(idLesson);
    if (currentIndex < currentCourse.lessons.length) {
      const index = currentIndex + 1;
      currentCourse.lessons[index].isLocked = false;
    }
    if (currentIndex === currentCourse.lessons.length) {
      currentCourse.completed = true;
    }
  } catch (err) {
    res
      .status(500)
      .send({ info: "Error al obtener la consulta", err, success: false });
  }
};

module.exports = {
  createLesson,
  getLesson,
  isCompleted,
};
