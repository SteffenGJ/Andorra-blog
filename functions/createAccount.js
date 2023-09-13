const User = require("../models/user");

const createAccount = async (username, passwordHash) => {
  const user = new User({
    username,
    passwordHash,
    authorization: "Pending",
  });

  await user.save();

  return {
    success: true,
    data: user,
  };
};

module.exports = createAccount;
