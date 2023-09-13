const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  date: String,
  text: String,
});

module.exports = mongoose.model("Notification", notificationSchema);
