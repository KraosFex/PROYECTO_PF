const { Router } = require('express')


const { getUsers, getUsersByName,getALLUsers, editUsername, overallPosition, editIsAdmin, deleteUser, banUsers, permaBanUsers } = require('../../controllers/controllerUser')

const { protect } = require('../../middleware/protect')

const router = Router()

router.get('/', protect, getUsers)
router.get('/all', protect, getALLUsers)
router.get('/username', protect, getUsersByName)
router.put('/isAdmin', protect, editIsAdmin)
router.delete('/username', protect, deleteUser)
router.post('/ban', protect, banUsers)
router.post('/permaBan', protect, permaBanUsers)
router.get('/position/:id', protect, overallPosition)
router.put('/:id/profile', protect, editUsername)


module.exports = router
