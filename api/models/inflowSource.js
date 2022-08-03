const joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const inflowSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const InflowSource = mongoose.model("Inflow Source", inflowSourceSchema);

function validateInflowSource(source) {
  const schema = joi.object({
    name: joi.string().min(3).max(255).required(),
  });
  return schema.validate(source);
}
exports.inflowSourceSchema = inflowSourceSchema;
exports.InflowSource = InflowSource;
exports.validate = validateInflowSource;
