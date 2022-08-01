const mongoose = require("mongoose");
const joi = require("joi");

const outflowCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const OutflowCategory = mongoose.model(
  "Outflow Category",
  outflowCategorySchema
);

function validateOutflowCategory(category) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
  });
  return schema.validate(category);
}

exports.outflowCategorySchema = outflowCategorySchema;
exports.OutflowCategory = OutflowCategory;
exports.validate = validateOutflowCategory;
