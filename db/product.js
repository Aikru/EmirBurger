const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize");
const Ingredient = require("./ingredient");

class Product extends Sequelize.Model {}
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["Drink", "Dessert", "Burger", "Side dish", "Sauce"],
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "products",
  }
);

// Many to Many Ingredient & Product
Ingredient.belongsToMany(Product, {
  as: "ingredients",
  through: "product_ingredient",
  foreignKey: "ingredient_id",
  otherKey: "product_id",
});

Product.belongsToMany(Ingredient, {
  through: "product_ingredient",
});

module.exports = Product;
