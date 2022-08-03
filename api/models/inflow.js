const mongoose = require("mongoose");
const joi = require("joi");
const { inflowReasonSchema } = require("./inflowReason");
const { inflowSourceSchema } = require("./inflowSource");
const { inflowTypeSchema } = require("./inflowType");
const { userSchema } = require("./user");

const inflowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: userSchema.pick(["_id", "firstName", "lastName"]),
    required: true,
  },
  inflowReason: {
    type: inflowReasonSchema.pick(["text"]),
    required: true,
  },
  inflowSource: {
    type: inflowSourceSchema,
    required: true,
  },
  inflowType: {
    type: inflowTypeSchema,
    required: true,
  },
  totalRecieved: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  federalTax: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  provincialTax: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  canadianPensionPlan: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  employmentInsurance: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  unionDues: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  stockPayment: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  vacationPay: {
    type: Number,
    default: 0,
    min: [0, "Got {VALUE}, enter a positive value"],
  },
  netRecieved: {
    type: Number,
    default: 0,
  },
});

inflowSchema.pre("save", async function () {
  const tax = this.federalTax + this.provincialTax;
  const deductions =
    tax + this.canadianPensionPlan + this.employmentInsurance + this.unionDues;
  const otherPayments = this.vacationPay + this.stockPayment;
  const net = this.totalRecieved + otherPayments - deductions;
  this.netRecieved = net;
});

const Inflow = mongoose.model("Inflow", inflowSchema);

function validateInflow(inflow) {
  const schema = joi.object({
    date: joi.date().required(),
    inflowTypeId: joi.objectId().required(),
    inflowSourceId: joi.objectId().required(),
    inflowReasonId: joi.objectId().required(),
    totalRecieved: joi.number().required(),
    federalTax: joi.number(),
    provincialTax: joi.number(),
    canadianPensionPlan: joi.number(),
    employmentInsurance: joi.number(),
    unionDues: joi.number(),
    stockPayment: joi.number(),
    vacationPay: joi.number(),
    netRecieved: joi.number(),
    userId: joi.objectId().required(),
  });

  return schema.validate(inflow);
}

exports.inflowSchema = inflowSchema;
exports.Inflow = Inflow;
exports.validate = validateInflow;
// inflowSchema.methods.calculateNet = async function () {
//   const tax = this.federalTax + this.provincialTax;
//   const deductions =
//     tax + this.canadianPensionPlan + this.employmentInsurance + this.unionDues;
//   const otherPayments = this.vacationPay + this.stockPayment;
//   const net = this.totalRecieved + otherPayments - deductions;
//   this.netRecieved = net;
//   this.save((err) => {
//     if(err) =>
//   });
// };
