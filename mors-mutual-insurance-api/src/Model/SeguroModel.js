const database = require('../database/database');

const getAllSeguros = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM seguros`);
    return result;
}

const getSeguroById = async (idSeguro) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM seguros WHERE idSeguro = ${idSeguro}`);
    return result;
}

const createNewSeguro = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO seguros 
    (fecha_contratacion, fecha_vigencia, idCotizacion) 
    VALUES ('${data.fecha_contratacion}', '${data.fecha_vigencia}', ${data.idCotizacion})`);
    return result;
}

const updateSeguro = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE seguros SET nombre = '${data.nombre}', idMarca = ${data.idMarca} WHERE idSeguro = ${data.idSeguro}`);
    return result;
}

module.exports = {
    getAllSeguros,
    getSeguroById,
    createNewSeguro,
    updateSeguro
}