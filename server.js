const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.get("/test",(req,res)=>{
  res.send('This is working fine ')
})

const port = process.env.PORT || 5000;
const SignupRouter = require("./src/signup/signup.route");
const LoginRouter = require("./src/login/login.router");
const PostRouter = require("./src/posts/posts.route");
const { authenticateToken } = require("./src/login/login.service");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://sahul:CyvL5VL719QVZ1YN@cluster0.alht5.mongodb.net/SwitterDB?retryWrites=true&w=majority`
  )
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err, "it has an error"));

app.use("/", SignupRouter);
app.use("/login", LoginRouter);
app.use("/post", authenticateToken, PostRouter);

app.listen(port, () => [
  console.log(`server starts at http://localhost:${port}`),
]);
