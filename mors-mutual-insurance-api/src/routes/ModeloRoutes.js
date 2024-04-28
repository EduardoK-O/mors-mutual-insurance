const express = require('express');
const router = express.Router();
const ModeloController = require('../controller/ModeloController');

/**
 * @swagger
 * components:
 *  schemas:
 *      modelos:
 *          type: object
 *          properties:
 *              idModelo:
 *                  type: integer
 *                  description: id del modelo
 *              nombre:
 *                  type: string
 *                  description: nombre del modelo de automovil
 *              idMarca:
 *                  type: integer
 *                  description: id de referencia de la marca
 *              activo:
 *                  type: integer
 *                  description: indica si el registro del modelo se encuentra activo
 *          required:
 *              - nombre
 *              - idMarca
 *          example:
 *              nombre: Yaris
 *              idMarca: 1
 */

/**
 * @swagger
 * /api/modelos:
 *  get:
 *    summary: obtiene todas los modelos
 *    tags: [Modelos]
 *    responses:
 *      200:
 *          description: todos los modelos
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/modelos'
 */
router.get("/", ModeloController.getAllModelos)

/**
 * @swagger
 * /api/modelos:
 *  post:
 *      summary: crea una marca de automovil
 *      tags: [Modelos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/modelos'
 *      responses:
 *          200:
 *              description: Marca creada!
 */
.post("/", ModeloController.createNewModelo)

/**
 * @swagger
 * /api/modelos/{id}:
 *  get:
 *    summary: obtiene un modelo por id solicitado
 *    tags: [Modelos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del modelo
 *    responses:
 *      200:
 *          description: un modelo
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/modelos'
 */
.get("/:idModelo", ModeloController.getModeloById)

/**
 * @swagger
 * /api/modelos/{id}:
 *  put:
 *      summary: modifica un modelo por id
 *      tags: [Modelos]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del modelo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/modelos'
 *      responses:
 *          200:
 *              description: modelo actualizado!
 */
.put("/:idModelo", ModeloController.updateModelo)

/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *    summary: elimina un usuario por id (solo actualiza el estado de activo a 0)
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del usuario
 *    responses:
 *      200:
 *          description: usuario eliminado!  
 */
.delete("/:idModelo", ModeloController.deleteModelo);

module.exports = router;