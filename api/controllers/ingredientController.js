const Ingredient = require("../../db/ingredient");
const ingredientWantedAttributes = ["id", "name", "price", "inventory"];

const getAllIngredient = () => {
  try {
    return Ingredient.findAll({
      attributes: ingredientWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const createIngredient = async ({ id, name, price, inventory }) => {
  try {
    const ingredient = await Ingredient.create({
      id,
      name,
      price,
      inventory,
    });

    return {
      id: ingredient.id,
      name: ingredient.name,
    };
  } catch (error) {
    throw error;
  }
};

const deleteIngredient = (id) => {
  try {
    return Ingredient.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllIngredient,
  createIngredient,
  deleteIngredient,
};
