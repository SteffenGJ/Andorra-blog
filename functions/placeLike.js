const Post = require("../models/post");
const User = require("../models/user");

const placeLike = async (userId, postId) => {
  const user = await User.findById(userId);
  const post = await Post.findById(postId);

  user.hasLiked = [...user.hasLiked, postId];

  await user.save();

  post.likedBy = [...post.likedBy, userId];

  await post.save();

  return { success: true, message: "User has liked the post" };
};

module.exports = placeLike;
