const { Router } = require('express')
const router = Router()
const { getUserById, topFive } = require('../../controllers/controllerUser.js')

router.get('/topten', topFive)
router.get('/:id', getUserById)

module.exports = router
