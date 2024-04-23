const database = require('../database/database');

const getAllModelos = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM modelos`);
    return result;
}

const getModeloById = async (idModelo) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM modelos WHERE idModelo = ${idModelo}`);
    return result;
}

const createNewModelo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO modelos (nombre, idMarca) VALUES ('${data.nombre}', ${data.idMarca})`);
    return result;
}

const updateModelo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE modelos SET nombre = '${data.nombre}', idMarca = ${data.idMarca} WHERE idModelo = ${data.idModelo}`);
    return result;
}

module.exports = {
    getAllModelos,
    getModeloById,
    createNewModelo,
    updateModelo
}