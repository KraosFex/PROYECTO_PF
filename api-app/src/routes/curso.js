const { Router } = require("express");
const router = Router();

const {
  getCursos,
  getCursoId,
  createCurso,
  getCursoName,
} = require("../controllers/controllerCursos.js");
const { validateAuthAndAnAdmin } = require("../utils/validate.js");

router.get("/", getCursos);
router.get("/:name", getCursoName);
router.post("/", createCurso);

module.exports = router;
