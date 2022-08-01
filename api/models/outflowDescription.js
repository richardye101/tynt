const mongoose = require("mongoose");
const joi = require("joi");

const outflowDescriptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const OutflowDescription = mongoose.model(
  "Outflow Description",
  outflowDescriptionSchema
);

function validateOutflowDescription(description) {
  const schema = joi.object({
    text: joi.string().min(3).max(50).required(),
  });
  return schema.validate(description);
}

exports.outflowDescriptionSchema = outflowDescriptionSchema;
exports.OutflowDescription = OutflowDescription;
exports.validate = validateOutflowDescription;
