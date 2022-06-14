const { Router } = require("express");
const router = Router();
const protect = require("../../middleware/protect");
const { createCurso } = require("../../controllers/controllerCursos.js");
const { createLesson } = require("../../controllers/controllerLession.js");

router.post("/", protect, createCurso);
router.put("/:id", protect, createLesson);

module.exports = router;
