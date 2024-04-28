const usuarioMod = require("../Model/UsuarioModel");

const getAllUsers = async () => {
    const allUsers = await usuarioMod.getAllUsers();
    return allUsers;
}

const getUserById = async (idUser) => {
    const usuario = await usuarioMod.getUserById(idUser);
    return usuario;
}

const createNewUser = async (newUser) => {
    const createdUser = await usuarioMod.createNewUser(newUser);
    return createdUser;
}

const updateUser = async (newUser) => {
    const updatedUser = await usuarioMod.updateUser(newUser);
    return updatedUser;
}

const deleteUser = async (userId) => {
    const deletedUser = await usuarioMod.deleteUser(userId);
    return deletedUser;
}

const login = async (data) =>{
    const user = await usuarioMod.login(data);
    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    login
}