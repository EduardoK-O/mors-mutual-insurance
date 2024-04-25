const ConceptosCotizacionMod = require('../Model/ConceptosCotizacion');

const getAllConceptos = async () => {
    const allConceptos = await ConceptosCotizacionMod.getAllConceptos();
    return allConceptos;
}

const getConceptosByCotizacionId = async (idCotizacion) => {
    const conceptos = await ConceptosCotizacionMod.getConceptoById(idCotizacion);
    return conceptos;
}

const createNewConceptoCotizacion = async (newConcepto) => {
    const createdConcepto = await ConceptosCotizacionMod.createNewConceptoCotizacion(newConcepto);
    return createdConcepto;
}

const updateConceptoCotizacion = async (Concepto) => {
    const updatedConcepto = await ConceptosCotizacionMod.updateConceptoCotizacion(Concepto);
    return updatedConcepto;
}

module.exports = {
    getAllConceptos,
    getConceptosByCotizacionId,
    createNewConceptoCotizacion,
    updateConceptoCotizacion
}