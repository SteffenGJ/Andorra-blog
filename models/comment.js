const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  date: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
