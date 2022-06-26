const { Router } = require('express')
const router = Router()

const { protect } = require('../../middleware/protect.js')
const { createCurso, addFavorite, removeFavorite, addVotes, addCourse } = require('../../controllers/controllerCursos.js')
const { createLesson, getLesson, isCompleted } = require('../../controllers/controllerLession.js')

router.post('/', protect, createCurso)
router.put('/favorite/initcourse', protect, addCourse)
router.put('/unfavorite', protect, removeFavorite)
router.put('/iscompleted', protect, isCompleted)
router.put('/:id/votes', protect, addVotes)
router.put('/:id', protect, createLesson)
router.get('/:id/lessons', protect, getLesson)
router.put('/:id/favorite', protect, addFavorite)

module.exports = router
