const { Router } = require('express')
const router = Router()
const { getUsers, getUserById } = require('../controllers/controllerUser.js')

router.get('/', getUsers)
router.get('/:id', getUserById)

module.exports = router
