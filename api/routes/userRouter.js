const express = require("express");
const router = express.Router();

const ac = require("../utils/role");

const { param, body, validationResult } = require("express-validator");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Get All
router.get("/", async (req, res) => {
  const permission = ac.roles.can(req.user.role).readAny("users");

  if (!permission.granted) {
    return res.status(403).end();
  }

  try {
    const users = await getAllUsers();
    return res.send(users);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Create
router.post("/", [body("email").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Get one
router.get("/:id", [param("id").isInt()], async (req, res) => {
  const permissionOwn = ac.roles.can(req.user.role).readOwn("users");
  if (
    (!permissionOwn.granted && param("id") === req.user.id) ||
    !ac.can(req.user.role).GetAny("users")
  ) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await getUser(req.params.id);
    if (!user) {
      res.status(404);
    }
    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Edit one
router.put("/:id", [param("id").isInt()], async (req, res) => {
  const permissionOwn = ac.can(req.user.role).updateOwn("users");

  if (
    (!permissionOwn && param("id") === req.user.id) ||
    !ac.can(req.user.role).UpdateAny("users")
  ) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404);
    }

    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Delete one
router.delete("/:id", [param("id").isInt()], async (req, res) => {
  const permissionOwn = ac.can(req.user.role).deleteOwn("users");

  if (
    (!permissionOwn && param("id") === req.user.id) ||
    !ac.can(req.user.role).deleteAny("users")
  ) {
    return res.status(403).end();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      res.status(404);
    }
    return res.send("Le user a bien été supprimé");
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
