const bcrypt = require('bcrypt')
const { userSchema } = require('../utils/validate')
const User = require('../model/modelUser.js')

const getUsers = async (req, res) => {
    try {
        const users = await User.find({estado: true})
        res.send(users)
    } catch (err) {
        res.send({info: 'Error al obtener los usuarios', err})
        console.log(err)
    }
}

const createUser = async (req, res) => {
    const existe = await User.findOne({ email: req.body.email })
    if (existe) return res.send({ info: 'El usuario ya existe' })
    const { error } = userSchema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        const user = await User.create(req.body)
        const salt = await bcrypt.genSalt()
        user.password = bcrypt.hashSync(req.body.password, salt)
        await user.save()
        res.send({ info: 'Usuario creado exitosamente', user })
    } catch (err) {
        res.send({ info: 'Error al crear el usuario', err })
        console.log(err)
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) return res.send({ info: 'El usuario no existe' })
        res.send(user)
    } catch (err) {
        res.send({ info: 'Error al obtener el usuario', err })
        console.log(err)
    }
}


module.exports = {
    getUsers,
    createUser,
    getUserById,
}
