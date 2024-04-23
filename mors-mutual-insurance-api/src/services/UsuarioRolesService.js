const usuarioRol = require("../Model/UsuarioRolModel");

const getAllUsuarioRoles = async () => { 
    const allUsuarioRoles = await usuarioRol.getAllUsuarioRoles();
    return allUsuarioRoles;
}

const getOneUsuarioRol = async (usuarioRolId) => { 
    const oneUsuarioRol = await usuarioRol.getOneUsuarioRol(usuarioRolId);
    return oneUsuarioRol;

}

const createNewUsuarioRol = async (newUsuarioRol) => { 
    const createdUsuarioRol = await usuarioRol.createNewUsuarioRol(newUsuarioRol);
    return createdUsuarioRol;
}

const updateOneUsuarioRol = async (newUsuarioRol) => { 
    const updatedUsuario = await usuarioRol.updateOneUsuarioRol(newUsuarioRol);
    return updatedUsuario;
}
const deleteOneUsuarioRol = async (usuarioRolId) => {
    const deletedUsuario = await usuarioRol.deleteOneUsuarioRol(usuarioRolId);
    return deletedUsuario;
}

module.exports = {
    getAllUsuarioRoles,
    getOneUsuarioRol,
    createNewUsuarioRol,
    updateOneUsuarioRol,
    deleteOneUsuarioRol
}