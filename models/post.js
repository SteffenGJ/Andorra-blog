const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  date: String,
  imageURLs: [{ type: String }],
  text: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Post", postSchema);
