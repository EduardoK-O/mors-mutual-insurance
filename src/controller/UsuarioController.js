const usuarioService = require("../services/UsuarioService");

const getAllUsers = async (req, res) => {
    const allUsers = await usuarioService.getAllUsers();
    res.status(200).send(allUsers);
}

const getUserById = async (req, res) => {
    const user = await usuarioService.getUserById(req.params.userId);
    res.status(200).send(user);
}

const createNewUser = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol || !body.activo){
        return;
    }
    const newUSer = {
        nombre: body.nombre,
        username: body.username,
        password: body.password,
        correo: body.correo,
        idRol: body.idRol,
        activo: body.activo
    }
    const createdUser = await usuarioService.createNewUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const updateUser = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol || !body.activo){
        return;
    }
    const newUSer = {
        idUsuario: req.params.userId,
        nombre: body.nombre,
        username: body.username,
        password: body.password,
        correo: body.correo,
        idRol: body.idRol,
        activo: body.activo
    }
    const createdUser = await usuarioService.updateUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const deleteUSer = async (req, res) => {
    const deletedUser = await usuarioService.deleteUser(req.params.userId);
    return deletedUser;
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUSer
}