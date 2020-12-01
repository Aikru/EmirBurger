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
      //TODO Boisson||dessert||Burger||Accompagnement||Sauce
      type: DataTypes.STRING,
      allowNull: false,
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
