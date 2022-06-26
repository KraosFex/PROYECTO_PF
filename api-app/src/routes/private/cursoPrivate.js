const { Router } = require('express')
const router = Router()

const { protect } = require('../../middleware/protect.js')
const { createCurso, addFavorite, removeFavorite, addVotes } = require('../../controllers/controllerCursos.js')
const { createLesson, getLesson } = require('../../controllers/controllerLession.js')

router.post('/', protect, createCurso)
router.post('/first', createCurso)
router.put('/favorite', protect, addFavorite)
router.put('/unfavorite', protect, removeFavorite)
router.put('/new/:id', createLesson)
router.put('/:id', protect, createLesson)
router.get('/:id/lessons', protect, getLesson)
router.put('/:id/votes', protect, addVotes)

module.exports = router
