const Course = require("../model/modelCurso");
const User = require("../model/modelUser");
const ErrorResponse = require("../utils/errorResponse.js");

const getCursos = async (req, res, next) => {
  const options = {
    limit: parseInt(req.query.limit) || 8,
    page: parseInt(req.query.page) || 1,
    populate: [{ path: "lessons.lesson", ref: "Lesson" }],
  };

  try {
    const courses = await Course.paginate({ estado: true }, options);
    res.send(courses);
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "lessons.lesson",
      ref: "Lesson",
    });
    res.send(course);
    return;
  } catch (err) {
    next(new ErrorResponse("Error al crear el curso", 500, false));
    console.error(err);
  }
};

const getCursoName = async (req, res) => {
  const $regex = req.params.name;
  try {
    if (!req.params.name.length) {
      const course = await Course.find();
      res.send({ info: "curso encontrado", course, success: true });
    } else {
      const course = await Course.find({ titulo: { $regex, $options: "i" } });
      if (!course.length) {
        res
          .status(404)
          .send({ info: "No existe un curso con ese nombre", success: false });
      } else {
        res.send({ info: "curso encontrado", course, success: true });
      }
    }
  } catch (err) {
    res.send({ info: "Algo salio mal", err, success: false });
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
  const _id = req.user._id;
  const { idCurso } = req.body;
  try {
    const user = await User.findById(_id).populate({
      path: "courses.course",
      ref: "Course",
      populate: { path: "lessons.lesson", ref: "Lesson" },
    });
    const currentCourse = user.courses.filter((c) => c.course._id == idCurso);

    if (currentCourse.length && currentCourse[0].isFavorite === false) {
      currentCourse[0].set("isFavorite", true);
      await user.save();
      return res.send({ info: "Cambio realizado", updateUser: user });
    }

    if (currentCourse.length && currentCourse[0].isFavorite === true) {
      return res.send({
        info: "El curso ya esta en favoritos",
        updateUser: user,
      });
    }

    const course = await Course.findById(idCurso);
    const currentLessons = course.lessons.map((l) => {
      const item = { lesson: l.lesson, isCompleted: false, isLocked: true };
      return item;
    });
    currentLessons[0].isLocked = false;

    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite: true,
            lessons: currentLessons,
          },
        },
      },
      { new: true }
    ).populate({
      path: "courses.course",
      ref: "Course",
      populate: { path: "lessons.lesson", ref: "Lesson" },
    });

    const inscripUser = await Course.findByIdAndUpdate(
      idCurso,
      { $inc: { userInscript: 1 } },
      { new: true }
    );
    await updateUser.save();

    res.send({
      info: "Curso añadido exitosamente",
      updateUser,
      success: true,
    });
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false, err });
  }
};

const removeFavorite = async (req, res, next) => {
  const _id = req.user._id;
  const { idCurso } = req.body;

  try {
    const user = await User.findById(_id).populate({
      path: "courses.course",
      ref: "Course",
      populate: { path: "lessons.lesson", ref: "Lesson" },
    });
    const currentCourse = user.courses.filter((c) => c.course._id == idCurso);

    if (currentCourse.length && currentCourse[0].isFavorite === true) {
      currentCourse[0].set("isFavorite", false);
      await user.save();
    }
    res.send({
      info: "Curso eliminado de favoritos exitosamente",
      success: true,
      updateUser: user,
    });
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
    const course = await Course.findById(idCurso);
    const currentLessons = course.lessons.map((l) => {
      const item = { lesson: l.lesson, isCompleted: false, isLocked: true };
      return item;
    });
    currentLessons[0].isLocked = false;

    const newCourseFavorite = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite: true,
            lessons: currentLessons,
          },
        },
      },
      { new: true }
    );

    const inscripUser = await Course.findByIdAndUpdate(
      idCurso,
      {
        $inc: { userInscript: 1 },
      },
      { new: true }
    );

    res.send({
      info: "Curso añadido exitosamente",
      updateUser: newCourseFavorite,
      success: true,
    });
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

const addVotes = async (req, res) => {
  const idUser = req.user._id;
  const { idCourse, votes } = req.body;
  console.log(req.body);
  try {
    const currentCourse = await Course.find({
      "userVotes.user": idUser,
    }).populate({
      path: "userVotes.user",
      ref: "Course",
      select: "_id userName",
    });
    if (!currentCourse.length) {
      const newCourseVote = await Course.findByIdAndUpdate(idCourse, {
        $push: {
          userVotes: {
            user: idUser,
          },
          votes,
        },
      });
      return res.send({
        info: "Votacion exitosa",
        newCourseVote,
        success: true,
      });
    }

    const currentIndex = currentCourse[0].userVotes.findIndex(
      (v) => v.user._id.toString() === idUser.toString()
    );
    currentCourse[0].votes[currentIndex] = votes;
    currentCourse[0].save();
    res.send({ info: "Votacion exitosa", currentCourse, success: true });
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false });
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
