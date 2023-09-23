const { Router } = require('express');
const { getProjects, assignUsersToProject,updateProject ,createProject, getProjectById, deleteProject } = require('../controllers/projectsControllers');
const { createUser,getallUsers } = require('../controllers/userControllers');
const router = Router();


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene una lista de proyectos con paginación y filtros.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página (opcional) para la paginación.
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *         description: Filtrar proyectos por ID de usuario.
 *       - in: query
 *         name: project_name
 *         schema:
 *           type: string
 *         description: Filtrar proyectos por nombre de proyecto (insensible a mayúsculas).
 *     responses:
 *       200:
 *         description: Lista de proyectos con paginación y filtros.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: Total de proyectos encontrados.
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles.
 *                 currentPage:
 *                   type: integer
 *                   description: Página actual.
 *                 projects:
 *                   type: array
 *                   description: Lista de proyectos encontrados.
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/projects', getProjects);
/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtiene un proyecto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto que se desea obtener.
 *     responses:
 *       200:
 *         description: Proyecto encontrado por ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Solicitud incorrecta debido a un ID faltante o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/projects/:id', getProjectById);
/**
 * @swagger
 * /projects/assign-users:
 *   post:
 *     summary: Asigna un usuario a un proyecto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: ID del proyecto al que se asignará el usuario.
 *               userId:
 *                 type: string
 *                 description: ID del usuario que se asignará al proyecto.
 *     responses:
 *       200:
 *         description: Asignación exitosa del usuario al proyecto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Solicitud incorrecta debido a datos faltantes o inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.post('/projects/assign-users', assignUsersToProject);
/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Elimina un proyecto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto que se eliminará.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: El proyecto no existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.delete('/delete/:id', deleteProject);
/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualizar un proyecto existente.
 *     description: Actualiza los detalles de un proyecto existente. Si se proporciona `project_manager_id`, se asignará al proyecto; de lo contrario, se eliminará cualquier asignación existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto que se va a actualizar.
 *         schema:
 *           type: integer
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
 *               state_project:
 *                 type: string
 *                 description: Estado del proyecto.
 *               project_manager_id:
 *                 type: integer
 *                 description: ID del gerente del proyecto. Si se proporciona, se asignará al proyecto; de lo contrario, se eliminará cualquier asignación existente.
 *     responses:
 *       200:
 *         description: Proyecto actualizado con éxito.
 *       400:
 *         description: Datos de entrada no válidos.
 *       404:
 *         description: Proyecto no encontrado.
 *       500:
 *         description: Error al actualizar el proyecto.
 */
router.put('/projects/update/:id', updateProject);
/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crear un nuevo proyecto.
 *     description: Crea un nuevo proyecto con los detalles proporcionados. Si se proporciona `project_manager_id`, se asignará al proyecto.
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
 *               state_project:
 *                 type: string
 *                 description: Estado del proyecto.
 *               project_manager_id:
 *                 type: integer
 *                 description: ID del gerente del proyecto. Si se proporciona, se asignará al proyecto.
 *     responses:
 *       201:
 *         description: Proyecto creado con éxito.
 *       400:
 *         description: Datos de entrada no válidos.
 *       500:
 *         description: Error al crear el proyecto.
 */
router.post('/projects/create', createProject);
/**
 * @swagger
 * /allusers:
 *   get:
 *     summary: Obtiene una lista de todos los usuarios con sus proyectos asociados.
 *     responses:
 *       200:
 *         description: Lista de usuarios y sus proyectos asociados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del usuario.
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del usuario.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización del usuario.
 *                   projects:
 *                     type: array
 *                     description: Lista de proyectos asociados al usuario.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID del proyecto.
 *                         project_name:
 *                           type: string
 *                           description: Nombre del proyecto.
 *                         description:
 *                           type: string
 *                           description: Descripción del proyecto.
 *                         state_project:
 *                           type: string
 *                           description: Estado del proyecto.
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Fecha de creación del proyecto.
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: Fecha de actualización del proyecto.
 *       400:
 *         description: No se encontraron usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.get('/allUsers',getallUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     requestBody:
 *       required: true
 *       description: Datos del nuevo usuario.
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
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *       400:
 *         description: El usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post('/users', createUser);



module.exports = router;
