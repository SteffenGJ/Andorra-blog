const User = require("../../models/user");

const isUsernameTaken = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.user.username });

  if (user) {
    const error = new Error("Brugernavnet er allerede taget.");
    next(error);
  }

  next();
};

module.exports = isUsernameTaken;
