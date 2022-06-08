const { Router } = require('express');
const router = Router();
const { getCursos, getCursoId, createCurso } = require('../controllers/controllerCursos.js')
const {validateAuthAndAnAdmin} = require('../utils/validate.js')

router.get('/', getCursos)
router.get('/:id', getCursoId)
router.post('/', validateAuthAndAnAdmin, createCurso)

module.exports = router;
