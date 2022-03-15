const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const body_parser = require("body-parser");

const port = process.env.PORT;
const SignupRouter = require("./src/signup/signup.route");
const LoginRouter = require("./src/login/login.router");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.alht5.mongodb.net/SwitterDB?retryWrites=true&w=majority`
  )
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err, "it has an error"));

app.use("/", SignupRouter);
app.use("/login", LoginRouter);

app.listen(port, () => [
  console.log(`server starts at http://localhost:${port}`),
]);