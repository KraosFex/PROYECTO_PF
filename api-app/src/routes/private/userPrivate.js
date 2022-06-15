const { Router } = require('express')

const { getUsers, getUsersByName, editUsername } = require('../../controllers/controllerUser')
const { protect } = require('../../middleware/protect')

const router = Router()

router.get('/', protect, getUsers)
router.get('/username', protect, getUsersByName)
router.put('/:id/profile', protect, editUsername)

module.exports = router
