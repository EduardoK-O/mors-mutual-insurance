const ArchivoModel = require('../Model/ArchivosModel');

const createNewArchivo = async (data) => {
    const newArchivo = await ArchivoModel.createNewArchivo(data);
    return newArchivo;
}

const getAllArchivos = async () => {
    const archivos = await ArchivoModel.getAllArchivos();
    return archivos;
}

const getArchivoByIdCotizacion = async (idCotizacion) => {
    const archivo = await ArchivoModel.getArchivoByIdCotizacion(idCotizacion);
    console.log(archivo);
    return archivo;
}

const getArchivo = async (data) => {
    const archivo = await ArchivoModel.getArchivo(data);
    return archivo;
}

module.exports = {
    getAllArchivos,
    createNewArchivo,
    getArchivoByIdCotizacion,
    getArchivo
}