const { Router } = require('express')
const router = Router()
const { getUserById } = require('../../controllers/controllerUser.js')

router.get('/:id', getUserById)

module.exports = router
