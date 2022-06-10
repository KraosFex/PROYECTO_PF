const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
});


const courseSchema = Joi.object({
  titulo: Joi.string().min(1).max(50).required(),
  descripcion: Joi.string().required(),
  calificacion: Joi.number(),
  imagen: Joi.string(),
  userInscript: Joi.number(),
  clases: Joi.array(),
  lenguaje: Joi.string(),
});

const validateAuth = (req, res, next) => {
  let token = req.get("pass");
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(401).json({ message: "Token invalido" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No estas autenticado",
    });
  }
};

const validateAuthAndAnAdmin = (req, res, next) => {
  validateAuth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .send({ info: "No tienes permisos para realizar esta accion" });
    }
  });
};

module.exports = {
  userSchema,
  validateAuth,
  validateAuthAndAnAdmin,
  courseSchema,
};
