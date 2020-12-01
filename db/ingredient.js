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
    modelName: "ingrédient",
  }
);

//ManyToMany ingredients_Products

Product.belongsToMany(Ingredients, {
  as: "ingredients",
  through: "product_ingredients",
  foreignKey: "product_id",
  otherKey: "ingredient_id",
  timestamps: false,
});

Ingredient.belongsToMany(Product, {
  as: "ingredients",
  through: "product_ingredients",
  foreignKey: "ingredient_id",
  otherKey: "product_id",
  timestamps: false,
});

module.exports = Ingredient;
