const Sequelize = require("sequelize");
const { sequelize } = require("./connection");
const { DataTypes } = require("sequelize"); // Import the built-in data types

class Command extends Sequelize.Model {}
Command.init(
  {
    eat_in?: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    date: {
      type: DataTypes.Date,
      defaultValue: Sequelize.NOW,
    },

    has_been_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },


    product: {
      //ManyToMany  
    },

    



    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },

  {
    sequelize,
    modelName: "command",
  }

  
);

  // Many to Many Command & Product

  Command.belongsToMany(Product, {
    as: "product",
    through: "product_command",
    foreignKey: "command_id",
    otherKey: "product_id",
    timestamps: false,
  });
  
  Product.belongsToMany(Command, {
    as: "command",
    through: "product_command",
    foreignKey: "product_id",
    otherKey: "command_id",
    timestamps: false,
  })
module.exports = Command;
