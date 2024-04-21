const AseguradoModel = require('../Model/AseguradoModel');

const getAllAsegurados = async () => {
    const allAsegurados = await AseguradoModel.getAllAsegurados();
    return allAsegurados;
}

const getAseguradoById = async (idAsegurado) => {
    const asegurado = await AseguradoModel.getAseguradoById(idAsegurado);
    return asegurado;
}

const createNewAsegurado = async (newAsegurado) => {
    const createdAsegurado = await AseguradoModel.createNewAsegurado(newAsegurado);
    return createdAsegurado;
}

const updateAsegurado = async (asegurado) => {
    const updatedAsegurado = await AseguradoModel.updateAsegurado(asegurado);
    return updatedAsegurado;
}

module.exports = {
    getAllAsegurados,
    getAseguradoById,
    createNewAsegurado,
    updateAsegurado
}