const joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const inflowTypeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const InflowType = mongoose.model("Inflow Type", inflowTypeSchema);

function validateInflowType(type) {
  const schema = new joi.object({
    text: joi.string().min(3).max(255).required(),
  });
  return schema.validate(type);
}

exports.inflowTypeSchema = inflowTypeSchema;
exports.InflowType = InflowType;
exports.validate = validateInflowType;
