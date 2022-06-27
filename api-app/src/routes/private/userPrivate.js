const { Router } = require('express')


const { getUsers, getUsersByName, editUsername, overallPosition, editIsAdmin, deleteUser, banUsers, permaBanUsers, isPremium  } = require('../../controllers/controllerUser')

const { protect } = require('../../middleware/protect')

const router = Router()

router.get('/', protect, getUsers)
router.get('/username', protect, getUsersByName)
router.get('/position/:id', protect, overallPosition)
router.put('/:id/profile', protect, editUsername)
router.put('/isAdmin', protect, editIsAdmin)
router.put('/isPremium', protect, isPremium)
router.delete('/deleteUser', protect, deleteUser)
router.post('/ban', protect, banUsers)
router.post('/permaBan', protect, permaBanUsers)

module.exports = router
