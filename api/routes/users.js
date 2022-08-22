const { User, userSchema, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

// for creating a new user and getting the current users

router.get("/", async (req, res) => {
  const users = await User.find().sort();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!req.body.password) return res.status(400).send("Password is required..");

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("This email is associated with an existing user.");

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "phone", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    await user.save();
    console.log("User successfully created");
  } catch (err) {
    console.error("Error", err.message);
  }

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "firstName", "lastName", "email", "phone"]));
});

module.exports = router;
