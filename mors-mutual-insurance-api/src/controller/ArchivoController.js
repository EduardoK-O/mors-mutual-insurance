const ArchivoService = require('../services/ArchivoService');
const path = require('path');



const getArchivoByIdCotizacion = async (req, res) => {
    const archivo = (await ArchivoService.getArchivoByIdCotizacion(req.params.idCotizacion))[0];
    if(!archivo){
        return res.status(404).send("archivo no encontrado");
    }
    res.sendFile(path.join(__dirname, "../..", archivo.ruta));

}

const getArchivo = async (req, res) => {
    const { body } = req;
    if (!body.ruta) {
        return res.status(400).send('bad request');
    }
    const data = {
        ruta: body.ruta
    }
    const archivo = (await ArchivoService.getArchivo(data))[0];
    if(!archivo){
        return res.status(404).send("archivo no encontrado");
    }
    res.sendFile(path.join(__dirname, "../..", archivo.ruta));
}

const getAllArchivos = async () =>{
    const archivos = await ArchivoService.getAllArchivos();
    res.status(200).send(archivos);

}

module.exports = {
    getArchivoByIdCotizacion,
    getArchivo,
    getAllArchivos
}