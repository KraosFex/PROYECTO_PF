const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/modelUser.js')


const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.send({ info: 'Datos invalidos user o pass not found' })
        const validPass = await bcrypt.compareSync(password, user.password)
        if (!validPass) return res.send({ info: 'Datos invalidos user o pass not found' })
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.send({ info: 'Usuario autenticado', user })
    } catch (err) {
        res.send({ info: 'Error al autenticar el usuario', err })
        console.log(err)
    }

}


module.exports = {
    authUser,
}
