const { InflowSource, validate } = require("../models/inflowSource");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const inflowSource = await InflowSource.find();
  res.send(inflowSource);
});

router.get("/:id", async (req, res) => {
  const inflowSource = await InflowSource.findById(req.params.id);
  if (!inflowSource)
    res.status(404).send("Requested Inflow Source cannot be found");
  res.send(inflowSource);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inflowSource = new InflowSource({
    name: req.body.name,
  });

  try {
    await inflowSource.save();
    console.log(`Successfully saved new Inflow Source: ${inflowSource.name}`);
    res.send(inflowSource);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inflowSource = await InflowSource.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!inflowSource)
    return res.status(404).send("Requested Inflow Source cannot be found");

  console.log(`Successfully updated new Inflow Source: ${inflowSource.name}`);
  res.send(inflowSource);
});

router.delete("/:id", async (req, res) => {
  const inflowSource = await InflowSource.findByIdAndDelete(req.params.id);
  if (!inflowSource)
    res.status(404).send("Requested Inflow Source cannot be found");

  res.send(inflowSource);
});

module.exports = router;
