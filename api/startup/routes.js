const express = require("express");
const outflows = require("../routes/outflows");
const outflowCategories = require("../routes/outflowCategories");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/outflowCategories", outflowCategories);
  app.use("/api/outflows", outflows);
};
