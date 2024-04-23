const database = require('../database/database');

const getAllAseguradoras = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM aseguradoras`);
    return result;
}

const getAseguradoraById = async (idAseguradora) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM aseguradoras WHERE idAseguradora = ${idAseguradora}`);
    return result;
}

const createNewAseguradora = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO aseguradoras
        (nombre, razon_social, contacto, correo, telefono, ext, celular)
        VALUES ('${data.nombre}', '${data.razon_social}', '${data.contacto}',
        '${data.correo}', '${data.telefono}', '${data.ext}',
        '${data.celular}')`);
    return result;
}

const updateAseguradora = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE aseguradoras SET
        nombre = '${data.nombre}', razon_social = '${data.razon_social}', contacto = '${data.contacto}',
        correo = '${data.correo}', telefono = '${data.telefono}', ext = '${data.ext}', 
        celular = '${data.celular}' WHERE idAseguradora = ${data.idAseguradora}`);
    return result;
}

const deleteAseguradora = async (aseguradoraId) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE aseguradoras SET activo = 0
        WHERE idAseguradora = ${aseguradoraId}`);
    return result;
}

module.exports = {
    getAllAseguradoras,
    getAseguradoraById,
    createNewAseguradora,
    updateAseguradora,
    deleteAseguradora
}