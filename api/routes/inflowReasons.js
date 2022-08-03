const { InflowReason, validate } = require("../models/inflowReason");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const inflowReasons = await InflowReason.find();
  res.send(inflowReasons);
});

router.get("/:id", async (req, res) => {
  const inflowReason = InflowReason.findById(req.params.id);
  if (!inflowReason)
    return res.status(400).send("Requested inflow reason cannot be found");

  res.send(inflowReason);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Requested user cannot be found");

  const inflowReason = new InflowReason({
    text: req.body.text,
    user: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  try {
    await inflowReason.save();
    console.log("Inflow reason successfully saved");
    res.send(inflowReason);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.findById(req.body.userId);
  if (!user) return res.status(404).send("Requested user cannot be found");

  const inflowReason = await InflowReason.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
    { new: true }
  );
  if (!inflowReason)
    return res.status(404).send("Requested Inflow Reason cannot be found");

  console.log(`Successfully updated new Inflow Reason: ${inflowReason.name}`);
  res.send(inflowReason);
});

router.delete("/:id", async (req, res) => {
  const inflowReason = await InflowReason.findByIdAndDelete(req.params.id);
  if (!inflowReason)
    res.status(404).send("Requested Inflow Reason cannot be found");

  res.send(inflowReason);
});

module.exports = router;
