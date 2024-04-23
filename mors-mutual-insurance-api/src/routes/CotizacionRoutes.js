const express = require('express');
const router = express.Router();
const CotizacionController = require('../controller/CotizacionController');

/**
 * @swagger
 * components:
 *  schemas:
 *      cotizaciones:
 *          type: object
 *          properties:
 *              idCotizacion:
 *                  type: integer
 *                  description: id del cotizacion
 *              total:
 *                  type: integer
 *                  description: total de la cotizacion del seguro
 *              idAsegurado:
 *                  type: integer
 *                  description: id de referencia del asegurado
 *              idVehiculo:
 *                  type: integer
 *                  description: id de referencia del vehiculo asegurado
 *              idAseguradora:
 *                  type: integer
 *                  description: id de referencia de la aseguradora que presta el servicio
 *              prima_neta:
 *                  type: decimal
 *                  description: prima neta
 *              descuento:
 *                  type: decimal
 *                  description: descuento aplicado en el seguro
 *              prima_modulos:
 *                  type: decimal
 *                  description: prima de los modulos aplicados
 *              recargo_fraccionamiento:
 *                  type: decimal
 *                  description: recargo fraccionamiento
 *              reduccion_autorizada:
 *                  type: decimal
 *                  description: reduccion autorizada sobre el seguro
 *              derecho de poliza:
 *                  type: decimal
 *                  description: monto a cubrir por el derecho de poliza
 *              iva:
 *                  type: decimal
 *                  description: iva aplicado sobre el seguro
 *              conceptos:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          idConcepto:
 *                              type: integer
 *                          descripcion:
 *                              type: string
 *                          precio:
 *                              type: decimal
 *                          activo:
 *                              type: integer
 *                      
 *          required:
 *              - fecha
 *              - total
 *              - idAsegurado
 *              - idVehiculo
 *              - idAseguradora
 *              - prima_neta
 *              - descuento
 *              - prima_modulos
 *              - recargo_fraccionamiento
 *              - reduccion_autorizada
 *              - derecho_poliza
 *              - iva
 *              - cotizaciones
 *          example:
 *              fecha: '2024-04-21'
 *              total: 7658.95
 *              idAsegurado: 1
 *              idVehiculo: 1
 *              idAseguradora: 1
 *              prima_neta: 356.99
 *              descuento: 356.00
 *              prima_modulos: 12345.23
 *              recargo_fraccionamiento: 2345.44
 *              reduccion_autorizada: 123.00
 *              derecho_poliza: 2345.00
 *              iva: 123.88
 *              conceptos: [{
 *                  idConcepto: 1, 
 *                  descripcion: daño a terceros, 
 *                  precio: 2334.00, 
 *                  activo: 1
 *                  },{
 *                  idConcepto: 1, 
 *                  descripcion: poliza, 
 *                  precio: 1234.00, 
 *                  activo: 1}]
 *                    
 *                  
 */

/**
 * @swagger
 * /api/cotizaciones:
 *  get:
 *    summary: obtiene todas los cotizaciones
 *    tags: [Cotizaciones]
 *    responses:
 *      200:
 *          description: todos los cotizaciones
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/cotizaciones'
 */
router.get("/", CotizacionController.getAllCotizaciones)

/**
 * @swagger
 * /api/cotizaciones:
 *  post:
 *      summary: crea una marca de automovil
 *      tags: [Cotizaciones]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cotizaciones'
 *      responses:
 *          200:
 *              description: Marca creada!
 */
.post("/", CotizacionController.createNewCotizacion)

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *  get:
 *    summary: obtiene un cotizacion por id solicitado
 *    tags: [Cotizaciones]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del cotizacion
 *    responses:
 *      200:
 *          description: un cotizacion
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/cotizaciones'
 */
.get("/:idCotizacion", CotizacionController.getCotizacionById)

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *  put:
 *      summary: modifica un cotizacion por id
 *      tags: [Cotizaciones]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del cotizacion
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/cotizaciones'
 *      responses:
 *          200:
 *              description: cotizacion actualizado!
 */
.put("/:idCotizacion", CotizacionController.updateCotizacion);

module.exports = router;