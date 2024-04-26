const database = require('../database/database');

const createNewArchivo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO archivos (idAsegurado, idCotizacion, ruta)
    VALUES (${data.idAsegurado}, ${data.idCotizacion}, '${data.ruta}')`);
    return result;
}
const getAllArchivos = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM archivos WHERE idCotizacion is null`);
    return result;
}

const getArchivoByIdCotizacion = async (idCotizacion) => {
    const connection = await database.getConnection();
    console.log(`SELECT * FROM archivos WHERE idCotizacion = ${idCotizacion}`);
    const result = await connection.query(`SELECT * FROM archivos WHERE idCotizacion = ${idCotizacion}`);
    console.log(result);
    return result;
}

const getArchivo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM archivos WHERE ruta = '${data.ruta}'`);
    return result;
}

module.exports = {
    getAllArchivos,
    createNewArchivo,
    getArchivoByIdCotizacion,
    getArchivo
}