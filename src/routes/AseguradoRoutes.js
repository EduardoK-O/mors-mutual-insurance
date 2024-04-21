const express = require('express');
const router = express.Router();
const AseguradoController = require('../controller/AseguradoController');

/**
 * @swagger
 * components:
 *  schemas:
 *      asegurados:
 *          type: object
 *          properties:
 *              idAsegurado:
 *                  type: integer
 *                  description: id del asegurado
 *              nombre:
 *                  type: string
 *                  description: nombre del asegurado
 *              fecha_nacimiento:
 *                  type: date
 *                  description: fecha de nacimiento del asegurado
 *              direccion:
 *                  type: string
 *                  description: direccion del asegurado
 *              correo:
 *                  type: string
 *                  description: email del asegurado
 *          required:
 *              - nombre
 *              - fecha_nacimiento
 *              - direccion
 *              - correo
 *          example:
 *              nombre: David Soberanis
 *              fecha_nacimiento: 2024-04-20
 *              direccion: calle 40 xcumpich
 *              correo: david.soberanis@email.com
 */

/**
 * @swagger
 * /api/asegurados:
 *  get:
 *    summary: obtiene todos los asegurados
 *    tags: [Asegurados]
 *    responses:
 *      200:
 *          description: todos los asegurados
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/asegurados'
 */
router.get("/", AseguradoController.getAllAsegurados)

/**
 * @swagger
 * /api/asegurados:
 *  post:
 *      summary: crea un asegurado
 *      tags: [Asegurados]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/asegurados'
 *      responses:
 *          200:
 *              description: asegurado creado!
 */
.post("/", AseguradoController.createNewAsegurado)

/**
 * @swagger
 * /api/asegurados/{id}:
 *  get:
 *    summary: obtiene un asegurado por id solicitado
 *    tags: [Asegurados]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del asegurado
 *    responses:
 *      200:
 *          description: un asegurado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/asegurados'
 */
.get("/:idAsegurado", AseguradoController.getAseguradoById)

/**
 * @swagger
 * /api/asegurados/{id}:
 *  put:
 *      summary: modifica un asegurado por id
 *      tags: [Asegurados]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del asegurado
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/asegurados'
 *      responses:
 *          200:
 *              description: asegurado actualizado!
 */
.put("/:idAsegurado", AseguradoController.updateAsegurado);

module.exports = router;