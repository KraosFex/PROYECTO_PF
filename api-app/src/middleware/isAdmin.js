// const ErrorResponse = require('../utils/errorResponse.js')
const User = require('../model/modelUser')

const isAdmin = async (req, res, next) => {
    const { email } = req.body
    try {
        const query = await User.findOne({ 'email': `${email}` })
        if (!query) return res.status(400)
            .json({ error: 'Email o contraseña incorrectos' })
        next()  
    } catch (error) {
        console.error(error)
        res.status(500)
            .json({ info: 'Ups, algo salió mal', succes: false })
        return
    }
}

module.exports = isAdmin
