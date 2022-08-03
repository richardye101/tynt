const express = require("express");
const { User } = require("../models/user");
const { OutflowCategory, validate } = require("../models/outflowCategory");
const router = express.Router();

router.get("/", async (req, res) => {
  const outflowCategories = await OutflowCategory.find().sort("-date");
  res.send(outflowCategories);
});

router.get("/:id", async (req, res) => {
  const outflowCategory = await OutflowCategory.findById(req.params.id);
  if (!outflowCategory) res.status(404).send("Requested outflow not found");
  res.send(outflowCategory);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let outflowCategory = new OutflowCategory({ name: req.body.name });

  await outflowCategory.save();

  res.send(outflowCategory);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const outflowCategory = await OutflowCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!outflowCategory)
    res.status(404).send("The requested category cannot be found");

  res.send(outflowCategory);
});

router.delete("/:id", async (req, res) => {
  const outflowCategory = await OutflowCategory.findByIdAndDelete(
    req.params.id
  );
  if (!outflowCategory)
    res.status(404).send("The requested category cannot be found");
  res.send(outflowCategory);
});

module.exports = router;
