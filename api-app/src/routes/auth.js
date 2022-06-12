const { Router } = require('express')
const router = Router()
const {
  registerUser,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/controlllerAuth')

router.post('/', registerUser)

module.exports = router
