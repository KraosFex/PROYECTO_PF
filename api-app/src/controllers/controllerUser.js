const User = require("../model/modelUser.js");
const ErrorResponse = require("../utils/errorResponse.js");

const getUsers = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin)
    return res.send({
      info: "No tienes permisos para ver los usuarios",
      success: false,
    });
  const limit = parseInt(req.query.limit) || 8;
  const page = parseInt(req.query.page) || 1;
  try {
    const users = await User.paginate({ estado: true }, { limit, page });
    res.send({
      info: "Todos lo usuarios enviados",
      users: users,
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .send({ info: "Error al realizar la peticion", success: false });
  }
};

const getALLUsers = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin)
    return res.send({
      info: "No tienes permisos para ver los usuarios",
      success: false,
    });
  const limit = parseInt(req.query.limit) || 8;
  const page = parseInt(req.query.page) || 1;
  try {
    const users = await User.paginate({ limit, page });
    res.send({
      info: "Todos lo usuarios enviados",
      users: users,
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .send({ info: "Error al realizar la peticion", success: false });
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user)
      return next(new ErrorResponse("Error al obtener el usuario", 500, false));
    res.send(user);
  } catch (err) {
    next(new ErrorResponse("Error al obtener el usuario", 500, false));
    console.log(err);
  }
};

const getUsersByName = async (req, res, next) => {
  const { username } = req.query;
  try {
    const user = await User.find({
      username: { $regex: username, $options: "i" },
    });
    if (!user.length)
      return next(new ErrorResponse("Error al obtener el usuario", 500, false));
    res.send(user);
  } catch (err) {
    next(new ErrorResponse("Error al obtener el usuario", 500, false));
  }
};

const editUsername = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { username }, { new: true });
    if (!user)
      return next(new ErrorResponse("Error al obtener el usuario", 500, false));
    res.send(user);
  } catch (err) {
    next(new ErrorResponse("Error al obtener el usuario", 500, false));
  }
};

const overallPosition = async (req, res) => {
  const { id } = req.params;
  try {
    const allUsers = await User.find();
    const sorted = allUsers.sort((a, b) => {
      return (
        a.lessons.filter((c) => c && c.isComplete === true).length >(b.lessons.filter((c) => c && c.isComplete === true).length) ? -1:1
      );
    });

    const response = sorted.findIndex((u) => u.id === id); // Posicion dentro del arreglo
    res.send({ info: "Proceso completado con exito", response, success: true }); // :D
  } catch (err) {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

const topTen = async (req, res) => {
  try {
    const allUsers = await User.find(); 
    const sorted = allUsers.sort((a, b) => {
      // a.lesson.num > b.lesson.num ? 1 : -1
      return (
        a.lessons.filter((c) => c && c.isComplete === true).length >(b.lessons.filter((c) => c && c.isComplete === true).length) ? -1:1
      );
    });
    res.send({ info: "Proceso completado con exito", sorted: sorted.splice(0,5), success: true }); // :D
  } catch (err) {
    console.log(err)
    res.status(500).send({ info: "Algo salio mal", success: false ,err});
  }
};

const editIsAdmin = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin)
    return res
      .status(401)
      .send({
        info: "No tienes permisos para acceder a esta ruta",
        success: false,
      });
  try {
    const { id, change } = req.body 
    await User.findByIdAndUpdate(id, {
      isAdmin: change
    })
    res.send({info: 'Estado isAdmin cambiado', success: true})
  }
  catch {
    res.status(500).send({info: 'Algo salio mal', success: false})

  }
};

const deleteUser = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin)
    return res
      .status(401)
      .send({
        info: "No tienes permisos para acceder a esta ruta",
        success: false,
      });
  try {
    const { id } = req.body;
    const userDB = await User.findById(id);
    if (!userDB)
      return res
        .status(404)
        .send({ info: "Usuario no encontrado", success: false });
    await User.findByIdAndDelete(id);
    res.send({ info: "Usuario eliminado", success: true });
  } catch {
    res.status(500).send({ info: "Algo salio mal", success: false });
  }
};

const banUsers = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.status(401).send({info: 'No tienes permisos para acceder a esta ruta', success: false})
  try {
    const { id, fecha } = req.body;
    await User.findByIdAndUpdate(id, {
      timeBanned: fecha
    }, { new: true })
    res.send({info: 'Usuario baneado', success: true})
  } catch {
    res.status(500).send({info: 'Error al intentar banear al usuario', success: false})
  }
}

const permaBanUsers = async (req, res) => {
  const { isAdmin } = req.user
  if (!isAdmin) return res.status(401).send({info: 'No tienes permisos para acceder a esta ruta', success: false})
  try { 
    const { id, estado } = req.body;
    await User.findByIdAndUpdate(id, {
      estado: estado
    })
    res.send({info: 'Estado cambiado exitosamente', success: true})
  } catch {
    res.status(500).send({info: 'Error al intentar banear al usuario', success: false})
  }
}


module.exports = {
  getALLUsers,
  getUsers,
  getUserById,
  getUsersByName,
  editUsername,
  overallPosition,
  topTen,
  editIsAdmin,
  deleteUser,
  banUsers,
  permaBanUsers

};
