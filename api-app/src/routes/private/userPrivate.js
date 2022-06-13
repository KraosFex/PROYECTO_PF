const { Router } = require('express')
const { getUsers } = require('../../controllers/controllerUser')
const protect = require('../../middleware/protect')
const router = Router()

router.get('/', protect, getUsers)

module.exports = router
