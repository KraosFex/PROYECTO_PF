const { Router } = require("express");
const router = Router();

const {
  getCursos,
  getCursoName,
  getCursoById,
} = require("../../controllers/controllerCursos.js");

router.get("/", getCursos);
router.get("/:name", getCursoName);
router.get("/:id", getCursoById);

module.exports = router;
