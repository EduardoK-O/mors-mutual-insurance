const express = require('express');
const router = express.Router();
const ConceptoController = require('../controller/ConceptoController');

/**
 * @swagger
 * components:
 *  schemas:
 *      conceptos:
 *          type: object
 *          properties:
 *              idConcepto:
 *                  type: integer
 *                  description: id del concepto
 *              descripcion:
 *                  type: string
 *                  description: descripcionconcepto
 *              precio:
 *                  type: decimal
 *                  description: nombre de concepto
 *              activo:
 *                  type: integer
 *                  description: indica si el registro del concepto se encuentra activo
 *          required:
 *              - descripcion
 *              - precio
 *          example:
 *              descripcion: Cobertura de daños materiales
 *              precio: 3200.95
 *              
 */

/**
 * @swagger
 * /api/conceptos:
 *  get:
 *    summary: obtiene todos los conceptos
 *    tags: [Conceptos]
 *    responses:
 *      200:
 *          description: todos los conceptos
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/conceptos'
 */
router.get("/", ConceptoController.getAllConceptos)


/**
 * @swagger
 * /api/conceptos:
 *  post:
 *      summary: crea un concepto
 *      tags: [Conceptos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/conceptos'
 *      responses:
 *          200:
 *              description: concepto creado!
 */
.post("/", ConceptoController.createNewConcepto)

/**
 * @swagger
 * /api/conceptos/{id}:
 *  get:
 *    summary: obtiene un concepto por id solicitado
 *    tags: [Conceptos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del concepto
 *    responses:
 *      200:
 *          description: un concepto
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/conceptos'
 */
.get("/:idConcepto", ConceptoController.getConceptoById)

/**
 * @swagger
 * /api/conceptos/{id}:
 *  put:
 *      summary: modifica un concepto por id
 *      tags: [Conceptos]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del concepto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/conceptos'
 *      responses:
 *          200:
 *              description: concepto actualizado!
 */
.put("/:idConcepto", ConceptoController.updateConcepto)

/**
 * @swagger
 * /api/conceptos/{id}:
 *  delete:
 *    summary: elimina un concepto por id (solo actualiza el estado de activo a 0)
 *    tags: [Conceptos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del concepto
 *    responses:
 *      200:
 *          description: concepto eliminado!  
 */
.delete("/:idConcepto", ConceptoController.deleteConcepto);

module.exports = router;