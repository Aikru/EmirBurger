const User = require("../../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersWantedAttributes = ["id", "username", "email", "password"];

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: usersWantedAttributes,
    });
    if (!user) {
      throw new Error("Email / Mot de passe incorrect");
    }

    console.log(password);
    console.log(user);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Email / Mot de passe incorrect");
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);

    return {
      accessToken,
      userId: user.id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
