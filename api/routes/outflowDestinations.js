const express = require("express");
const { User } = require("../models/user");
const {
  OutflowDestination,
  validate,
} = require("../models/outflowDestination");
const router = express.Router();

router.get("/", async (req, res) => {
  const outflowDestinations = await OutflowDestination.find().sort("-date");
  res.send(outflowDestinations);
});

router.get("/:id", async (req, res) => {
  const outflowDestination = await OutflowDestination.findById(req.params.id);
  if (!outflowDestination) res.status(404).send("Requested outflow not found");
  res.send(outflowDestination);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let outflowDestination = new OutflowDestination({ name: req.body.name });

  await outflowDestination.save();

  res.send(outflowDestination);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const outflowDestination = await OutflowDestination.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!outflowDestination)
    res.status(404).send("The requested Destination cannot be found");

  res.send(outflowDestination);
});

router.delete("/:id", async (req, res) => {
  const outflowDestination = await OutflowDestination.findByIdAndDelete(
    req.params.id
  );
  if (!outflowDestination)
    res.status(404).send("The requested Destination cannot be found");
  res.send(outflowDestination);
});

module.exports = router;
