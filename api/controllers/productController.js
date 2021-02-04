const Product = require("../../db/product");
const ProductWantedAttributes = ["id", "name", "category", "price", "url"];

const getAllProduct = () => {
  try {
    return Product.findAll({
      attributes: ProductWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({ name, category, price, url }) => {
  try {
    const product = await Product.create({
      name,
      category,
      price,
      url,
    });

    return {
      id: product.id,
      name: product.name,
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
