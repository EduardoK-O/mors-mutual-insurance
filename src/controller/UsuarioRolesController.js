const usuarioRolesService = require("../services/usuarioRolesService");

const getAllUsuarioRoles = async (req, res) => {
    const allUsuarioRoles = await usuarioRolesService.getAllUsuarioRoles();
    res.status(200).send(allUsuarioRoles);
}

const getOneUsuarioRol = async (req, res) => {
    const oneUsuarioRol = await usuarioRolesService.getOneUsuarioRol(req.params.usuarioRolId);
    res.status(200).send(oneUsuarioRol);
}

const createNewUsuarioRol = async (req, res) => {
    const { body } = req;
    if(!body.nombre){
        return;
    }
    const newUsuarioRol = {
        nombre: body.nombre
    }
    const createdUsuarioRol = await usuarioRolesService.createNewUsuarioRol(newUsuarioRol);
    res.status(201).send({status: "OK", data: createdUsuarioRol});
}

const updateOneUsuarioRol = async (req, res) => {
    const { body } = req;
    if(!body.nombre){
        return;
    }
    const newUsuarioRol = {
        idRol: req.params.usuarioRolId,
        nombre: body.nombre
    }
    const updatedOneUsuarioRol = await usuarioRolesService.updateOneUsuarioRol(newUsuarioRol);
    res.status(200).send({status: "OK", data: updatedOneUsuarioRol});
}

const deleteOneUsuarioRol =  async (req, res) => {
    const deletedUsuarioRol = await usuarioRolesService.deleteOneUsuarioRol(req.params.usuarioRolId);
    res.status(200).send({status: "OK", data: deletedUsuarioRol});
}

module.exports = {
    getAllUsuarioRoles,
    getOneUsuarioRol,
    createNewUsuarioRol,
    updateOneUsuarioRol,
    deleteOneUsuarioRol
}