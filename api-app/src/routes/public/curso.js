const { Router } = require('express')
const router = Router()

const {
  getCursos,
  getCursoName
} = require('../../controllers/controllerCursos.js')

router.get('/', getCursos)
router.get('/:name', getCursoName)

module.exports = router
