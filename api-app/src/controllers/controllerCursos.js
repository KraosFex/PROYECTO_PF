const Course = require('../model/modelCurso')

const getCursos = async (req, res) => {
  try {
    const courses = await Course.find()
    res.send(courses)
    return
  } catch (err) {
    res.send({ info: 'Error al obtener los cursos', err })
    console.error(err)
  }
}

const getCursoId = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.send(course)
    return
  } catch (err) {
    res.send({ info: 'Algo salio mal', err })
    console.error(err)
  }
}

const getCursoName = async (req, res) => {
  const $regex = req.params.name
  try {
    const course = await Course.find({ titulo: { $regex, $options: 'i' } })
    if (!course.length) {
      console.error('El curso no existe')
    } else {
      res.send(course)
    }
    return
  } catch (err) {
    res.send({ info: 'Algo salio mal', err })
    console.error(err)
  }
}

const createCurso = async (req, res) => {
  const { body } = req
  try {
    const course = await new Course(body)
    res.send(course)
    return
  } catch (err) {
    res.send({ info: 'Error al crear el curso', err })
    console.error(err)
  }
}

module.exports = {
  getCursos,
  getCursoId,
  createCurso,
  getCursoName
}
