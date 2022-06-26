const { Router } = require('express')
const router = Router()
const { getUserById, topTen } = require('../../controllers/controllerUser.js')

router.get('/topten', topTen)
router.get('/:id', getUserById)

module.exports = router
