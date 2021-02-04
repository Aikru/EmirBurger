const express = require("express");
const router = express.Router();
const ac = require("../utils/role");

const { param, body, validationResult } = require("express-validator");
const {
  getAllIngredient,
  createIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

// Get All
router.get("/", async (req, res) => {
  const permission = ac.can(req.user.role).readAny("ingredients");

  if (!permission.granted) {
    return res.status(403).end();
  }

  try {
    const users = await getAllIngredient();
    return res.send(users);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

//Create
//TODO: PRECISE EXPRESS VALIDATOR RESULT
router.post("/", async (req, res) => {
  const permission = ac.can(req.user.role).createAny("ingredients");

  if (!permission.granted) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await createIngredient(req.body);
    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Delete one
router.delete("/:id", [param("id").isInt()], async (req, res) => {
  const permissionOwn = ac.can(req.user.role).deleteOwn("ingredients");
  const permission = ac.can(req.user.role).deleteAny("ingredients");
  if (!permission.granted) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const ingredient = await deleteIngredient(req.params.id);
    if (!ingredient) {
      res.status(404);
    }
    return res.send("Le produit a bien été supprimé");
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
