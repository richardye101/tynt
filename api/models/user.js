const mongoose = require("mongoose");
const joi = require("joi");
const pwd_complex = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    sparse: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  //   roles: [] // defines a certain role that is able to do certain operations, or
  // operations: [] // array of complex objects, granular control of what a user is capable of
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = joi.object({
    email: joi.string().email().min(5).max(255).required(),
    firstName: joi.string().min(1).max(255).required(),
    lastName: joi.string().min(1).max(255).required(),
    phone: joi.number().required(),
    password: new pwd_complex({
      min: 8,
      max: 32,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 3,
    }),
  });

  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
