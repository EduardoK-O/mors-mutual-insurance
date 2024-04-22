const database = require('../database/database');

const getAllVehiculos = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT v.*, mo.nombre AS modelo, ma.nombre AS marca  
    FROM vehiculos v 
    LEFT JOIN modelos mo ON mo.idModelo = v.idModelo
    LEFT JOIN marcas ma ON ma.idMarca = mo.idMarca`);
    return result;
}

const getVehiculoById = async (idVehiculo) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT v.*, mo.nombre AS modelo, ma.nombre AS marca  
    FROM vehiculos v 
    LEFT JOIN modelos mo ON mo.idModelo = v.idModelo
    LEFT JOIN marcas ma ON ma.idMarca = mo.idMarca
    WHERE v.idVehiculo = = ${idVehiculo}`);
}

const createNewVehiculo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO vehiculos (anio, num_serie, idModelo) 
    VALUES ('${data.anio}', '${data.num_serie}', ${data.idModelo})`);
    return result;
}

const updateVehiculo = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE vehiculos SET nombre = '${data.nombre}', idMarca = ${data.idMarca} WHERE idVehiculo = ${data.idVehiculo}`);
    return result;
}

const deleteVehiculo = async (idVehiculo) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE vehiculos SET activo = 0 WHERE idVehiculo = ${idVehiculo}`);
    return result;
}

module.exports = {
    getAllVehiculos,
    getVehiculoById,
    createNewVehiculo,
    updateVehiculo,
    deleteVehiculo
}