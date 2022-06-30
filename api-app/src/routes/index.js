const { Router } = require("express");
const router = Router();
const users = require("./public/user.js");
const cursos = require("./public/curso.js");
const auth = require("./public/auth.js");
const usersPrivate = require("./private/userPrivate.js");
const cursosPrivate = require("./private/cursoPrivate.js");
const {reset} = require("../controllers/controlllerAuth.js");
const { payStripe } = require("../controllers/controllerPaysMethods.js");

router.use("/users", users);
router.use("/cursos", cursos);
router.use("/auth", auth);
router.use("/usersprivate", usersPrivate);
router.use("/cursosprivate", cursosPrivate);
router.post('/pago', payStripe);
router.get("/reset", reset);

module.exports = router;
