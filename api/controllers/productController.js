const Ingredient = require("../../db/ingredient");
const Product = require("../../db/product");
const { ingredientWantedAttributes } = require("./ingredientController");
const ProductWantedAttributes = ["id", "name", "category", "price", "url"];

const getAllProduct = () => {
  try {
    return Product.findAll({
      attributes: ProductWantedAttributes,
      include: {
        model: Ingredient,
        attributes: ingredientWantedAttributes,
        as: "ingredients",
      },
    });
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({ name, category, price, url, ingredients }) => {
  try {
    const product = await Product.create({
      name,
      category,
      price,
      url,
    });

    const promises = ingredients.map(async (ingredient) => {
      const ingredients = await Ingredient.findOne({
        where: { id: ingredient },
      });
      if (!ingredients) return;

      product.addIngredient(ingredient);
    });

    await Promise.all(promises);

    return {
      id: product.id,
      name: product.name,
      ingredients: ingredients,
    };
  } catch (error) {
    throw error;
  }
};

const deleteProduct = (id) => {
  try {
    return Product.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  deleteProduct,
};
