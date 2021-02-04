const express = require("express");
const router = express.Router();
const ac = require("../utils/role");

const { param, body, validationResult } = require("express-validator");
const {
  createOrder,
  getAllOrder,
  deleteOrder,
} = require("../controllers/orderController");

// Get All
router.get("/", async (req, res) => {
  const permission = ac.can(req.user.role).readAny("orders");

  if (!permission.granted) {
    return res.status(403).end();
  }

  try {
    const order = await getAllOrder();
    return res.send(order);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

//Create
//TODO: PRECISE VALIDATION RESULT
router.post("/", async (req, res) => {
  const permission = ac.can(req.user.role).createAny("orders");

  if (!permission.granted) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await createOrder(req.body);
    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Delete one
router.delete("/:id", [param("id").isInt()], async (req, res) => {
  const permission = ac.can(req.user.role).deleteAny("orders");
  if (!permission.granted) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    console.log("OUUUUUUUUUUUUUUUT");

    const order = await deleteOrder(req.params.id);
    if (!order) {
      res.status(404);
    }
    return res.send("Le produit a bien été supprimé");
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
