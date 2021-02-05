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

    is_archived: {
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

// // Many to Many Order & Product
Order.belongsToMany(Product, {
  as: "orders",
  through: "order_product",
  foreignKey: "order_id",
  otherKey: "product_id",
});

Product.belongsToMany(Order, {
  as: "products",
  through: "order_product",
});

module.exports = Order;
