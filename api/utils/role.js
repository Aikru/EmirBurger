const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("USER")
.createOwn("orders")
 .readOwn("orders")
 .readAny("products")
 .readAny("ingredients")


ac.grant("WORKER")
 .extend("USER")
 .readAny("orders")
 .updateAny("orders")


ac.grant("ADMIN")
 .extend("USER")
 .extend("WORKER")

 .createAny("products")
 .updateAny("products")
 .deleteAny("products")

 .createAny("ingredients")
 .updateAny("ingredients")
 .deleteAny("ingredients")

return ac;
});