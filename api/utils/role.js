const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const role = (function () {
  ac.grant("USER")
    .createOwn("orders")
    .readOwn("orders")
    .readAny("products")
    .readAny("ingredients")
    .deleteOwn("users")
    .readOwn("users");

  ac.grant("WORKER").extend("USER").readAny("orders").updateAny("orders");

  ac.grant("ADMIN")
    .extend("USER")
    .extend("WORKER")

    .createAny("products")
    .readAny("products")
    .updateAny("products")
    .deleteAny("products")

    .createAny("users")
    .readAny("users")
    .updateAny("users")
    .deleteAny("users")

    .createAny("ingredients")
    .readAny("ingredients")
    .updateAny("ingredients")
    .deleteAny("ingredients");

  return ac;
})();
module.exports = role;
