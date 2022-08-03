const joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const inflowReasonSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  user: {
    type: userSchema.pick(["_id", "firstName", "lastName"]),
    required: true,
  },
});

const InflowReason = mongoose.model("Inflow Reason", inflowReasonSchema);

function validateInflowReason(reason) {
  const schema = new joi.object({
    text: joi.string().min(3).max(255).required(),
    userId: joi.objectId().required(),
  });
  return schema.validate(reason);
}

exports.inflowReasonSchema = inflowReasonSchema;
exports.InflowReason = InflowReason;
exports.validate = validateInflowReason;
