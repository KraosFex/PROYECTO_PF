const { Router } = require('express')
const router = Router()
const {
  registerUser,
  login
} = require('../../controllers/controlllerAuth')

router.post('/register', registerUser)
router.post('/login', login)

module.exports = router
