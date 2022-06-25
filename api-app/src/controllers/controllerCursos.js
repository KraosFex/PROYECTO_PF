const Course = require("../model/modelCurso");
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const getCursos = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 8;
  const page = parseInt(req.query.page) || 1;

  try {
    const courses = await Course.paginate({ estado: true }, { limit, page });
    res.send(courses);
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.send(course);
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoName = async (req, res, next) => {
  const $regex = req.params.name;
  try {
    const course = await Course.find({ titulo: { $regex, $options: "i" } });
    if (!course.length) {
      next(new ErrorResponse("Error al crear el curso", 500, false));
    } else {
      res.send(course);
    }
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const createCurso = async (req, res, next) => {
  const { body } = req;
  try {
    const course = await new Course(body);
    await course.save();
    res.send(course);
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const addFavorite = async (req, res, next) => {
  const id = req.user._id;
  const { idCurso } = req.body;

  try {
    const courseFavorite = await User.findById(id);
    const existeCourse = courseFavorite.courses.filter(
      (c) => c.course._id == idCurso
    );
    if (existeCourse.length) {
      existeCourse.isFavorite = true;
    }
    const newCourseFavorite = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite: true,
          },
        },
      },
      { new: true }
    );
    res.send({
      info: "Curso añadido exitosamente",
      newCourseFavorite,
      success: true,
    });
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

const removeFavorite = async (req, res, next) => {
  const id = req.user._id;
  const { idCursoFavorito } = req.body;

  try {
    const eliminado = await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          courses: {
            _id: idCursoFavorito,
          },
        },
      },
      { new: true }
    );

    res.send({ info: "Curso eliminado exitosamente", success: true });
  } catch (err) {
    next(new ErrorResponse("Error al eliminar el curso", 500, false));
  }
};

const addCourse = async (req, res) => {
  const id = req.user._id;
  const { idCurso } = req.body;
  try {
    const courseFavorite = await User.findById(id);
    const existeCourse = courseFavorite.courses.filter(
      (c) => c.course._id == idCurso
    );
    if (existeCourse.length) return;
    const newCourseFavorite = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite: false,
          },
        },
      },
      { new: true }
    );
    res.send({
      info: "Curso añadido exitosamente",
      newCourseFavorite,
      success: true,
    });
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

const addVotes = async (req, res, next) => {
  const id = req.user._id;
  const { idUser, votes } = req.body;
  try {
    const curso = await Course.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          userVotes: {
            user: idUser,
          },
          votes,
        },
      },
      { new: true }
    );
    res.send({ info: "Votacion exitosa", curso, success: true });
  } catch (err) {
    next(new ErrorResponse("Error al votar el curso", 500, false));
  }
};

module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  getCursoName,
  addFavorite,
  removeFavorite,
  addVotes,
  addCourse,
};
