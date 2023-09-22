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
      include: [
        {
          model: User,
        },
      ],
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
    return res.status(500).json({ error: "Error getting projects with pagination" });
  }
}

async function getProjectById (req, res) {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: {
        id: id,
      },include: [
        { model: User, attributes: ["id", "name"] },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get Project" });
  }
};


async function createOrUpdateProject  (req, res) {
  const { id } = req.params; 
  const { project_name, description, state_project, project_manager_id, assigned_to_ids } = req.body;

  try {
    let project;
    if (id) {
      project = await Project.findOne({
        where: {
          id: id,
        },
      });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
    }

    if (project) {
      await project.update({
        project_name,
        description,
        state_project,
        project_manager_id,
        assigned_to_ids
      });

     
      res.json({ message: "Project updated successfully" });
    } else {
      
      project = await Project.create({
        project_name,
        description,
        state_project,
        project_manager_id,
      });

     

      res.status(201).json({ message: "Project created successfully", project });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create or update Project" });
  }
};


  async function deleteProject(req, res) {
    const { id } = req.params;
    try {
      const project = await Post.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: "The project doesnt exist" });
      }
  
      await project.destroy();
      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  
  async function assignUsersToProject (req, res) {
    const { id } = req.params; 
    const { assignedUserIds } = req.body; 
  
    try {
     
      const project = await Project.findByPk(id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
    
      if (!Array.isArray(assignedUserIds) || assignedUserIds.length === 0) {
        return res.status(400).json({ message: "Invalid assignedUserIds format" });
      }
  
     
      const users = await User.findAll({
        where: {
          id: assignedUserIds,
        },
      });
  
      if (users.length !== assignedUserIds.length) {
        return res.status(400).json({ message: "One or more users not found" });
      }
  
      
      await project.addUsers(users);
  
      res.json({ message: "Users assigned to project successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to assign users to project" });
    }
  };
  
  
  module.exports = {
    getProjects,
    getProjectById,
    createOrUpdateProject,
    deleteProject,
    assignUsersToProject,
  };