const { Router } = require('express')
const router = Router()
const users = require('./user.js')
const cursos = require('./curso.js')
const auth = require('./auth.js')

router.use('/users', users)
router.use('/cursos', cursos)
router.use('/auth', auth)

module.exports = router
