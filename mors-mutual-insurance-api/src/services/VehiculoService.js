const VehiculoModel = require('../Model/VehiculoModel');

const getAllVehiculos = async () => {
    const allVehiculos = await VehiculoModel.getAllVehiculos();
    return allVehiculos;
}

const getVehiculoById = async (idVehiculo) => {
    const Vehiculo = await VehiculoModel.getVehiculoById(idVehiculo);
    return Vehiculo;
}

const createNewVehiculo = async (newVehiculo) => {
    const createdVehiculo = await VehiculoModel.createNewVehiculo(newVehiculo);
    return createdVehiculo;
}

const updateVehiculo = async (Vehiculo) => {
    const updatedVehiculo = await VehiculoModel.updateVehiculo(Vehiculo);
    return updatedVehiculo;
}

module.exports = {
    getAllVehiculos,
    getVehiculoById,
    createNewVehiculo,
    updateVehiculo
}