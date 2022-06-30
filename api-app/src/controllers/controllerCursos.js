const { isObjectIdOrHexString } = require("mongoose");
const Course = require("../model/modelCurso");
const Lesson = require('../model/modelLesson')
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const getCursos = async (req, res, next) => {

  const limit = parseInt(req.query.limit) || 8
  const page = parseInt(req.query.page) || 1

  try {

    const courses = await Course.paginate({ estado: true }, { limit, page })
    res.send(courses)
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoById = async (req, res, next) => {
  try {
    const course = await Course.findById({ _id: req.params.id }).populate({ path: 'lessons.lesson' });
    res.send(course);
    return;
  } catch (err) {
    // next(new ErrorResponse("Error al encontrar el curso", 500, false));
    console.error(err);
  }
};

const getCursoName = async (req, res, next) => {
  const $regex = req.params.name;
  try {
    const course = await Course.find({ titulo: { $regex, $options: "i" } });
    if (!course.length) {
      next(new ErrorResponse("Error al este curso no existe el curso", 404, false));
    } else {
      res.send(course);
    }
  } catch (err) {
    next(new ErrorResponse("Error al encontrar el curso", 500, false));
    console.error(err);
  }
};

const createCurso = async (req, res, next) => {
  const { body, lessons } = req.body;
  try {
    const curso = await Course.find({ titulo: body.titulo });
    if (curso.length) {
      res.send(curso);
    }
    if (!curso.length) {
      const course = await new Course(body);
      await course.save();
      if (lessons.length !== 0) {
        lessons.map(async (e) => {
          let id = await Lesson.create(e);
          await Course.findByIdAndUpdate(course._id,
            {
              $push: {
                lessons: {
                  lesson: { _id: id._id },
                }
              }
            }
          );
          isLocked = true;
        }
        )
        return res.send(course)
      }
      else { res.send(course); }
    }
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const addFavorite = async (req, res, next) => {
  const { idUser, idCurso } = req.body;
  try {
    const usuario = await User.findById({ _id: idUser });
    let filter = usuario.courses.filter(e => e.course !== null)
    let find = filter.find(e => e.course._id.toString() === idCurso);
    if (find) {
      let correccion = usuario.courses.map(e => { if (e.course._id.toString() === idCurso) { e.isFavorite = true; return e } return e })
      const user = await User.findByIdAndUpdate(
        { _id: idUser },
        { courses: correccion },
        { new: true }
      );
      res.send({ info: "Curso modificado exitosamente", user, success: true }).end();
    }
    if (!find) {
      const user = await User.findByIdAndUpdate(
        { _id: idUser },
        {
          $push: {
            courses: {
              course: { _id: idCurso },
              isFavorite: true,
            },
          },
        },
        { new: true }
      );
      res.send({ info: "Curso añadido exitosamente", user, success: true });
    }


  } catch (err) {
    console.log(err)
    next(new ErrorResponse("Error al añadir favorito el curso", 500, false));
  }
};

const add = async (req, res, next) => {
  const { idUser, idCurso } = req.body;
  try {
    const usuario = await User.findById({ _id: idUser });
    let filter = usuario.courses.filter(e => e.course !== null)
    let find = filter.find(e => e.course._id.toString() === idCurso);
    if (find) {
      res.send({ info: "Curso ya existente", user: usuario, success: false }).end();
    }
    if (!find) {
      const user = await User.findByIdAndUpdate(
        { _id: idUser },
        {
          $push: {
            courses: {
              course: { _id: idCurso },
            },
          },
        },
        { new: true }
      );
      res.send({ info: "Curso añadido exitosamente", user, success: true });
    }


  } catch (err) {
    console.log(err)
    next(new ErrorResponse("Error al añadir favorito el curso", 500, false));
  }
};

const removeFavorite = async (req, res, next) => {
  const { idUser, idCurso } = req.body;

  try {
    const usuario = await User.findById({ _id: idUser })
    let filter = usuario.courses.filter(e => e.course !== null)
    let filtrado = filter.map(e => { if (e.course._id.toString() === idCurso) { e.isFavorite = false } return e })
    const eliminado = await User.findByIdAndUpdate(
      { _id: idUser },
      { courses: filtrado },
      { new: true }
    );

    res.send({ info: "Curso eliminado exitosamente", user: eliminado, success: true });
  } catch (err) {
    next(new ErrorResponse("Error al eliminar el curso", 500, false));
  }
};

const addVotes = async (req, res, next) => {
  const { idCurso, idUser, votes, calificacion } = req.body;
  try {
    const curso = await Course.findByIdAndUpdate(
      { _id: idCurso },
      {
        $push: {
          userVotes: {
            user: idUser,
          },
          votes,
        }, calificacion
      },
      { new: true }
    );
    res.send({ info: "Votacion exitosa", curso, success: true });
  } catch (err) {
    console.log(err)
    next(new ErrorResponse("Error al votar el curso", 500, false));
  }
};

const isCompletedCourse = async (req, res) => {
  const { idUser, idCurso } = req.body
  try {
    const usuario = await User.findById({ _id: idUser });
    let filter = usuario.courses.filter(e => e.course !== null)
    let correccion = filter.map((e) => {
      if (e.course._id.toString() === idCurso) {
        e.completed = true;
        return e
      }
      return e
    })
    var user = await User.findByIdAndUpdate(
      { _id: idUser },
      { courses: correccion },
      { new: true }
    );
    res.send({ info: "Curso modificado exitosamente", user, success: true }).end();

  } catch (err) {
    console.log(err)
    next(new ErrorResponse("Error al añadir el complete", 500, false));
  }
}
module.exports = {
  getCursos,
  getCursoById,
  createCurso,
  getCursoName,
  addFavorite,
  removeFavorite,
  addVotes,
  add,
  isCompletedCourse
};
