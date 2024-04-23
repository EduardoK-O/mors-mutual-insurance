const MarcaService = require('../services/MarcaService');

const getAllMarcas = async (req, res) => {
    const allMarcas = await MarcaService.getAllMarcas();
    res.status(200).send(allMarcas);
}

const getMarcaById = async (req, res) => {
    const Marca = await MarcaService.getMarcaById(req.params.idMarca);
    res.status(200).send(Marca);
}

const createNewMarca = async (req, res) => {
    const { body } = req;
    if(!body.nombre ){
        return;
    }
    const newMarca = {
        nombre: body.nombre
    }
    const createdMarca = await MarcaService.createNewMarca(newMarca);
    res.status(201).send({status: "OK", data: createdMarca})
}

const updateMarca = async (req, res) => {
    const { body } = req;
    if(!body.nombre){
        return;
    }
    const newMarca = {
        idMarca: req.params.idMarca,
        nombre: body.nombre,
        activo: body.activo
    }
    const updatedMarca = await MarcaService.updateMarca(newMarca);
    res.status(200).send({status: "OK", data: updatedMarca});
}

const deleteMarca = async (req, res) => {
    const deletedMarca = await MarcaService.deleteMarca(req.params.idMarca);
    return deletedMarca;
}

module.exports = {
    getAllMarcas,
    getMarcaById,
    createNewMarca,
    updateMarca,
    deleteMarca
}