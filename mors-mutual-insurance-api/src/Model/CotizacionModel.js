const database = require('../database/database');

const getAllCotizaciones = async () => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM cotizaciones`);
    return result;
}

const getCotizacionById = async (idCotizacion) => {
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * FROM cotizaciones WHERE idCotizacion = ${idCotizacion}`);
    return result;
}

const createNewCotizacion = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`INSERT INTO cotizaciones 
        (fecha, total, idAsegurado, idVehiculo, idAseguradora, prima_neta, descuento, prima_modulos,
        recargo_fraccionamiento, reduccion_autorizada, derecho_poliza, iva) 
        VALUES ('${data.fecha}', ${data.total}, ${data.idAsegurado}, ${data.idVehiculo}, ${data.idAseguradora},
        ${data.prima_neta}, ${data.descuento}, ${data.prima_modulos}, ${data.recargo_fraccionamiento},
        ${data.reduccion_autorizada}, ${data.derecho_poliza}, ${data.iva})`);
    return result;
}

const updateCotizacion = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(`UPDATE cotizaciones SET 
    fecha = '${data.fecha}', 
    total = ${data.total},
    idAsegurado = ${data.idAsegurado},
    idVehiculo = ${data.idVehiculo},
    idAseguradora = ${data.idAseguradora},
    prima_neta = ${data.prima_neta},
    descuento = ${data.descuento},
    prima_modulos = ${data.prima_modulos},
    recargo_fraccionamiento = ${data.recargo_fraccionamiento},
    reduccion_autorizada = ${data.reduccion_autorizada},
    derecho_poliza = ${data.derecho_poliza},
    iva = ${data.iva}
    WHERE idCotizacion = ${data.idCotizacion}`);
    return result;
}

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createNewCotizacion,
    updateCotizacion
}