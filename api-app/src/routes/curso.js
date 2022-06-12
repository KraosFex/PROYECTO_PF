const { Router } = require('express')
const router = Router()

const {
  getCursos,
  createCurso,
  getCursoName
} = require('../controllers/controllerCursos.js')
const { createLesson } = require('../controllers/controllerLession.js')

router.get('/', getCursos)
router.get('/:name', getCursoName)
router.post('/', createCurso)
router.put('/:id', createLesson)

module.exports = router
