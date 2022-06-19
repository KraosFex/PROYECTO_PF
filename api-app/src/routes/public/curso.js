const { Router } = require("express");
const router = Router();

const {
  getCursos,
  getCursoName,
<<<<<<< HEAD
  getCursoById,
} = require("../../controllers/controllerCursos.js");

router.get("/", getCursos);
router.get("/:name", getCursoName);
router.get("/:id", getCursoById);
=======
  getCursoById
} = require('../../controllers/controllerCursos.js')

router.get('/', getCursos)
router.get('/:name', getCursoName)
router.get('/:id', getCursoById)
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

module.exports = router;
