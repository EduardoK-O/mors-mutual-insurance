const express = require('express');
const router = express.Router();
const VehiculoController = require('../controller/VehiculoController');

/**
 * @swagger
 * components:
 *  schemas:
 *      vehiculos:
 *          type: object
 *          properties:
 *              idVehiculos:
 *                  type: integer
 *                  description: id del usuario
 *              anio:
 *                  type: string
 *                  description: anio del vehiculo
 *              num_serie:
 *                  type: string
 *                  description: numero de serie del vehiculo
 *              idModelo:
 *                  type: integer
 *                  description: id de referencia del modelo
 *          required:
 *              - anio
 *              - num_serie
 *              - idModelo
 *          example:
 *              anio: 2007
 *              num_serie: ASZKT12326-7AX12
 *              idModelo: 1
 */

/**
 * @swagger
 * /api/vehiculos:
 *  get:
 *    summary: obtiene todas los vehiculos
 *    tags: [Vehiculos]
 *    responses:
 *      200:
 *          description: todos los vehiculos
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/vehiculos'
 */
router.get("/", VehiculoController.getAllVehiculos)

/**
 * @swagger
 * /api/vehiculos:
 *  post:
 *      summary: crea una marca de automovil
 *      tags: [Vehiculos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/vehiculos'
 *      responses:
 *          200:
 *              description: Vehiculo creada!
 */
.post("/", VehiculoController.createNewVehiculo)

/**
 * @swagger
 * /api/vehiculos/{id}:
 *  get:
 *    summary: obtiene un vehiculo por id solicitado
 *    tags: [Vehiculos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del vehiculo
 *    responses:
 *      200:
 *          description: un vehiculo
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/vehiculos'
 */
.get("/:idVehiculo", VehiculoController.getVehiculoById)

/**
 * @swagger
 * /api/vehiculos/{id}:
 *  put:
 *      summary: modifica un vehiculo por id
 *      tags: [Vehiculos]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del vehiculo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/vehiculos'
 *      responses:
 *          200:
 *              description: vehiculo actualizado!
 */
.put("/:idVehiculo", VehiculoController.updateVehiculo);

module.exports = router;