
const User = require('../model/modelUser.js')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ estado: true })
    res.send(users)
  } catch (err) {
    res.send({ info: 'Error al obtener los usuarios', err })
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
  getUserById
}
