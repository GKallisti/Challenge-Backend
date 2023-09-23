const { Project, User } = require("../db");


async function getProjects(req, res) {
  const { page, userid, project_name } = req.query;
  const pageSize = 5;
  let offset = 0;
  let whereClause = {};
  
  if (userid) {
    whereClause["$User.id$"] = userid;
  }
  if (project_name) {
    whereClause.project_name = {
      [Sequelize.Op.iLike]: `%${project_name}%`, 
    };
  }
  try {
    let projects;
    let count;
    let totalPages;
    if (page) {
      offset = (parseInt(page) - 1) * pageSize;
    }

    const result = await Project.findAndCountAll({
      where: whereClause,
      include: User,
      limit: pageSize,
      offset: offset,
      distinct: true,
    });

    count = result.count;
    projects = result.rows;
    totalPages = Math.ceil(count / pageSize);

    res.json({
      totalCount: count,
      totalPages,
      currentPage: parseInt(page) || 1,
      projects,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getProjectId(id) {
  try {
      const foundProject = await Project.findByPk(id,{
        include: User
    })
      return foundProject
  } catch (error) {
      throw new Error('Project not found')
  }
}


const getProjectById = async (req, res) => {
  const { id } = req.params
  if (!id) res.status(400).json({ error: 'Missing id' })
  try {
      const project = await getProjectId(id)
      if (!project || project === null) {
          res.status(400).json({ error: 'No project found' })
      } else {
          res.status(200).json(project)
      }
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}


async function createProject(req, res) {
  const { project_name, description, state_project, project_manager_id } = req.body;

  try {
    
    const project = await Project.create({
      project_name,
      description,
      state_project,
      
    });

    const project_manager = await User.findByPk(project_manager_id)
    await project_manager.setProject(project)

    await project.setUser(project_manager_id)


    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create Project" });
  }
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { project_name, description, state_project, project_manager_id, } = req.body;
  try {
     const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.project_name = project_name;
    project.description = description;
    project.state_project = state_project;
    await project.save();

    const project_manager = await User.findByPk(project_manager_id)
    await project_manager.setProject(project)
    await project.setUser(project_manager_id)


    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update project" });
  }
}


  async function deleteProject(req, res) {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: "The project doesnt exist" });
      }
  
      await project.destroy();
      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
 

async function assign( projectId, userId) {
  try {
      const project = await Project.findByPk(projectId)
      await project.addUsers(userId)
      return project
  } catch (error) {
      throw new Error('Project not found')
  }
}

const assignUsersToProject = async (req, res) => {
  const { projectId, userId } = req.body
  try {
      const project = await assign(projectId, userId)
      if (!project || project === null) {
          res.status(400).json({ error: 'No project found' })
      } else {
          res.status(200).json(project)
      }
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}
 
  
  module.exports = {
    getProjects,
    getProjectById,
    updateProject,
    createProject,
    deleteProject,
    assignUsersToProject,
  };