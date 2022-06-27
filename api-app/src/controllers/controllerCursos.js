const Course = require('../model/modelCurso')
const User = require('../model/modelUser')
const ErrorResponse = require('../utils/errorResponse.js')

const getCursos = async (req, res, next) => {
  const options = {
    limit: parseInt(req.query.limit) || 8,
    page: parseInt(req.query.page) || 1,
    populate: [{ path: 'lessons.lesson', ref: 'Lesson' }]
  }

  try {
    const courses = await Course.paginate({ estado: true }, options)
    res.send(courses)
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500, false))
    console.error(err)
  }
}

const getCursoById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({ path: 'lessons.lesson', ref: 'Lesson' })
    res.send(course)
    return
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500, false))
    console.error(err)
  }
}

const getCursoName = async (req, res) => {
  const $regex = req.params.name;
  try {
    if (!req.params.name.length) {
      const course = await Course.find();
      res.send({info: "curso encontrado", course, success: true});
    } else {
      const course = await Course.find({ titulo: { $regex, $options: "i" } });
      if (!course.length) {
        res.status(404).send({ info: "No existe un curso con ese nombre", success: false  });
      } else {
        res.send({info: "curso encontrado", course, success: true});
      }
    }
  } catch (err) {
    res.send({ info: "Algo salio mal", err, success: false });
    console.error(err);
  }
};

const createCurso = async (req, res, next) => {
  const { body } = req
  try {
    const course = await new Course(body)
    await course.save()
    res.send(course)
  } catch (err) {
    next(new ErrorResponse('Error al crear el curso', 500, false))
    console.error(err)
  }
}

const addFavorite = async (req, res, next) => {
  const _id = req.user._id
  const { idCurso } = req.body
  try {
    const user = await User.findById(_id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    const currentCourse = user.courses.filter(c => c.course._id == idCurso)

    if (currentCourse.length && currentCourse[0].isFavorite === false) {
      currentCourse[0].set('isFavorite', true)
      await user.save()
      return res.send({ info: 'Cambio realizado', success: true, updateUser: user })
    }

    const updateUser = await User.findByIdAndUpdate(_id, {
      $push: {
        courses: {
          course: idCurso,
          isFavorite: true
        }
      }
    }, { new: true }).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    res.send({ info: 'Curso añadido exitosamente', updateUser, success: true })
  } catch (err) {
    res.status(500).send({ info: 'Algo salio mal', success: false, err })
  }
}

const removeFavorite = async (req, res, next) => {
  const _id = req.user._id
  const { idCurso } = req.body

  try {
    const user = await User.findById(_id).populate({ path: 'courses.course', ref: 'Course', populate: { path: 'lessons.lesson', ref: 'Lesson' } })
    const currentCourse = user.courses.filter(c => c.course._id == idCurso)

    if (currentCourse.length && currentCourse[0].isFavorite === true) {
      currentCourse[0].set('isFavorite', false)
      await user.save()
    }
    res.send({ info: 'Curso eliminado de favoritos exitosamente', success: true, updateUser: user })
  } catch (err) {
    next(new ErrorResponse('Error al eliminar el curso', 500, false))
  }
}

const addCourse = async (req, res) => {
  const id = req.user._id
  const { idCurso } = req.body
  try {
    const courseFavorite = await User.findById(id)
    const existeCourse = courseFavorite.courses.filter(
      (c) => c.course._id == idCurso
    )
    if (existeCourse.length) return
    const newCourseFavorite = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          courses: {
            course: idCurso,
            isFavorite: false
          }
        }
      },
      { new: true }
    )
    res.send({
      info: 'Curso añadido exitosamente',
      newCourseFavorite,
      success: true
    })
  } catch (err) {
    res.status(500).send({ info: 'Algo salio mal', success: false })
  }
}

const addVotes = async (req, res, next) => {
  const id = req.user._id
  const { idCourse, votes } = req.body
  try {
    const curso = await Course.findByIdAndUpdate(
      { _id: idCourse },
      {
        $push: {
          userVotes: {
            user: id
          },
          votes
        }
      },
      { new: true }
    )

    res.send({ info: 'Votacion exitosa', curso, success: true })
  } catch (err) {
    res.status(500).send({ info: 'Algo salio mal', success: false })
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
  addCourse
}
