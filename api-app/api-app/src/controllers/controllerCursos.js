const Course = require('../model/modelCurso')
const { courseSchema } = require('../utils/validate.js')

const getCursos = async (req, res) => {
    try {
        const courses = await Course.find()
        res.send(courses)
        return
    } catch (err) {
        res.send({info: 'Error al obtener los cursos', err})
        console.error(err)
        return
    }
}

const getCursoId = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.send(course)
        return
    } catch (err) {
        res.send({info: 'Algo salio mal', err})
        console.error(err)
        return
    }
}

const createCurso = async (req, res) => {
    const { body } = req
    try {
        const course = await Course.create({
            titulo: body.titulo,
            descripcion: body.descripcion,
            calificacion: body.calificacion,
            imagen: body.imagen,
            userInscript: body.userInscript,
            clases: body.clases
        })
        const { error } = courseSchema.validate(body)
        if (error) return res.status(400).send(error.details[0].message)
        res.send(course)
        return
    } catch (err) {
        res.send({info: 'Error al crear el curso', err})
        console.error(err)
        return
    }
}

module.exports = {
    getCursos,
    getCursoId,
    createCurso
}
