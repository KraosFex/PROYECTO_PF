const { Router } = require('express')

const { getUsers, getUsersByName, editUsername, overallPosition, editIsAdmin, deleteUser, banUsers, permaBanUsers, isPremium } = require('../../controllers/controllerUser')

const { protect } = require('../../middleware/protect')

const router = Router()

router.get('/', protect, getUsers)
router.get('/username', protect, getUsersByName)
router.get('/position/:id', protect, overallPosition)
router.patch('/ispremium', isPremium)
router.put('/isadmin', protect, editIsAdmin)
router.delete('/username', protect, deleteUser)
router.post('/ban', protect, banUsers)
router.post('/permaBan', protect, permaBanUsers)
router.put('/:id/profile', protect, editUsername)

module.exports = router
