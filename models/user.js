const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  authorization: String,
  hasLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
