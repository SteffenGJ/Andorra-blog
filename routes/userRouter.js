const userRouter = require("express").Router();
const User = require("../models/user");
const isUsernameTaken = require("../functions/middleware/isUsernameTaken");
const createAccount = require("../functions/createAccount");

userRouter.post("/", isUsernameTaken, async (req, res, next) => {
  try {
    const message = await createAccount(
      req.body.user.username,
      req.body.user.passwordHash
    );
    res.json(message);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ id: null });
    }

    res.json({ id: user._id });
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
