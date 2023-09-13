const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./functions/middleware/errorHandler");
const hasAccessToContent = require("./functions/middleware/hasAccessToContent");
const contentRoute = require("./routes/contentRoute");
const adminRouter = require("./routes/adminRoute");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/content/:id", hasAccessToContent, contentRoute);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

module.exports = app;
