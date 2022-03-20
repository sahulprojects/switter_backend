const jwt = require("jsonwebtoken");
const User = require("../models/users.models");
const bcrypt = require("bcrypt");

const generateToken = (username, password) => {
  return jwt.sign({ username, password }, process.env.SECRET_KEY, {
    expiresIn: "604800s",
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) res.send("authentication failed", 404);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) res.send("Invalid user", 404);
    else {
      req.user = user;
      next();
    }
  });
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  if (!user) res.send("No user found with this username", 404);
  else if (!(await bcrypt.compare(password, user.password))) {
    res.send("Password does not match with the username", 404);
  } else {
    const accessToken = generateToken(username, password);
    res.json({ AccessToken: accessToken });
  }
};

module.exports = { login, authenticateToken };
