const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
})

module.exports = {
    userSchema,
}
