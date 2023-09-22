// Importa Sequelize y la conexión a la base de datos
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('Project', {
    id: {
      allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      state_project: {
        type: DataTypes.ENUM('pending', 'enabled', 'completed'),
        allowNull: false,
      },
});
};

