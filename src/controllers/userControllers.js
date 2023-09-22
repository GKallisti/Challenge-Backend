const { User} = require("../db");


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

  module.exports = {
    createUser
  };
  