const { Router } = require('express')
const router = Router()
const protect = require('../../middleware/protect.js')
const { createCursos } = require('../../controllers/controllerCursos.js')
const { createLesson } = require('../../controllers/controllerLession.js')

router.post('/', protect, createCursos)
router.put('/:id', protect, createLesson)

module.exports = router
