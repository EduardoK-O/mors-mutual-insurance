const ModeloModel = require('../Model/ModeloModel');

const getAllModelos = async () => {
    const allModelos = await ModeloModel.getAllModelos();
    return allModelos;
}

const getModeloById = async (idModelo) => {
    const Modelo = await ModeloModel.getModeloById(idModelo);
    return Modelo;
}

const createNewModelo = async (newModelo) => {
    const createdModelo = await ModeloModel.createNewModelo(newModelo);
    return createdModelo;
}

const updateModelo = async (Modelo) => {
    const updatedModelo = await ModeloModel.updateModelo(Modelo);
    return updatedModelo;
}

const deleteModelo = async (idModelo) => {
    const deletedModelo = await ModeloModel.deleteModelo(idModelo);
    return deletedModelo;
}

module.exports = {
    getAllModelos,
    getModeloById,
    createNewModelo,
    updateModelo,
    deleteModelo
}