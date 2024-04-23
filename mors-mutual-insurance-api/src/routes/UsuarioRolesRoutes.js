const express = require('express');
const router = express.Router();
const usuarioRolesController = require("../controller/UsuarioRolesController");

/**
 * @swagger
 * components:
 *  schemas:
 *      usuario_roles:
 *          type: object
 *          properties:
 *              idRol:
 *                  type: integer
 *                  description: id del rol de usuario
 *              nombre:
 *                  type: string
 *                  description: nombre del rol de usuario
 *          required:
 *              - nombre
 *          example:
 *              nombre: administrador 
 */


/**
 * @swagger
 * /api/usuario-roles:
 *  get:
 *    summary: obtiene todos los roles de usuario
 *    tags: [Roles de usuario]
 *    responses:
 *      200:
 *          description: todos los roles de usuario
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/usuario_roles'
 */
router.get("/", usuarioRolesController.getAllUsuarioRoles)

/**
 * @swagger
 * /api/usuario-roles:
 *  post:
 *      summary: crea un rol de usuario
 *      tags: [Roles de usuario]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuario_roles'
 *      responses:
 *          200:
 *              description: Rol de usuario creado!
 */
.post("/", usuarioRolesController.createNewUsuarioRol)

/**
 * @swagger
 * /api/usuario-roles/{id}:
 *  get:
 *    summary: obtiene un rol de usuario por id solicitado
 *    tags: [Roles de usuario]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del usuario
 *    responses:
 *      200:
 *          description: un rol de usuario
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/components/schemas/usuario_roles'
 */
.get("/:usuarioRolId", usuarioRolesController.getOneUsuarioRol)

/**
 * @swagger
 * /api/usuario-roles/{id}:
 *  put:
 *      summary: modifica un usuario por id
 *      tags: [Roles de usuario]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del rol de usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuario_roles'
 *      responses:
 *          200:
 *              description: Usuario actualizado!
 */
.put("/:usuarioRolId", usuarioRolesController.updateOneUsuarioRol)

/**
 * @swagger
 * /api/usuario-roles/{id}:
 *  delete:
 *    summary: elimina un rol de usuario por id (solo actualiza el estado de activo a 0)
 *    tags: [Roles de usuario]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: el id del rol de usuario
 *    responses:
 *      200:
 *          description: rol de usuario eliminado!  
 */
.delete("/:usuarioRolId", usuarioRolesController.deleteOneUsuarioRol);

module.exports = router;