const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// importing routes
const pageRouter = require("./routes/pageRoutes");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
app.use("/", pageRouter);
app.use("/", commentRouter);
app.use("/user", userRouter);
app.use("/user", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
