const AseguradoraModel = require("../Model/AseguradoraModel");

const getAllAseguradoras = async () => {
    const allAseguradoras = await AseguradoraModel.getAllAseguradoras();
    return allAseguradoras;
}

const getAseguradoraById = async (idAseguradora) => {
    const aseguradora = await AseguradoraModel.getAseguradoraById(idAseguradora);
    return aseguradora;
}

const createNewAseguradora = async (newAseguradora) => {
    const createdAseguradora = await AseguradoraModel.createNewAseguradora(newAseguradora);
    return createdAseguradora;
}

const updateAseguradora = async (newAseguradora) => {
    const updatedAseguradora = await AseguradoraModel.updateAseguradora(newAseguradora);
    return updatedAseguradora;
}

const deleteAseguradora = async (aseguradoraId) => {
    const deletedUser = await AseguradoraModel.deleteAseguradora(aseguradoraId);
    return deletedUser;
}

module.exports = {
    getAllAseguradoras,
    getAseguradoraById,
    createNewAseguradora,
    updateAseguradora,
    deleteAseguradora
}