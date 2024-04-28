const ModeloService = require('../services/ModeloService');

const getAllModelos = async (req, res) => {
    const allModelos = await ModeloService.getAllModelos();
    res.status(200).send(allModelos);
}

const getModeloById = async (req, res) => {
    const Modelo = await ModeloService.getModeloById(req.params.idModelo);
    res.status(200).send(Modelo);
}

const createNewModelo = async (req, res) => {
    const { body } = req;
    if(!body.nombre ){
        return;
    }
    const newModelo = {
        nombre: body.nombre,
        idMarca: body.idMarca
    }
    const createdModelo = await ModeloService.createNewModelo(newModelo);
    res.status(201).send({status: "OK", data: createdModelo})
}

const updateModelo = async (req, res) => {
    const { body } = req;
    if(!body.nombre){
        return;
    }
    const newModelo = {
        idModelo: req.params.idModelo,
        nombre: body.nombre,
        idMarca: body.idMarca
    }
    const updatedModelo = await ModeloService.updateModelo(newModelo);
    res.status(200).send({status: "OK", data: updatedModelo});
}

const deleteModelo = async (req, res) => {
    const deleteModelo = await ModeloService.deleteModelo(req.params.idModelo);
    res.status(200).send({status: "OK", data: deleteModelo});
}

module.exports = {
    getAllModelos,
    getModeloById,
    createNewModelo,
    updateModelo,
    deleteModelo
}