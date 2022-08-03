const _ = require("lodash");
const express = require("express");
const { User } = require("../models/user");
const { Inflow, validate } = require("../models/inflow");
const { InflowReason } = require("../models/inflowReason");
const { InflowSource } = require("../models/inflowSource");
const { InflowType } = require("../models/inflowType");
const router = express.Router();

router.get("/", async (req, res) => {
  const inflows = await Inflow.find().sort("-date");
  res.send(inflows);
});

router.get("/:id", async (req, res) => {
  const inflow = await Inflow.findById(req.params.id);
  if (!inflow) res.status(404).send("Requested Inflow not found");
  res.send(inflow);
});

router.get("/:userEmail", async (req, res) => {
  const user = await User.findOne({ email: req.params.userEmail });
  const inflows = await Inflow.find({ user }).sort("-date");
  res.send(inflows);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const inflowReason = await InflowReason.findById(req.body.inflowReasonId);
  if (!inflowReason) return res.status(404).send("Invalid Inflow Reason");

  const inflowSource = await InflowSource.findById(req.body.inflowSourceId);
  if (!inflowSource) return res.status(404).send("Invalid Inflow Source");

  const inflowType = await InflowType.findById(req.body.inflowTypeId);
  if (!inflowType) return res.status(404).send("Invalid Inflow Type");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Invalid User");

  const inflowData = _.pick(req.body, [
    "date",
    "totalRecieved",
    "federalTax",
    "provincialTax",
    "canadianPensionPlan",
    "employmentInsurance",
    "unionDues",
    "stockPayment",
    "vacationPay",
    "netRecieved",
  ]);
  inflowData.inflowReason = {
    _id: inflowReason._id,
    text: inflowReason.text,
  };
  inflowData.inflowType = {
    _id: inflowType._id,
    text: inflowType.text,
  };
  inflowData.inflowSource = {
    _id: inflowSource._id,
    name: inflowSource.name,
  };
  inflowData.user = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  let inflow = new Inflow(inflowData);

  try {
    await inflow.save();
    console.log(`Inflow for ${user.firstName} has been successfully saved`);
    res.send(inflow);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const inflowReason = await InflowReason.findById(req.body.inflowReasonId);
  if (!inflowReason) return res.status(404).send("Invalid Inflow Reason");

  const inflowSource = await InflowSource.findById(req.body.inflowSourceId);
  if (!inflowSource) return res.status(404).send("Invalid Inflow Source");

  const inflowType = await InflowType.findById(req.body.inflowTypeId);
  if (!inflowType) return res.status(404).send("Invalid Inflow Type");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Invalid User");

  const inflowData = _.pick(req.body, [
    "date",
    "totalRecieved",
    "federalTax",
    "provincialTax",
    "canadianPensionPlan",
    "employmentInsurance",
    "unionDues",
    "stockPayment",
    "vacationPay",
    "netRecieved",
  ]);
  inflowData.inflowReason = {
    _id: inflowReason._id,
    text: inflowReason.text,
  };
  inflowData.inflowType = {
    _id: inflowType._id,
    text: inflowType.text,
  };
  inflowData.inflowSource = {
    _id: inflowSource._id,
    name: inflowSource.name,
  };
  inflowData.user = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const inflow = await Inflow.findByIdAndUpdate(req.params.id, inflowData, {
    new: true,
  });

  if (!inflow) res.status(404).send("The requested Inflow cannot be found");

  res.send(inflow);
});

router.delete("/:id", async (req, res) => {
  const inflow = Inflow.findByIdAndDelete(req.params.id);
  if (!inflow) res.status(404).send("The requested Inflow cannot be found.");
  res.send(inflow);
});
module.exports = router;
