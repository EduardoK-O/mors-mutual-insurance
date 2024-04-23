const CotizacionService = require('../services/CotizacionService');
const ConceptosCotizacion = require('../services/ConceptosCotizacionService');

const getAllCotizaciones = async (req, res) => {
    const allCotizaciones = await CotizacionService.getAllCotizaciones();
    await Promise.all(allCotizaciones.map(async (cotizacion) =>{
        const conceptos = await ConceptosCotizacion.getConceptosByCotizacionId(cotizacion.idCotizacion);
        cotizacion.conceptos = conceptos;
    }));
    res.status(200).send(allCotizaciones);
}

const getCotizacionById = async (req, res) => {
    const Cotizacion = await CotizacionService.getCotizacionById(req.params.idCotizacion);
    const conceptos = await ConceptosCotizacion.getConceptosByCotizacionId(cotizacion.idCotizacion);
    Cotizacion.conceptos = conceptos;
    res.status(200).send(Cotizacion);
}

const createNewCotizacion = async (req, res) => {
    const { body } = req;
    if(!body.fecha || !body.total || !body.idAsegurado || !body.idVehiculo || !body.idAsguradora ||
            !body.prima_neta || !body.descuento || !body.prima_modulos || !body.recargo_fraccionamiento
            || !body.reduccion_autorizada || !body.derecho_poliza || !body.iva ){
        return;
    }
    const newCotizacion = {
        fecha: body.fecha,
        total: body.total,
        idAsegurado: body.idAsegurado,
        idVehiculo: body.idVehiculo,
        idAsguradora: body.idAsguradora,
        prima_neta: body.prima_neta,
        descuento: body.descuento,
        prima_modulos: body.prima_modulos,
        recargo_fraccionamiento: body.recargo_fraccionamiento,
        reduccion_autorizada: body.reduccion_autorizada,
        derecho_poliza: body.derecho_poliza,
        iva: body.iva
    }
    const createdCotizacion = await CotizacionService.createNewCotizacion(newCotizacion);
    res.status(201).send({status: "OK", data: createdCotizacion})
}

const updateCotizacion = async (req, res) => {
    const { body } = req;
    if(!body.fecha || !body.total || !body.idAsegurado || !body.idVehiculo || !body.idAsguradora ||
        !body.prima_neta || !body.descuento || !body.prima_modulos || !body.recargo_fraccionamiento
        || !body.reduccion_autorizada || !body.derecho_poliza || !body.iva ){
    return;
}
const newCotizacion = {
    idCotizacion: req.params.idCotizacion,
    fecha: body.fecha,
    total: body.total,
    idAsegurado: body.idAsegurado,
    idVehiculo: body.idVehiculo,
    idAsguradora: body.idAsguradora,
    prima_neta: body.prima_neta,
    descuento: body.descuento,
    prima_modulos: body.prima_modulos,
    recargo_fraccionamiento: body.recargo_fraccionamiento,
    reduccion_autorizada: body.reduccion_autorizada,
    derecho_poliza: body.derecho_poliza,
    iva: body.iva
}
    const updatedCotizacion = await CotizacionService.updateCotizacion(newCotizacion);
    res.status(200).send({status: "OK", data: updatedCotizacion});
}

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createNewCotizacion,
    updateCotizacion
}