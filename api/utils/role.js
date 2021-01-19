const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("USER")
.createOwn("orders")
 .readOwn("orders")
 .readAny("products")
 .readAny("ingredients")


ac.grant("WORKER")
 .extend("basic")
 .readAny("orders")
 .updateAny("orders")


ac.grant("ADMIN")
 .extend("basic")
 .extend("supervisor")

 .createAny("products")
 .updateAny("products")
 .deleteAny("products")

 .createAny("ingredients")
 .updateAny("ingredients")
 .deleteAny("ingredients")

return ac;
})();