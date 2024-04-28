const database = require('../database/database');

const getAllUsers = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM usuarios`);
    return result;
}

const getUserById = async (idUsuario) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM usuarios WHERE idUsuario = ${idUsuario}`);
    return result;
}

const createNewUser = async (newUser) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO usuarios 
        (nombre, username, password, correo, idRol) 
        VALUES ('${newUser.nombre}', '${newUser.username}', '${newUser.password}', 
        '${newUser.correo}', ${newUser.idRol})`);
    return result;
}

const updateUser = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE usuarios SET         
        nombre = '${data.nombre}', username = '${data.username}', 
        password = '${data.password}', correo = '${data.correo}', 
        idRol = ${data.idRol}
        WHERE idUSuario = ${data.idUsuario}`);
    return result;
}

const deleteUser = async (userId) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE usuarios SET activo = 0
        WHERE idUsuario = ${userId}`);
    return result;
}

const login = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT username, idRol FROM usuarios 
    WHERE username = '${data.username}' AND password = '${data.password}'`);
    return result;
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    login
}

