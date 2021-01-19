const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize"); // Import the built-in data types

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["USER", "WORKER", "ADMIN"],
      defaultValue: "USER",
      

    },
  },

  {
    sequelize,
    modelName: "users",
  }
);

module.exports = Users;
