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

module.exports = userRouter;
