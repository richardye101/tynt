const { InflowType, validate } = require("../models/inflowType");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const inflowTypes = await InflowType.find();
  res.send(inflowTypes);
});

router.get("/:id", async (req, res) => {
  const inflowType = InflowType.findById(req.params.id);
  if (!inflowType)
    return res.status(400).send("Requested Inflow Type cannot be found");

  res.send(inflowType);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const inflowType = new InflowType({
    text: req.body.text,
  });

  try {
    await inflowType.save();
    console.log("Inflow type successfully saved");
    res.send(inflowType);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inflowType = await InflowType.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    { new: true }
  );
  if (!inflowType)
    return res.status(404).send("Requested Inflow Type cannot be found");

  console.log(`Successfully updated new Inflow Type: ${inflowType.name}`);
  res.send(inflowType);
});

router.delete("/:id", async (req, res) => {
  const inflowType = await InflowType.findByIdAndDelete(req.params.id);
  if (!inflowType)
    res.status(404).send("Requested Inflow Type cannot be found");

  res.send(inflowType);
});

module.exports = router;
