const winston = require("winston");
const express = require("express");

const app = express();

// Middleware
// set NODE_ENV in terminal
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")(app);

const PORT = process.env.PORT || 3900;

const server = app.listen(PORT, () => {
  winston.info(`Listening on port ${PORT}...`);
});

module.exports = server;
