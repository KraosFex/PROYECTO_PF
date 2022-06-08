const { Router } = require("express");
const router = Router();
const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/controllerUser.js");
const { validateAuth } = require("../utils/validate.js");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", validateAuth, getUserById);

module.exports = router;
