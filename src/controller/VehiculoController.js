const VehiculoService = require('../services/VehiculoService');

const getAllVehiculos = async (req, res) => {
    const allVehiculos = await VehiculoService.getAllVehiculos();
    res.status(200).send(allVehiculos);
}

const getVehiculoById = async (req, res) => {
    const Vehiculo = await VehiculoService.getVehiculoById(req.params.idVehiculo);
    res.status(200).send(Vehiculo);
}

const createNewVehiculo = async (req, res) => {
    const { body } = req;
    if(!body.anio || !body.num_serie || !body.idModelo ){
        return;
    }
    const newVehiculo = {
        nombre: body.nombre,
        num_serie: body.num_serie,
        idModelo: body.idModelo
    }
    const createdVehiculo = await VehiculoService.createNewVehiculo(newVehiculo);
    res.status(201).send({status: "OK", data: createdVehiculo})
}

const updateVehiculo = async (req, res) => {
    const { body } = req;
    if(!body.anio || !body.num_serie || !body.idModelo ){
        return;
    }
    const newVehiculo = {
        idVehiculo: req.params.idVehiculo,
        nombre: body.nombre,
        num_serie: body.num_serie,
        idModelo: body.idModelo
    }
    const updatedVehiculo = await VehiculoService.updateVehiculo(newVehiculo);
    res.status(200).send({status: "OK", data: updatedVehiculo});
}

const deleteVehiculo = async (req, res) => {
    const deletedVehiculo = await VehiculoService.deleteVehiculo(req.params.idVehiculo);
    return deletedVehiculo;
}

module.exports = {
    getAllVehiculos,
    getVehiculoById,
    createNewVehiculo,
    updateVehiculo,
    deleteVehiculo
}