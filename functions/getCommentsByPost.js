const Post = require("../models/post");

const getCommentsByPost = async (postId) => {
  const post = await Post.findById(postId).populate({
    path: "comments",
    populate: { path: "user" },
  });

  return { comments: post.comments };
};

module.exports = getCommentsByPost;
