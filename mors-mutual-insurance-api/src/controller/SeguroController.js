const SeguroService = require('../services/SeguroService');

const getAllSeguros = async (req, res) => {
    const allSeguros = await SeguroService.getAllSeguros();
    res.status(200).send(allSeguros);
}

const getSeguroById = async (req, res) => {
    const Seguro = await SeguroService.getSeguroById(req.params.idSeguro);
    res.status(200).send(Seguro);
}

const createNewSeguro = async (req, res) => {
    const { body } = req;
    if(!body.fecha_contratacion || !body.fecha_vigencia || !body.idCotizacion){
        return;
    }
    const newSeguro = {
        fecha_contratacion: body.fecha_contratacion,
        fecha_vigencia: body.fecha_vigencia,
        idCotizacion: body.idCotizacion
    }
    const createdSeguro = await SeguroService.createNewSeguro(newSeguro);
    res.status(201).send({status: "OK", data: createdSeguro})
}

const updateSeguro = async (req, res) => {
    const { body } = req;
    if(!body.fecha_contratacion || !body.fecha_vigencia || !body.idCotizacion){
        return;
    }
    const newSeguro = {
        idSeguro: req.params.idSeguro,
        fecha_contratacion: body.fecha_contratacion,
        fecha_vigencia: body.fecha_vigencia,
        idCotizacion: body.idCotizacion
    }
    const updatedSeguro = await SeguroService.updateSeguro(newSeguro);
    res.status(200).send({status: "OK", data: updatedSeguro});
}

const deleteSeguro = async (req, res) => {
    const deletedSeguro = await SeguroService.deleteSeguro(req.params.idSeguro);
    return deletedSeguro;
}

module.exports = {
    getAllSeguros,
    getSeguroById,
    createNewSeguro,
    updateSeguro,
    deleteSeguro
}