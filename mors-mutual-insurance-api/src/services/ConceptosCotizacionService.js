const ConceptoModel = require('../Model/ConceptoModel');

const getAllConceptos = async () => {
    const allConceptos = await ConceptoModel.getAllConceptos();
    return allConceptos;
}

const getConceptosByCotizacionId = async (idCotizacion) => {
    const conceptos = await ConceptoModel.getConceptoById(idCotizacion);
    return conceptos;
}

const createNewConcepto = async (newConcepto) => {
    const createdConcepto = await ConceptoModel.createNewConcepto(newConcepto);
    return createdConcepto;
}

const updateConcepto = async (Concepto) => {
    const updatedConcepto = await ConceptoModel.updateConcepto(Concepto);
    return updatedConcepto;
}

module.exports = {
    getAllConceptos,
    getConceptosByCotizacionId,
    createNewConcepto,
    updateConcepto
}