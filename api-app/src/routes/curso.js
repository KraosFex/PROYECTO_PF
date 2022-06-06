const { Router } = require('express');
const router = Router();
const {getCursos} = require('../controllers/controllerCursos.js')

router.get('/', getCursos)


module.exports = router;
