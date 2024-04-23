const ConceptoService = require('../services/ConceptoService');

const getAllConceptos = async (req, res) => {
    const allConceptos = await ConceptoService.getAllConceptos();
    res.status(200).send(allConceptos);
}

const getConceptoById = async (req, res) => {
    const concepto = await ConceptoService.getConceptoById(req.params.idConcepto);
    res.status(200).send(concepto);
}

const createNewConcepto = async (req, res) => {
    const { body } = req;
    if(!body.descripcion || !body.precio){
        return;
    }
    const newConcepto = {
        descripcion: body.descripcion,
        precio: body.precio
    }

    const createdConcepto = await ConceptoService.createNewConcepto(newConcepto);
    res.status(201).send({status: "OK", data: createdConcepto});
}

const updateConcepto = async (req, res) => {
    const { body } = req;
    if(!body.descripcion || !body.precio){
        return;
    }
    const newConcepto = {
        idConcepto: req.params.idConcepto,
        descripcion: body.descripcion,
        precio: body.precio
    }
    const updatedConcepto = await ConceptoService.updateConcepto(newConcepto);
    res.status(200).send({status: "OK", data: updatedConcepto});
}

const deleteConcepto = async (req, res) => {
    const deletedConcepto = await ConceptoService.deleteConcepto();
    res.status(200).send({status: "OK", data: deletedConcepto});
}

module.exports = {
    getAllConceptos,
    getConceptoById,
    createNewConcepto,
    updateConcepto,
    deleteConcepto
}