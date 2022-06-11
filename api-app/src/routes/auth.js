const { Router } = require('express')
const router = Router()
const { authUser } = require('../controllers/controlllerAuth')

router.post('/', authUser)

module.exports = router
