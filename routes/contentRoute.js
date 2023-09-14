const getCommentsByPost = require("../functions/getCommentsByPost");
const placeComment = require("../functions/placeComment");
const placeLike = require("../functions/placeLike");
const Post = require("../models/post");

const contentRoute = require("express").Router();

contentRoute.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json({ content: posts });
  } catch (err) {
    next(err);
  }
});

contentRoute.get("/images", async (req, res, next) => {
  try {
    const allPosts = await Post.find({});
    const images = allPosts.map((post) => post.imageURLs).flat();
    const finalImages = images.map((img) => ({
      src: img,
      height: 400,
      width: 300,
    }));

    res.json({ images: finalImages });
  } catch (err) {
    next(err);
  }
});

contentRoute.post("/like", async (req, res, next) => {
  try {
    const response = await placeLike(req.body.userId, req.body.postId);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

contentRoute.post("/comment", async (req, res, next) => {
  try {
    const response = await placeComment(
      req.body.comment.text,
      req.body.comment.date,
      req.body.userId,
      req.body.postId
    );
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

contentRoute.get("/comment/:postId", async (req, res, next) => {
  try {
    const response = await getCommentsByPost(req.params.postId);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = contentRoute;
