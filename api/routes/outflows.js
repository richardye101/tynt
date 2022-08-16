const { User } = require("../models/user");
const { Outflow, validate } = require("../models/outflow");
const { OutflowCategory } = require("../models/outflowCategory");
const { OutflowDestination } = require("../models/outflowDestination");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const outflows = await Outflow.find().sort("-date");
  res.send(outflows);
});

router.get("/:id", async (req, res) => {
  const outflow = await Outflow.findById(req.params.id);
  if (!outflow) res.status(404).send("Requested outflow not found");
  res.send(outflow);
});

router.get("/:userEmail", async (req, res) => {
  const user = await User.findOne({ email: req.params.userEmail });
  const outflows = await Outflow.find({ user }).sort("-date");
  res.send(outflows);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(404).send(`Invalid outflow: ${error.details[0].message}`);
  //   get the category of the outflow
  const outflowCategory = await OutflowCategory.findById(
    req.body.outflowCategoryId
  );
  if (!outflowCategory)
    return res.status(404).send("Requested outflow category cannot be found");

  const outflowDestination = await OutflowDestination.findById(
    req.body.outflowDestinationId
  );
  if (!outflowDestination)
    return res
      .status(404)
      .send("Requested outflow Destination cannot be found");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Invalid User");

  let outflow = new Outflow({
    date: req.body.date,
    outflowCategory: {
      _id: outflowCategory._id,
      name: outflowCategory.name,
    },
    amount: req.body.amount,
    outflowDestination: {
      _id: outflowDestination._id,
      name: outflowDestination.name,
    },
    description: req.body.description,
    user: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  try {
    await outflow.save();
    console.log(`Outflow for ${user.firstName} has been successfully saved`);
    res.send(outflow);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const outflowCategory = await OutflowCategory.findById(
    req.body.outflowCategoryId
  );
  if (!outflowCategory)
    return res.status(404).send("Requested outflow category cannot be found");

  const outflowDestination = await OutflowDestination.findById(
    req.body.outflowDestinationId
  );
  if (!outflowDestination)
    return res
      .status(404)
      .send("Requested outflow Destination cannot be found");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Requested user cannot be found");

  const outflow = await Outflow.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      outflowCategory: {
        _id: outflowCategory._id,
        name: outflowCategory.name,
      },
      amount: req.body.amount,
      outflowDestination: {
        _id: outflowDestination._id,
        name: outflowDestination.name,
      },
      description: req.body.description,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
    { new: true }
  );
  if (!outflow) res.status(404).send("The requested outflow cannot be found");

  res.send(outflow);
});

router.delete("/:id", async (req, res) => {
  const outflow = Outflow.findByIdAndDelete(req.params.id);
  if (!outflow) res.status(404).send("The requested outflow cannot be found.");
  res.send(outflow);
});
module.exports = router;
