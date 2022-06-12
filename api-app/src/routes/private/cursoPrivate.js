const { Router } = require('express')
const router = Router()
const { protect } = require('../../middleware/protect.js')
const { createCursos } = require('../../controllers/controllerCursos.js')

router.post('/', protect, createCursos)

module.exports = router
