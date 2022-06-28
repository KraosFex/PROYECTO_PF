const { Router } = require('express')
const router = Router()
const {
  registerUser,
  login,
  forgotPassword,
  googleLogin
} = require('../../controllers/controlllerAuth')

router.post('/register', registerUser)
router.post('/login', login)
router.put('/forgotPassword', forgotPassword)
router.post('/googlelogin', googleLogin)

module.exports = router
