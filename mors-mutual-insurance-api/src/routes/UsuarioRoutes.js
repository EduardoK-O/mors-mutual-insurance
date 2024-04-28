const express = require('express');
const router = express.Router();
const usuarioController = require("../controller/UsuarioController");

/**
 * @swagger
 * components:
 *  schemas:
 *      usuarios:
 *          type: object
 *          properties:
 *              idUsuario:
 *                  type: integer
 *                  description: id del usuario
 *              nombre:
 *                  type: string
 *                  description: nombre del propietario de la cuenta de usuario
 *              username:
 *                  type: string
 *                  description: nombre de usuario
 *              password:
 *                  type: string
 *                  description: contraseña del usuario
 *              correo:
 *                  type: string
 *                  description: email del usuario
 *              idRol:
 *                  type: integer
 *                  description: id de referencia al rol del usuario
 *              activo:
 *                  type: integer
 *                  description: indica si el registro del usuario se encuentra activo
 *          required:
 *              - nombre
 *              - username
 *              - password
 *              - correo
 *              - idRol
 *          example:
 *              nombre: David Soberanis
 *              username: DaSob
 *              password: aaj2u2lkh123549ASDF12345
 *              correo: david.soberanis@email.com
 *              idRol: 1
 */

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: obtiene todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *          description: todos los usuarios
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/usuarios'
 */
router.get("/", usuarioController.validateToken, usuarioController.getAllUsers)

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *      summary: crea un usuario
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuarios'
 *      responses:
 *          200:
 *              description: Usuario creado!
 */
.post("/", usuarioController.validateToken, usuarioController.createNewUser)

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    summary: obtiene un usuario por id solicitado
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
 *          description: un usuario
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/usuarios'
 */
.get("/:userId", usuarioController.validateToken, usuarioController.getUserById)


/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *      summary: modifica un usuario por id
 *      tags: [Usuarios]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuarios'
 *      responses:
 *          200:
 *              description: Usuario actualizado!
 */
.put("/:userId", usuarioController.validateToken, usuarioController.updateUser)

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
.delete("/:userId", usuarioController.validateToken, usuarioController.deleteUSer)

/**
 * @swagger
 * /api/usuarios/login:
 *  post:
 *      summary: inicia sesion devuelve el token
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: usuario autenticado
 */
.post("/login", usuarioController.login);

module.exports = router;