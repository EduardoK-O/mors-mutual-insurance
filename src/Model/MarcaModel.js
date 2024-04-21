const database = require('../database/database');

const getAllMarcas = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM marcas`);
    return result;
}

const getMarcaById = async (idMarca) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM marcas WHERE idMarca = ${idMarca}`);
}

const createNewMarca = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.beginTransaction.query(`INSERT INTO marcas (nombre) VALUES ('${data.nombre}')`);
    return result;
}

const updateMarca = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE marcas SET nombre = '${data.nombre}' WHERE idMarca = ${data.idMarca}`);
    return result;
}

const deleteMarca = async (idMarca) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE marcas SET activo = 0 WHERE idMarca = ${idMarca}`);
    return result;
}

module.exports = {
    getAllMarcas,
    getMarcaById,
    createNewMarca,
    updateMarca,
    deleteMarca
}
