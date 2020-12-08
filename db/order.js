const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize"); // Import the built-in data types
const Product = require("./product");

class Order extends Sequelize.Model {}
Order.init(
  {
    eat_in: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },

    has_been_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },

  {
    sequelize,
    modelName: "orders",
  }
);

// Many to Many order & Product
Order.belongsToMany(Product, { through: "Order_Products" });
Product.belongsToMany(Order, { through: "Order_Products" });

module.exports = Order;
