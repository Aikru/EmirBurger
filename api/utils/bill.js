const bill = function (obj) {
  //TODO : cleverst manner to have the menu
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const arrPrice = [];
  obj.forEach((el) => arrPrice.push(el.price));
  return arrPrice.reduce(reducer);
};

module.exports = bill;
