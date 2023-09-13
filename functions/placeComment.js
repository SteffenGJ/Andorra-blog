const Comment = require("../models/comment");
const Post = require("../models/post");

const placeComment = async (
  commentText,
  commentDate,
  commentingUserId,
  commentedPostId
) => {
  const comment = new Comment({
    date: commentDate,
    text: commentText,
    user: commentingUserId,
    post: commentedPostId,
  });

  const savedComment = await comment.save();

  const post = await Post.findById(commentedPostId);

  post.comments = [...post.comments, savedComment._id];

  await post.save();

  return { success: true, message: "Successfully posted a comment" };
};

module.exports = placeComment;
