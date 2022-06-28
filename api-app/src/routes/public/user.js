const { Router } = require('express')
const router = Router()
const { getUserById, topFive } = require('../../controllers/controllerUser.js')

router.get('/topFive', topFive)
router.get('/:id', getUserById)

module.exports = router
