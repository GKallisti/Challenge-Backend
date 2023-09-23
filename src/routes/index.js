const { Router } = require('express');
const { getProjects, assignUsersToProject,updateProject ,createProject, getProjectById, deleteProject } = require('../controllers/projectsControllers');
const { createUser,getallUsers } = require('../controllers/userControllers');
const router = Router();


router.get('/projects', getProjects);

router.get('/projects/:id', getProjectById);

router.post('/users', createUser);

router.post('/projects/assign-users', assignUsersToProject);

router.delete('/delete/:id', deleteProject);

router.put('/projects/update/:id', updateProject);

router.post('/projects/create', createProject);

router.get('/allUsers',getallUsers);




module.exports = router;
