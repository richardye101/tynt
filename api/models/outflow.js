const mongoose = require("mongoose");
const joi = require("joi");
// const {
//   OutflowDescription,
//   outflowDescriptionSchema,
// } = require("./outflowDescription");
const { outflowCategorySchema } = require("./outflowCategory");
const { userSchema } = require("./user");

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
  outflowDestination: {
    // leave it as string now, but may want to convert to category later on
    type: String,
    required: false,
  },
  // I made this a category so if the same description can be entered for recurring outflows
  description: {
    // leave it as string now, but may want to convert to category later on
    type: String,
    required: true,
  },
  user: {
    type: userSchema.pick(["_id", "firstName", "lastName"]),
    required: true,
  },
});

const Outflow = new mongoose.model("Outflow", outflowSchema);

function validateOutflow(outflow) {
  const schema = joi.object({
    date: joi.date().required(),
    outflowCategoryId: joi.objectId().required(),
    amount: joi.number().required(),
    outflowDestinationId: joi.objectId().required(),
    description: joi.string().required(),
    userId: joi.objectId().required(),
  });
  return schema.validate(outflow);
}

exports.outflowSchema = outflowSchema;
exports.Outflow = Outflow;
exports.validate = validateOutflow;
