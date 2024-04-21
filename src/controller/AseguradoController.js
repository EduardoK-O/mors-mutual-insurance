const AseguradoService = require('../services/AseguradoService');

const getAllAsegurados = async (req, res) => {
    const allAsegurados = await AseguradoService.getAllAsegurados();
    res.status(200).send(allAsegurados);
}

const getAseguradoById = async (req, res) => {
    const asegurado = await AseguradoService.getAseguradoById(req.params.idAsegurado);
    res.status(200).send(asegurado);
}

const createNewAsegurado = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.fecha_nacimiento || !body.direccion || !body.correo){
        return;
    }
    const newAsegurado = {
        nombre: body.nombre,
        fecha_nacimiento: body.fecha_nacimiento,
        direccion: body.direccion,
        correo: body.correo
    }
    const createdAsegurado = await AseguradoService.createNewAsegurado(newAsegurado);
    res.status(201).send({status: "OK", data: createdAsegurado})
}

const updateAsegurado = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.fecha_nacimiento || !body.direccion || !body.correo){
        return;
    }
    const newAsegurado = {
        idAsegurado: req.params.idAsegurado,
        nombre: body.nombre,
        fecha_nacimiento: body.fecha_nacimiento,
        direccion: body.direccion,
        correo: body.correo
    }
    const updatedAsegurado = await AseguradoService.updateAsegurado(newAsegurado);
    res.status(200).send({status: "OK", data: updatedAsegurado});
}

module.exports = {
    getAllAsegurados,
    getAseguradoById,
    createNewAsegurado,
    updateAsegurado
}