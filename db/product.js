const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize");

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
  },

  {
    sequelize,
    modelName: "product",
  }
);

module.exports = Product;
