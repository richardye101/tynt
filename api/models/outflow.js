const mongoose = require("mongoose");
const joi = require("joi");
const {
  OutflowDescription,
  outflowDescriptionSchema,
} = require("./outflowDescription");
const { OutflowCategory, outflowCategorySchema } = require("./outflowCategory");
const { User, userSchema } = require("./user");

const outflowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  outflowCategory: {
    type: outflowCategorySchema,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // I made this a category so if the same description can be entered for recurring outflows
  description: {
    // leave it as string now, but may want to convert to category later on
    type: String,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});

const Outflow = new mongoose.model("Outflow", outflowSchema);

function validateOutflow(outflow) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
  });
  return schema.validate(outflow);
}

exports.outflowSchema = outflowSchema;
exports.Outflow = Outflow;
exports.validate = validateOutflow;
