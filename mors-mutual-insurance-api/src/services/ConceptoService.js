const ConceptoModel = require('../Model/ConceptoModel');

const getAllConceptos = async () => {
    const allConceptos = await ConceptoModel.getAllConceptos();
    return allConceptos;
}

const getConceptoById = async (idConcepto) => {
    const concepto = await ConceptoModel.getConceptoById(idConcepto);
    return concepto;
}

const createNewConcepto = async (newConcepto) => {
    const createdConcepto = await ConceptoModel.createNewConcepto(newConcepto);
    return createdConcepto;
}

const updateConcepto = async (concepto) => {
    const updatedConcepto = await ConceptoModel.updateConcepto(concepto);
    return updatedConcepto;
}

const deleteConcepto = async (idConcepto) => {
    const deletedConcepto = await ConceptoModel.deleteConcepto(idConcepto);
    return deletedConcepto;
}

module.exports = {
    getAllConceptos,
    getConceptoById,
    createNewConcepto,
    updateConcepto,
    deleteConcepto
}