const express = require("express");
const { User } = require("../models/user");
const { OutflowCategory, validate } = require("../models/outflowCategory");
const router = express.Router();

router.get("/", async (req, res) => {
  const outflowsCategory = await OutflowCategory.find().sort("-date");
  res.send(outflowsCategory);
});

router.get("/:id", async (req, res) => {
  const outflow = await OutflowCategory.findById(req.params.id);
  if (!outflow) res.status(404).send("Requested outflow not found");
  res.send(outflow);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let outflowCategory = new OutflowCategory({ name: req.body.name });

  await outflowCategory.save();

  res.send(outflowCategory);
});

module.exports = router;
