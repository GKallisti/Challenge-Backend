const { Project, User } = require("../db");


async function createUser (req, res) {
    const { name, email, password } = req.body;
    const allUsers = await User.findAll();
    const userExists = allUsers.find((user) => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    let new_user = null;
    try {
      new_user = await User.create(
        {
          name: name,
          email: email,
          password: password,
          
        },
        {
          attributes: { exclude: ["password"] },
        }
      );
      res.json(new_user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating user" });
    }
  };

  async function getUsers() {
    try {
        const users = User.findAll({
          include: Project
        })
        return users
    } catch (error) {
        throw new Error('Users not found')
    }
}

const getallUsers = async (req, res) => {
  try {
      const users = await getUsers()
      if (users.length === 0) {
          res.status(400).json({ error: 'No user found' })
      } else {
          res.status(200).json(users)
      }
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: error.message })
  }
}
  

  module.exports = {
    createUser,
    getallUsers
  };
  