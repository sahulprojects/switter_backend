const email_validator = require("email-validator");
const bcrypt = require("bcrypt");
const User = require("../models/users.models");

const signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = User({
    username,
    email: email_validator.validate(email)
      ? email
      : res.send("Invalid Email", 404),
    password: await bcrypt.hash(password, 10),
  });

  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    if (err.toString().includes("username")) res.send("Username is taken", 404);
    else if (err.toString().includes("email")) res.send("Email is taken", 404);
  }
};

module.exports = { signup };
