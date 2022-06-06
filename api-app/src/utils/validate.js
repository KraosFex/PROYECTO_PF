const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
})

const validateAuth = (req, res, next) => {
    let token = req.get('pass')
    if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token invalido'
                })
            }
        }
        )
    }
    res.send({ info: 'Aunteticado Correcto', token })
}

module.exports = {
    userSchema,
    validateAuth,
}
