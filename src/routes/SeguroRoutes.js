const express = require('express');
const router = express.Router();
const SeguroController = require('../controller/SeguroController');

/**
 * @swagger
 * components:
 *  schemas:
 *      seguros:
 *          type: object
 *          properties:
 *              idSeguro:
 *                  type: integer
 *                  description: id del seguro
 *              fecha_contratacion:
 *                  type: string
 *                  description: fecha de creacion del seguro de automovil
 *              fecha_vigencia:
 *                  type: string
 *                  description: fecha en la que expira la validez del seguro
 *              idCotizacion:
 *                  type: integer
 *                  description: id de la cotizacion del seguro
 *          required:
 *              - fecha_contratacion
 *              - fecha_vigencia
 *              - idCotizacion
 *          example:
 *              fecha_contratacion: '2024-04-20'
 *              fecha_vigencia: '2024-04-20'
 *              idContratacion: 1
 */

/**
 * @swagger
 * /api/seguros:
 *  get:
 *    summary: obtiene todas los seguros
 *    tags: [Seguros]
 *    responses:
 *      200:
 *          description: todos los seguros
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/seguros'
 */
router.get("/", SeguroController.getAllSeguros)

/**
 * @swagger
 * /api/seguros:
 *  post:
 *      summary: crea una marca de automovil
 *      tags: [Seguros]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/seguros'
 *      responses:
 *          200:
 *              description: Marca creada!
 */
.post("/", SeguroController.createNewSeguro)

/**
 * @swagger
 * /api/seguros/{id}:
 *  get:
 *    summary: obtiene un seguro por id solicitado
 *    tags: [Seguros]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del seguro
 *    responses:
 *      200:
 *          description: un seguro
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/seguros'
 */
.get("/:idSeguro", SeguroController.getSeguroById)

/**
 * @swagger
 * /api/seguros/{id}:
 *  put:
 *      summary: modifica un seguro por id
 *      tags: [Seguros]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del seguro
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/seguros'
 *      responses:
 *          200:
 *              description: seguro actualizado!
 */
.put("/:idSeguro", SeguroController.updateSeguro);

module.exports = router;