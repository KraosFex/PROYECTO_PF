const { Router } = require('express')
const router = Router()
const { protect } = require('../../middleware/protect.js')
const { createCurso, addFavorite, removeFavorite, addVotes } = require('../../controllers/controllerCursos.js')
const { createLesson } = require('../../controllers/controllerLession.js')

router.post('/', protect, createCurso)
router.put('/:id', protect, createLesson)
router.put('/:id/favorite', protect, addFavorite)
router.put('/:id/unfavorite', protect, removeFavorite)
router.put('/:id/votes', protect, addVotes)

module.exports = router
