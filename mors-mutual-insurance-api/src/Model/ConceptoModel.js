const database = require('../database/database');

const getAllConceptos = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM conceptos`);
    return result;
}

const getConceptoById = async (idConcepto) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM conceptos WHERE idConcepto = ${idConcepto}`);
    return result;
}

const createNewConcepto = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO conceptos (descripcion, precio)
        VALUES ('${data.descripcion}', ${data.precio})`);
    return result;
}

const updateConcepto = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE conceptos SET descripcion = '${data.descripcion}',
        precio = ${data.precio} WHERE idConcepto = ${data.idConcepto}`);
    return result;
}

const deleteConcepto = async (idConcepto) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE conceptos SET activo = 0
        WHERE idConcepto = ${idConcepto}`);
    return result;
}

module.exports = {
    getAllConceptos,
    getConceptoById,
    createNewConcepto,
    updateConcepto,
    deleteConcepto
}