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

    
    reduced_ingredients: {
        //manytomany product
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

module.exports = Command;
