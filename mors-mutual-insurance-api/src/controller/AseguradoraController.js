const AseguradoraService = require("../services/AseguradoraService");

const getAllAseguradoras = async (req, res) => {
    const allAseguradoras = await AseguradoraService.getAllAseguradoras();
    res.status(200).send(allAseguradoras);
}

const getAseguradoraById = async (req, res) => {
    const aseguradora = await AseguradoraService.getAseguradoraById(req.params.idAseguradora);
    res.status(200).send(aseguradora);
}

const createNewAseguradora = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.razon_social || !body.contacto || !body.correo || !body.telefono 
        || !body.ext || !body.celular){
        return;
    }
    const newAseguradora = {
        nombre: body.nombre,
        razon_social: body.razon_social,
        contacto: body.contacto,
        correo: body.correo,
        telefono: body.telefono,
        ext: body.ext,
        celular: body.celular
    }
    const createdAseguradora = await AseguradoraService.createNewAseguradora(newAseguradora);
    res.status(201).send({status: "OK", data: createdAseguradora});
}

const updateAseguradora = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.razon_social || !body.contacto || !body.correo || !body.telefono 
        || !body.ext || !body.celular){
        return;
    }
    const newAseguradora = {
        idAseguradora: req.params.idAseguradora,
        nombre: body.nombre,
        razon_social: body.razon_social,
        contacto: body.contacto,
        correo: body.correo,
        telefono: body.telefono,
        ext: body.ext,
        celular: body.celular
    }
    const updatedAseguradora = await AseguradoraService.updateAseguradora(newAseguradora);
    res.status(200).send({status: "OK", data: updatedAseguradora});
}

const deleteAseguradora = async (req, res) => {
    const deletedAseguradora = await AseguradoraService.deleteAseguradora();
    res.status(200).send({status: "OK", data: deletedAseguradora});
}

module.exports = {
    getAllAseguradoras,
    getAseguradoraById,
    createNewAseguradora,
    updateAseguradora,
    deleteAseguradora

}