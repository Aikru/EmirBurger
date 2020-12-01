const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize");

class Ingredient extends Sequelize.Model {}
Ingredient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "ingrédient",
  }
);

module.exports = Ingredient;
