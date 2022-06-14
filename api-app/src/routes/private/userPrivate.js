const { Router } = require('express')
const { getUsers, getUsersByName } = require('../../controllers/controllerUser')
const protect = require('../../middleware/protect')
const router = Router()

router.get('/', protect, getUsers)
router.get('/name', protect, getUsersByName)

module.exports = router
