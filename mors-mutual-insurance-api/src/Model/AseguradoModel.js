const database = require('../database/database');

const getAllAsegurados = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM asegurados`);
    return result;
}

const getAseguradoById = async (idAsegurado) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM asegurados WHERE idAsegurado = ${idAsegurado}`);
    result[0].fecha_nacimiento = result[0].fecha_nacimiento.getFullYear() + '-' +
    ("0" + (result[0].fecha_nacimiento.getMonth() + 1)).slice(-2) + '-' +
    ("0" + result[0].fecha_nacimiento.getDate()).slice(-2);
    return result;
}

const createNewAsegurado = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO asegurados (nombre, fecha_nacimiento, direccion, 
        correo) VALUES ('${data.nombre}', '${data.fecha_nacimiento}', '${data.direccion}', '${data.correo}')`);
    return result;
}

const updateAsegurado = async (data) => {
    const connection = await database.getConnection();
    const  result = await connection.query(`UPDATE asegurados SET nombre = '${data.nombre}', 
        fecha_nacimiento = '${data.fecha_nacimiento}', direccion = '${data.direccion}',
        correo = '${data.correo}' WHERE idAsegurado = ${data.idAsegurado}`);
    return result;
}

module.exports = {
    getAllAsegurados,
    getAseguradoById,
    createNewAsegurado,
    updateAsegurado
}