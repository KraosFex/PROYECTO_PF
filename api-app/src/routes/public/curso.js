const { Router } = require("express");
const router = Router();

const {
  getCursos,
  getCursoName,
  getCursoById,
} = require("../../controllers/controllerCursos.js");

router.get("/", getCursos);
router.get("/data/:id", getCursoById);
router.get("/:name", getCursoName);


module.exports = router;
