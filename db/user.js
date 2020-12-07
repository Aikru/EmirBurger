const User = require("../../db/Users");
const { generateEncryptedPassword } = require("../utils/password.utils");

const usersWantedAttributes = ["id", "username", "password", "email"];

const getAllUsers = () =>
  User.findAll({
    attributes: usersWantedAttributes,
  });

const createUser = async ({ id, username, password, email }) => {
  try {
    const password = await generateEncryptedPassword(`${$password}`);
    const user = await User.create({
      username,
      password,
      email,
    });

    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
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
  try {
    const user = await User.findOne({ where: { id } });
    const encryptedPassword = await generateEncryptedPassword(`${$password}`);

    if (!user) return null;

    user.username = username;
    user.password = encryptedPassword;
    user.email = email;

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
