const { Router } = require('express')
const router = Router()
const {
  registerUser,
  login,
  forgotPassword
} = require('../../controllers/controlllerAuth')

router.post('/register', registerUser)
router.post('/login', login)
router.put('/forgotPassword', forgotPassword)

module.exports = router
