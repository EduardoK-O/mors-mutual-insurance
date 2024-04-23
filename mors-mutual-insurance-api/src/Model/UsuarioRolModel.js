const database = require('../database/database');

const getAllUsuarioRoles = async () => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM usuario_roles");
    return result;
};

const getOneUsuarioRol = async (usuarioRolId) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM usuario_roles WHERE idRol = ${usuarioRolId}`);
    return result;
}

const createNewUsuarioRol = async (newUsuarioRol) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO usuario_roles (nombre) 
        VALUES ('${newUsuarioRol.nombre}')`);
    return result;
}

const updateOneUsuarioRol = async (usuarioRol) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE usuario_roles SET nombre = '${usuarioRol.nombre}' 
        WHERE idRol = ${usuarioRol.idRol}`);
    return result;
}

const deleteOneUsuarioRol = async (usuarioRolId) => {
    const connection = await database.getConnection();
    const result = await connection.query(`DELETE FROM usuario_roles WHERE idRol = ${usuarioRolId}`);
    return result;
}

module.exports = {
    getAllUsuarioRoles,
    getOneUsuarioRol,
    createNewUsuarioRol,
    updateOneUsuarioRol,
    deleteOneUsuarioRol
}