const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize");
const Product = require("./product");

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
    modelName: "ingredients",
  }
);

//ManyToMany ingredients_Products

Ingredient.belongsToMany(Product, { through: "ingredients_Products" });
Product.belongsToMany(Ingredient, { through: "ingredients_Products" });

module.exports = Ingredient;
