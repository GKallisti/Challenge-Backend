const { Router } = require('express');
const { getProjects, assignUsersToProject, createOrUpdateProject, getProjectById, deleteProject } = require('../controllers/projectsControllers');
const { createUser } = require('../controllers/userControllers');
const router = Router();


/**
 * @swagger
 * /projects:
 *   get: 
 *     description: Obtiene una lista de proyectos con paginación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página (opcional)
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *         description: ID del usuario para filtrar proyectos por usuario (opcional)
 *     responses:
 *       '200':
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectList'
 */
router.get('/projects', getProjects);
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     description: Obtiene un proyecto específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto que se desea obtener.
 *     responses:
 *       '200':
 *         description: Datos del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '404':
 *         description: El proyecto no fue encontrado.
 */
router.get('/projects:id', getProjectById);
/**
 * @swagger
 * /users:
 *   post:
 *     description: Crea un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Solicitud incorrecta o datos faltantes.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/users', createUser);
/**
 * @swagger
 * /projects:
 *   post:
 *     description: Crea un nuevo proyecto en el sistema o actualiza uno existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *                 description: Nombre del proyecto.
 *               description:
 *                 type: string
 *                 description: Descripción del proyecto.
 *               status:
 *                 type: string
 *                 enum: [pending, enabled, disabled, completed]
 *                 description: Estado del proyecto (opcional).
 *               project_manager_id:
 *                 type: string
 *                 description: ID del administrador del proyecto.
 *               assigned_to_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Arreglo de IDs de usuarios asignados al proyecto (opcional).
 *             required:
 *               - project_name
 *               - description
 *               - project_manager_id
 *     responses:
 *       '201':
 *         description: Proyecto creado o actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Solicitud incorrecta o datos faltantes.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/projects', createOrUpdateProject);
/**
 * @swagger
 * /projects/{id}/assign-users:
 *   post:
 *     description: Asigna uno o varios usuarios a un proyecto existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto al que se asignarán los usuarios.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assigned_to_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Arreglo de IDs de usuarios a asignar al proyecto.
 *             required:
 *               - assigned_to_ids
 *     responses:
 *       '200':
 *         description: Usuarios asignados al proyecto exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: Solicitud incorrecta o datos faltantes.
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/projects/:id/assign-users', assignUsersToProject);
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     description: Elimina un proyecto existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto que se desea eliminar.
 *     responses:
 *       '200':
 *         description: Proyecto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '404':
 *         description: El proyecto no fue encontrado.
 *       '500':
 *         description: Error interno del servidor.
 */
router.delete('/delete/:id', deleteProject);

module.exports = router;
