const database = require('../database/database');

const getAllConceptos = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT c.* FROM conceptos c 
    LEFT JOIN conceptos_has_cotizaciones cc ON cc.idConcepto = c.idConcepto`);
    return result;
}

const getConceptosByCotizacionId = async (idCotizacion) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT c.* FROM conceptos c 
    LEFT JOIN conceptos_has_cotizaciones cc ON cc.idConcepto = c.idConcepto
    WHERE cc.idCotizacion = ${idCotizacion}`);
    return result;
}

const createNewConcepto = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO conceptos_has_cotizaciones (nombre, idMarca) VALUES ('${data.nombre}', ${data.idMarca})`);
    return result;
}

const updateConcepto = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE conceptos_has_cotizaciones SET nombre = '${data.nombre}', idMarca = ${data.idMarca} WHERE idConcepto = ${data.idConcepto}`);
    return result;
}

module.exports = {
    getAllConceptos,
    getConceptosByCotizacionId,
    createNewConcepto,
    updateConcepto
}