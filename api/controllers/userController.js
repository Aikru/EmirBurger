const User = require("../../db/user");
const { generateEncryptedPassword } = require("../utils/password");
const usersWantedAttributes = ["id", "username", "email", "password"];

const accesscontrol = require("../utils/role");
const ac = accesscontrol.roles;

const getAllUsers = () => {
  return User.findAll({
    attributes: usersWantedAttributes,
  });
};
const createUser = async ({ username, password, email }) => {
  // try {
  // if (
  //   User.findOne({
  //     where: { email: email },
  //   })
  // ) {
  //   throw new Error("Email déjà utilisé");
  // }

  const EncryptedPassword = await generateEncryptedPassword(password);
  const user = await User.create({
    username,
    email,
    password: EncryptedPassword,
  });

  return {
    id: user.id,
    username: user.username,
    password: EncryptedPassword,
    email: user.email,
  };
  // } catch (error) {
  //   throw error;
  // }
};

const getUser = (id) => {
  try {
    return User.findOne({
      where: { id },
      attributes: usersWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, { username, password, email }) => {
  const permission = ac.can(req.user.role).updateAny("user");
  const permissionOwn = ac.can(req.user.role).updateOwn("user");

  if (!permission.granted || (permissionOwn && id === req.user.id)) {
    return res.status(403).end();
  }

  try {
    const user = await User.findOne({ where: { id } });
    const encryptedPassword = await generateEncryptedPassword(
      { password }.toString()
    );

    if (!user) return null;

    if (
      User.findOne({
        where: { email: email },
      })
    ) {
      throw new Error("Email déjà utilisé");
    }

    user.username = username;
    user.email = email;
    user.password = encryptedPassword;

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = (id) => {
  try {
    return User.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  usersWantedAttributes,
};
