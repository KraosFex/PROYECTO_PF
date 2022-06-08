const { Router } = require('express');
const router = Router();
const {getCursos, getCursoId, createCurso} = require('../controllers/controllerCursos.js')

router.get('/', getCursos)
router.get('/:id', getCursoId)
router.post('/', createCurso)

module.exports = router;
