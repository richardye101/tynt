const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const outflows = require("../routes/outflows");
const outflowDestinations = require("../routes/outflowDestinations");
const outflowCategories = require("../routes/outflowCategories");
const inflowReasons = require("../routes/inflowReasons");
const inflowSources = require("../routes/inflowSources");
const inflowTypes = require("../routes/inflowTypes");
const inflows = require("../routes/inflows");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/outflows", outflows);
  app.use("/api/outflowDestinations", outflowDestinations);
  app.use("/api/outflowCategories", outflowCategories);
  app.use("/api/inflowReasons", inflowReasons);
  app.use("/api/inflowSources", inflowSources);
  app.use("/api/inflowTypes", inflowTypes);
  app.use("/api/inflows", inflows);
  app.use(error);
};
