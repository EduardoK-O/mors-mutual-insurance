const express = require('express');
const router = express.Router();
const ArchivoControler = require('../controller/ArchivoController');

/**
 * @swagger
 * components:
 *  schemas:
 *      archivos:
 *          type: object
 *          properties:
 *              idArchivo:
 *                  type: integer
 *                  description: id del archivo
 *              idAsegurado:
 *                  type: integer
 *                  description: id del Asegurado a quien se le realiza la cotizacion
 *              idCotizacion:
 *                  type: integer
 *                  description: id de referencia de la cotizacion
 *              ruta:
 *                  type: string
 *                  description: ruta del archivo pdf de la cotizacion
 *          required:
 *              - ruta
 *          example:
 *              ruta: ./src/resources/pdf/Cotizacion.pdf          
 */

/**
 * @swagger
 * /api/archivos:
 *  get:
 *    summary: obtiene todos los registros de archivos pdf creados sin registro de cotizacion
 *    tags: [Archivos]
 *    responses:
 *      200:
 *          description: todos los registros de archivo pdf
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/archivos'
 */
router.get("/", ArchivoControler.getAllArchivos)

/**
 * @swagger
 * /api/archivos/{id}:
 *  get:
 *    summary: obtiene un archivo pdf por id de cotizacion
 *    tags: [Archivos]
 *    produces:
 *      - application/pdf
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: devuelve el archivo pdf de la cotizacion seleccionada
 *    responses:
 *      200:
 *          description: devuelve un archivo pdf asociado a un idCotizacion
 *          schema:
 *              type: file
 */
.get("/:idCotizacion", ArchivoControler.getArchivoByIdCotizacion)

/**
 * @swagger
 * /api/archivos:
 *  post:
 *      summary: obtiene el archivo de la cotizacion por la ruta
 *      tags: [Archivos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/archivos'
 *      responses:
 *          200:
 *              description: archivo pdf solicitado
 *              schema:
 *                  type: file
 * 
 */
.post("/", ArchivoControler.getArchivo);

module.exports = router;