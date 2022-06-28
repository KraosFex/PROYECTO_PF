const { Router } = require("express");
const router = Router();
const users = require("./public/user.js");
const cursos = require("./public/curso.js");
const auth = require("./public/auth.js");
const usersPrivate = require("./private/userPrivate.js");
const cursosPrivate = require("./private/cursoPrivate.js");
const paysMethods = require("./private/paysMethods.js");

router.use("/users", users);
router.use("/cursos", cursos);
router.use("/auth", auth);
router.use("/usersprivate", usersPrivate);
router.use("/cursosprivate", cursosPrivate);
router.use("/paysprivate", paysMethods);

module.exports = router;
