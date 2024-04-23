const SeguroModel = require('../Model/SeguroModel');

const getAllSeguros = async () => {
    const allSeguros = await SeguroModel.getAllSeguros();
    return allSeguros;
}

const getSeguroById = async (idSeguro) => {
    const Seguro = await SeguroModel.getSeguroById(idSeguro);
    return Seguro;
}

const createNewSeguro = async (newSeguro) => {
    const createdSeguro = await SeguroModel.createNewSeguro(newSeguro);
    return createdSeguro;
}

const updateSeguro = async (Seguro) => {
    const updatedSeguro = await SeguroModel.updateSeguro(Seguro);
    return updatedSeguro;
}

module.exports = {
    getAllSeguros,
    getSeguroById,
    createNewSeguro,
    updateSeguro
}