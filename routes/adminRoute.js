const Notification = require("../models/notification");
const Post = require("../models/post");
const User = require("../models/user");

const adminRouter = require("express").Router();

adminRouter.get("/pendingUsers", async (req, res, next) => {
  try {
    const users = await User.find({ authorization: "Pending" });
    res.json({ users: users });
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/acceptUser/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    user.authorization = "Reader";

    await user.save();

    res.status(203);
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/notification", async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);

    const notification = new Notification({
      text: `${user.username} ${req.body.notification.text}`,
      date: req.body.notification.date,
    });

    await notification.save();

    res.status(201);
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/notifications", async (req, res, next) => {
  try {
    const notifications = await Notification.find({});

    res.json({ notifications: notifications });
  } catch (err) {
    next(err);
  }
});

adminRouter.post("/post", async (req, res, next) => {
  try {
    const post = new Post(req.body.post);

    await post.save();

    res.status(201);
  } catch (err) {
    next(err);
  }
});

module.exports = adminRouter;
