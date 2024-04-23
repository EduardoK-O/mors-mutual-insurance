const CotizacionModel = require('../Model/CotizacionModel');

const getAllCotizaciones = async () => {
    const allCotizaciones = await CotizacionModel.getAllCotizaciones();
    return allCotizaciones;
}

const getCotizacionById = async (idCotizacion) => {
    const Cotizacion = await CotizacionModel.getCotizacionById(idCotizacion);
    return Cotizacion;
}

const createNewCotizacion = async (newCotizacion) => {
    const createdCotizacion = await CotizacionModel.createNewCotizacion(newCotizacion);
    return createdCotizacion;
}

const updateCotizacion = async (Cotizacion) => {
    const updatedCotizacion = await CotizacionModel.updateCotizacion(Cotizacion);
    return updatedCotizacion;
}

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createNewCotizacion,
    updateCotizacion
}