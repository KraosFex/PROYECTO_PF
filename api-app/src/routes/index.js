const { Router } = require('express')
const router = Router()
const users = require('./public/user.js')
const cursos = require('./public/curso.js')
const auth = require('./public/auth.js')

router.use('/users', users)
router.use('/cursos', cursos)
router.use('/auth', auth)

module.exports = router
