const Course = require("../model/modelCurso");
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const getCursos = async (req, res, next) => {
<<<<<<< HEAD
  console.log(req.query);
  try {
    const courses = await Course.find({});
    res.send(courses);
    return;
=======

  const limit = parseInt(req.query.limit) || 8
  const page = parseInt(req.query.page) || 1
  try {
    const courses = await Course.paginate({ estado: true }, { limit, page })
    res.send(courses)
    
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.send(course);
    return;
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
    return;
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
    return;
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const addFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { idCurso, isFavorite } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite,
          },
        },
      },
      { new: true }
    );
    res.send({ info: "Curso creado exitosamente", user, success: true });
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
  }
};

const removeFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { idCursoFavorito } = req.body;
  console.log(req.params, idCursoFavorito);
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
    console.log(eliminado);
    res.send({ info: "Curso eliminado exitosamente", success: true });
  } catch (err) {
    next(new ErrorResponse("Error al eliminar el curso", 500, false));
  }
};

const addVotes = async (req, res, next) => {
  const { id } = req.params;
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
};
