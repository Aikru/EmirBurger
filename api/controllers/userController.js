const User = require("../../db/user");
const { generateEncryptedPassword } = require("../utils/password");
const usersWantedAttributes = ["id", "username", "email", "password"];

const getAllUsers = () =>
  User.findAll({
    attributes: usersWantedAttributes,
  });

const createUser = async ({ username, password, email }) => {
  try {
    const EncryptedPassword = await generateEncryptedPassword(
      { password }.toString()
    );
    const user = await User.create(
      {
        username,
        email,
      },
      EncryptedPassword
    );

    return {
      id: user.id,
      username: user.username,
      password: EncryptedPassword,
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
    const encryptedPassword = await generateEncryptedPassword(
      { password }.toString()
    );

    if (!user) return null;

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
