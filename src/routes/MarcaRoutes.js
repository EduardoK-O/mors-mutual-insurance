const express = require('express');
const router = express.Router();
const MarcaController = require('../controller/MarcaController');

/**
 * @swagger
 * components:
 *  schemas:
 *      marcas:
 *          type: object
 *          properties:
 *              idMarca:
 *                  type: integer
 *                  description: id de la marca
 *              nombre:
 *                  type: string
 *                  description: nombre de la marca de automovil
 *              activo:
 *                  type: integer
 *                  description: indica si el registro del usuario se encuentra activo
 *          required:
 *              - nombre
 *          example:
 *              nombre: Toyota
 */

/**
 * @swagger
 * /api/marcas:
 *  get:
 *    summary: obtiene todas las marcas
 *    tags: [Marcas]
 *    responses:
 *      200:
 *          description: todas las marcas
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/marcas'
 */
router.get("/", MarcaController.getAllMarcas)

/**
 * @swagger
 * /api/marcas:
 *  post:
 *      summary: crea un marca
 *      tags: [Marcas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/marcas'
 *      responses:
 *          200:
 *              description: Marca creada!
 */
.post("/", MarcaController.createNewMarca)

/**
 * @swagger
 * /api/marcas/{id}:
 *  get:
 *    summary: obtiene una marca por id solicitado
 *    tags: [Marcas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id de la marca
 *    responses:
 *      200:
 *          description: una marca
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/marcas'
 */
.get("/:idMarca", MarcaController.getMarcaById)

/**
 * @swagger
 * /api/marcas/{id}:
 *  put:
 *      summary: modifica una marca por id
 *      tags: [Marcas]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id de la marca
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/marcas'
 *      responses:
 *          200:
 *              description: marca actualizada!
 */
.put("/:idMarca", MarcaController.updateMarca);

module.exports = router;