const mongoose = require("mongoose");
const joi = require("joi");

const outflowDestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const OutflowDestination = mongoose.model(
  "Outflow Destination",
  outflowDestinationSchema
);

function validateOutflowDestination(destination) {
  const schema = joi.object({
    name: joi.string().min(3).max(50),
  });
  return schema.validate(destination);
}

exports.outflowDestinationSchema = outflowDestinationSchema;
exports.OutflowDestination = OutflowDestination;
exports.validate = validateOutflowDestination;
