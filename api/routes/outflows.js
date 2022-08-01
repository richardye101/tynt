const mongoose = require("mongoose");
const { Outflow } = require("../models/outflow");
const express = require("express");
const { User } = require("../models/user");
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
  const user = await User.find({ email: req.params.userEmail });
  const outflows = await Outflow.find({ user }).sort("-date");
});

router.post("/", async (req, res) => {});

module.exports = router;
