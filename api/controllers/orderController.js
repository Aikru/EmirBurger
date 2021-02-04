const Order = require("../../db/order");
const OrderWantedAttributes = [
  "eat_in",
  "date",
  "has_been_paid",
  "is_archived",
  "total",
];

const getAllOrder = () => {
  try {
    return Order.findAll({
      attributes: OrderWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const createOrder = async ({
  eat_in,
  date,
  has_been_paid,
  is_archived,
  total,
}) => {
  try {
    const order = await Order.create({
      eat_in,
      date,
      has_been_paid,
      is_archived,
      total,
    });

    return {
      id: order.id,
      total: order.total,
    };
  } catch (error) {
    throw error;
  }
};

const deleteOrder = (id) => {
  try {
    console.log("INNNNNNNNNNNNNNNNNNNNN");
    return Order.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  deleteOrder,
};
