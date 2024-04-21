const MarcaModel = require('../Model/MarcaModel');

const getAllMarcas = async () => {
    const allMarcas = await MarcaModel.getAllMarcas();
    return allMarcas;
}

const getMarcaById = async (idMarca) => {
    const Marca = await MarcaModel.getMarcaById(idMarca);
    return Marca;
}

const createNewMarca = async (newMarca) => {
    const createdMarca = await MarcaModel.createNewMarca(newMarca);
    return createdMarca;
}

const updateMarca = async (Marca) => {
    const updatedMarca = await MarcaModel.updateMarca(Marca);
    return updatedMarca;
}

module.exports = {
    getAllMarcas,
    getMarcaById,
    createNewMarca,
    updateMarca
}