const bcrypt = require('bcrypt')
const User = require('../model/modelUser.js')


const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.send({ info: 'Datos invalidos user o pass not found' })
        const validPass = await bcrypt.compareSync(password, user.password)
        if (!validPass) return res.send({ info: 'Datos invalidos user o pass not found' })
        res.send({ info: 'Usuario autenticado', user })
    } catch (err) {
        res.send({ info: 'Error al autenticar el usuario', err })
        console.log(err)
    }

}


module.exports = {
    authUser,
}
