const express = require('express');
const router = express.Router();
const AseguradoraController = require("../controller/AseguradoraController");

/**
 * @swagger
 * components:
 *  schemas:
 *      aseguradoras:
 *          type: object
 *          properties:
 *              idAseguradora:
 *                  type: integer
 *                  description: id de la asegura
 *              nombre:
 *                  type: string
 *                  description: nombre de la propietario de la cuenta de asegura
 *              razon_social:
 *                  type: string
 *                  description: razon social de la asegura
 *              contacto:
 *                  type: string
 *                  description: nombre de la persona que es el contacto de la asegura
 *              correo:
 *                  type: string
 *                  description: email de la asegura
 *              telefono:
 *                  type: string
 *                  description: numero de telefono de la asegura
 *              ext:
 *                  type: string
 *                  description: extension del numero de telefono de la aseguradora
 *              celular:
 *                  type: string
 *                  description: numero de celular de la aseguradora
 *              activo:
 *                  type: integer
 *                  description: indica si el registro de la asegura se encuentra activo
 *          required:
 *              - nombre
 *              - razon social
 *              - contacto
 *              - correo
 *              - telefono
 *              - ext
 *              - celular
 *          example:
 *              nombre: Qualitas
 *              razon_social: Qualitas compañia de seguros S.A. de C.V.
 *              contacto: David Soberanis
 *              correo: david.soberanis@email.com
 *              telefono: 122-334-5343
 *              ext: 21432
 *              celular: 9999-02-23-32
 */

/**
 * @swagger
 * /api/aseguradoras:
 *  get:
 *    summary: obtiene todas las aseguradoras
 *    tags: [Aseguradoras]
 *    responses:
 *      200:
 *          description: todas las aseguradoras
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/aseguradoras'
 */
router.get("/", AseguradoraController.getAllAseguradoras)

/**
 * @swagger
 * /api/aseguradoras:
 *  post:
 *      summary: crea un aseguradora
 *      tags: [Aseguradoras]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/aseguradoras'
 *      responses:
 *          200:
 *              description: aseguradora creada!
 */
.post("/", AseguradoraController.createNewAseguradora)

/**
 * @swagger
 * /api/aseguradoras/{id}:
 *  get:
 *    summary: obtiene una aseguradora por id solicitado
 *    tags: [Aseguradoras]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del aseguradora
 *    responses:
 *      200:
 *          description: una aseguradora
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/aseguradoras'
 */
.get("/:idAseguradora", AseguradoraController.getAseguradoraById)

/**
 * @swagger
 * /api/aseguradoras/{id}:
 *  put:
 *      summary: modifica una aseguradoras por id
 *      tags: [Aseguradoras]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id de la aseguradora
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/aseguradoras'
 *      responses:
 *          200:
 *              description: aseguradoras actualizado!
 */
.put("/:idAseguradora", AseguradoraController.updateAseguradora)

/**
 * @swagger
 * /api/aseguradoras/{id}:
 *  delete:
 *    summary: elimina una aseguradora por id (solo actualiza el estado de activo a 0)
 *    tags: [Aseguradoras]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id de la aseguradora
 *    responses:
 *      200:
 *          description: aseguradora eliminado!  
 */
.delete("/:idAseguradora", AseguradoraController.deleteAseguradora);

module.exports = router;